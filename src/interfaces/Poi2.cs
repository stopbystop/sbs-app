using Newtonsoft.Json;

namespace Yojowa.StopByStop
{
    public class Poi2
    {

        public Poi2()
        {

        }


        [JsonProperty("id")]
        public long ID { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonProperty("p")]
        public string PhoneNumber { get; set; }

        [JsonProperty("cc")]
        public CountryCode CountryCode { get; set; }
    }
}
