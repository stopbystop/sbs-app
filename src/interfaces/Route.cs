namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class Route
    {
        [JsonProperty("fl")]
        public Location FromLocation { get; set; }

        [JsonProperty("tl")]
        public Location ToLocation { get; set; }

        [JsonProperty("s")]
        public RouteSegment[] RouteSegments { get; set; }

        [JsonIgnore]
        public Location[] Poly { get; set; }

        [JsonProperty("cl")]
        public Location CurrentLocation { get; set; }

        [JsonProperty("rid")]
        public string RouteId { get; set; }

        [JsonProperty("d")]
        public double Distance { get; set; }

        [JsonProperty("t")]
        public int TimeInSeconds { get; set; }

        /*
        [JsonProperty("fcat")]
        public PoiCategoryOccurrence[] FoodPoiCategories { get; set; }

        [JsonProperty("tfcat")]
        public string[] TopLevelFoodCategories { get; set; }
        */

        [JsonProperty(PropertyName = "diag")]
        public RouteDiagnostics Diagnostics { get; set; }
    }
}