// <copyright file="WorkCompletionTracker.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;

    /// <summary>
    /// Tracks and report work completed with a long-running process
    /// </summary>
    public class WorkCompletionTracker
    {
        /// <summary>
        /// The total units
        /// </summary>
        private int totalUnits = 0;

        /// <summary>
        /// The start time
        /// </summary>
        private DateTime startTime = DateTime.MinValue;

        /// <summary>
        /// The last report time
        /// </summary>
        private DateTime lastReportTime = DateTime.MinValue;

        /// <summary>
        /// The minimum time delta report interval
        /// </summary>
        private TimeSpan minTimeDeltaReportInterval;

        /// <summary>
        /// Function to call to update progress
        /// </summary>
        private Action<int, TimeSpan> onCompleteUpdate;

        /// <summary>
        /// Initializes a new instance of the <see cref="WorkCompletionTracker"/> class.
        /// </summary>
        /// <param name="onCompleteUpdate">The on complete update.</param>
        /// <param name="minTimeDeltaReportInterval">The minimum time delta report interval.</param>
        public WorkCompletionTracker(
            Action<int, TimeSpan> onCompleteUpdate,
            TimeSpan minTimeDeltaReportInterval)
        {
            this.onCompleteUpdate = onCompleteUpdate;
            this.minTimeDeltaReportInterval = minTimeDeltaReportInterval;
        }

        /// <summary>
        /// Starts the work.
        /// </summary>
        /// <param name="totalUnits">The total units.</param>
        public void StartWork(int totalUnits)
        {
            this.totalUnits = totalUnits;
            this.startTime = this.lastReportTime = DateTime.UtcNow;
        }

        /// <summary>
        /// Updates the Work progress.
        /// </summary>
        /// <param name="unitsRemaining">The units remaining.</param>
        public void UpdateWorkProgress(int unitsRemaining)
        {
            if (DateTime.UtcNow - this.lastReportTime > this.minTimeDeltaReportInterval)
            {
                int percentComplete = (int)Math.Ceiling(((double)this.totalUnits - (double)unitsRemaining) / (double)this.totalUnits * 100.00);
                int completedUnits = this.totalUnits - unitsRemaining;

                TimeSpan timeRemaining = TimeSpan.MaxValue;

                if (completedUnits > 0)
                {
                    long ticksPerUnit = (DateTime.UtcNow - this.startTime).Ticks / completedUnits;
                    timeRemaining = TimeSpan.FromTicks(unitsRemaining * ticksPerUnit);
                }

                this.onCompleteUpdate(percentComplete, timeRemaining);
                this.lastReportTime = DateTime.UtcNow;
            }
        }
    }
}
