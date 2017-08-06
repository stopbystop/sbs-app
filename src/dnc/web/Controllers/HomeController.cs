namespace Yojowa.StopByStop.Web.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Service;

    [NoCache]
    public class HomeController : Controller
    {
        public ActionResult Index (string rf)
        {
            return View ("~/client/Views/Main.cshtml", new MainModel (StopByStopService.RouteServiceInstance.GetMetadata (), this.Url)
            {
                Page = ClientPage.Home
            });
        }

        public ActionResult About ()
        {
            return View ("~/client/Views/Main.cshtml", new MainModel (StopByStopService.RouteServiceInstance.GetMetadata (), this.Url)
            {
                Page = ClientPage.About
            });
        }
    }
}