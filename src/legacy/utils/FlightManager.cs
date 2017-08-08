// <copyright file="FlightManager.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>02/28/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;

    /// <summary>
    /// Provides flight manager functionality
    /// </summary>
    public static class FlightManager
    {
        /// <summary>
        /// The instance
        /// </summary>
        private static IFlightManager instance;

        /// <summary>
        /// Gets the instance.
        /// </summary>
        /// <value>
        /// The instance.
        /// </value>
        public static IFlightManager Instance
        {
            get
            {
                return instance;
            }
        }

        /// <summary>
        /// Initializes with the specified flight manager.
        /// </summary>
        /// <param name="flightManager">The flight manager.</param>
        public static void Initialize(IFlightManager flightManager = null)
        {
            if (flightManager == null)
            {
                flightManager = new DefaultFlightManager();
            }

            instance = flightManager;
        }

        /// <summary>
        /// Default flight manager
        /// </summary>
        /// <seealso cref="Yojowa.StopByStop.IFlightManager" />
        private class DefaultFlightManager : IFlightManager
        {
            /// <summary>
            /// Gets the flight value.
            /// </summary>
            /// <typeparam name="T">Type of flight setting</typeparam>
            /// <returns>
            /// Flight value
            /// </returns>
            /// <exception cref="System.NotSupportedException">Flight type is not supported</exception>
            public T GetFlightValue<T>() where T : struct
            {
                if (typeof(T) == typeof(POIFlight))
                {
                    return (T)(object)POIFlight.Modern;
                }

                throw new NotSupportedException(string.Format("{0} flight type is not supported", typeof(T)));
            }
        }
    }
}
