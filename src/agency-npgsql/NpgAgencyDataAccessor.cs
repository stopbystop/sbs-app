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
            { AgencyJobState.Completed, "completed" },
            { AgencyJobState.Canceled, "canceled" }
        };

        /// <summary>
        /// The string to job state mapping
        /// </summary>
        private static readonly IReadOnlyDictionary<string, AgencyJobState> StringToJobStateMapping = new Dictionary<string, AgencyJobState>()
        {
            { "scheduled", AgencyJobState.Scheduled },
            { "running", AgencyJobState.Running },
            { "completed", AgencyJobState.Completed },
            { "canceled", AgencyJobState.Canceled }
        };

        /// <summary>
        /// The connection string
        /// </summary>
        private string connectionString;

        /// <summary>
        /// The agents table name
        /// </summary>
        private string agentsTableName;

        /// <summary>
        /// The jobs table name
        /// </summary>
        private string jobsTableName;

        /// <summary>
        /// Initializes a new instance of the <see cref="NpgAgencyDataAccessor" /> class.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="agentsTableName">Name of the agents table.</param>
        /// <param name="jobsTableName">Name of the jobs table.</param>
        public NpgAgencyDataAccessor(string connectionString, string agentsTableName, string jobsTableName)
        {
            this.connectionString = connectionString;
            this.agentsTableName = agentsTableName;
            this.jobsTableName = jobsTableName;
        }

        /// <summary>
        /// Creates the tables.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="agentsTableName">Name of the agents table.</param>
        /// <param name="jobsTableName">Name of the jobs table.</param>
        public static void CreateTables(string connectionString, string agentsTableName, string jobsTableName)
        {
            string createDbQuery = string.Format(
               "DROP table IF EXISTS {0};" +
               "CREATE TABLE {0}(" +
               "id serial NOT NULL PRIMARY KEY," +
               "job_key varchar(64) NOT NULL," +
               "configuration varchar(1024) NOT NULL," +
               "state varchar(64) NOT NULL," +
               "agent_id varchar(64) NULL," +
               "percent_complete int NOT NULL," +
               "created_date timestamp without time zone default (now() at time zone 'utc')," +
               "updated_date timestamp without time zone default (now() at time zone 'utc')," +
               "UNIQUE(job_key,state)" +
               ")WITH (OIDS = FALSE);" +
               "DROP TABLE IF EXISTS {1};" +
               "CREATE TABLE {1}(" +
               "id varchar(64) NOT NULL PRIMARY KEY," +
               "state varchar(64) NOT NULL," +
               "job_id int NULL REFERENCES jobs(id)," +
               "updated_date timestamp without time zone default (now() at time zone 'utc')" +
               ")WITH (OIDS = FALSE);",
               jobsTableName,
               agentsTableName);

            PGSQLRunner.ExecutePGSQLStatement<object>(
                connectionString,
                createDbQuery,
                (cmd, c) => cmd.ExecuteNonQuery());
        }

        /// <summary>
        /// Deletes the tables.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="agentsTableName">Name of the agents table.</param>
        /// <param name="jobsTableName">Name of the jobs table.</param>
        public static void DeleteTables(string connectionString, string agentsTableName, string jobsTableName)
        {
            string createDbQuery = string.Format(
               "DROP TABLE IF EXISTS {0};" +
               "DROP TABLE IF EXISTS {1};",
               jobsTableName,
               agentsTableName);

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

                        clauseBuilder.AppendFormat("state = '{0}'", ClientStateToStringMapping[enumVal]);
                        firstCondition = false;
                    }
                }

                clauseBuilder.Append(")");
            }

            string query = string.Format("SELECT * FROM {0} {1}", this.agentsTableName, clauseBuilder.ToString());
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
                            PGSQLRunner.ConvertFromDBVal<string>(reader["job_id"]),
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

                        clauseBuilder.AppendFormat("state = '{0}'", JobStateToStringMapping[enumVal]);
                        firstCondition = false;
                    }
                }

                clauseBuilder.Append(")");
            }

            string query = string.Format("SELECT * FROM {0} {1}", this.jobsTableName, clauseBuilder.ToString());
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
                            PGSQLRunner.ConvertFromDBVal<string>(reader["agent_id"]),
                            (DateTime)reader["updated_date"],
                            (int)reader["percent_complete"]));
                    }

                    return jobs;
                });

            return results;
        }

        /// <summary>
        /// Cancels the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        public void CancelJob(string jobId)
        {
            string query = string.Format(
                "UPDATE {3} SET state='{0}' WHERE state='{1}' AND job_key='{2}'",
                JobStateToStringMapping[AgencyJobState.Canceled],
                JobStateToStringMapping[AgencyJobState.Scheduled],
                jobId,
                this.jobsTableName);

            PGSQLRunner.ExecutePGSQLStatement<int>(
                this.connectionString,
                query,
                (cmd, c) =>
                {
                    return cmd.ExecuteNonQuery();
                });
        }

        /// <summary>
        /// Schedules the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="configuration">The configuration.</param>
        public void ScheduleJob(string jobId, string configuration)
        {
            string query = string.Format(
                "INSERT INTO {3} (job_key,configuration,state,percent_complete) VALUES('{0}','{1}','{2}',0)",
                jobId,
                configuration,
                JobStateToStringMapping[AgencyJobState.Scheduled],
                this.jobsTableName);

            PGSQLRunner.ExecutePGSQLStatement<int>(
                this.connectionString,
                query,
                (cmd, c) =>
                {
                    return cmd.ExecuteNonQuery();
                });
        }

        /// <summary>
        /// Adds the client.
        /// </summary>
        /// <param name="clientId">The client identifier.</param>
        public void AddClient(string clientId)
        {
            string query = string.Format(
                   "INSERT INTO {2} (id,state,updated_date) " +
                   "VALUES('{0}','{1}', timezone('utc'::text, now())) " +
                   "ON CONFLICT(id) DO NOTHING",
                   clientId,
                   ClientStateToStringMapping[AgencyClientState.Idle],
                   this.agentsTableName);

            PGSQLRunner.ExecutePGSQLStatement<int>(
               this.connectionString,
               query,
               (cmd, c) =>
               {
                   return cmd.ExecuteNonQuery();
               });
        }

        /// <summary>
        /// Removes the client.
        /// </summary>
        /// <param name="clientId">The client identifier.</param>
        public void RemoveClient(string clientId)
        {
            string query = string.Format(
                "DELETE FROM {1} WHERE id='{0}'",
                clientId,
                this.agentsTableName);

            PGSQLRunner.ExecutePGSQLStatement<int>(
               this.connectionString,
               query,
               (cmd, c) =>
               {
                   return cmd.ExecuteNonQuery();
               });
        }

        /// <summary>
        /// Starts the running job.
        /// </summary>
        /// <param name="clientId">The client identifier.</param>
        /// <param name="jobId">The job identifier.</param>
        public void StartRunningJob(
            string clientId,
            string jobId)
        {
            string query = string.Format(
                "DO $$ BEGIN IF EXISTS (SELECT id FROM {4} WHERE job_key='{0}' AND state='{1}') " +
                "THEN UPDATE {5} SET state='{2}', job_id=(SELECT id FROM {4} WHERE job_key='{0}' AND state='{1}') WHERE id='{2}';" +
                "UPDATE {4} SET state='{3}',agent_id='{2}',percent_complete=0 WHERE id=(SELECT id FROM {4} WHERE job_key='{0}' AND state='{1}');" +
                "END IF;END $$;",
                jobId,
                JobStateToStringMapping[AgencyJobState.Scheduled],
                ClientStateToStringMapping[AgencyClientState.RunningJob],
                clientId,
                JobStateToStringMapping[AgencyJobState.Running],
                this.jobsTableName,
                this.agentsTableName);

            PGSQLRunner.ExecutePGSQLStatement<int>(
               this.connectionString,
               query,
               (cmd, c) =>
               {
                   return cmd.ExecuteNonQuery();
               });
        }

        /// <summary>
        /// Updates the job progress.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="percentComplete">The percent complete.</param>
        public void UpdateJobProgress(
            string jobId,
            int percentComplete)
        {
            string query = string.Format(
                "UPDATE {3} SET percent_complete={0} WHERE job_key='{1}' AND state='{2}'",
                percentComplete,
                jobId,
                JobStateToStringMapping[AgencyJobState.Running],
                this.jobsTableName);

            PGSQLRunner.ExecutePGSQLStatement<int>(
             this.connectionString,
             query,
             (cmd, c) =>
             {
                 return cmd.ExecuteNonQuery();
             });
        }

        /// <summary>
        /// Completes the job.
        /// </summary>
        /// <param name="jobId">The job identifier.</param>
        /// <param name="clientId">The client identifier.</param>
        public void CompleteJob(
            string jobId,
            string clientId)
        {
            string query = string.Format(
                "DO $$ BEGIN IF EXISTS (SELECT id FROM {4} WHERE job_key='{0}' AND state='{1}') " +
                "THEN UPDATE {5} SET state='{2}', job_id=NULL WHERE id='{2}';" +
                "UPDATE {4} SET state='{3}',agent_id=NULL,percent_complete=100 WHERE id=(SELECT id FROM {4} WHERE job_key='{0}' AND state='{1}');" +
                "END IF;END $$;",
                jobId,
                JobStateToStringMapping[AgencyJobState.Running],
                ClientStateToStringMapping[AgencyClientState.Idle],
                clientId,
                JobStateToStringMapping[AgencyJobState.Completed],
                this.jobsTableName,
                this.agentsTableName);
                
            PGSQLRunner.ExecutePGSQLStatement<int>(
               this.connectionString,
               query,
               (cmd, c) =>
               {
                   return cmd.ExecuteNonQuery();
               });
        }
    }
}
