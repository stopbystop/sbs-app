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
            var location = LocationUtils.CreateCustomLocation(id);
            if (location == null)
            {
                throw new ArgumentException("InvalidLocation");
            }

            var poisWithDiagnostics = StopByStopService.RouteServiceInstance.GetPois(location);
            return Json(poisWithDiagnostics.Pois, JsonRequestBehavior.AllowGet);
        
        }

	}
}