using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Yojowa.StopByStop.Web.Models
{
    public class PoiListModel
    {
        public PoiListModel(RouteJunction junction, IEnumerable<PoiOnJunction> pois, PoiType poiTypeToShow, string routeId)
        {
            this.Pois = pois;
            this.RouteJunction = junction;
            this.PoiTypeToShow = poiTypeToShow;
            this.RouteId = routeId;
        }

        public RouteJunction RouteJunction { get; private set; }

        public IEnumerable<PoiOnJunction> Pois { get; private set; }

        public PoiType PoiTypeToShow { get; set; }

        public string RouteId { get; set; }

    }
}