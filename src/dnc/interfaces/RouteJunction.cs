namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class RouteJunction
    {
        [JsonIgnore]
        public double DistanceFromRouteSegmentStart { get; set; }

        [JsonProperty("dfrs")]
        public double DistanceFromRouteStart { get; set; }

        [JsonProperty("tfrs")]
        public int TimeFromRouteStart { get; set; }

        [JsonProperty("i")]
        public int Index { get; set; }

        [JsonProperty("j")]
        public Junction Junction { get; set; }
        public override string ToString()
        {
            return this.Junction.ToString() + " @ " + DistanceFromRouteSegmentStart.ToString("0.000");
        }
    }
}