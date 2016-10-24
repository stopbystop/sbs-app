using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Yojowa.StopByStop.Web.Models
{
    public class RouteModel
    {
        public RouteModel(Route route, string routePathId)
        {
            this.Route = route;
            this.RoutePathId = routePathId;
        }

        public Route Route { get; set; }

        public string RoutePathId { get; set; }

    }
}