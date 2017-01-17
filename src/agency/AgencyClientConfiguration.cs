// <copyright file="AgencyClientConfiguration.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System.Collections.Generic;

    public class AgencyClientConfiguration
    {
        public AgencyClientConfiguration(
            string id, 
            IAgencyDataAccessor dataAccessor, 
            IAgencyJobDefinition[] jobDefinitions)
        {
            this.ID = id;
            this.dataAccessor = dataAccessor;
            this.JobDefinitions = jobDefinitions;
        }

        public string ID { get; private set; }
        public IAgencyDataAccessor dataAccessor{ get; private set; }
        public IEnumerable<IAgencyJobDefinition> JobDefinitions { get; private set; }
    }
}
