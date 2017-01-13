// <copyright file="TelemetryConstants.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>1/13/2017</date>

namespace Yojowa.StopByStop
{
    /// <summary>
    /// Telemetry constants used in StopByStop project
    /// </summary>
    public class TelemetryConstants
    {
        /// <summary>
        /// Route engine failed to retrieve route after multiple attempts
        /// </summary>
        public const string EVENTRouteRetriveFailedWithMultipleAttempts = "RouteRetriveFailedWithMultipleAttempts";

        /// <summary>
        /// POI data retrieved from day cache
        /// </summary>
        public const string EVENTPOIFromCache = "PoiFromCache";

        /// <summary>
        /// POI data retrieved from live, will be saved to cache
        /// </summary>
        public const string EVENTPOIFromLive = "POIFromLive";

        /// <summary>
        /// POI data could not be retrieved from live and is stale in cache
        /// </summary>
        public const string EVENTPOIFromLiveFailedAndCacheStale = "POIFromLiveFailedAndCacheStale";

        /// <summary>
        /// POI data retrieved from backup (backup was populated when we scanned Y data)
        /// </summary>
        public const string EVENTPOIFromBackup = "POIFromBackup";

        /// <summary>
        /// POI data was found in cache but was stable, next should follow POIFromLive event
        /// </summary>
        public const string EVENTYDataCacheExpired = "YDataCacheExpired";

        /// <summary>
        /// Request is performed to Yelp
        /// </summary>
        public const string EVENTYelpPerformRequest = "YelpPerformRequest";

        /// <summary>
        /// Route cannot be calculated
        /// </summary>
        public const string EVENTRouteCannotBeCalculated = "RouteCannotBeCalculated";

        /// <summary>
        /// Time to retrieve from OSM and process route (if not found in DB)
        /// </summary>
        public const string METRICRouteRetrievalDuration = "RouteRetrivalDuration";

        /// <summary>
        /// Time to save route to DB
        /// </summary>
        public const string METRICRouteSaveDuration = "RouteSaveDuration";

        /// <summary>
        /// Time to check if route was in DB and retrieve if it was
        /// </summary>
        public const string METRICRouteDBCheckDuration = "RouteDBCheckDuration";

        /// <summary>
        /// Number of route retrieval attempts made before route was retrieved
        /// </summary>
        public const string METRICGetRouteAttempts = "GetRouteAttempts";

        /// <summary>
        /// Number of raw data points in the route retrieved from OSM
        /// </summary>
        public const string METRICRawPolyCount = "RawPolyCount";

        /// <summary>
        /// Number of readers used to process points
        /// </summary>
        public const string METRICReaderCount = "ReaderCount";
    }
}
