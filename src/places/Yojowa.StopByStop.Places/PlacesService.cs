// <copyright file="PlacesService.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.Places
{
    using System;

    /// <summary>
    /// Places service
    /// </summary>
    /// <seealso cref="Yojowa.StopByStop.IPlacesService" />
    public class PlacesService : IPlacesService
    {
        /// <summary>
        /// Gets places by partial match
        /// </summary>
        /// <param name="text">Text that user entered</param>
        /// <param name="maxItems">Max number of items to return</param>
        /// <returns>
        /// Places to matching the input (not case sensitive), sorted by population in reverse order (starting from most populous)
        /// </returns>
        public GeoPlace[] FindPlacesByPartialMatch(string text, int maxItems)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets places around specified center location
        /// </summary>
        /// <param name="center">Center location</param>
        /// <param name="radiusInMiles">Max radius around the center location to search</param>
        /// <returns>List of geo places</returns>
        public GeoPlace[] FindPlacesInArea(Location center, double radiusInMiles)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets location from place id
        /// </summary>
        /// <param name="placeId">Place id</param>
        /// <returns>
        /// Location object
        /// </returns>
        public Location GetLocationFromPlaceId(string placeId)
        {
            throw new NotImplementedException();
        }
    }
}
