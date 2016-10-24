using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Yojowa.StopByStop.Web.Models
{
    public class ExitModel
    {
        public ExitModel(string routePathId, RouteJunction routeJunction, Location fromLocation, Location toLocation)
        {
            this.RouteJunction = routeJunction;
            this.RoutePathId = routePathId;
            this.FromLocation = fromLocation;
            this.ToLocation = toLocation;
        }

        [JsonProperty("rid")]
        public string RoutePathId { get; set; }

        [JsonProperty("rj")]
        public RouteJunction RouteJunction { get; set; }

        [JsonProperty("fl")]
        public Location FromLocation { get; set; }

        [JsonProperty("tl")]
        public Location ToLocation { get; set; }

    }
}