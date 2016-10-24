
namespace Yojowa.StopByStop.Web.Controllers
{
    using System.Web.Mvc;


    [NoCache]
    public class TestController : Controller
    {
        public ActionResult All()
        {
            return View();
        }
    }
}