// <copyright file="NpgAgencyDataAccessorTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/18/2017</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System;
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using WebJobAgency;

    /// <summary>
    /// NPGSQL data accessor test
    /// </summary>
    public class NpgAgencyDataAccessorTest
    {
        /// <summary>
        /// The connection string
        /// </summary>
        private const string ConnectionString = "TBD";

        /// <summary>
        /// The stamp
        /// </summary>
        private string stamp;

        /// <summary>
        /// The agent table name
        /// </summary>
        private string agentTableName;

        /// <summary>
        /// The jobs table name
        /// </summary>
        private string jobsTableName;

        /// <summary>
        /// The data accessor
        /// </summary>
        private NpgAgencyDataAccessor dataAccessor;

        /// <summary>
        /// Initializes the test
        /// </summary>
        [TestInitialize]
        public void TestInitialize()
        {
            this.stamp = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff");
            this.agentTableName = "agents_test_" + this.stamp;
            this.jobsTableName = "jobs_test_" + this.stamp;
            NpgAgencyDataAccessor.CreateTables(ConnectionString, this.agentTableName, this.jobsTableName);
            this.dataAccessor = new NpgAgencyDataAccessor(ConnectionString, this.agentTableName, this.jobsTableName);
        }

        /// <summary>
        /// Cleans up after the test
        /// </summary>
        [TestCleanup]
        public void TestCleanup()
        {
            NpgAgencyDataAccessor.DeleteTables(ConnectionString, this.agentTableName, this.jobsTableName);
        }

        /// <summary>
        /// Tests the add client.
        /// </summary>
        [TestMethod]
        public void TestAddClient()
        {
            this.dataAccessor.AddClient("c1");

            var expectedAgents =
                new AgencyClientInfo[]
                {
                    new AgencyClientInfo("c1", AgencyClientState.Idle, null, DateTime.UtcNow)
                };

            var expectedJobs =
                new AgencyJobInfo[]
                {
                };

            this.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);           
        }

        /// <summary>
        /// Verifies the state of the agents and jobs.
        /// </summary>
        /// <param name="expectedAgents">The expected agents.</param>
        /// <param name="expectedJobs">The expected jobs.</param>
        private void VerifyAgentsAndJobsState(
            AgencyClientInfo[] expectedAgents,
            AgencyJobInfo[] expectedJobs)
        {
            var actualAgents = this.dataAccessor.GetClients(AgencyClientState.Dead | AgencyClientState.Idle | AgencyClientState.RunningJob).ToArray();
            var actualJobs = this.dataAccessor.GetJobs(AgencyJobState.Canceled | AgencyJobState.Completed | AgencyJobState.Running | AgencyJobState.Scheduled).ToArray();

            Assert.AreEqual<int>(expectedAgents.Length, actualAgents.Length);
            for (int i = 0; i < expectedAgents.Length; i++)
            {
                Assert.AreEqual<string>(expectedAgents[i].ActiveJobId, actualAgents[i].ActiveJobId);
                Assert.AreEqual<string>(expectedAgents[i].ClientId, actualAgents[i].ClientId);
                Assert.AreEqual<AgencyClientState>(expectedAgents[i].ClientState, actualAgents[i].ClientState);
                Assert.IsTrue(Math.Abs(expectedAgents[i].LastActive.Ticks - actualAgents[i].LastActive.Ticks) < TimeSpan.TicksPerSecond);
            }

            Assert.AreEqual<int>(expectedJobs.Length, actualJobs.Length);
            for (int i = 0; i < expectedJobs.Length; i++)
            {
                Assert.AreEqual<string>(expectedJobs[i].ActiveClientId, actualJobs[i].ActiveClientId);
                Assert.AreEqual<string>(expectedJobs[i].Configuration, actualJobs[i].Configuration);
                Assert.AreEqual<string>(expectedJobs[i].JobId, actualJobs[i].JobId);
                Assert.AreEqual<AgencyJobState>(expectedJobs[i].JobState, actualJobs[i].JobState);
                Assert.IsTrue(Math.Abs(expectedJobs[i].LastUpdated.Ticks - actualJobs[i].LastUpdated.Ticks) < TimeSpan.TicksPerSecond);
                Assert.AreEqual<int>(expectedJobs[i].PercentComplete, actualJobs[i].PercentComplete);
            }
        }
    }
}
