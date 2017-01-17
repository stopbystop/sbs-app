// <copyright file="AgencyClientState.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    [Flags]
    public enum AgencyClientState
    {
        Idle = 1,
        RunningJob = 2,
        Dead = 4
    }
}
