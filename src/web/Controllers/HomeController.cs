
namespace Yojowa.StopByStop.Web.Controllers
{
    using System.Configuration;
    using System.Web.Mvc;
    using Yojowa.StopByStop.Web.Models;
     

    [NoCache]
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index(string rf)
        {
            return View("Main");
            //return View(new HomeModel(StopByStopService.Instance.GetLastRoutes()));
        }

        public ActionResult About()
        {
            return View();
        }
    }
}