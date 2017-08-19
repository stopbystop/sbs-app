namespace Yojowa.StopByStop.Web.Service
{
    using System.Reflection;
    using System;
    using Microsoft.Extensions.Configuration;
    using Proxy;

    internal class StopByStopService
    {
        private static object routeServiceCreationLock = new object ();
        private static object placesServiceCreationLock = new object ();

        private static IRouteService routeServiceInstance;
        private static IPlacesService placesServiceInstance;

        public static IRouteService RouteServiceInstance
        {
            get
            {
                if (routeServiceInstance == null)
                {
                    lock (routeServiceCreationLock)
                    {
                        if (routeServiceInstance == null)
                        {
                            routeServiceInstance = CreateRouteServiceInstance ();
                        }
                    }
                }

                return routeServiceInstance;
            }
        }

        public static IPlacesService PlacesServiceInstance
        {
            get
            {
                if (placesServiceInstance == null)
                {
                    lock (placesServiceCreationLock)
                    {
                        if (placesServiceInstance == null)
                        {
                            placesServiceInstance = CreatePlacesServiceInstance ();
                        }
                    }
                }

                return placesServiceInstance;
            }
        }

        private static IRouteService CreateRouteServiceInstance ()
        {
            IRouteService service = null;
            #if PROXY_SERVICE
                service = new RouteServiceProxy (Startup.SBSConfiguration.BEServiceUrl);
            #else
                service = new Yojowa.StopByStop.Service.StopByStopService();
            #endif
            return service;
        }

        private static IPlacesService CreatePlacesServiceInstance ()
        {
            IPlacesService service = null;
            #if PROXY_SERVICE
                service = new PlacesServiceProxy (Startup.SBSConfiguration.BEServiceUrl);
            #else
                service = new Yojowa.StopByStop.Places.PlacesService();
            #endif
            return service;
        }
    }
}