namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class ReviewGroup
    {
        [JsonProperty("id")]
        public string ID { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("iu")]
        public string ImageUrl { get; set; }

        [JsonProperty("i")]
        public string Icon { get; set; }

        [JsonProperty("rc")]
        public int ReviewCount { get; set; }

        [JsonProperty("u")]
        public string ReviewPageUrl { get; set; }


        [JsonProperty("riu")]
        public string RatingImageUrl { get; set; }

        [JsonProperty("r")]
        public double Rating { get; set; }
    }
}