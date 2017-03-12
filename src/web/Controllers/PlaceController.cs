
namespace Yojowa.StopByStop.Web.Controllers
{
    using Newtonsoft.Json;
    using Service;
    using System;
    using System.IO;
    using System.Web.Http.Cors;
    using System.Web.Mvc;


    [NoCache]
    public class PlaceController : Controller
    {
        [HttpGet]
        [Route("place/{id}")]
        public ContentResult Index(string id)
        {
            return VersionRedirector.Instance.Get(string.Format("place/{0}", id));
        }

        [HttpGet]
        [Route("placev2/{id}")]
        public JsonResult IndexV2(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return Json(StopByStopService.PlacesServiceInstance.FindPlacesByPartialMatch(id, 10), JsonRequestBehavior.AllowGet);
            }

            return Json(new GeoPlace[0], JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [Route("placesnearby/{lat}/{lon}")]
        public ContentResult PlacesNearby(double lat, double lon)
        {
            return VersionRedirector.Instance.Get(string.Format("placesnearby/{0}/{1}", lat, lon));
        }

        [HttpGet]
        [Route("placesnearbyv2/{lat}/{lon}")]
        public JsonResult PlacesNearbyV2(double lat, double lon)
        {
            return Json(StopByStopService.PlacesServiceInstance.FindPlacesInArea(new Location(lat, lon), 10), JsonRequestBehavior.AllowGet);
        }
    }
}