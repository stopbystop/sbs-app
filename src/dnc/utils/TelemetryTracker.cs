// <copyright file="TelemetryTracker.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections.Concurrent;
    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.Channel;

    /// <summary>
    /// Telemetry tracker
    /// </summary>
    public class TelemetryTracker : IDisposable
    {
        /// <summary>
        /// Bag of telemetry items to track
        /// </summary>
        private ConcurrentBag<ITelemetry> telemetryItems;

        /// <summary>
        /// Flag indicating whether to flush telemetry when complete
        /// </summary>
        private bool flushTelemetryWhenComplete;

        /// <summary>
        /// Initializes a new instance of the <see cref="TelemetryTracker"/> class. 
        /// </summary>
        /// <param name="flushTelemetryWhenComplete">Flag indicating whether to flush telemetry when complete</param>
        public TelemetryTracker(bool flushTelemetryWhenComplete = false)
        {
            this.telemetryItems = new ConcurrentBag<ITelemetry>();
            this.flushTelemetryWhenComplete = flushTelemetryWhenComplete;
        }

        /// <summary>
        /// Tracks telemetry item
        /// </summary>
        /// <param name="telemetry">Telemetry item</param>
        public void Track(ITelemetry telemetry)
        {
            telemetry.Timestamp = DateTimeOffset.UtcNow;
            this.telemetryItems.Add(telemetry);
        }

        /// <summary>
        /// Flushes all telemetry items with telemetry client
        /// </summary>
        /// <param name="telemetryClient">Telemetry client instance</param>
        public void Flush(TelemetryClient telemetryClient = null)
        {
            if (telemetryClient == null)
            {
                telemetryClient = new TelemetryClient();
            }

            foreach (var t in this.telemetryItems)
            {
                telemetryClient.Track(t);
            }

            if (this.flushTelemetryWhenComplete)
            {
                telemetryClient.Flush();
            }
        }

        /// <summary>
        /// Disposes of telemetry tracker
        /// </summary>
        public void Dispose()
        {
            this.Flush();
        }
    }
}
