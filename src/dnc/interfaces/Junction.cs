using Newtonsoft.Json;

namespace Yojowa.StopByStop
{
    public class Junction
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("oid")]
        public long OSMID { get; set; }

        [JsonProperty("hn")]
        // name of the highway on which there's a junction
        public string HighwayName { get; set; }

        [JsonProperty("r")]
        public string Ref { get; set; }

        [JsonProperty("shr")]
        public string ShortRef { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonIgnore]
        public Location SnappedLocation { get; set; }

        /// <summary>
        /// exit_to from Overpass API - where exit leads. Either exit_to is populated or both exit_to:left and exit_to:right are populated
        /// </summary>
        [JsonProperty("et")]
        public string ExitTo { get; set; }


        /// <summary>
        /// exit_to:left from Overpass API - where exit leads after left turn
        /// </summary>
        [JsonProperty("etl")]
        public string ExitToLeft { get; set; }

        [JsonProperty("etr")]
        public string ExitToRight { get; set; }

        [JsonProperty("p")]
        public PoiOnJunction[] Pois { get; set; }

        public override string ToString()
        {
            return this.Ref;
        }

        [JsonProperty(PropertyName = "jd")]
        public JunctionDiagnostics Diagnostics { get; set; }
    }
}