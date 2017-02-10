namespace Yojowa.StopByStop
{
    public class ObjectProperty<T>
    {
        public ObjectProperty(string name)
        {
            this.Name = name;
        }
        public string Name { get; private set; }
    }
}