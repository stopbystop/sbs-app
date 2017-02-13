namespace Yojowa.StopByStop
{
    public class ObjectProperty
    {
        public ObjectProperty(string name, string dbTypeInfo)
        {
            this.Name = name;
            this.DBTypeInfo = dbTypeInfo;
        }
        public string Name { get; private set; }

        public string DBTypeInfo { get; private set; }
    }

    public class ObjectProperty<T> : ObjectProperty
    {
        public ObjectProperty(string name, string dbTypeInfo) : base(name, dbTypeInfo)
        {
        }
    }
}