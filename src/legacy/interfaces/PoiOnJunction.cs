namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class PoiOnJunction
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(LongIDConverter))]
        public long ID { get; set; }

        [JsonProperty("dfj")]
        public double DistanceFromJunction { get; set; }

        [JsonProperty("p")]
        public Poi2 Poi { get; set; }

        public override string ToString()
        {
            return ID + " " + Poi.ToString();
        }
    }
}