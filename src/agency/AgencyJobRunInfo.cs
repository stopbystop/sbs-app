// <copyright file="AgencyJobRunInfo.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    /// <summary>
    /// Agency job run info
    /// </summary>
    public class AgencyJobRunInfo
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AgencyJobRunInfo"/> class.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="configuration">The configuration.</param>
        public AgencyJobRunInfo(string jobId, string configuration)
        {
            this.JobId = jobId;
            this.Configuration = configuration;
        }

        /// <summary>
        /// Gets the job identifier.
        /// </summary>
        /// <value>
        /// The job identifier.
        /// </value>
        public string JobId { get; private set; }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>
        /// The configuration.
        /// </value>
        public string Configuration { get; private set; }
    }
}
