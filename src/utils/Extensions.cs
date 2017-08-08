namespace Yojowa.StopByStop
{
    using System;
    
    public static class Extensions
    {
        public static void ForEach<T> (this Array arr, Action<T> action)
        {
            foreach (var o in arr)
            {
                action((T)o);
            }
        }
    }
}