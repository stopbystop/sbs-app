// <copyright file="AgencyClient.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;
    using System.Diagnostics;
    using System.Linq;
    using System.Threading;

    /// <summary>
    /// Agency client
    /// </summary>
    public class AgencyClient
    {
        /// <summary>
        /// The configuration
        /// </summary>
        private AgencyClientConfiguration configuration;

        /// <summary>
        /// Flag indicating whether work should be stopped
        /// </summary>
        private volatile bool stopWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="AgencyClient"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public AgencyClient(AgencyClientConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Does the work.
        /// </summary>
        public void StartWork()
        {
            this.stopWork = false;
            string clientId = this.configuration.ID + "-" + Guid.NewGuid().ToString("N");
            try
            {
                while (!this.stopWork)
                {
                    Trace.TraceInformation("Client:work loop");
                    this.configuration.DataAccessor.AddOrUpdateClient(clientId);
                    var availableJobs = this.configuration.DataAccessor.GetJobs(AgencyJobState.Scheduled);
                    var knownJobDefinitions = this.configuration.JobDefinitions.ToDictionary(jd => jd.ID);
                    foreach (var job in availableJobs)
                    {
                        Trace.TraceInformation("Available job: {0}", job.JobId);
                        if (knownJobDefinitions.ContainsKey(job.JobId))
                        {
                            var jobDefinition = knownJobDefinitions[job.JobId];
                            Trace.TraceInformation("Starting to run job: {0}", job.JobId);
                            this.configuration.DataAccessor.StartRunningJob(clientId, job.JobId);
                            try
                            {
                                jobDefinition.Run(job.Configuration, (pc, timeRemaining) => this.configuration.DataAccessor.UpdateJobProgress(job.JobId, clientId, pc, timeRemaining));
                            }
                            catch (Exception ex)
                            {
                                Trace.TraceError(ex.ToString());
                            }
                            finally
                            {
                                this.configuration.DataAccessor.CompleteJob(job.JobId, clientId);
                            }
                        }
                    }

                    Thread.Sleep(this.configuration.PulseIntervalMilliseconds);
                }
            }
            finally
            {
                this.configuration.DataAccessor.RemoveClient(clientId);
            }
        }

        /// <summary>
        /// Sets the signal to stop work. This call should be made from a different thread that is used to call StartWork
        /// </summary>
        public void StopWork()
        {
            this.stopWork = true;
        }
    }
}
