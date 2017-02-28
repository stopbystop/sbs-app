namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class Metadata
    {
        [JsonProperty("c")]
        public PoiCategory2[] Categories { get; set; }
    }
}
