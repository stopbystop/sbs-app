using System.Collections.Generic;

namespace Yojowa.StopByStop
{
    public class ObjectWithProperties
    {
        private Dictionary<string, object> properties;

        public ObjectWithProperties()
        {
            this.properties = new Dictionary<string, object>();
        }

        public void SetPropertyValue<T>(ObjectProperty<T> property, T value)
        {
            this.properties.Add(property.Name, value);
        }

        public T GetPropertyValue<T>(ObjectProperty<T> property)
        {
            if (!this.properties.ContainsKey(property.Name))
            {
                return default(T);
            }

            return ((T)this.properties[property.Name]);
        }
    }
}