// <copyright file="ApplicationInsightsTelemetryUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>02/05/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Diagnostics;
    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.Channel;
    using Microsoft.ApplicationInsights.DependencyCollector;
    using Microsoft.ApplicationInsights.Extensibility;

    /// <summary>
    /// Application Insights telemetry utils
    /// </summary>
    public static class ApplicationInsightsTelemetryUtils
    {
        /// <summary>
        /// Adds the telemetry filter.
        /// </summary>
        /// <param name="condition">The condition that returns true for allowed telemetry items</param>
        public static void AddTelemetryFilter(Func<ITelemetry, bool> condition)
        {
            var builder = TelemetryConfiguration.Active.TelemetryProcessorChainBuilder;
            builder.Use((next) => new TelemetryFilter(condition, next));
            builder.Build();
        }

        /// <summary>
        /// Starts the timer with "using" construct and logs elapsed milliseconds as metric
        /// </summary>
        /// <param name="metricName">Name of the metric.</param>
        /// <returns>
        /// Disposable instance that should be disposed to stop timer
        /// </returns>
        public static IDisposable TimeAndLog(string metricName)
        {
            return new TelemetryTimer(metricName);
        }

        /// <summary>
        /// Telemetry timer
        /// </summary>
        /// <seealso cref="System.IDisposable" />
        private class TelemetryTimer : IDisposable
        {
            /// <summary>
            /// The stopwatch
            /// </summary>
            private Stopwatch stopwatch;

            /// <summary>
            /// The metric name
            /// </summary>
            private string metricName;

            /*
            /// <summary>
            /// The metric
            /// </summary>
            private Metric metric;

            /// <summary>
            /// Initializes a new instance of the <see cref="TelemetryTimer" /> class.
            /// </summary>
            /// <param name="metric">The metric to track duration.</param>
            public TelemetryTimer(Metric metric)
            {
                this.metric = metric;
                this.stopwatch = new Stopwatch();
                this.stopwatch.Start();
            }
            */

            /// <summary>
            /// Initializes a new instance of the <see cref="TelemetryTimer"/> class.
            /// </summary>
            /// <param name="metricName">Name of the metric.</param>
            public TelemetryTimer(string metricName)
            {
                this.metricName = metricName;
                this.stopwatch = new Stopwatch();
                this.stopwatch.Start();
            }

            /// <summary>
            /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
            /// </summary>
            public void Dispose()
            {
                this.stopwatch.Stop();
                new TelemetryClient().TrackMetric(this.metricName, this.stopwatch.ElapsedMilliseconds);
            }
        }

        /// <summary>
        /// Telemetry filter
        /// </summary>
        /// <seealso cref="Microsoft.ApplicationInsights.Extensibility.ITelemetryProcessor" />
        private class TelemetryFilter : ITelemetryProcessor
        {
            /// <summary>
            /// The next telemetry processor in chain
            /// </summary>
            private ITelemetryProcessor next;

            /// <summary>
            /// Filter condition
            /// </summary>
            private Func<ITelemetry, bool> condition;

            /// <summary>
            /// Initializes a new instance of the <see cref="TelemetryFilter"/> class.
            /// </summary>
            /// <param name="condition">The condition that returns true for allowed telemetry items</param>
            /// <param name="next">The next telemetry processor in chain</param>
            public TelemetryFilter(Func<ITelemetry, bool> condition, ITelemetryProcessor next)
            {
                this.condition = condition;
                this.next = next;
            }

            /// <summary>
            /// Process a collected telemetry item.
            /// </summary>
            /// <param name="item">A collected Telemetry item.</param>
            public void Process(ITelemetry item)
            {
                if (!this.condition(item))
                {
                    return;
                }

                this.next.Process(item);
            }
        }
    }
}
