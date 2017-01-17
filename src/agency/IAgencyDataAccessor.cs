// <copyright file="IAgencyDataAccessor.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System.Collections.Generic;

    public interface IAgencyDataAccessor
    {
        IEnumerable<AgencyJobInfo> GetJobs(AgencyJobState jobState = AgencyJobState.Scheduled | AgencyJobState.Running);

        IEnumerable<AgencyClientInfo> GetClients(AgencyClientState clientState = AgencyClientState.Idle | AgencyClientState.RunningJob);

        void ScheduleJob(string jobId, string configuration);

        void RemoveJob(string jobId);

        void UpdateClientJobState(
            string clientId,
            string jobId,
            AgencyClientState clientState,
            AgencyJobState jobState,
            int? percentComplete = null);
    }
}
