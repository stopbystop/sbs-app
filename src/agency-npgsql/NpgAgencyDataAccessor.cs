// <copyright file="NpgAgencyDataAccessor.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.WebJobAgency
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using StopByStop.Utils;

    /// <summary>
    /// NPGSQL data accessor
    /// </summary>
    /// <seealso cref="Yojowa.WebJobAgency.IAgencyDataAccessor" />
    public class NpgAgencyDataAccessor : IAgencyDataAccessor
    {
        /// <summary>
        /// The client state to string mapping
        /// </summary>
        private static readonly IReadOnlyDictionary<AgencyClientState, string> ClientStateToStringMapping = new Dictionary<AgencyClientState, string>()
        {
            { AgencyClientState.RunningJob, "runningJob" },
            { AgencyClientState.Idle, "idle" },
            { AgencyClientState.Dead, "dead" }
        };

        /// <summary>
        /// The string to client state mapping
        /// </summary>
        private static readonly IReadOnlyDictionary<string, AgencyClientState> StringToClientStateMapping = new Dictionary<string, AgencyClientState>()
        {
            { "runningJob", AgencyClientState.RunningJob },
            { "idle", AgencyClientState.Idle },
            { "dead", AgencyClientState.Dead }
        };

        /// <summary>
        /// The job state to string mapping
        /// </summary>
        private static readonly IReadOnlyDictionary<AgencyJobState, string> JobStateToStringMapping = new Dictionary<AgencyJobState, string>()
        {
            { AgencyJobState.Scheduled, "scheduled" },
            { AgencyJobState.Running, "running" },
            { AgencyJobState.Completed, "completed" }
        };

        /// <summary>
        /// The string to job state mapping
        /// </summary>
        private static readonly IReadOnlyDictionary<string, AgencyJobState> StringToJobStateMapping = new Dictionary<string, AgencyJobState>()
        {
            { "scheduled", AgencyJobState.Scheduled },
            { "running", AgencyJobState.Running },
            { "completed", AgencyJobState.Completed }
        };

        /// <summary>
        /// The connection string
        /// </summary>
        private string connectionString;

        /// <summary>
        /// Initializes a new instance of the <see cref="NpgAgencyDataAccessor"/> class.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        public NpgAgencyDataAccessor(string connectionString)
        {
            this.connectionString = connectionString;
        }

        /// <summary>
        /// Creates the tables.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        public static void CreateTables(string connectionString)
        {
            string createDbQuery =
               "DROP TABLE IF EXISTS clients;" +
               "CREATE TABLE agents(" +
               "id varchar(64) NOT NULL PRIMARY KEY," +
               "state varchar(64) NOT NULL," +
               "job_key varchar(64) NULL," +
               "updated_date timestamp without time zone default (now() at time zone 'utc')" +
               ")WITH (OIDS = FALSE);" +
               "DROP table IF EXISTS jobs;" +
               "CREATE TABLE jobs(" +
               "id serial NOT NULL PRIMARY KEY," +
               "job_key varchar(64) NOT NULL," +
               "configuration varchar(1024) NOT NULL," +
               "state varchar(64) NOT NULL," +
               "client_id varchar(64) NULL," +
               "percent_complete int NOT NULL," +
               "created_date timestamp without time zone default (now() at time zone 'utc')," +
               "updated_date timestamp without time zone default (now() at time zone 'utc')" +
               ")WITH (OIDS = FALSE);";

            PGSQLRunner.ExecutePGSQLStatement<object>(
                connectionString,
                createDbQuery,
                (cmd, c) => cmd.ExecuteNonQuery());
        }

        /// <summary>
        /// Gets the clients.
        /// </summary>
        /// <param name="clientState">State of the client.</param>
        /// <returns>
        /// Clients matching specified state
        /// </returns>
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

                        clauseBuilder.AppendFormat("state = '{0}'", ClientStateToStringMapping[clientState]);
                        firstCondition = false;
                    }
                }

                clauseBuilder.Append(")");
            }

            string query = string.Format("SELECT FROM clients {0}", clauseBuilder.ToString());
            var results = PGSQLRunner.ExecutePGSQLStatement<IEnumerable<AgencyClientInfo>>(
                this.connectionString,
                query,
                (cmd, c) =>
                {
                    var reader = cmd.ExecuteReader();
                    List<AgencyClientInfo> clients = new List<AgencyClientInfo>();
                    while (reader.Read())
                    {
                        clients.Add(new AgencyClientInfo(
                            (string)reader["id"],
                            StringToClientStateMapping[(string)reader["state"]],
                            (string)reader["job_key"],
                            (DateTime)reader["updated_date"]));
                    }

                    return clients;
                });

            return results;
        }

        /// <summary>
        /// Gets the jobs.
        /// </summary>
        /// <param name="jobState">State of the job.</param>
        /// <returns>
        /// Jobs corresponding to the specified state
        /// </returns>
        /// <exception cref="System.NotImplementedException">Method is not implemented</exception>
        public IEnumerable<AgencyJobInfo> GetJobs(AgencyJobState jobState = AgencyJobState.Scheduled | AgencyJobState.Running)
        {
            StringBuilder clauseBuilder = new StringBuilder();
            if (jobState > 0)
            {
                clauseBuilder.Append("WHERE (");
                var enumValues = (AgencyJobState[])Enum.GetValues(typeof(AgencyJobState));
                bool firstCondition = true;
                for (int i = 0; i < enumValues.Length; i++)
                {
                    var enumVal = enumValues[i];
                    if ((jobState & enumVal) != 0)
                    {
                        if (!firstCondition)
                        {
                            clauseBuilder.Append(" OR ");
                        }

                        clauseBuilder.AppendFormat("state = '{0}'", JobStateToStringMapping[jobState]);
                        firstCondition = false;
                    }
                }

                clauseBuilder.Append(")");
            }

            string query = string.Format("SELECT FROM clients {0}", clauseBuilder.ToString());
            var results = PGSQLRunner.ExecutePGSQLStatement<IEnumerable<AgencyJobInfo>>(
                this.connectionString,
                query,
                (cmd, c) =>
                {
                    var reader = cmd.ExecuteReader();
                    List<AgencyJobInfo> jobs = new List<AgencyJobInfo>();
                    while (reader.Read())
                    {
                        jobs.Add(new AgencyJobInfo(
                            (string)reader["job_key"],
                            (string)reader["configuration"],
                            StringToJobStateMapping[(string)reader["state"]],
                            (string)reader["client_id"],
                            (DateTime)reader["updated_date"],
                            (int)reader["percent_complete"]));
                    }

                    return jobs;
                });

            return results;
        }

        /// <summary>
        /// Removes the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        public void RemoveJob(string jobId)
        {
        }

        /// <summary>
        /// Schedules the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="configuration">The configuration.</param>
        public void ScheduleJob(string jobId, string configuration)
        {
        }

        /// <summary>
        /// Updates the state of the client job.
        /// </summary>
        /// <param name="clientId">The client identifier.</param>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="clientState">State of the client.</param>
        /// <param name="jobState">State of the job.</param>
        /// <param name="percentComplete">The percent complete.</param>
        public void UpdateClientJobState(string clientId, string jobId, AgencyClientState clientState, AgencyJobState jobState, int? percentComplete = default(int?))
        {
        }
    }
}
