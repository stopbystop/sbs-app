// <copyright file="AgencyJobRunInfo.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    public class AgencyJobRunInfo
    {
        public AgencyJobRunInfo(string jobId, string configuration)
        {
            this.JobId = jobId;
            this.Configuration = configuration;
        }

        public string JobId { get; private set; }
        public string Configuration { get; private set; }
    }
}
