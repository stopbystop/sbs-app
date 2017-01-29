namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;

    public class Poi
    {
        public Poi()
        {
        }

        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("c")]
        public string[] PoiCategoryIDs { get; set; }

        [JsonProperty("pt")]
        public PoiType PoiType { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("d")]
        public string Description { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonProperty("i")]
        public PoiImage[] Images { get; set; }

        [JsonProperty("rg")]
        public ReviewGroup[] ReviewGroups { get; set; }

        public override string ToString()
        {
            return string.Format("{0} ({1},{2})", this.SBSID, this.Location.Lat, this.Location.Lon);
        }
    }
}