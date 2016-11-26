
namespace Yojowa.StopByStop.Web.Controllers
{
    using Newtonsoft.Json;
    using Service;
    using System.IO;
    using System.Web.Http.Cors;
    using System.Web.Mvc;


    [NoCache]
    public class PlaceController : Controller
    {
        private static readonly GeoPlace[] testNearbyPlaces = null;

        [HttpGet]
        [Route("place/{id}")]
        public JsonResult Index(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return Json(StopByStopService.PlacesServiceInstance.FindPlacesByPartialMatch(id, 10), JsonRequestBehavior.AllowGet);
            }

            return Json(new GeoPlace[0], JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [Route("placesnearby/{lat}/{lon}")]
        public JsonResult PlacesNearby(double lat, double lon)
        {
            return Json(StopByStopService.PlacesServiceInstance.FindPlacesInArea(new Location(lat, lon), 10), JsonRequestBehavior.AllowGet);
        }
    }
}