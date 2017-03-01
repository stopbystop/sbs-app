
namespace Yojowa.StopByStop
{
    public class PoiProperty
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string IconID { get; set; }

        public PoiPropertyValue[] Values { get; set; }
        
    }

    public class PoiPropertyValue
    {
        public int ID { get; set; }

        public string Name { get; set; }
    }
}
