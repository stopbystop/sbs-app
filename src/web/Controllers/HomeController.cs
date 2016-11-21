
namespace Yojowa.StopByStop.Web.Controllers
{
    using System.Web.Mvc;
    using Yojowa.StopByStop.Web.Models;


    [NoCache]
    public class HomeController : Controller
    {
        public ActionResult Index(string rf)
        {
            return View("~/client/Views/Main.cshtml", new MainModel(this.Url)
            {
                Page = ClientPage.Home
            });
        }

        public ActionResult About()
        {
            return View("~/client/Views/Main.cshtml", new MainModel(this.Url)
            {
                Page = ClientPage.About
            });
        }
    }
}