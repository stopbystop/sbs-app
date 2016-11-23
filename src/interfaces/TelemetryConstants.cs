namespace Yojowa.StopByStop
{
    public class TelemetryConstants
    {
        /// <summary>
        /// Route engine failed to retrive route after multiple attempts
        /// </summary>
        public const string EVENT_RouteRetriveFailedWithMultipleAttempts = "RouteRetriveFailedWithMultipleAttempts";

        /// <summary>
        /// POI data retrieved from day cache
        /// </summary>
        public const string EVENT_POIFromCache = "PoiFromCache";

        /// <summary>
        /// POI data retrieved from live, will be saved to cache
        /// </summary>
        public const string EVENT_POIFromLive = "POIFromLive";

        /// <summary>
        /// POI data could not be retrieved from live and is stale in cache
        /// </summary>
        public const string EVENT_POIFromLiveFailedAndCacheStale = "POIFromLiveFailedAndCacheStale";

        /// <summary>
        /// POI data retrieved from backup (backup was populated when we scanned Y data)
        /// </summary>
        public const string EVENT_POIFromBackup = "POIFromBackup";

        /// <summary>
        /// POI data was found in cache but was stable, next should follow POIFromLive event
        /// </summary>
        public const string EVENT_YDataCacheExpired = "YDataCacheExpired";

        /// <summary>
        /// Request is performed to Yelp
        /// </summary>
        public const string EVENT_YelpPerformRequest = "YelpPerformRequest";

        /// <summary>
        /// Route cannot be calculated
        /// </summary>
        public const string EVENT_RouteCannotBeCalculated = "RouteCannotBeCalculated";


        /// <summary>
        /// Time to retrive from OSM and process route (if not found in DB)
        /// </summary>
        public const string METRIC_RouteRetrivalDuration = "RouteRetrivalDuration";

        /// <summary>
        /// Time to save route to DB
        /// </summary>
        public const string METRIC_RouteSaveDuration = "RouteSaveDuration";

        /// <summary>
        /// Time to check if route was in DB and retrieve if it was
        /// </summary>
        public const string METRIC_RouteDBCheckDuration = "RouteDBCheckDuration";

        /// <summary>
        /// Number of route retrieval attempts made before route was retrieved
        /// </summary>
        public const string METRIC_GetRouteAttempts = "GetRouteAttempts";

        /// <summary>
        /// Number of raw datapoints in the route retrieved from OSM
        /// </summary>
        public const string METRIC_RawPolyCount = "RawPolyCount";

        /// <summary>
        /// Number of readers used to process points
        /// </summary>
        public const string METRIC_ReaderCount = "ReaderCount";
    }


}
