namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoiCategory2
    {
        [JsonProperty("id")]
        public int ID { get; set; }

        [JsonProperty("p")]
        public int[] ParentIDs { get; set; }

        [JsonProperty("sn")]
        public string ShortName { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }
    }
}