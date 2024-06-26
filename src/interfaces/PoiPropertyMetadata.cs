﻿
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Yojowa.StopByStop
{
    public class PoiPropertyMetadata
    {
        [JsonProperty("id")]
        public string ID { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("v")]
        public Dictionary<int, PoiPropertyValueMetadata> ValuesByID { get; set; }

        [JsonIgnore]
        public Dictionary<string, PoiPropertyValueMetadata> ValuesByName { get; set; }

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
