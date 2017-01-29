// <copyright file="AgencyJobInfo.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    /// <summary>
    /// Agency job info
    /// </summary>
    public class AgencyJobInfo
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AgencyJobInfo" /> class.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="configuration">The configuration.</param>
        /// <param name="jobState">State of the job.</param>
        /// <param name="activeClientId">The active client identifier.</param>
        /// <param name="lastUpdated">The last updated.</param>
        /// <param name="percentComplete">The percent complete.</param>
        /// <param name="timeRemaining">The time remaining.</param>
        public AgencyJobInfo(
            string jobId, 
            string configuration, 
            AgencyJobState jobState, 
            string activeClientId,
            DateTime lastUpdated,
            int percentComplete,
            TimeSpan timeRemaining)
        {
            this.JobId = jobId;
            this.Configuration = configuration;
            this.JobState = jobState;
            this.ActiveClientId = activeClientId;
            this.LastUpdated = lastUpdated;
            this.PercentComplete = percentComplete;
            this.TimeRemaining = timeRemaining;
        }

        /// <summary>
        /// Gets the job identifier.
        /// </summary>
        /// <value>
        /// The job identifier.
        /// </value>
        public string JobId { get; private set; }

        /// <summary>
        /// Gets or sets the configuration.
        /// </summary>
        /// <value>
        /// The configuration.
        /// </value>
        public string Configuration { get; set; }

        /// <summary>
        /// Gets the state of the job.
        /// </summary>
        /// <value>
        /// The state of the job.
        /// </value>
        public AgencyJobState JobState { get; private set; }

        /// <summary>
        /// Gets the active client identifier.
        /// </summary>
        /// <value>
        /// The active client identifier.
        /// </value>
        public string ActiveClientId { get; private set; }

        /// <summary>
        /// Gets the last updated.
        /// </summary>
        /// <value>
        /// The last updated.
        /// </value>
        public DateTime LastUpdated { get; private set; }

        /// <summary>
        /// Gets the percent complete.
        /// </summary>
        /// <value>
        /// The percent complete.
        /// </value>
        public int PercentComplete { get; private set; }

        /// <summary>
        /// Gets the time remaining.
        /// </summary>
        /// <value>
        /// The time remaining.
        /// </value>
        public TimeSpan TimeRemaining { get; private set; }
    }
}
