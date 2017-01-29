namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;
    using System;
    using System.Web.Script.Serialization;

    public class Location
    {
        public Location()
        {
        }

        public Location(double lat, double lon, string placeDescription = null)
        {
            this.Lat = lat;
            this.Lon = lon;
            this.PlaceDescription = placeDescription;
        }

        public static readonly Location Unknown = new Location() { IsCustom = true, PlaceDescription = string.Empty };

        [JsonProperty("a")]
        public double Lat { get; set; }

        [JsonProperty("o")]
        public double Lon { get; set; }

        [JsonProperty("pd")]
        public string PlaceDescription { get; set; }

        [JsonIgnore]
        [ScriptIgnore]
        public string PlaceDescriptionShort
        {
            get
            {

                if (!string.IsNullOrEmpty(this.PlaceDescription) && this.PlaceDescription.Contains("("))
                {
                    return this.PlaceDescription.Substring(0, this.PlaceDescription.IndexOf('('));
                }

                return this.PlaceDescription;
            }

        }

        [JsonIgnore]
        public string ShortKey
        {
            get
            {
                return string.Format("{0:0.0}-{1:0.0}", Math.Round(this.Lat, 1), Math.Round(this.Lon, 1));
            }
        }

        /// <summary>
        /// True if this is a custom (unnamed) location, false otherwise
        /// </summary>
        [JsonIgnore]
        public bool IsCustom { get; set; }

        public override string ToString()
        {
            return string.Format("{0:0.0}-{1:0.0}", Math.Round(this.Lat, 4), Math.Round(this.Lon, 4));
        }
    }
}