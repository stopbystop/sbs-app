namespace Yojowa.StopByStop.Web.Service.Proxy
{

    using System;

    internal class RouteServiceProxy : ProxyBase, IRouteService
    {
        private string serviceUrl;

        public RouteServiceProxy(string serviceUrl)
        {
            this.serviceUrl = serviceUrl;
        }

        public GeoPlace[] FindPlacesByName(string name, bool useCache)
        {
            return GetObjectFromRemoteServer<GeoPlace[]>(
                this.serviceUrl,
                "findplacesbyname",
                Tuple.Create<string, object>("name", name),
                Tuple.Create<string, object>("useCache", useCache.ToString()));
        }

        public Junction GetJunctionFromOSMID(long osmId, bool populatePOICategories)
        {
            return GetObjectFromRemoteServer<Junction>(
                this.serviceUrl,
               "getjunctionfromosmid",
               Tuple.Create<string, object>("osmId", osmId),
               Tuple.Create<string, object>("populatePOICategories", populatePOICategories.ToString()));
        }

        public Route[] GetLastRoutes()
        {
            return GetObjectFromRemoteServer<Route[]>(this.serviceUrl, "getlastroutes");
        }

        public Location GetLocationFromPlaceID(string placeId)
        {
            return GetObjectFromRemoteServer<Location>(
                this.serviceUrl,
               "getlocationfromplaceid",
               Tuple.Create<string, object>("placeId", placeId));
        }

        public PoisWithAreaDiagnostics GetPois(Location poiArea)
        {
            return GetObjectFromRemoteServer<PoisWithAreaDiagnostics>(
                this.serviceUrl,
              "getpois",
              Tuple.Create<string, object>("poiAreaString", poiArea));
        }

        public Review[] GetReviews(string SBSID)
        {
            return GetObjectFromRemoteServer<Review[]>(
               this.serviceUrl,
               "getreviews",
               Tuple.Create<string, object>("SBSID", SBSID));
        }

        public Route GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions)
        {
            return GetObjectFromRemoteServer<Route>(
                this.serviceUrl,
                "getroute",
                Tuple.Create<string, object>("routeId", routeId),
                Tuple.Create<string, object>("startString", start),
                Tuple.Create<string, object>("endString", end),
                Tuple.Create<string, object>("routeOptionsString", routeOptions));
        }

        public Location[] GetRouteLocationsFromRoutePathId(string pathId)
        {
            return GetObjectFromRemoteServer<Location[]>(
                this.serviceUrl,
                "getroutelocationsfromroutepathid",
                Tuple.Create<string, object>("pathId", pathId));
        }

        public void SubmitReview(string SBSID, Review review)
        {
            throw new NotImplementedException();
        }

        public Route UpdateRouteProgress(string routeId, Location currentLocation)
        {
            throw new NotImplementedException();
        }
    }
}