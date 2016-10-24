
namespace Yojowa.StopByStop.Web.Controllers
{
    using System.Web.Mvc;


    [NoCache]
    public class PlaceController : Controller
    {

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

	}
}