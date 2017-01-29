namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class AreaDiagnostics
    {
        [JsonProperty(PropertyName = "i")]
        public string AreaInfo { get; set; }

        [JsonProperty(PropertyName = "fc")]
        public bool FromCache { get; set; }


    }
}