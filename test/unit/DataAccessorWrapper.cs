// <copyright file="DataAccessorWrapper.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/19/2017</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System;
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Yojowa.WebJobAgency;

    /// <summary>
    /// Data accessor wrapper
    /// </summary>
    /// <seealso cref="System.IDisposable" />
    public class DataAccessorWrapper : IDisposable
    {
        /// <summary>
        /// The connection string
        /// </summary>
        private const string ConnectionString = "TBD";

        /// <summary>
        /// The agent table name
        /// </summary>
        private string agentTableName;

        /// <summary>
        /// The jobs table name
        /// </summary>
        private string jobsTableName;

        /// <summary>
        /// Initializes a new instance of the <see cref="DataAccessorWrapper"/> class.
        /// </summary>
        public DataAccessorWrapper()
        {
            var stamp = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff");
            this.agentTableName = "agents_test_" + stamp;
            this.jobsTableName = "jobs_test_" + stamp;
            NpgAgencyDataAccessor.CreateTables(ConnectionString, this.agentTableName, this.jobsTableName);
            this.DataAccessor = new NpgAgencyDataAccessor(ConnectionString, this.agentTableName, this.jobsTableName);
        }

        /// <summary>
        /// Gets the data accessor.
        /// </summary>
        /// <value>
        /// The data accessor.
        /// </value>
        public IAgencyDataAccessor DataAccessor
        {
            get;
            private set;
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            NpgAgencyDataAccessor.DeleteTables(ConnectionString, this.agentTableName, this.jobsTableName);
        }

        /// <summary>
        /// Verifies the state of the agents and jobs.
        /// </summary>
        /// <param name="expectedAgents">The expected agents.</param>
        /// <param name="expectedJobs">The expected jobs.</param>
        public void VerifyAgentsAndJobsState(
            AgencyClientInfo[] expectedAgents,
            AgencyJobInfo[] expectedJobs)
        {
            var actualAgents = this.DataAccessor.GetClients(AgencyClientState.Dead | AgencyClientState.Idle | AgencyClientState.RunningJob).ToArray();
            var actualJobs = this.DataAccessor.GetJobs(AgencyJobState.Canceled | AgencyJobState.Completed | AgencyJobState.Running | AgencyJobState.Scheduled).ToArray();

            Assert.AreEqual<int>(expectedAgents.Length, actualAgents.Length);
            for (int i = 0; i < expectedAgents.Length; i++)
            {
                Assert.AreEqual<string>(expectedAgents[i].ActiveJobId, actualAgents[i].ActiveJobId);
                Assert.IsTrue(actualAgents[i].ClientId.StartsWith(expectedAgents[i].ClientId), string.Format("{0} != {1}", actualAgents[i].ClientId, expectedAgents[i].ClientId));
                Assert.AreEqual<AgencyClientState>(expectedAgents[i].ClientState, actualAgents[i].ClientState);
                Assert.IsTrue(Math.Abs(expectedAgents[i].LastActive.Ticks - actualAgents[i].LastActive.Ticks) < TimeSpan.TicksPerSecond);
            }

            Assert.AreEqual<int>(expectedJobs.Length, actualJobs.Length);
            for (int i = 0; i < expectedJobs.Length; i++)
            {
                Assert.IsTrue((actualJobs[i].ActiveClientId == null && expectedJobs[i].ActiveClientId == null) || actualJobs[i].ActiveClientId.StartsWith(expectedJobs[i].ActiveClientId));
                Assert.AreEqual<string>(expectedJobs[i].Configuration, actualJobs[i].Configuration);
                Assert.AreEqual<string>(expectedJobs[i].JobId, actualJobs[i].JobId);
                Assert.AreEqual<AgencyJobState>(expectedJobs[i].JobState, actualJobs[i].JobState);
                Assert.IsTrue(Math.Abs(expectedJobs[i].LastUpdated.Ticks - actualJobs[i].LastUpdated.Ticks) < TimeSpan.TicksPerSecond);
                Assert.AreEqual<int>(expectedJobs[i].PercentComplete, actualJobs[i].PercentComplete);
                Assert.AreEqual<TimeSpan>(expectedJobs[i].TimeRemaining, actualJobs[i].TimeRemaining);
            }
        }
    }
}
