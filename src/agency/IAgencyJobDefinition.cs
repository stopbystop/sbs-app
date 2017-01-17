// <copyright file="IAgencyJobDefinition.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;

    public interface IAgencyJobDefinition
    {
        string ID { get; }

        void Run(string configuration, Action<int> onPercentCompleteUpdate);
    }
}
