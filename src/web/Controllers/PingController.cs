namespace Yojowa.StopByStop.Web.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using Service;
    using Yojowa.StopByStop.Utils;

    [ResponseCache (Location = ResponseCacheLocation.None, NoStore = true)]
    public class PingController : Controller
    {

        class PingData
        {
            public SBSConfiguration Configuration { get; set; }
            public bool ProxyService { get; set; }

            public string DBKey { get; set; }

            public bool RouteCacheEnabled { get; set; }
        }

        [HttpGet]
        [Route ("ping")]
        public JsonResult Ping ()
        {

            var pingData = new PingData ();
            pingData.Configuration = Startup.SBSConfiguration;
#if PROXY_SERVICE
            pingData.ProxyService = true;
#else
            pingData.ProxyService = false;
            pingData.DBKey = Yojowa.StopByStop.Service.StopByStopService.DBConnection.Key;
            pingData.RouteCacheEnabled = Yojowa.StopByStop.Service.StopByStopService.EnableRouteCache;
#endif   
            return Json (pingData);
        }
    }
}