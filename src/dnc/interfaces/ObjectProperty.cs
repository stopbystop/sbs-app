namespace Yojowa.StopByStop
{
    public class PoiProperty
    {
        public PoiProperty(string id, string dbName, string dbTypeInfo, PoiType2 appliesTo = PoiType2.all, PoiPropertyType propertyType = PoiPropertyType.Excluded)
        {
            this.DBName = dbName;
            this.DBTypeInfo = dbTypeInfo;
            this.ID = id;
            this.AppliesTo = appliesTo;
            this.PropertyType = propertyType;
        }
        public string DBName { get; private set; }

        public string DBTypeInfo { get; private set; }

        public string ID { get; private set; }

        public PoiType2 AppliesTo { get; private set; }

        public PoiPropertyType PropertyType { get; private set; }
    }

    public class PoiProperty<T> : PoiProperty
    {
        public PoiProperty(string id, string dbName, string dbTypeInfo, PoiType2 appliesTo = PoiType2.all, PoiPropertyType propertyType = PoiPropertyType.Excluded) : base(id, dbName, dbTypeInfo, appliesTo, propertyType)
        {
        }
    }

    public enum PoiPropertyType
    {
        Excluded,
        Primary,
        PrimaryMultipleChoice,
        Secondary
    }
}