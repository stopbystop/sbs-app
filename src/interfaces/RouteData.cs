namespace Yojowa.StopByStop
{
    using System;

    public class RouteData
    {
        public string ID { get; set; }

        public Location Start { get; set; }

        public Location End { get; set; }

        public string Data { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
