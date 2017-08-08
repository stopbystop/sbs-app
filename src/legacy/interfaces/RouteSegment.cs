namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class RouteSegment
    {
        [JsonProperty("hn")]
        public string HighwayName { get; set; }

        [JsonProperty("r")]
        public string Ref { get; set; }

        [JsonProperty("s")]
        public Location Start { get; set; }

        [JsonProperty("e")]
        public Location End { get; set; }

        [JsonProperty("d")]
        public double Distance { get; set; }

        [JsonProperty("j")]
        public RouteJunction[] RouteJunctions { get; set; }

        [JsonProperty("pc")]
        public double PortionCompleted { get; set; }

        [JsonProperty("si")]
        public int StartIndex { get; set; }

        [JsonProperty("ei")]
        public int EndIndex { get; set; }

        [JsonProperty("m")]
        public string Maneuver { get; set; }

        [JsonProperty("i")]
        public string Instructions { get; set; }

        [JsonIgnore]
        public string Points { get; set; }

        [JsonIgnore]
        public Location[] Poly { get; set; }
    }
}