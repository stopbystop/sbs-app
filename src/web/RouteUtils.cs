namespace Yojowa.StopByStop.Web
{
    using System;
    using Yojowa.StopByStop.Utils;
    using Yojowa.StopByStop.Web.Service;


    internal class RouteUtils
    {
        public static bool GetRouteLocationsFromRoutePathId(
            string routePathId,
            out Location fromLocation,
            out Location toLocation)
        {
            fromLocation = Location.Unknown;
            toLocation = Location.Unknown;

            if (!string.IsNullOrEmpty(routePathId) && routePathId.Contains("-to-"))
            {
                string[] parts = routePathId.Split(new string[] { "-to-" }, StringSplitOptions.RemoveEmptyEntries);
                string from = parts[0];
                string to = parts[1];

                fromLocation = LocationUtils.CreateCustomLocation(from);
                if (fromLocation == null || fromLocation == Location.Unknown)
                {
                    fromLocation = StopByStopService.PlacesServiceInstance.GetLocationFromPlaceId(from);
                }

                toLocation = StopByStopService.PlacesServiceInstance.GetLocationFromPlaceId(to);


            }

            if (fromLocation == null)
            {
                fromLocation = Location.Unknown;
            }

            if (toLocation == null)
            {
                toLocation = Location.Unknown;
            }


            return fromLocation != Location.Unknown &&
                   toLocation != Location.Unknown;
        }
    }
}