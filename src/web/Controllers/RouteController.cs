namespace Yojowa.StopByStop.Web.Controllers
{
    using Microsoft.ApplicationInsights;
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Yojowa.StopByStop.Utils;
    using Yojowa.StopByStop.Web.Models;


    [NoCache]
    public class RouteController : Controller
    {
        private static Random random = new System.Random();
        private static TelemetryClient telemetryClient = new TelemetryClient();


        [Route("route/{id}/exit/{exitId}/{poiTypeString}")]
        public ActionResult PoiGroup(string id, string exitId, string poiTypeString)
        {
            long osmId;
            RouteJunction routeJunction = GetJunctionFromExitId(exitId, out osmId);
            if (routeJunction == null)
            {
                StopByStop.Route route = GetRouteFromRoutePathId(id);
                if (route != null)
                {
                    routeJunction = route.RouteSegments
                     .SelectMany(rs => rs.RouteJunctions)
                     .SingleOrDefault(rj => rj.Junction.SBSID.Equals(exitId, StringComparison.OrdinalIgnoreCase));

                    if (routeJunction != null)
                    {
                        telemetryClient.TrackEvent("PoiGroupToOSMFormatRedirect");
                        string requestFullUrl = HttpContext.Request.Url.ToString();
                        string redirectUrl = requestFullUrl
                            .Substring(0, requestFullUrl.IndexOf("route")) +
                            string.Format("route/{0}/exit/osm-{1}/{2}", id, routeJunction.Junction.OSMID, poiTypeString);

                        return RedirectPermanent(redirectUrl);
                    }
                }
                else
                {
                    telemetryClient.TrackEvent("RouteNotFound",
                          new Dictionary<string, string>() { { "MissingRoute", id } });
                    telemetryClient.TrackException(
                        new InvalidOperationException(string.Format("PoiGroup Action - Cannot find route. id={0}, exitId={1}", id, exitId)));

                    return RedirectToAction("Index", "Home");
                }
            }

            if (routeJunction != null)
            {
                Location fromLocation, toLocation;
                var fromAndTo = StopByStopService.Instance.GetRouteLocationsFromRoutePathId(id);
                fromLocation = fromAndTo[0];
                toLocation = fromAndTo[1];


                PoiType poiType;
                string poiTypeName;

                poiType = PoiType.General;
                poiTypeName = string.Empty;

                switch (poiTypeString.ToLowerInvariant())
                {
                    case "gas":
                        poiTypeName = "Gas stations";
                        poiType = PoiType.Gas;
                        break;
                    case "food":
                        poiTypeName = "Places to eat";
                        poiType = PoiType.Food;
                        break;
                }

                if (poiType != PoiType.General)
                {
                    PoiOnJunction[] pois = routeJunction.Junction.Pois.Where(p => p.Poi.PoiType == poiType).ToArray();
                    if (pois.Length > 0)
                    {

                        return View(new PoiGroupModel(id, routeJunction, pois, poiTypeName, poiType, fromLocation, toLocation));
                    }
                }

                return View("Exit", new ExitModel(id, routeJunction, fromLocation, toLocation));
            }
            else
            {
                // routeJunction not found
                StopByStop.Route route = GetRouteFromRoutePathId(id);
                if (route != null)
                {
                    telemetryClient.TrackEvent("ExitNotFound",
                        new Dictionary<string, string>() { { "MissingExit", id + "/" + exitId } });
                    telemetryClient.TrackException(
                        new InvalidOperationException(string.Format("PoiGroup Action - Cannot find exit. id={0}, exitId={1}", id, exitId)));
                    return View("Route", new RouteModel(route, id));
                }
                else
                {
                    telemetryClient.TrackEvent("RouteNotFound",
                         new Dictionary<string, string>() { { "MissingRoute", id } });
                    telemetryClient.TrackException(
                        new InvalidOperationException(string.Format("PoiGroup Action - Cannot find route. id={0}, exitId={1}", id, exitId)));
                    return RedirectToAction("Index", "Home");
                }
            }
        }

        [Route("route/{id}/exit/{exitId}")]
        public ActionResult Exit(string id, string exitId)
        {
            return this.PoiGroup(id, exitId, string.Empty);
        }

        [Route("random/")]
        public ActionResult Random()
        {
            string pathId = string.Format("{0},{1}-to-tacoma-wa-united-states",
               (double)random.Next(2500000, 5000000) / 100000.00,
               (double)random.Next(-12500000, -6600000) / 100000.00);

            StopByStop.Route route = GetRouteFromRoutePathId(pathId);

            return View("Route", new RouteModel(route, pathId));

        }


        [HttpGet]
        [Route("routedata/{id}")]
        public JsonResult RouteJsonData(string id)
        {
            StopByStop.Route route = GetRouteFromRoutePathId(id);
            return Json(route, JsonRequestBehavior.AllowGet);
        }

        [Route("route/{id}")]
        public ActionResult Route(string id)
        {
            StopByStop.Route route = GetRouteFromRoutePathId(id);
            if (route != null)
            {
                return View("Route", new RouteModel(route, id));
            }
            return RedirectToAction("Index", "Home");
        }

        [Route("route/{id}/exit")]
        public ActionResult EmptyExit(string id)
        {
            return Route(id);
        }


        private StopByStop.Route GetRouteFromRoutePathId(string routePathId)
        {
            var fromAndTo = StopByStopService.Instance.GetRouteLocationsFromRoutePathId(routePathId);
            if (fromAndTo[0] != Location.Unknown && fromAndTo[1] != Location.Unknown)
            {
                var route = StopByStopService.Instance.GetRoute(
                            routePathId,
                            fromAndTo[0],
                            fromAndTo[1],
                            new RouteOptions()
                            {
                                ExcludeJunctionsWithoutExitInfo = false,
                            });

                return route;
            }

            return null;
        }

        private static RouteJunction GetJunctionFromExitId(string exitId, out long osmId)
        {
            RouteJunction routeJunction = null;
            osmId = 0;
            if (long.TryParse(Regex.Match(exitId, "osm-(?<id>[0-9]+)").Groups["id"].Value, out osmId))
            {
                var junction = StopByStopService.Instance.GetJunctionFromOSMID(osmId, true);
                routeJunction = new RouteJunction()
                {
                    Junction = junction
                };
            }
            return routeJunction;
        }
    }
}