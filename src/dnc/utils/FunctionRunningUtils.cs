// <copyright file="FunctionRunningUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Threading.Tasks;

    /// <summary>
    /// Helper methods to run functions
    /// </summary>
    public static class FunctionRunningUtils
    {
        /// <summary>
        /// Starting interval for exponential back-off
        /// </summary>
        private const int ExponentialRetryBackoffStartMs = 200;

        /// <summary>
        /// Runs specified function with retries
        /// </summary>
        /// <typeparam name="T">Result type</typeparam>
        /// <param name="retryCount">Number of times to retry</param>
        /// <param name="function">Function to run</param>
        /// <param name="exceptionTracker">Exception handling hook</param>
        /// <param name="attemptsMade">Number of attempts made so far. Pass 0 into this parameter to start.</param>
        /// <param name="nextBackoffTime">Exponential back-off interval</param>
        /// <param name="retryOnNullReturn">Whether to retry if return from function is null</param>
        /// <returns>Result of specified type</returns>
        public static T RunWithRetries<T>(
        int retryCount,
        Func<int, T> function,
        Action<Exception> exceptionTracker,
        ref int attemptsMade,
        int nextBackoffTime = ExponentialRetryBackoffStartMs,
        bool retryOnNullReturn = false)
        {
            attemptsMade++;
            T result = default(T);
            bool success = true;
            Exception lastException = null;
            try
            {
                result = function(attemptsMade - 1);

                if (retryOnNullReturn && EqualityComparer<T>.Default.Equals(result, default(T)))
                {
                    success = false;
                }
            }
            catch (Exception ex)
            {
                exceptionTracker(ex);
                lastException = ex;
                success = false;
            }

            if (!success)
            {
                if (attemptsMade < retryCount)
                {
                    nextBackoffTime = nextBackoffTime * 2;
                    Trace.TraceWarning(
                        "RunWithRetries: Failed attempt {0} of {1}. Will retry after {2} ms",
                        attemptsMade,
                        retryCount, 
                        nextBackoffTime);

                    int attemptsSoFar = attemptsMade;
                    try
                    {
                        result = Task.Delay(nextBackoffTime)
                            .ContinueWith((t) => RunWithRetries(retryCount, function, exceptionTracker, ref attemptsSoFar, nextBackoffTime, retryOnNullReturn))
                            .Result;
                    }
                    finally
                    {
                        attemptsMade = attemptsSoFar;
                    }
                }
                else
                {
                    string message = string.Format("Operation failed after {0} attempts", attemptsMade);
                    Trace.TraceWarning(message);

                    if (lastException != null)
                    {
                        Exception exception = new InvalidOperationException(message, lastException);
                        exceptionTracker(exception);
                        throw exception;
                    }
                }
            }

            return result;
        }
    }
}
