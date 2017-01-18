// <copyright file="AgencyClientState.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    /// <summary>
    /// Agency client state
    /// </summary>
    [Flags]
    public enum AgencyClientState
    {
        /// <summary>
        /// Idle client state
        /// </summary>
        Idle = 1,

        /// <summary>
        /// Running job client state
        /// </summary>
        RunningJob = 2,

        /// <summary>
        /// Dead client state
        /// </summary>
        Dead = 4
    }
}
