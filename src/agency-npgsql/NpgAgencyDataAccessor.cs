// <copyright file="AgencyClient.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    class NpgAgencyDataAccessor : IAgencyDataAccessor
    {
        private string connectionString;
        private static readonly IReadOnlyDictionary<AgencyClientState, string> clientStateToStringMapping = new Dictionary<AgencyClientState, string>()
        {
            {AgencyClientState.RunningJob, "runningJob" },
            {AgencyClientState.Idle, "idle" },
            {AgencyClientState.Dead, "dead" }
        };

        private static IReadOnlyDictionary<string, AgencyClientState> stringToClientStateMapping = new Dictionary<string, AgencyClientState>()
        {
            {"runningJob", AgencyClientState.RunningJob },
            { "idle", AgencyClientState.Idle },
            {"dead",AgencyClientState.Dead }
        };

        private static IReadOnlyDictionary<AgencyJobState, string> jobStateToStringMapping = new Dictionary<AgencyJobState, string>()
        {
            {AgencyJobState.Scheduled, "scheduled" },
            {AgencyJobState.Running, "running" },
            {AgencyJobState.Completed, "completed" }
        };

        private static IReadOnlyDictionary<string, AgencyJobState> stringToJobStateMapping = new Dictionary<string, AgencyJobState>()
        {
            {"scheduled", AgencyJobState.Scheduled },
            { "running", AgencyJobState.Running },
            {"completed",AgencyJobState.Completed }
        };

        public NpgAgencyDataAccessor(string connectionString)
        {
            this.connectionString = connectionString;
        }



        public IEnumerable<AgencyClientInfo> GetClients(AgencyClientState clientState = AgencyClientState.Idle | AgencyClientState.RunningJob)
        {
            StringBuilder clauseBuilder = new StringBuilder();
            if (clientState > 0)
            {
                clauseBuilder.Append("WHERE (");
                var enumValues = (AgencyClientState[])Enum.GetValues(typeof(AgencyClientState));
                bool firstCondition = true;
                for (int i = 0; i < enumValues.Length; i++)
                {
                    var enumVal = enumValues[i];
                    if ((clientState & enumVal) != 0)
                    {
                        if (!firstCondition)
                        {
                            clauseBuilder.Append(" OR ");
                        }

                        clauseBuilder.AppendFormat("state = '{0}'", clientStateToStringMapping[clientState]);
                        firstCondition = false;
                    }
                }

                clauseBuilder.Append(")");
            }

            /*
            string query = string.Format("SELECT FROM clients {0}", clauseBuilder.ToString());
            var results = PGSQLRunner.ExecutePGSQLStatement<IEnumerable<AgencyClientInfo>>(
                this.connectionString,
                query,
                (cmd,c)=>
                {
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        yield return new AgencyClientInfo()
                        {
                            
                        }
                    }
                }
                */
            return null;
        }

        public IEnumerable<AgencyJobInfo> GetJobs(AgencyJobState jobState = AgencyJobState.Scheduled | AgencyJobState.Running)
        {
            throw new NotImplementedException();
        }

        public void RemoveJob(string jobId)
        {
            throw new NotImplementedException();
        }

        public void ScheduleJob(string jobId, string configuration)
        {
            throw new NotImplementedException();
        }

        public void UpdateClientJobState(string clientId, string jobId, AgencyClientState clientState, AgencyJobState jobState, int? percentComplete = default(int?))
        {
            throw new NotImplementedException();
        }
    }
}
