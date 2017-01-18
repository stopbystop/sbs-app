// <copyright file="IAgencyJobDefinition.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    /// <summary>
    /// Agency job definition
    /// </summary>
    public interface IAgencyJobDefinition
    {
        /// <summary>
        /// Gets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        string ID { get; }

        /// <summary>
        /// Runs the specified configuration.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        /// <param name="onPercentCompleteUpdate">The on percent complete update.</param>
        void Run(string configuration, Action<int> onPercentCompleteUpdate);
    }
}
