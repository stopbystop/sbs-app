namespace Yojowa.StopByStop.Web
{
    using System;
    using System.Reflection;
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
                service = new StopByStopServiceProxy();
            }


            return service;
        }

        class StopByStopServiceProxy : IStopByStopService
        {
            public GeoPlace[] FindPlacesByName(string name, bool useCache)
            {
                throw new NotImplementedException();
            }

            public Junction GetJunctionFromOSMID(long osmId, bool populatePOICategories)
            {
                throw new NotImplementedException();
            }

            public Route[] GetLastRoutes()
            {
                throw new NotImplementedException();
            }

            public Location GetLocationFromPlaceID(string placeId)
            {
                throw new NotImplementedException();
            }

            public PoisWithAreaDiagnostics GetPois(Location poiArea)
            {
                throw new NotImplementedException();
            }

            public Review[] GetReviews(string SBSID)
            {
                throw new NotImplementedException();
            }

            public Route GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions)
            {
                throw new NotImplementedException();
            }

            public Location[] GetRouteLocationsFromRoutePathId(string pathId)
            {
                throw new NotImplementedException();
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
}