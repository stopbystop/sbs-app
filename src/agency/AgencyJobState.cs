// <copyright file="AgencyJobState.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    /// <summary>
    /// Agency job state
    /// </summary>
    [Flags]
    public enum AgencyJobState
    {
        /// <summary>
        /// Job scheduled, but not run
        /// </summary>
        Scheduled = 1,

        /// <summary>
        /// Job running
        /// </summary>
        Running = 2,

        /// <summary>
        /// Job completed with failed
        /// </summary>
        CompletedFailed = 4,

        /// <summary>
        /// Job completed with partial success
        /// </summary>
        CompletedPartialSuccess = 8,

        /// <summary>
        /// Job completed successfully
        /// </summary>
        CompletedSuccess = 16,

        /// <summary>
        /// Job canceled
        /// </summary>
        Canceled = 32
    }
}
