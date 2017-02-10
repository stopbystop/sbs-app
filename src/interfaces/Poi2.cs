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

        [JsonProperty("cc")]
        public CountryCode CountryCode { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the price category expressed in decimals from 0.5 to 5.0
        /// </summary>
        /// <value>
        /// The price category.
        /// </value>
        [JsonProperty("pc")]
        public double PriceCategory { get; set; }

        [JsonProperty("nh")]
        public string Neighborhood { get; set; }
    }
}
