using System;

namespace Yojowa.StopByStop.Web.Service.Proxy
{
    public class PlacesServiceProxy : ProxyBase, IPlacesService
    {
        private string serviceUrl;
        public PlacesServiceProxy(string serviceUrl)
        {
            this.serviceUrl = serviceUrl;
        }

        public GeoPlace[] FindPlacesByPartialMatch(string name, int maxItems)
        {
            return GetObjectFromRemoteServer<GeoPlace[]>(
                this.serviceUrl,
                "findplacesbypartialmatch",
                Tuple.Create<string, object>("name", name),
                Tuple.Create<string, object>("maxItems", maxItems.ToString()));
        }

        public GeoPlace[] FindPlacesInArea(Location center, int maxItems)
        {
            return GetObjectFromRemoteServer<GeoPlace[]>(
                this.serviceUrl,
                "findplacesinarea",
                Tuple.Create<string, object>("center", center),
                Tuple.Create<string, object>("maxItems", maxItems.ToString()));
        }

        public Location GetLocationFromPlaceId(string placeId)
        {
            return GetObjectFromRemoteServer<Location>(
                this.serviceUrl,
                "getlocationfromplaceid",
                Tuple.Create<string, object>("placeId", placeId));
        }

        public GeoPlace GetPlaceById(string placeId)
        {
            return GetObjectFromRemoteServer<GeoPlace>(
                this.serviceUrl,
                "getplacebyid",
                Tuple.Create<string, object>("placeId", placeId));
        }
    }
}