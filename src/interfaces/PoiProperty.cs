
using Newtonsoft.Json;

namespace Yojowa.StopByStop
{
    public class PoiPropertyMetadata
    {
        [JsonProperty("id")]
        public string ID { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("i")]
        public string IconID { get; set; }

        [JsonProperty("v")]
        public PoiPropertyValueMetadata[] Values { get; set; }

        [JsonProperty("fp")]
        public bool IsPrimary { get; set; }
        
    }
    public class PoiPropertyValueMetadata
    {
        [JsonProperty("id")]
        public int ID { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }
    }
}
