using System;
using System.Web;
using System.Web.Optimization;

namespace Yojowa.StopByStop.Web
{
    public class SBSJsMinify : JsMinify
    {
        public override void Process(BundleContext context, BundleResponse bundleResponse)
        {
            HttpCachePolicyBase cachePolicy = context.HttpContext.Response.Cache;
            cachePolicy.SetCacheability(bundleResponse.Cacheability);
            cachePolicy.SetOmitVaryStar(true);
            cachePolicy.SetExpires(DateTime.Now.AddDays(3));
            cachePolicy.SetValidUntilExpires(true);
            cachePolicy.SetLastModified(DateTime.Now);

            base.Process(context, bundleResponse);



            /* cachePolicy.VaryByHeaders["User-Agent"] = true; */
        }
    }

    public class SBSCssMinify : CssMinify
    {
        public override void Process(BundleContext context, BundleResponse bundleResponse)
        {
            HttpCachePolicyBase cachePolicy = context.HttpContext.Response.Cache;
            cachePolicy.SetCacheability(HttpCacheability.Public);
            cachePolicy.SetOmitVaryStar(true);
            cachePolicy.SetExpires(DateTime.Now.AddDays(3));
            cachePolicy.SetValidUntilExpires(true);
            cachePolicy.SetLastModified(DateTime.Now);

            base.Process(context, bundleResponse);


            /* cachePolicy.VaryByHeaders["User-Agent"] = true; */
        }
    }


    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            var version = System.Reflection.Assembly.GetAssembly(typeof(BundleConfig)).GetName().Version.ToString();
            var cdnFormat = System.Configuration.ConfigurationManager.AppSettings["cdnroot"] + "{0}?ver=" + version;
            var nonCdnFormat = "~{0}";

            bundles.UseCdn = System.Configuration.ConfigurationManager.AppSettings["envtype"] == "production";


            var scriptBundle = new ScriptBundle(string.Format(nonCdnFormat, "/client/content/sbsjsbundle"), string.Format(cdnFormat, "/client/content/sbsjsbundle")).Include(
                        "~/Client/Scripts/jquery.easing.1.3.js",
                        "~/Client/Scripts/jquery.jBreadCrumb.1.1.js",
                        "~/Client/Scripts/rrssb.min.js",
                        "~/Client/Scripts/jquery.verticalslider.js",
                        "~/Client/Scripts/svg4everybody.js",
                        "~/Client/Scripts/extensions.js",
                        "~/Client/Scripts/stopbystop-kocustombindings.js",
                        "~/Client/Scripts/stopbystop.js",
                        "~/Client/Scripts/stopbystop-interfaces.js",
                        "~/Client/Scripts/InitUrls.js",
                        "~/Client/Scripts/Telemetry.js",
                        "~/Client/Scripts/Utils.js",
                        "~/Client/Scripts/Init.js",
                        "~/Client/Scripts/ViewModels/LocationViewModel.js",
                        "~/Client/Scripts/ViewModels/IStopPlace.js",
                        "~/Client/Scripts/ViewModels/PoiCategoryViewModel.js",
                        "~/Client/Scripts/ViewModels/FilterViewModel.js",
                        "~/Client/Scripts/ViewModels/PoiImageViewModel.js",
                        "~/Client/Scripts/ViewModels/ReviewGroupViewModel.js",
                        "~/Client/Scripts/ViewModels/PoiViewModel.js",
                        "~/Client/Scripts/ViewModels/PoiOnJunctionViewModel.js",
                        "~/Client/Scripts/ViewModels/RouteStopViewModel.js",
                        "~/Client/Scripts/ViewModels/RoutePlanViewModel.js",
                        "~/Client/Scripts/ViewModels/JunctionViewModel.js",
                        "~/Client/Scripts/ViewModels/RouteJunctionViewModel.js",
                        "~/Client/Scripts/ViewModels/RouteSegmentViewModel.js",
                        "~/Client/Scripts/ViewModels/RouteViewModel.js",
                        "~/Client/Scripts/ViewModels/IAppViewModel.js",
                        "~/Client/Scripts/ViewModels/AppViewModel.js",
                        "~/Client/Scripts/ViewModels/JunctionMapViewModel.js",
                        "~/Client/Scripts/ViewModels/JunctionAppViewModel.js",
                        "~/Client/Scripts/ViewModels/SideBarViewModel.js"
                        );

#if !DEBUG
            
            scriptBundle.Transforms.Add(new SBSJsMinify());
#endif
            bundles.Add(scriptBundle);


            var stylesBundle = new StyleBundle(string.Format(nonCdnFormat, "/client/content/sbscssbundle"), string.Format(cdnFormat, "/client/content/sbscssbundle")).Include(
                        "~/Client/content/styles.css",
                        "~/Client/content/BreadCrumb.css",
                        "~/Client/content/rrssb.css"
                        );

#if !DEBUG
            stylesBundle.Transforms.Add(new SBSCssMinify());
#endif

            bundles.Add(stylesBundle);


            var stylesDelayedBundle = new StyleBundle(string.Format(nonCdnFormat, "/client/content/sbscssdelayedbundle"), string.Format(cdnFormat, "/client/content/sbscssdelayedbundle")).Include(
                      "~/Client/content/styles_delayed.css"
                      );

            stylesDelayedBundle.Transforms.Add(new SBSCssMinify());
            bundles.Add(stylesDelayedBundle);


#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif

            /*
             bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Client/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Client/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Client/Scripts/bootstrap.js",
                      "~/Client/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Client/Content/css").Include(
                      "~/Client/Content/bootstrap.css",
                      "~/Client/Content/site.css"));
            */
        }
    }
}
