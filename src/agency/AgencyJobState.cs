// <copyright file="AgencyJobState.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    [Flags]
    public enum AgencyJobState
    {
        Scheduled = 1,
        Running = 2,
        Completed = 4
    }
}
