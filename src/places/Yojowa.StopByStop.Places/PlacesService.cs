namespace Yojowa.StopByStop.Places
{
    using System;

    public class PlacesService : IPlacesService
    {
        public GeoPlace[] FindPlacesByPartialMatch(string name, int maxItems)
        {
            throw new NotImplementedException();
        }

        public GeoPlace[] FindPlacesInArea(Location center, double radiusInMiles)
        {
            throw new NotImplementedException();
        }

        public Location GetLocationFromPlaceId(string placeId)
        {
            throw new NotImplementedException();
        }
    }
}
