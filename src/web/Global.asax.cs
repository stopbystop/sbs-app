namespace Yojowa.StopByStop.Web
{
    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.Extensibility;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Configuration;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using Yojowa.StopByStop.Utils;

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
#if DEBUG
            if (System.Configuration.ConfigurationManager.AppSettings["envtype"] == "production")
            {
                throw new InvalidOperationException("Production DEBUG is not supported. Did you forget to update web.config?");
            }
#endif
            FlightManager.Initialize();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            GlobalFilters.Filters.Add(new JsonHandlerAttribute());

            TelemetryConfiguration.Active.InstrumentationKey = WebConfigurationManager.AppSettings["aikey"];
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var razorEngine = ViewEngines.Engines.OfType<RazorViewEngine>().First();
            razorEngine.ViewLocationFormats = new string[]
            {
                "~/client/Views/{1}/{0}.cshtml"
            };

            /*
            GlobalFilters.Filters.Add(new OutputCacheAttribute()
            {
                VaryByParam = "*",
                Duration = 0,
                NoStore = true

            });
            */
        }
        void Application_BeginRequest(object sender, EventArgs e)
        {
            //throw new HttpException(503, "Service unavailable");
            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.QueryString != null)
            {
                string rf = HttpContext.Current.Request.QueryString["rf"];
                if (!string.IsNullOrEmpty(rf))
                {
                    CookieUtils.WriteCookie("rf", rf);
                }
            }
        }

        void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            new TelemetryClient().TrackException(exception);
            //Server.ClearError();
            //Response.Redirect("~/Error.htm", true);
        }
    }
}
