// <copyright file="CompletionState.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/18/2017</date>

namespace Yojowa.WebJobAgency
{
    /// <summary>
    /// Job completion state
    /// </summary>
    public enum CompletionState
    {
        /// <summary>
        /// The success
        /// </summary>
        Success = 0,

        /// <summary>
        /// The partial success
        /// </summary>
        PartialSuccess = 1,

        /// <summary>
        /// The failure
        /// </summary>
        Failure = 2
    }
}
