namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoisWithAreaDiagnostics
    {
        [JsonProperty(PropertyName ="p")]
        public Poi[] Pois { get; set; }

        [JsonProperty(PropertyName = "a")]
        public AreaDiagnostics AreaDiagnostics { get; set; }
    }
}