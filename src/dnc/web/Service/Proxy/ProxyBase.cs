namespace Yojowa.StopByStop.Web.Service.Proxy
{
    using Newtonsoft.Json;

    using System;
    using System.Net.Http;
    using System.Text;

    public abstract class ProxyBase
    {
        protected static T GetObjectFromRemoteServer<T>(string serviceUrl, string methodName, params Tuple<string, object>[] args)
        {
            StringBuilder urlStringBuilder = new StringBuilder();
            urlStringBuilder.Append(serviceUrl);
            urlStringBuilder.Append("/");
            urlStringBuilder.Append(methodName);
            urlStringBuilder.Append("?");
            foreach (var arg in args)
            {
                urlStringBuilder.Append(arg.Item1);
                urlStringBuilder.Append("=");
                if (arg.Item2 is string)
                {
                    urlStringBuilder.Append(arg.Item2);
                }
                else
                {
                    urlStringBuilder.Append(JsonConvert.SerializeObject(arg.Item2));
                }
                urlStringBuilder.Append("&");
            }

            var responseMessage = new HttpClient().GetAsync(urlStringBuilder.ToString()).Result;
            var result = responseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<T>(result);
        }
    }
}