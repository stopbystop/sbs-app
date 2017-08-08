namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class JunctionDiagnostics
    {
        [JsonProperty(PropertyName = "d")]
        public long ProcessDuration { get; set; }
    }
}