// <copyright file="AgencyClientConfiguration.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System.Collections.Generic;

    /// <summary>
    /// Agency client configuration
    /// </summary>
    public class AgencyClientConfiguration
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AgencyClientConfiguration"/> class.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="dataAccessor">The data accessor.</param>
        /// <param name="jobDefinitions">The job definitions.</param>
        public AgencyClientConfiguration(
            string id,
            IAgencyDataAccessor dataAccessor,
            IAgencyJobDefinition[] jobDefinitions)
        {
            this.ID = id;
            this.DataAccessor = dataAccessor;
            this.JobDefinitions = jobDefinitions;
            this.PulseIntervalMilliseconds = 3000;
        }

        /// <summary>
        /// Gets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public string ID { get; private set; }

        /// <summary>
        /// Gets the data accessor.
        /// </summary>
        /// <value>
        /// The data accessor.
        /// </value>
        public IAgencyDataAccessor DataAccessor { get; private set; }

        /// <summary>
        /// Gets the job definitions.
        /// </summary>
        /// <value>
        /// The job definitions.
        /// </value>
        public IEnumerable<IAgencyJobDefinition> JobDefinitions { get; private set; }

        /// <summary>
        /// Gets or sets the pulse interval in milliseconds.
        /// </summary>
        /// <value>
        /// The pulse interval in milliseconds.
        /// </value>
        public int PulseIntervalMilliseconds { get; set; }
    }
}
