namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;

    public class Poi2
    {
        private Dictionary<string, Tuple<PoiProperty, object>> properties;

        public Poi2()
        {
            this.properties = new Dictionary<string, Tuple<PoiProperty, object>>();
        }

        [JsonProperty("t")]
        public PoiType2 PoiType { get; set; }

        [JsonProperty("id")]
        [JsonConverter(typeof(LongIDConverter))]
        public long ID { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonProperty("c")]
        public int[] Categories { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("un")]
        public string UrlName { get; set; }

        [JsonProperty("p")]
        public string PhoneNumber { get; set; }

        [JsonProperty("oh")]
        public double[] OpenHours { get; set; }

        [JsonProperty("pp")]
        public Dictionary<string, object> PrimaryProperties { get; set; }

        [JsonProperty("sp")]
        public Dictionary<string, object> SecondaryProperties { get; set; }

        public void PopulatePrimaryProperties(Dictionary<string, PoiPropertyMetadata> metadata)
        {
            this.PrimaryProperties = new Dictionary<string, object>();
            foreach (var prop in this.properties.Values)
            {
                if ((prop.Item1.AppliesTo & this.PoiType) != 0)
                {
                    switch (prop.Item1.PropertyType)
                    {
                        case PoiPropertyType.Primary:
                            this.PrimaryProperties.Add(prop.Item1.ID, prop.Item2);
                            break;

                        case PoiPropertyType.PrimaryMultipleChoice:
                            PoiPropertyMetadata propertyMetadata = metadata[prop.Item1.ID];

                            List<int> ids = new List<int>();

                            string[] values = (string[])prop.Item2;

                            if (values == null)
                            {
                                ids.Add(0);
                            }
                            else
                            {
                                foreach (var val in values)
                                {
                                    int valId = propertyMetadata.ValuesByName[val].ID;
                                    ids.Add(valId);
                                }
                            }

                            this.PrimaryProperties.Add(prop.Item1.ID, ids.ToArray());

                            break;
                        default:
                            break;
                    }
                }
            }
        }

        public void PopulateSecondaryProperties()
        {
            throw new NotImplementedException();
        }

        public void GenerateUrlName(string name, string address)
        {
            name = (name ?? "").Trim();
            name = name.ToLowerInvariant();
            
            // remove invalid characters
            name = Regex.Replace(name, "[^a-z0-9\\s-]", string.Empty);

            // reaplace spaces with -
            name = name.Replace(" ", "-");
            if (string.IsNullOrEmpty(name))
            {
                name = "place";
            }

            address = (address ?? "").Trim();
            address = address.ToLowerInvariant();

            // remove invalid characters and replace spaces up to first invalid character
            address = Regex.Match(address, "[a-z0-9\\s-']+")
                .Value.Replace("'", "")
                .Replace(" ", "-");


            this.UrlName = string.IsNullOrEmpty(address) ?
                name :
                name + "-" + address;
        }


        public void SetPropertyValue<T>(PoiProperty<T> property, T value)
        {
            this.properties.Add(property.ID, Tuple.Create<PoiProperty, object>(property, value));
        }

        public T GetPropertyValue<T>(PoiProperty<T> property)
        {
            if (!this.properties.ContainsKey(property.ID))
            {
                return default(T);
            }

            return ((T)this.properties[property.ID].Item2);
        }
    }
}
