namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class Poi2 : ObjectWithProperties
    {
        [JsonProperty("id")]
        public long ID { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonProperty("p")]
        public string PhoneNumber { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the price category expressed in decimals from 0.5 to 5.0
        /// </summary>
        /// <value>
        /// The price category.
        /// </value>
        [JsonProperty("pc")]
        public double? PriceCategory { get; set; }

        [JsonProperty("nh")]
        public string Neighborhood { get; set; }

        [JsonProperty("ds")]
        public string DiningStyle { get; set; }

        [JsonProperty("mt")]
        public string[] MealTypes { get; set; }

        [JsonProperty("f")]
        public string[] Features { get; set; }

        [JsonProperty("gf")]
        public string[] GoodFoor { get; set; }

        [JsonProperty("oh")]
        public double[] OpenHours { get; set; }

        [JsonProperty("sa")]
        public string StreetAddress { get; set; }

        [JsonProperty("ca")]
        public string CityAddress { get; set; }

        [JsonProperty("ea")]
        public string ExtendedAddress { get; set; }
    }
}
