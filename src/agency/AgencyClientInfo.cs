// <copyright file="AgencyClientInfo.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    public class AgencyClientInfo
    {
        public AgencyClientInfo(string clientId, AgencyClientState clientState, string activeJobId, DateTime lastActive)
        {
            this.ClientId = clientId;
            this.ClientState = clientState;
            this.ActiveJobId = activeJobId;
            this.LastActive = lastActive;
        }

        public string ClientId { get; private set; }

        public AgencyClientState ClientState { get; private set; }

        public string ActiveJobId { get; private set; }

        public DateTime LastActive { get; private set; }
    }
}
