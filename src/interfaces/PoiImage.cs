namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoiImage
    {

        [JsonProperty("u")]
        public string ImageUrl { get; set; }
    }
}