using Newtonsoft.Json;
using System;

namespace Yojowa.StopByStop
{
    /*
    public enum RootPoiCategory
    {
        Active = 5,
        Auto = 60,
        Food = 371,
        Hotels = 495,
        Restaurants = 835
    }
    */

    public class RootPoiCategory
    {
        [JsonProperty("t")]
        public PoiType2 PoiType { get; set; }

        [JsonProperty("c")]
        public int CategoryID { get; set; }

        [JsonProperty("scf")]
        public bool ShowSubCategoriesInFilters { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonPropertyAttribute("p")]
        public PoiPropertyMetadata[] Properties { get; set; }

        [JsonIgnore]
        public Func<int, string> SinglePluralLabel { get; set; }
    }
}
