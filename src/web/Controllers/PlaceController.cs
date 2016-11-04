
namespace Yojowa.StopByStop.Web.Controllers
{
    using Newtonsoft.Json;
    using System.IO;
    using System.Web.Http.Cors;
    using System.Web.Mvc;


    [NoCache]
    public class PlaceController : Controller
    {
        private static readonly GeoPlace[] testNearbyPlaces = null;

        static PlaceController()
        {
            using (var stream = typeof(PlaceController).Assembly.GetManifestResourceStream("Yojowa.StopByStop.Web.nearbyplaces.json"))
            {
                using (var streamReader = new StreamReader(stream))
                {
                    var placesString = streamReader.ReadToEnd();
                    testNearbyPlaces = JsonConvert.DeserializeObject<GeoPlace[]>(placesString);
                }
            }
        }

        [HttpGet]
        [Route("place/{id}")]
        public JsonResult Index(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return Json(StopByStopService.Instance.FindPlacesByName(id, true), JsonRequestBehavior.AllowGet);
            }

            return Json(new GeoPlace[0], JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [Route("placesnearby/{lat}/{lon}")]
        public JsonResult PlacesNearby(double lat, double lon)
        {
            return Json(testNearbyPlaces, JsonRequestBehavior.AllowGet);
        }
    }
}