// <copyright file="IAgencyDataAccessor.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System.Collections.Generic;

    /// <summary>
    /// Agency data accessor interface
    /// </summary>
    public interface IAgencyDataAccessor
    {
        /// <summary>
        /// Gets the jobs.
        /// </summary>
        /// <param name="jobState">State of the job.</param>
        /// <returns>Jobs corresponding to the specified state</returns>
        IEnumerable<AgencyJobInfo> GetJobs(AgencyJobState jobState = AgencyJobState.Scheduled | AgencyJobState.Running);

        /// <summary>
        /// Gets the clients.
        /// </summary>
        /// <param name="clientState">State of the client.</param>
        /// <returns>Clients matching specified state</returns>
        IEnumerable<AgencyClientInfo> GetClients(AgencyClientState clientState = AgencyClientState.Idle | AgencyClientState.RunningJob);

        /// <summary>
        /// Schedules the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="configuration">The configuration.</param>
        void ScheduleJob(string jobId, string configuration);

        /// <summary>
        /// Removes the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        void RemoveJob(string jobId);

        /// <summary>
        /// Updates the state of the client job.
        /// </summary>
        /// <param name="clientId">The client identifier.</param>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="clientState">State of the client.</param>
        /// <param name="jobState">State of the job.</param>
        /// <param name="percentComplete">The percent complete.</param>
        void UpdateClientJobState(
            string clientId,
            string jobId,
            AgencyClientState clientState,
            AgencyJobState jobState,
            int? percentComplete = null);
    }
}
