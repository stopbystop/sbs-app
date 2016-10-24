namespace Yojowa.StopByStop.Web
{
    using Microsoft.ApplicationInsights.Channel;
    using Microsoft.ApplicationInsights.Extensibility;
    using System.Web;
    using Utils;

    public class SBSParameterToDimensionInitializer : ITelemetryInitializer
    {
        public void Initialize(ITelemetry telemetry)
        {
            if (telemetry.Context != null && telemetry.Context.Properties != null && !telemetry.Context.Properties.ContainsKey("rf"))
            {
                if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.QueryString != null)
                {
                    string rf = HttpContext.Current.Request.QueryString["rf"];
                    if (string.IsNullOrEmpty(rf))
                    {
                        rf = CookieUtils.ReadCookie("rf");
                    }

                    if (!string.IsNullOrEmpty(rf))
                    {
                        telemetry.Context.Properties.Add("rf", rf.ToLowerInvariant());
                    }
                }
            }
        
        }
    }
}