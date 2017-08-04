namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;
    using System;

    public class Review
    {
        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("r")]
        public int? Rating { get; set; }

        [JsonProperty("c")]
        public string Comment { get; set; }

        [JsonProperty("d")]
        public DateTime ReviewDate { get; set; }
    }
}
