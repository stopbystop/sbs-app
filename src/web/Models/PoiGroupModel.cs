using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Yojowa.StopByStop.Web.Models
{
    public class PoiGroupModel
    {
        public PoiGroupModel(string routePathId, RouteJunction routeJunction, PoiOnJunction[] pois, string poiGroupType, PoiType poiType, Location fromLocation, Location toLocation)
        {
            this.FromLocation = fromLocation;
            this.ToLocation = toLocation;
            this.RouteJunction = routeJunction;
            this.Pois = pois;
            this.PoiGroupType = poiGroupType;
            this.RoutePathId = routePathId;
            this.PoiType = poiType;

            if (Pois.Length > 0)
            {
                this.ClosestPoi = pois.OrderBy(p => p.DistanceFromJunction).First();
            }
        }

        [JsonProperty("cp")]
        public PoiOnJunction ClosestPoi { get; set; }

        [JsonProperty("rid")]
        public string RoutePathId { get; set; }

        [JsonProperty("r")]
        public Route Route { get; set; }

        [JsonProperty("rj")]
        public RouteJunction RouteJunction { get; set; }

        [JsonProperty("p")]
        public PoiOnJunction[] Pois { get; set; }

        [JsonProperty("pgt")]
        public string PoiGroupType { get; set; }

        [JsonProperty("pt")]
        public PoiType PoiType { get; set; }

        [JsonProperty("fl")]
        public Location FromLocation { get; set; }

        [JsonProperty("tl")]
        public Location ToLocation { get; set; }

    }
}