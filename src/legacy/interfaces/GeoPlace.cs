namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class GeoPlace
    {
        [JsonProperty("i")]
        public string ID { get; set; }

        [JsonProperty("sn")]
        public string ShortName { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }  

        [JsonProperty("p")]
        public long Population { get; set; }
    }
}