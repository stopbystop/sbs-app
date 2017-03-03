namespace Yojowa.StopByStop.Web.Controllers
{
    using Service;
    using System;
    using System.Web.Mvc;
    using Yojowa.StopByStop.Utils;

    [NoCache]
    public class PoiController : Controller
    {
        [HttpGet]
        [Route("poi/{id}")]
        public JsonResult Index(string id)
        {
            throw new NotImplementedException("TODO: redirect");

            /*
            var location = LocationUtils.CreateCustomLocation(id);
            if (location == null)
            {
                throw new ArgumentException("InvalidLocation");
            }

            var pois = StopByStopService.RouteServiceInstance.GetPoisInArea(location, true);
            return Json(pois, JsonRequestBehavior.AllowGet);
            */
        }


        [HttpGet]
        [Route("poiv2/{id}")]
        public JsonResult IndexV2(string id)
        {
            throw new NotImplementedException("TODO: implement");
        }
    }
}
