namespace Yojowa.StopByStop.UnitTests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Newtonsoft.Json;
    using System.Net.Http;
    using Web;

    [TestClass]
    public class ServiceControllerTest
    {
        private const string LocalServiceUrl = "https://www.stopbystop.com/service";
        public static readonly Location LOCATION_Seattle = new Location(47.606210, -122.332070);
        public static readonly Location LOCATION_Tacoma = new Location(47.252880, -122.444290);

        [TestMethod]
        public void VerifyGetRoute()
        {
            var route = GetRouteFromServiceController(LOCATION_Seattle, LOCATION_Tacoma);
            Assert.AreEqual<string>("Seattle", route.FromLocation.PlaceDescription);
        }

        [TestMethod]
        public void VerifyGetObjectFromRemoteServer()
        {
            StopByStopService.StopByStopServiceProxy proxy = new StopByStopService.StopByStopServiceProxy(LocalServiceUrl);
            Route rActual = proxy.GetRoute("seattle-wa-united-states-to-tacoma-wa-united-states", LOCATION_Seattle, LOCATION_Tacoma, new RouteOptions() { ExcludeJunctionsWithoutExitInfo = false });
            Route rExpected = GetRouteFromServiceController(LOCATION_Seattle, LOCATION_Tacoma);

            rActual.Diagnostics = null;
            rExpected.Diagnostics = null;

            Assert.AreEqual<string>(JsonConvert.SerializeObject(rExpected), JsonConvert.SerializeObject(rActual));
        }

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
