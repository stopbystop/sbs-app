namespace Yojowa.StopByStop.Web.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Service;

    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class HomeController : Controller
    {
        public ActionResult Index (string rf)
        {
            return View ("~/client/Views/Main.cshtml", new MainModel (StopByStopService.RouteServiceInstance.GetMetadata (), this.HttpContext)
            {
                Page = ClientPage.Home
            });
        }

        public ActionResult About ()
        {
            return View ("~/client/Views/Main.cshtml", new MainModel (StopByStopService.RouteServiceInstance.GetMetadata (), this.HttpContext)
            {
                Page = ClientPage.About
            });
        }
    }
}