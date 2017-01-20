// <copyright file="AgencyRunTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/19/2017</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using WebJobAgency;

    /// <summary>
    /// Agency run test
    /// </summary>
    public class AgencyRunTest : IDisposable
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
        /// Tests job execution
        /// </summary>
        [TestMethod]
        public void TestRun()
        {
            var jobDefinition = new TestJobDefinition();
            var config = new AgencyClientConfiguration(
                    "acc",
                    this.dataAccessorWrapper.DataAccessor,
                    new IAgencyJobDefinition[] { jobDefinition })
            {
                PulseIntervalMilliseconds = 20
            };

            var client = new AgencyClient(config);

            var scheduler = new AgencyJobScheduler(this.dataAccessorWrapper.DataAccessor);

            Task.Run(() => client.StartWork());

            var expectedAgents =
                new AgencyClientInfo[]
                {
                    new AgencyClientInfo("acc", AgencyClientState.Idle, null, DateTime.UtcNow)
                };

            var expectedJobs =
                new AgencyJobInfo[]
                {
                };

            Thread.Sleep(100);
            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            scheduler.ScheduleJob("j1", "config");
            Thread.Sleep(200);

            Assert.IsTrue(jobDefinition.IsJobRunning);

            expectedAgents =
               new AgencyClientInfo[]
               {
                    new AgencyClientInfo("acc", AgencyClientState.RunningJob, "j1", DateTime.UtcNow)
               };

            expectedJobs =
                new AgencyJobInfo[]
                {
                    new AgencyJobInfo("j1", "config", AgencyJobState.Running, "acc", DateTime.UtcNow, 0)
                };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            jobDefinition.SignalToUpdatePercentComplete(10);
            Thread.Sleep(100);

            expectedJobs =
            new AgencyJobInfo[]
            {
                   new AgencyJobInfo("j1", "config", AgencyJobState.Running, "acc", DateTime.UtcNow, 10)
            };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
            jobDefinition.SignalToUpdatePercentComplete(50);
            Thread.Sleep(100);

            expectedJobs =
            new AgencyJobInfo[]
            {
                  new AgencyJobInfo("j1", "config", AgencyJobState.Running, "acc", DateTime.UtcNow, 50)
            };

            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
            jobDefinition.SignalCompleteJob();
            Thread.Sleep(100);

            expectedJobs =
            new AgencyJobInfo[]
                {
                      new AgencyJobInfo("j1", "config", AgencyJobState.Completed, null, DateTime.UtcNow, 100)
                };
            expectedAgents =
               new AgencyClientInfo[]
               {
                    new AgencyClientInfo("acc", AgencyClientState.Idle, null, DateTime.UtcNow)
               };
            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);

            client.StopWork();
            Thread.Sleep(100);

            expectedAgents =
               new AgencyClientInfo[]
               {
               };
            this.dataAccessorWrapper.VerifyAgentsAndJobsState(expectedAgents, expectedJobs);
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.dataAccessorWrapper.Dispose();
        }

        /// <summary>
        /// Test job definition
        /// </summary>
        /// <seealso cref="Yojowa.WebJobAgency.IAgencyJobDefinition" />
        private class TestJobDefinition : IAgencyJobDefinition
        {
            /// <summary>
            /// The percent complete to update
            /// </summary>
            private volatile int percentCompleteToUpdate;

            /// <summary>
            /// Flag indicating whether job is running
            /// </summary>
            private volatile bool jobRunning;

            /// <summary>
            /// The is running lock
            /// </summary>
            private AutoResetEvent autoResetEvent = new AutoResetEvent(false);

            /// <summary>
            /// Gets the identifier.
            /// </summary>
            /// <value>
            /// The identifier.
            /// </value>
            public string ID
            {
                get
                {
                    return "j1";
                }
            }

            /// <summary>
            /// Gets a value indicating whether this instance is job running.
            /// </summary>
            /// <value>
            /// <c>true</c> if this instance is job running; otherwise, <c>false</c>.
            /// </value>
            public bool IsJobRunning
            {
                get
                {
                    this.autoResetEvent.WaitOne();
                    return this.jobRunning;
                }
            }

            /// <summary>
            /// Runs the specified configuration.
            /// </summary>
            /// <param name="configuration">The configuration.</param>
            /// <param name="onPercentCompleteUpdate">The on percent complete update.</param>
            public void Run(string configuration, Action<int> onPercentCompleteUpdate)
            {
                this.jobRunning = true;
                this.autoResetEvent.Set();
                while (this.jobRunning)
                {
                    if (this.percentCompleteToUpdate > 0)
                    {
                        onPercentCompleteUpdate(this.percentCompleteToUpdate);
                        this.percentCompleteToUpdate = -1;
                    }

                    Thread.Sleep(100);
                }
            }

            /// <summary>
            /// Signals to update percent complete.
            /// </summary>
            /// <param name="percentComplete">The percent complete.</param>
            public void SignalToUpdatePercentComplete(int percentComplete)
            {
                this.percentCompleteToUpdate = percentComplete;
            }

            /// <summary>
            /// Signals the complete job.
            /// </summary>
            public void SignalCompleteJob()
            {
                this.jobRunning = false;
            }
        }
    }
}
