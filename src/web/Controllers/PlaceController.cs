
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
        public JsonResult Index(string id)
        {
            throw new NotImplementedException("TODO: redirect");

            /*
            if (!string.IsNullOrEmpty(id))
            {
                return Json(StopByStopService.PlacesServiceInstance.FindPlacesByPartialMatch(id, 10), JsonRequestBehavior.AllowGet);
            }

            return Json(new GeoPlace[0], JsonRequestBehavior.AllowGet);
            */
        }

        [HttpGet]
        [Route("placev2/{id}")]
        public JsonResult IndexV2(string id)
        {
            throw new NotImplementedException("TODO: implement");
        }


        [HttpGet]
        [Route("placesnearby/{lat}/{lon}")]
        public JsonResult PlacesNearby(double lat, double lon)
        {
            throw new NotImplementedException("TODO: redirect");

            /*
            return Json(StopByStopService.PlacesServiceInstance.FindPlacesInArea(new Location(lat, lon), 10), JsonRequestBehavior.AllowGet);
            */
        }

        [HttpGet]
        [Route("placesnearbyv2/{id}")]
        public JsonResult PlacesNearbyV2(double lat, double lon)
        {
            throw new NotImplementedException("TODO: implement");
        }
    }
}