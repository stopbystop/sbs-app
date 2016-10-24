namespace Yojowa.StopByStop.UnitTests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Newtonsoft.Json;
    using System.Net.Http;

    [TestClass]
    public class ServiceControllerTest
    {
        public static readonly Location LOCATION_Seattle = new Location(47.606210, -122.332070);
        public static readonly Location LOCATION_Tacoma = new Location(47.252880, -122.444290);

        [TestMethod]
        public void VerifyGetRoute()
        {
            var responseMessage = new HttpClient().GetAsync("https://localhost:44100/stopbystopweb/service/getroute?" +
                "routeId=" + "seattle-wa-united-states-to-tacoma-wa-united-states" + " & " +
                "start=" + JsonConvert.SerializeObject(LOCATION_Seattle) + "&" +
                "end=" + JsonConvert.SerializeObject(LOCATION_Tacoma) + "&" +
                "routeOptions=" + JsonConvert.SerializeObject(new RouteOptions() { ExcludeJunctionsWithoutExitInfo = false })).Result;
            var result = responseMessage.Content.ReadAsStringAsync().Result;
        }
    }
}
