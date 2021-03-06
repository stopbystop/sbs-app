﻿namespace Yojowa.StopByStop.Web.Controllers
{
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System;
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using Service;
    using Yojowa.StopByStop.Utils;
    using Yojowa.StopByStop.Web.Models;

    [ResponseCache (Location = ResponseCacheLocation.None, NoStore = true)]
    public class RouteController : Controller
    {
        private static Random random = new System.Random ();
        protected static TelemetryClient telemetryClient = new TelemetryClient ();

        [Route ("route/{id}/exit/{exitId}/{poiTypeString}")]
        public ActionResult PoiGroup (string id, string exitId, string poiTypeString)
        {
            long osmId;
            RouteJunction routeJunction = null;
            StopByStop.Route route = GetRouteFromRoutePathId (id, false);
            var metadata = StopByStopService.RouteServiceInstance.GetMetadata ();

            if (route != null)
            {
                routeJunction = GetJunctionFromExitId (exitId, out osmId);
            }

            if (routeJunction == null)
            {
                if (route != null)
                {
                    routeJunction = route.RouteSegments
                        .SelectMany (rs => rs.RouteJunctions)
                        .SingleOrDefault (rj => rj.Junction.SBSID.Equals (exitId, StringComparison.OrdinalIgnoreCase));

                    if (routeJunction != null)
                    {
                        telemetryClient.TrackEvent ("PoiGroupToOSMFormatRedirect");
                        string requestFullUrl = HttpContext.Request.Path.Value;
                        string redirectUrl = requestFullUrl
                            .Substring (0, requestFullUrl.IndexOf ("route")) +
                            string.Format ("route/{0}/exit/osm-{1}/{2}", id, routeJunction.Junction.OSMID, poiTypeString);

                        return RedirectPermanent (redirectUrl);
                    }
                }
                else
                {
                    telemetryClient.TrackEvent ("RouteNotFound",
                        new Dictionary<string, string> () { { "MissingRoute", id } });
                    telemetryClient.TrackException (
                        new InvalidOperationException (string.Format ("PoiGroup Action - Cannot find route. id={0}, exitId={1}", id, exitId)));

                    return RedirectToAction ("Index", "Home");
                }
            }

            var model = new MainModel (metadata, this.HttpContext)
            {
                Page = ClientPage.Route,
                RouteId = id,
                Route = route,
                ExitId = exitId,
            };

            PoiType2 poiType = PoiType2.all;

            if (routeJunction != null)
            {
                if (!string.IsNullOrEmpty (poiTypeString))
                {
                    PoiType2 parsedPoiType;
                    if (Enum.TryParse<PoiType2> (poiTypeString, out parsedPoiType))
                    {
                        poiType = parsedPoiType;
                    }
                }

                model.Page = ClientPage.Exit;
                model.ExitId = exitId;
                model.PoiType = poiType;
            }
            else
            {
                if (route != null)
                {
                    telemetryClient.TrackEvent ("ExitNotFound",
                        new Dictionary<string, string> () { { "MissingExit", id + "/" + exitId } });
                    telemetryClient.TrackException (
                        new InvalidOperationException (string.Format ("PoiGroup Action - Cannot find exit. id={0}, exitId={1}", id, exitId)));
                    model.Page = ClientPage.Route;

                }
                else
                {
                    telemetryClient.TrackEvent ("RouteNotFound",
                        new Dictionary<string, string> () { { "MissingRoute", id } });
                    telemetryClient.TrackException (
                        new InvalidOperationException (string.Format ("PoiGroup Action - Cannot find route. id={0}, exitId={1}", id, exitId)));
                    model.Page = ClientPage.Home;
                }
            }

            return View ("~/Views/Main.cshtml", new MainModel (metadata, this.HttpContext)
            {
                Page = ClientPage.Exit,
                    RouteId = id,
                    Route = route,
                    ExitId = exitId,
                    PoiType = poiType
            });
        }

        [Route ("route/{id}/exit/{exitId}")]
        public ActionResult Exit (string id, string exitId)
        {
            return this.PoiGroup (id, exitId, string.Empty);
        }

        [Route ("random/")]
        public ActionResult Random ()
        {
            WriteSBSDebug ("Random endpoint request");

            StopByStop.Route route = null;
            int attempts = 10;
            int attemptIndex = 1;

            while (attemptIndex <= attempts)
            {
               
                string pathId = string.Format ("{0},{1}-to-tacoma-wa-united-states",
                    (double) random.Next (2500000, 5000000) / 100000.00,
                    (double) random.Next (-12500000, -6600000) / 100000.00);

                route = GetRouteFromRoutePathId (pathId, false);
                WriteSBSDebug ("Attempt {0} of {1}: {2}", attemptIndex, attempts, pathId);
                if (route != null)
                {
                    WriteSBSDebug ("Found route. Rendering");
                    return View ("~/Views/Main.cshtml",
                        new MainModel (StopByStopService.RouteServiceInstance.GetMetadata (), this.HttpContext)
                        {
                            Page = ClientPage.Route,
                                RouteId = pathId,
                                Route = route
                        });
                }

                 attemptIndex++;
            }

            WriteSBSDebug ("Couldn't find random route after {0} attempts", attempts);
            return new NotFoundResult ();
        }

        [Route ("route/{id}")]
        public ActionResult Route (string id)
        {
            StopByStop.Route route = GetRouteFromRoutePathId (id, false);
            if (route != null)
            {
                return View ("~/Views/Main.cshtml",
                    new MainModel (StopByStopService.RouteServiceInstance.GetMetadata (), this.HttpContext)
                    {
                        Page = ClientPage.Route,
                            RouteId = id,
                            Route = route
                    });
            }
            return RedirectToAction ("Index", "Home");
        }

        [Route ("route/{id}/exit")]
        public ActionResult EmptyExit (string id)
        {
            return Route (id);
        }

        [HttpGet]
        [Route ("routedatav2/{id}/metadata/{withmetadata}")]
        public JsonResult RouteJsonDataV2 (string id, bool withMetadata)
        {
            StopByStop.Route route = GetRouteFromRoutePathId (id, withMetadata);
            return Json (route);
        }

        private static StopByStop.Route GetRouteFromRoutePathId (string routePathId, bool withMetadata)
        {
            Location fromLocation, toLocation;
            if (RouteUtils.GetRouteLocationsFromRoutePathId (routePathId, out fromLocation, out toLocation))
            {
                var route = StopByStopService.RouteServiceInstance.GetRoute (
                    routePathId,
                    fromLocation,
                    toLocation,
                    new RouteOptions ()
                    {
                        ExcludeJunctionsWithoutExitInfo = false,
                    });

                if (route != null && withMetadata)
                {
                    route.Metadata = StopByStopService.RouteServiceInstance.GetMetadata ();
                }

                return route;
            }

            return null;
        }

        private static RouteJunction GetJunctionFromExitId (string exitId, out long osmId)
        {
            RouteJunction routeJunction = null;
            osmId = 0;
            if (long.TryParse (Regex.Match (exitId, "osm-(?<id>[0-9]+)").Groups["id"].Value, out osmId))
            {
                var junction = StopByStopService.RouteServiceInstance.GetJunctionFromOSMID (osmId, true);
                routeJunction = new RouteJunction ()
                {
                    Junction = junction
                };
            }
            return routeJunction;
        }

        private static void WriteSBSDebug (string message, params object[] args)
        {
            Console.WriteLine ("[!!!***[SBSDEBUG]***!!!] " + message, args);
        }
    }
}