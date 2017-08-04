namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class RouteDiagnostics
    {

        [JsonProperty(PropertyName = "fmc")]
        public bool FromMemoryCache { get; set; }

        [JsonProperty(PropertyName = "fdc")]
        public bool FromDBCache { get; set; }

        [JsonProperty(PropertyName = "dbcheck")]
        public long DBCheckDuration { get; set; }

        [JsonProperty(PropertyName = "dbsave")]
        public long DBSaveDuration { get; set; }

        [JsonProperty(PropertyName = "poi")]
        public long POIPopulationDuration { get; set; }

        [JsonProperty(PropertyName = "route")]
        public long RouteRetrivalDuration { get; set; }

        [JsonProperty(PropertyName = "jcnt")]
        public int JunctionsCount { get; set; }
    }
}