namespace Yojowa.StopByStop.Web
{
    using System.Web.Mvc;
    using Utils;

    public class VersionRedirector
    {
        private string rootUrl;
        private static readonly VersionRedirector instance;

        static VersionRedirector()
        {
            instance = new VersionRedirector("http://stopbystop-ver1.azurewebsites.net/");
        }

        public static VersionRedirector Instance
        {
            get
            {
                return instance;
            }
        }

        private VersionRedirector(string rootUrl)
        {
            this.rootUrl = rootUrl;
        }

        public ContentResult Get(string relativeUrlWithQuery)
        {
            return new ContentResult()
            {
                ContentType = "application/json",
                Content = HttpUtils.StringFromUrl(rootUrl + relativeUrlWithQuery)
            };
        }
    }
}