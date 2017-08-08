namespace Yojowa.StopByStop.Web.Controllers
{
    using Service;
    using System;
    using Yojowa.StopByStop.Utils;
    using Microsoft.AspNetCore.Mvc;

    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class PoiController : Controller
    {

        [HttpGet]
        [Route("poiv2/{id}")]
        public JsonResult IndexV2(string id)
        {
            var location = LocationUtils.CreateCustomLocation(id);
            if (location == null)
            {
                throw new ArgumentException("InvalidLocation");
            }
            var reviewData = StopByStopService.RouteServiceInstance.GetPoiReviewData(location);
            return Json(reviewData);
        }
    }
}
