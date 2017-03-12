using Newtonsoft.Json;
using System;

namespace Yojowa.StopByStop
{

    public class LongIDConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return (typeof(long) == objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return long.Parse((string)existingValue);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteToken(JsonToken.String, value.ToString());
        }
    }
}