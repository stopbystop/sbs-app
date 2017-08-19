using System;
using Newtonsoft.Json;

namespace Yojowa.StopByStop
{

    public class LongIDConverter : JsonConverter
    {
        public override bool CanConvert (Type objectType)
        {
            return (typeof (long) == objectType);
        }

        public override bool CanRead { get { return true; } }
        public override bool CanWrite { get { return true; } }

        public override object ReadJson (JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (existingValue is long)
            {
                return (long) existingValue;
            }
            else
            {
                return long.Parse ((string) existingValue);
            }
        }

        public override void WriteJson (JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteToken (JsonToken.String, value.ToString ());
        }
    }
}