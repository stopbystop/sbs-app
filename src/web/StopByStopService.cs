namespace Yojowa.StopByStop.Web
{
    using Newtonsoft.Json;
    using System;
    using System.Net.Http;
    using System.Reflection;
    using System.Text;
    using System.Web.Configuration;

    internal class StopByStopService
    {
        private static object creationLock = new object();
        private static IStopByStopService instance;
        public static IStopByStopService Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (creationLock)
                    {
                        if (instance == null)
                        {
                            instance = CreateInstance();
                        }
                    }
                }

                return instance;
            }
        }


        private static IStopByStopService CreateInstance()
        {
            IStopByStopService service = null;
            if (WebConfigurationManager.AppSettings["proxyservice"] == "false")
            {
                var serviceAssembly = Assembly.Load("Yojowa.StopByStop.Service, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
                var serviceType = serviceAssembly.GetType("Yojowa.StopByStop.Service.StopByStopService");
                service = (IStopByStopService)Activator.CreateInstance(serviceType);
            }
            else
            {
                service = new StopByStopServiceProxy("");
            }


            return service;
        }

        internal class StopByStopServiceProxy : IStopByStopService
        {
            private string serviceUrl;

            public StopByStopServiceProxy(string serviceUrl)
            {
                this.serviceUrl = serviceUrl;
            }

            public GeoPlace[] FindPlacesByName(string name, bool useCache)
            {
                return GetObjectFromRemoteServer<GeoPlace[]>(
                    "findplacesbyname",
                    Tuple.Create<string, object>("name", name),
                    Tuple.Create<string, object>("useCache", useCache.ToString()));
            }

            public Junction GetJunctionFromOSMID(long osmId, bool populatePOICategories)
            {
                return GetObjectFromRemoteServer<Junction>(
                   "getjunctionfromosmid",
                   Tuple.Create<string, object>("osmId", osmId),
                   Tuple.Create<string, object>("populatePOICategories", populatePOICategories.ToString()));
            }

            public Route[] GetLastRoutes()
            {
                return GetObjectFromRemoteServer<Route[]>("getlastroutes");
            }

            public Location GetLocationFromPlaceID(string placeId)
            {
                return GetObjectFromRemoteServer<Location>(
                   "getlocationfromplaceid",
                   Tuple.Create<string, object>("placeId", placeId));
            }

            public PoisWithAreaDiagnostics GetPois(Location poiArea)
            {
                return GetObjectFromRemoteServer<PoisWithAreaDiagnostics>(
                  "getpois",
                  Tuple.Create<string, object>("poiArea", poiArea));
            }

            public Review[] GetReviews(string SBSID)
            {
                return GetObjectFromRemoteServer<Review[]>(
                   "getreviews",
                   Tuple.Create<string, object>("SBSID", SBSID));
            }

            public Route GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions)
            {
                return GetObjectFromRemoteServer<Route>(
                    "getroute",
                    Tuple.Create<string, object>("routeId", routeId),
                    Tuple.Create<string,object>("startString", start), 
                    Tuple.Create<string, object>("endString", end), 
                    Tuple.Create<string, object>("routeOptionsString", routeOptions));
            }

            public Location[] GetRouteLocationsFromRoutePathId(string pathId)
            {
                return GetObjectFromRemoteServer<Location[]>(
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

            private T GetObjectFromRemoteServer<T>(string methodName, params Tuple<string, object>[] args)
            {
                StringBuilder urlStringBuilder = new StringBuilder();
                urlStringBuilder.Append(this.serviceUrl);
                urlStringBuilder.Append("/");
                urlStringBuilder.Append(methodName);
                urlStringBuilder.Append("?");
                foreach (var arg in args)
                {
                    urlStringBuilder.Append(arg.Item1);
                    urlStringBuilder.Append("=");
                    if (arg.Item2 is string)
                    {
                        urlStringBuilder.Append(arg.Item2);
                    }
                    else
                    {
                        urlStringBuilder.Append(JsonConvert.SerializeObject(arg.Item2));
                    }
                    urlStringBuilder.Append("&");
                }

                var responseMessage = new HttpClient().GetAsync(urlStringBuilder.ToString()).Result;
                var result = responseMessage.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<T>(result);
            }
        }
    }
}