// <copyright file="ServiceControllerTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System.Net.Http;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Newtonsoft.Json;
    using Web;

    /// <summary>
    /// Service controller test
    /// </summary>
    [TestClass]
    public class ServiceControllerTest
    {
        /// <summary>
        /// Seattle location
        /// </summary>
        public static readonly Location LOCATIONSeattle = new Location(47.606210, -122.332070);

        /// <summary>
        /// Tacoma location
        /// </summary>
        public static readonly Location LOCATIONTacoma = new Location(47.252880, -122.444290);

        /// <summary>
        /// StopByStop service url
        /// </summary>
        private const string LocalServiceUrl = "https://www.stopbystop.com/service";

        /// <summary>
        /// Verifies GetRoute method is called as expected
        /// </summary>
        [TestMethod]
        public void VerifyGetRoute()
        {
            var route = GetRouteFromServiceController(LOCATIONSeattle, LOCATIONTacoma);
            Assert.AreEqual<string>("Seattle", route.FromLocation.PlaceDescription);
        }

        /// <summary>
        /// Verifies serialization
        /// </summary>
        [TestMethod]
        public void VerifyGetObjectFromRemoteServer()
        {
            StopByStopService.StopByStopServiceProxy proxy = new StopByStopService.StopByStopServiceProxy(LocalServiceUrl);
            Route routeActual = proxy.GetRoute("seattle-wa-united-states-to-tacoma-wa-united-states", LOCATIONSeattle, LOCATIONTacoma, new RouteOptions() { ExcludeJunctionsWithoutExitInfo = false });
            Route routeExpected = GetRouteFromServiceController(LOCATIONSeattle, LOCATIONTacoma);

            routeActual.Diagnostics = null;
            routeExpected.Diagnostics = null;

            Assert.AreEqual<string>(JsonConvert.SerializeObject(routeExpected), JsonConvert.SerializeObject(routeActual));
        }

        /// <summary>
        /// Gets the route from service controller.
        /// </summary>
        /// <param name="start">The start.</param>
        /// <param name="end">The end.</param>
        /// <returns>Initialized route object</returns>
        private static Route GetRouteFromServiceController(Location start, Location end)
        {
            string url =
                LocalServiceUrl + "/getroute?" +
                "routeId=" + "seattle-wa-united-states-to-tacoma-wa-united-states" + "&" +
                "startString=" + JsonConvert.SerializeObject(start) + "&" +
                "endString=" + JsonConvert.SerializeObject(end) + "&" +
                "routeOptionsString=" + JsonConvert.SerializeObject(new RouteOptions() { ExcludeJunctionsWithoutExitInfo = false });

            var responseMessage = new HttpClient().GetAsync(url).Result;
            var result = responseMessage.Content.ReadAsStringAsync().Result;

            var route = JsonConvert.DeserializeObject<Route>(result);
            return route;
        }
    }
}
