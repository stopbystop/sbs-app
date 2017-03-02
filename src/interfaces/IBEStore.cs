namespace Yojowa.StopByStop
{
    using System;
    using System.Collections.Generic;

    public interface IBEStore
    {
        /// <summary>
        /// Returns overpass data from a single unit defined by top left lat-long coordinate. Lat and long can have a single decimal point that can be either 0 or 5, 
        /// that is the grain is 0.5. For example it can be 47.0, 47.5, 48.0, but not 48.2
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        string GetOverpassJunctionData(Location topLeft);


        /// <summary>
        /// Returns POIs from a single unit defined by top left lat-long coordinate. The grain is 0.1. For example it can be 47.0, 47.1, 48.0, but not 48.15
        /// </summary>
        /// <param name="nWest">North-west coordinate of the region</param>
        /// <param name="dataKind">Kind of data to retrieve</param>
        /// <returns></returns>
        Poi2[] GetPois(Location nWest, PoiDataKind dataKind, DateTime fromTime);


        void SavePois(Location location, Poi2[] pois, PoiDataKind dataKind);


        /// <summary>
        /// Gets places by name
        /// </summary>
        /// <param name="name">Name typed by user</param>
        /// <returns>List of places to display in the dropdown</returns>
        GeoPlace[] FindPlacesByName(string name, bool userCache);

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
        /// Gets stored route
        /// </summary>
        /// <param name="fromLocation"></param>
        /// <param name="toLocation"></param>
        /// <returns></returns>
        StopByStop.Route GetStoredRoute(string routeId);

        /// <summary>
        /// Saves route
        /// </summary>
        /// <param name="fromLocation"></param>
        /// <param name="toLocaiton"></param>
        /// <param name="route"></param>
        void SaveRoute(string routeId, StopByStop.Route route);


        Junction[] GetJunctionsWithinBounds(decimal south, decimal west, decimal north, decimal east);
    }
}