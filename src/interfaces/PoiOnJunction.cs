namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoiOnJunction
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("dfj")]
        public double DistanceFromJunction { get; set; }

        [JsonProperty("p")]
        public Yojowa.StopByStop.Poi Poi { get; set; }

        public override string ToString()
        {
            return SBSID + " " + Poi.ToString();
        }

    }
}