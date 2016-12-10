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
                        "~/client/scripts/sbsbundle.js",
                        "~/client/scripts/webbundle.js"
                        );

#if !DEBUG
            
            scriptBundle.Transforms.Add(new SBSJsMinify());
#endif
            bundles.Add(scriptBundle);


            var stylesBundle = new StyleBundle(string.Format(nonCdnFormat, "/client/content/sbscssbundle"), string.Format(cdnFormat, "/client/content/sbscssbundle")).Include(
                        "~/client/content/BreadCrumb.css",
                        "~/client/content/rrssb.css",
                        "~/client/content/styles.css"
                        );

#if !DEBUG
            stylesBundle.Transforms.Add(new SBSCssMinify());
#endif

            bundles.Add(stylesBundle);


            var stylesDelayedBundle = new StyleBundle(string.Format(nonCdnFormat, "/client/content/sbscssdelayedbundle"), string.Format(cdnFormat, "/client/content/sbscssdelayedbundle")).Include(
                      "~/client/content/styles_delayed.css"
                      );

            stylesDelayedBundle.Transforms.Add(new SBSCssMinify());
            bundles.Add(stylesDelayedBundle);


#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
