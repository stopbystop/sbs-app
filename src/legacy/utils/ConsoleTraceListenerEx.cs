// <copyright file="ConsoleTraceListenerEx.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;

    /// <summary>
    /// Extended console trace listener
    /// </summary>
    public class ConsoleTraceListenerEx : ConsoleTraceListener
    {
        /// <summary>
        /// Mapping of event types to console colors
        /// </summary>
        private Dictionary<TraceEventType, ConsoleColor> eventColors = new Dictionary<TraceEventType, ConsoleColor>();

        /// <summary>
        /// Initializes a new instance of the <see cref="ConsoleTraceListenerEx"/> class.
        /// </summary>
        public ConsoleTraceListenerEx()
        {
            this.eventColors.Add(TraceEventType.Verbose, ConsoleColor.DarkGray);
            this.eventColors.Add(TraceEventType.Information, ConsoleColor.Gray);
            this.eventColors.Add(TraceEventType.Warning, ConsoleColor.Yellow);
            this.eventColors.Add(TraceEventType.Error, ConsoleColor.DarkRed);
            this.eventColors.Add(TraceEventType.Critical, ConsoleColor.Red);
            this.eventColors.Add(TraceEventType.Start, ConsoleColor.DarkCyan);
            this.eventColors.Add(TraceEventType.Stop, ConsoleColor.DarkCyan);
        }

        /// <summary>
        /// Overrides default formatting of trace event
        /// </summary>
        /// <param name="eventCache">Event cache</param>
        /// <param name="source">Event source</param>
        /// <param name="eventType">Event type</param>
        /// <param name="id">Event id</param>
        /// <param name="format">Event format</param>
        /// <param name="args">Event arguments</param>
        public override void TraceEvent(TraceEventCache eventCache, string source, TraceEventType eventType, int id, string format, params object[] args)
        {
            format = string.Format("[{0}] {1}", DateTime.UtcNow.ToString("yyyyMMdd-HH:mm:ss.fff"), format);
            ConsoleColor originalColor = Console.ForegroundColor;
            Console.ForegroundColor = this.GetEventColor(eventType, originalColor);
            base.TraceEvent(eventCache, source, eventType, id, format, args);
            Console.ForegroundColor = originalColor;
        }

        /// <summary>
        /// Traces event
        /// </summary>
        /// <param name="eventCache">Event cache</param>
        /// <param name="source">Event source</param>
        /// <param name="eventType">Event type</param>
        /// <param name="id">Event id</param>
        public override void TraceEvent(TraceEventCache eventCache, string source, TraceEventType eventType, int id)
        {
            this.TraceEvent(eventCache, source, eventType, id, string.Empty, id);
        }

        /// <summary>
        /// Traces event
        /// </summary>
        /// <param name="eventCache">Event cache</param>
        /// <param name="source">Event source</param>
        /// <param name="eventType">Event type</param>
        /// <param name="id">Event id</param>
        /// <param name="message">Event message</param>
        public override void TraceEvent(TraceEventCache eventCache, string source, TraceEventType eventType, int id, string message)
        {
            this.TraceEvent(eventCache, source, eventType, id, "{0}", message);
        }

        /// <summary>
        /// Gets console color corresponding to event type
        /// </summary>
        /// <param name="eventType">Trace event type</param>
        /// <param name="defaultColor">Default console color to use</param>
        /// <returns>Console color to use</returns>
        private ConsoleColor GetEventColor(TraceEventType eventType, ConsoleColor defaultColor)
        {
            if (!this.eventColors.ContainsKey(eventType))
            {
                return defaultColor;
            }

            return this.eventColors[eventType];
        }
    }
}
