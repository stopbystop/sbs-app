// <copyright file="AgencyJobScheduler.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/19/2017</date>
namespace Yojowa.WebJobAgency
{
    using System.Collections.Generic;

    /// <summary>
    /// Job scheduler
    /// </summary>
    public class AgencyJobScheduler
    {
        /// <summary>
        /// The data accessor
        /// </summary>
        private IAgencyDataAccessor dataAccessor;

        /// <summary>
        /// Initializes a new instance of the <see cref="AgencyJobScheduler"/> class.
        /// </summary>
        /// <param name="dataAccessor">The data accessor.</param>
        public AgencyJobScheduler(IAgencyDataAccessor dataAccessor)
        {
            this.dataAccessor = dataAccessor;
        }

        /// <summary>
        /// Schedules the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="configuration">The configuration.</param>
        public void ScheduleJob(string jobId, string configuration)
        {
            this.dataAccessor.ScheduleJob(jobId, configuration);
        }

        /// <summary>
        /// Cancels the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        public void CancelJob(int jobId)
        {
            this.dataAccessor.CancelJob(jobId);
        }

        /// <summary>
        /// Deletes the agent.
        /// </summary>
        /// <param name="agentId">The agent identifier.</param>
        public void DeleteAgent(string agentId)
        {
            this.dataAccessor.RemoveClient(agentId);
        }

        /// <summary>
        /// Gets the jobs.
        /// </summary>
        /// <param name="jobState">State of the job.</param>
        /// <returns>Jobs matching the criteria</returns>
        public IEnumerable<AgencyJobInfo> GetJobs(AgencyJobState jobState = AgencyJobState.Scheduled | AgencyJobState.Running)
        {
            return this.dataAccessor.GetJobs(jobState);
        }

        /// <summary>
        /// Gets the agents.
        /// </summary>
        /// <param name="agentState">State of the agent.</param>
        /// <returns>Agents matching the criteria</returns>
        public IEnumerable<AgencyClientInfo> GetAgents(AgencyClientState agentState = AgencyClientState.Idle | AgencyClientState.RunningJob)
        {
            return this.dataAccessor.GetClients(agentState);
        }
    }
}
