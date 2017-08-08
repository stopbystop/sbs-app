
namespace Yojowa.StopByStop.Web.Controllers
{
    using Newtonsoft.Json;
    using Service;
    using System;
    using System.IO;
    using Microsoft.AspNetCore.Mvc;


    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class PlaceController : Controller
    {
        [HttpGet]
        [Route("placev2/{id}")]
        public JsonResult IndexV2(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return Json(StopByStopService.PlacesServiceInstance.FindPlacesByPartialMatch(id, 10));
            }

            return Json(new GeoPlace[0]);
        }


        [HttpGet]
        [Route("placesnearbyv2/{lat}/{lon}")]
        public JsonResult PlacesNearbyV2(double lat, double lon)
        {
            return Json(StopByStopService.PlacesServiceInstance.FindPlacesInArea(new Location(lat, lon), 10));
        }
    }
}