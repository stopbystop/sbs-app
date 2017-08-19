namespace Yojowa.StopByStop.Web
{
    public class SBSConfiguration
    {
        public SBSConfiguration ()
        {
            this.CDNRoot = "/";
#if PROXY_SERVICE
            this.BEServiceUrl = "https://www.stopbystop.com/service";
#endif
            this.AppInsightsIKey = "test";
            this.IsProduction = false;
        }
        public string CDNRoot { get; set; }

#if PROXY_SERVICE
        public string BEServiceUrl { get; set; }
#endif
        public string AppInsightsIKey { get; set; }
        public bool IsProduction { get; set; }
    }
}