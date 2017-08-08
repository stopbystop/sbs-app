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
        public ContentResult Index(string id)
        {
            return VersionRedirector.Instance.Get(string.Format("poi/{0}", id));
        }


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
            return Json(reviewData, JsonRequestBehavior.AllowGet);
        }
    }
}
