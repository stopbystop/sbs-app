namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoiCategory
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("t")]
        public string Type { get; set; }

        [JsonProperty("yid")]
        public string YID { get; set; }

        [JsonProperty("p")]
        public string[] ParentIDs { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }
    }
}