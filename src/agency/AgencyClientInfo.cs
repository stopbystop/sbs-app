// <copyright file="AgencyClientInfo.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    /// <summary>
    /// Agency client info
    /// </summary>
    public class AgencyClientInfo
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AgencyClientInfo"/> class.
        /// </summary>
        /// <param name="clientId">The client identifier.</param>
        /// <param name="clientState">State of the client.</param>
        /// <param name="activeJobId">The active job identifier.</param>
        /// <param name="lastActive">The last active.</param>
        public AgencyClientInfo(string clientId, AgencyClientState clientState, string activeJobId, DateTime lastActive)
        {
            this.ClientId = clientId;
            this.ClientState = clientState;
            this.ActiveJobId = activeJobId;
            this.LastActive = lastActive;
        }

        /// <summary>
        /// Gets the client identifier.
        /// </summary>
        /// <value>
        /// The client identifier.
        /// </value>
        public string ClientId { get; private set; }

        /// <summary>
        /// Gets the state of the client.
        /// </summary>
        /// <value>
        /// The state of the client.
        /// </value>
        public AgencyClientState ClientState { get; private set; }

        /// <summary>
        /// Gets the active job identifier.
        /// </summary>
        /// <value>
        /// The active job identifier.
        /// </value>
        public string ActiveJobId { get; private set; }

        /// <summary>
        /// Gets the last active.
        /// </summary>
        /// <value>
        /// The last active.
        /// </value>
        public DateTime LastActive { get; private set; }
    }
}
