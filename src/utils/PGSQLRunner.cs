// <copyright file="PGSQLRunner.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Data.Common;
    using System.Diagnostics;
    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.ApplicationInsights.Extensibility;
    using Npgsql;

    /// <summary>
    /// Helper methods to run NPGSQL commands and log telemetry to Application Insights
    /// </summary>
    public static class PGSQLRunner
    {
        /// <summary>
        /// The attempts count metric
        /// </summary>
        private static readonly Metric AttemptsCountMetric = new MetricManager().CreateMetric(TelemetryConstants.PGSQLRetryAttempts);

        /// <summary>
        /// Runs PGSQL command
        /// </summary>
        /// <typeparam name="T">Result type to return</typeparam>
        /// <param name="connection">PGSQL connection</param>
        /// <param name="commandText">PGSQL command</param>
        /// <param name="statement">PGSQL statement to run</param>
        /// <param name="flushTelemetryWhenComplete">Whether to flush Application Insights telemetry when statement has completed</param>
        /// <returns>Result of specified type</returns>
        public static T ExecutePGSQLStatement<T>(
            string connection,
            string commandText,
            Func<NpgsqlCommand, NpgsqlConnection, T> statement = null,
            bool flushTelemetryWhenComplete = false)
        {
            using (TelemetryTracker tracker = new TelemetryTracker(flushTelemetryWhenComplete))
            {
                return ExecutePGSQLStatement(connection, commandText, statement, tracker);
            }
        }

        /// <summary>
        /// Runs PGSQL command
        /// </summary>
        /// <param name="connection">PGSQL connection</param>
        /// <param name="commandText">PGSQL command</param>
        /// <param name="statement">PGSQL statement to run</param>
        /// <param name="flushTelemetryWhenComplete">Whether to flush Application Insights telemetry when statement has completed</param>
        public static void ExecutePGSQLStatement(
            string connection,
            string commandText,
            Func<NpgsqlCommand, NpgsqlConnection, object> statement = null,
            bool flushTelemetryWhenComplete = false)
        {
            using (TelemetryTracker tracker = new TelemetryTracker(flushTelemetryWhenComplete))
            {
                ExecutePGSQLStatement<object>(connection, commandText, statement, tracker);
            }
        }

        /// <summary>
        /// Runs PGSQL command
        /// </summary>
        /// <typeparam name="T">Result type to return</typeparam>
        /// <param name="connection">PGSQL connection</param>
        /// <param name="commandText">PGSQL command</param>
        /// <param name="statement">SQL statement to run</param>
        /// <param name="tracker"><see cref="TelemetryTracker"/> instance</param>
        /// <param name="keepConnection">Whether to keep connection alive. This requires the caller to close and dispose of it</param>
        /// <returns>Result of specified type</returns>
        public static T ExecutePGSQLStatement<T>(
            string connection,
            string commandText,
            Func<NpgsqlCommand, NpgsqlConnection, T> statement,
            TelemetryTracker tracker,
            bool keepConnection = false)
        {
            int attemptsMade = 0;
            T runResult = FunctionRunningUtils.RunWithRetries(
                5,
                (int attemptIndex) =>
           {
               var conn = new NpgsqlConnection(connection);
               var command = new NpgsqlCommand(commandText, conn);
               DependencyTelemetry dependencyTelemetry = new DependencyTelemetry();
               try
               {
                   if (attemptIndex > 0)
                   {
                       string traceMessage = string.Format("Retrying SQL statement. Retry #{0}. ", attemptIndex);

                       Trace.TraceInformation(traceMessage);
                       tracker.Track(new TraceTelemetry(traceMessage));
                       dependencyTelemetry.Data = commandText;
                   }
                   else
                   {
                       dependencyTelemetry.Data = "SQL text";
                   }

                   conn.Open();
                   command.CommandTimeout = 5 * 60;
                   dependencyTelemetry.Type = "NPGSQL";
                   dependencyTelemetry.Name = "NPGSQL";
                   dependencyTelemetry.Success = false;
                   dependencyTelemetry.ResultCode = "0";

                   dependencyTelemetry.Target = command.Connection.DataSource;

                   dependencyTelemetry.Start();
                   T result = default(T);
                   if (statement != null)
                   {
                       result = statement(command, conn);
                   }
                   else
                   {
                       command.ExecuteNonQuery();
                   }

                   dependencyTelemetry.Success = true;
                   return result;
               }
               catch (Exception ex)
               {
                   Trace.TraceWarning("Query failed: {0} with {1}", commandText, ex.ToString());
                   dependencyTelemetry.Data = commandText;
                   var dbException = ex as DbException;
                   if (dbException != null)
                   {
                       dependencyTelemetry.ResultCode = dbException.ErrorCode.ToString();
                   }

                   DisposeOfCommandAndConnection(ref command, ref conn);
                   throw;
               }
               finally
               {
                   dependencyTelemetry.Stop();
                   tracker.Track(dependencyTelemetry);
                   if (!keepConnection)
                   {
                       DisposeOfCommandAndConnection(ref command, ref conn);
                   }

                   AttemptsCountMetric.Track(attemptsMade);
               }
           },
            (ex) => tracker.Track(new ExceptionTelemetry(ex)),
            ref attemptsMade);

            return runResult;
        }

        /// <summary>
        /// Disposes of command and connection
        /// </summary>
        /// <param name="command">Command object</param>
        /// <param name="connection">Connection object</param>
        private static void DisposeOfCommandAndConnection(ref NpgsqlCommand command, ref NpgsqlConnection connection)
        {
            try
            {
                if (command != null)
                {
                    command.Dispose();
                    command = null;
                }

                if (connection != null)
                {
                    connection.Close();
                    connection.Dispose();
                    connection = null;
                }
            }
            catch
            {
            }
        }
    }
}
