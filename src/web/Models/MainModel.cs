using Newtonsoft.Json;
using System.Web;
using System.Web.Mvc;

namespace Yojowa.StopByStop.Web.Models
{
    public class MainModel
    {
        public MainModel(UrlHelper urlHelper)
        {
            this.BaseDataUrl = urlHelper.Content("~/");
            this.BaseImageUrl = RenderHelper.GetCDNUrl("/client/content/v1/icons/");
        }

        [JsonProperty("p")]
        public ClientPage Page { get; set; }

        [JsonProperty("rid")]
        public string RouteId { get; set; }

        [JsonProperty("r")]
        public Route Route { get; set; }

        [JsonProperty("exd")]
        public string ExitId { get; set; }

        [JsonProperty("pt")]
        public PoiType PoiType { get; set; }

        [JsonProperty("durl")]
        public string BaseDataUrl { get; set; }

        [JsonProperty("iurl")]
        public string BaseImageUrl { get; set; }
    }
}