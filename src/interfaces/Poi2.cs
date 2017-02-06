using Newtonsoft.Json;

namespace Yojowa.StopByStop
{
    public class Poi2
    {
        public long SBSID { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

       
    }
}
