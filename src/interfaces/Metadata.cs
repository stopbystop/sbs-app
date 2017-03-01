namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    public class Metadata
    {
        [JsonProperty("c")]
        public Dictionary<int, PoiCategory2> PoiCategories { get; set; }

        [JsonProperty("rpc")]
        public Dictionary<PoiType2, RootPoiCategory> RootPoiCategories { get; set; }
    }
}
