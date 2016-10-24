using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Yojowa.StopByStop.Web.Models
{
    public class HomeModel
    {
        public HomeModel(Route[] popularRoutes)
        {
            this.PopularRoutes = popularRoutes;
        }

        public Route[] PopularRoutes{ get; set; }

    }
}