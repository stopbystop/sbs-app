// <copyright file="AgencyJobInfo.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    public class AgencyJobInfo
    {
        public string JobId { get; private set; }

        public string Configuration { get; set; }

        public AgencyJobState JobState { get; private set; }

        public string ActiveClientId { get; private set; }

        public DateTime LastUpdated { get; private set; }
    }
}
