namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoiCategoryOccurrence
    {
        [JsonProperty("cat")]
        public PoiCategory Category { get; set; }

        [JsonProperty("c")]
        public int Count { get; set; }
    }
}