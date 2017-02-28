namespace Yojowa.StopByStop
{
    public interface IRouteService
    {

        /// <summary>
        /// Gets the route
        /// </summary>
        /// <param name="start">Start location</param>
        /// <param name="end">End location</param>
        /// <param name="routeOptions">Route options. Please pass all default options</param>
        /// <returns></returns>
        Route GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions);

        /// <summary>
        /// Call this API with current user location to get back the updated information about the route progress. In the object returned PortionCompleted
        /// property of RouteSegment's will be updated
        /// </summary>
        /// <param name="route">Route object</param>
        /// <param name="currentLocation">Current user location</param>
        Route UpdateRouteProgress(string routeId, Location currentLocation);

        /// <summary>
        /// Submit user feedback. Feedback can be submitted for PoiOnJunction object and for Poi object - SBS id is present for both
        /// </summary>
        /// <param name="SBSID">ID</param>
        /// <param name="comment">User comment - limited to 256 characters</param>
        void SubmitReview(string SBSID, Review review);

        /// <summary>
        /// Gets reviews for SBSID
        /// </summary>
        /// <param name="SBSID"></param>
        /// <returns></returns>
        Review[] GetReviews(string SBSID);


        /// <summary>
        /// Gets last routes
        /// </summary>
        /// <returns></returns>
        Route[] GetLastRoutes();

        /// <summary>
        /// Gets junction from OSM id
        /// </summary>
        /// <param name="osmId"></param>
        /// <returns></returns>
        Junction GetJunctionFromOSMID(long osmId, bool populatePOICategories);

        /// <summary>
        /// Gets POIs and diagnostics information about the retrieval
        /// </summary>
        /// <param name="poiArea">POI area</param>
        /// <returns></returns>
        PoisWithAreaDiagnostics GetPois(Location poiArea);

        /// <summary>
        /// Gets the metadata.
        /// </summary>
        /// <returns></returns>
        Metadata GetMetadata();
    }
}