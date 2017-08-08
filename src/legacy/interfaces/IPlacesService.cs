namespace Yojowa.StopByStop
{

    public interface IPlacesService
    {
        /// <summary>
        /// Gets place from place id
        /// </summary>
        /// <param name="placeId">Place id</param>
        /// <returns>
        /// Place object
        /// </returns>
        GeoPlace GetPlaceById(string placeId);

        /// <summary>
        /// Gets the location from place id.
        /// </summary>
        /// <param name="placeId">The place id.</param>
        /// <returns>Location object</returns>
        Location GetLocationFromPlaceId(string placeId);

        /// <summary>
        /// Gets places matching the input prefix
        /// </summary>
        /// <param name="text">Text that user entered</param>
        /// <param name="maxItems">Max number of items to return</param>
        /// <returns>
        /// Places matching the input prefix (not case sensitive), sorted by population in reverse order (starting from most populous)
        /// </returns>
        GeoPlace[] FindPlacesByPartialMatch(string name, int maxItems);

        /// <summary>
        /// Gets places around specified center location
        /// </summary>
        /// <param name="center">Center location</param>
        /// <param name="maxItems">Max number of items to return</param>
        /// <returns>Items in area, sorted by population in reverse order (starting from most populous)</returns>
        GeoPlace[] FindPlacesInArea(Location center, int maxItems);
    }
}