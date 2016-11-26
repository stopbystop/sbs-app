namespace Yojowa.StopByStop.Web.Service
{
    using Proxy;

    using System;
    using System.Reflection;
    using System.Web.Configuration;

    internal class StopByStopService
    {
        private static object routeServiceCreationLock = new object();
        private static object placesServiceCreationLock = new object();

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
                            routeServiceInstance = CreateRouteServiceInstance();
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
                            placesServiceInstance = CreatePlacesServiceInstance();
                        }
                    }
                }

                return placesServiceInstance;
            }
        }


        private static IRouteService CreateRouteServiceInstance()
        {
            IRouteService service = null;
            if (WebConfigurationManager.AppSettings["proxyservice"] == "false")
            {
                var serviceAssembly = Assembly.Load("Yojowa.StopByStop.Service, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
                var serviceType = serviceAssembly.GetType("Yojowa.StopByStop.Service.StopByStopService");
                service = (IRouteService)Activator.CreateInstance(serviceType);
            }
            else
            {
                service = new RouteServiceProxy(WebConfigurationManager.AppSettings["proxyserviceurl"]);
            }

            return service;
        }

        private static IPlacesService CreatePlacesServiceInstance()
        {
            IPlacesService service = null;
            if (WebConfigurationManager.AppSettings["proxyservice"] == "false")
            {
                var serviceAssembly = Assembly.Load("Yojowa.StopByStop.Places, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
                var serviceType = serviceAssembly.GetType("Yojowa.StopByStop.Places.PlacesService");
                service = (IPlacesService)Activator.CreateInstance(serviceType);
            }
            else
            {
                service = new PlacesServiceProxy(WebConfigurationManager.AppSettings["proxyserviceurl"]);
            }

            return service;
        }
    }
}