// <copyright file="NpgAgencyDataAccessorTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/18/2017</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System;
    using System.Linq;
    using System.Threading;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using WebJobAgency;

    /// <summary>
    /// NPGSQL data accessor test
    /// </summary>
    public class NpgAgencyDataAccessorTest
    {
        /// <summary>
        /// The data accessor wrapper
        /// </summary>
        private DataAccessorWrapper dataAccessorWrapper;

        /// <summary>
        /// Initializes the test
        /// </summary>
        [TestInitialize]
        public void TestInitialize()
        {
            this.dataAccessorWrapper = new DataAccessorWrapper();
        }

        /// <summary>
        /// Cleans up after the test
        /// </summary>
        [TestCleanup]
        public void TestCleanup()
        {
            this.dataAccessorWrapper.Dispose();
        }

        /// <summary>
        /// Tests adding and removing client.
        /// </summary>
        [TestMethod]
        public void TestAddRemoveClient()
        {
            this.dataAccessorWrapper.DataAccessor.AddOrUpdateClient("c1");

            var expectedAgents =
                new AgencyClientInfo[]
                {
                    new AgencyClientInfo("c1", AgencyClientState.Idle, null, DateTime.UtcNow)
                };

            var expectedJobs =
                new AgencyJobInfo[]
                {
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            Thread.Sleep(2000);

            this.dataAccessorWrapper.DataAccessor.AddOrUpdateClient("c1");

            expectedAgents =
                new AgencyClientInfo[]
                {
                    new AgencyClientInfo("c1", AgencyClientState.Idle, null, DateTime.UtcNow) /* updated_date should be updated */
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            this.dataAccessorWrapper.DataAccessor.RemoveClient("c1");

            expectedAgents =
                new AgencyClientInfo[]
                {
                };

            expectedJobs =
                new AgencyJobInfo[]
                {
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
        }

        /// <summary>
        /// Tests scheduling and canceling job
        /// </summary>
        [TestMethod]
        public void TestScheduleAndCanceJob()
        {
            this.dataAccessorWrapper.DataAccessor.ScheduleJob("j1", "config");
            var expectedAgents =
               new AgencyClientInfo[]
               {
               };

            var expectedJobs =
                new AgencyJobInfo[]
                {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Scheduled, null, DateTime.UtcNow, 0)
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            this.dataAccessorWrapper.DataAccessor.CancelJob("j1");
            expectedAgents =
              new AgencyClientInfo[]
              {
              };

            expectedJobs =
                new AgencyJobInfo[]
                {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Canceled, null, DateTime.UtcNow, 0)
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
        }

        /// <summary>
        /// Tests updating job progress.
        /// </summary>
        [TestMethod]
        public void TestUpdateJobProgress()
        {
            this.dataAccessorWrapper.DataAccessor.ScheduleJob("j1", "config");
            this.dataAccessorWrapper.DataAccessor.UpdateJobProgress("j1", "c1", 10);
            var expectedAgents =
               new AgencyClientInfo[]
               {
               };

            var expectedJobs =
                new AgencyJobInfo[]
                {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Scheduled, null, DateTime.UtcNow, 10)
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            this.dataAccessorWrapper.DataAccessor.UpdateJobProgress("j1", "c1", 95);
            expectedAgents =
               new AgencyClientInfo[]
               {
               };

            expectedJobs =
                new AgencyJobInfo[]
                {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Scheduled, null, DateTime.UtcNow, 95)
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
        }

        /// <summary>
        /// Tests the job assignment.
        /// </summary>
        [TestMethod]
        public void TestJobAssignmentAndCompletion()
        {
            this.dataAccessorWrapper.DataAccessor.AddOrUpdateClient("c1");
            this.dataAccessorWrapper.DataAccessor.ScheduleJob("j1", "config");
            this.dataAccessorWrapper.DataAccessor.StartRunningJob("c1", "j1");

            var expectedAgents =
              new AgencyClientInfo[]
              {
                   new AgencyClientInfo("c1", AgencyClientState.RunningJob, "j1", DateTime.UtcNow)
              };

            var expectedJobs =
                new AgencyJobInfo[]
                {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Running, "c1", DateTime.UtcNow, 0)
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            this.dataAccessorWrapper.DataAccessor.CompleteJob("j1", "c1");

            expectedAgents =
             new AgencyClientInfo[]
             {
                   new AgencyClientInfo("c1", AgencyClientState.Idle, null, DateTime.UtcNow)
             };

            expectedJobs =
               new AgencyJobInfo[]
               {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Completed, null, DateTime.UtcNow, 100)
               };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
        }
    }
}
