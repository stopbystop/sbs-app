namespace Yojowa.StopByStop.Web
{
    public class SBSConfiguration
    {
        public SBSConfiguration()
        {
            this.CDNRoot = "/";
            this.BEServiceUrl = "https://www.stopbystop.com/service";
            this.AppInsightsIKey = "test";
            this.IsProduction = false;
        }
        public string CDNRoot { get; set; }
        public string BEServiceUrl { get; set; }
        public string AppInsightsIKey { get; set; }
        public bool IsProduction { get; set; }
    }
}