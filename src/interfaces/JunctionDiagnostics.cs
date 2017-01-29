namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class JunctionDiagnostics
    {
        [JsonProperty(PropertyName = "d")]
        public long ProcessDuration { get; set; }

        [JsonProperty(PropertyName = "area")]
        public AreaDiagnostics[] AreaDiagnosticItems { get; set; }
    }
}