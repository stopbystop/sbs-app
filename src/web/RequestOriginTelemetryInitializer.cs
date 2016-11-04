namespace Microsoft.ApplicationInsights.Samples
{
    using Microsoft.ApplicationInsights.Channel;
    using Microsoft.ApplicationInsights.Extensibility;
    using System.Web;


    /// <summary>
    /// Initialize Request origin telemetry property 
    /// </summary>
    /// <seealso cref="Microsoft.ApplicationInsights.Extensibility.ITelemetryInitializer" />
    public class RequestOriginTelemetryInitializer : ITelemetryInitializer
    {
        /// <summary>
        /// Initializes properties of the specified <see cref="T:Microsoft.ApplicationInsights.Channel.ITelemetry" /> object.
        /// </summary>
        /// <param name="telemetry"></param>
        public void Initialize(ITelemetry telemetry)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.Headers != null)
            {
                telemetry.Context.Properties["Request origin"] =
                    HttpContext.Current.Request.Headers["origin"] ??
                    HttpContext.Current.Request.Headers["host"];
            }
        }
    }
}