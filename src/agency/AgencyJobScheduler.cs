﻿// <copyright file="AgencyJobScheduler.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/19/2017</date>

namespace Yojowa.WebJobAgency
{
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
        public void CancelJob(string jobId)
        {
            this.dataAccessor.CancelJob(jobId);
        }
    }
}