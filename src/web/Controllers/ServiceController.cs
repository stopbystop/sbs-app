namespace Yojowa.StopByStop.Web.Controllers
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    [NoCache]
    public class ServiceController : Controller, IStopByStopService
    {
        #region FindPlacesByName
        [HttpGet]
        public JsonResult FindPlacesByName(string name, bool useCache)
        {
            return Json(((IStopByStopService)this).FindPlacesByName(name, useCache), JsonRequestBehavior.AllowGet);
        }

        GeoPlace[] IStopByStopService.FindPlacesByName(string name, bool useCache)
        {
            return StopByStopService.Instance.FindPlacesByName(name, useCache);
        }
        #endregion

        #region GetJunctionFromOSMID
        [HttpGet]
        public JsonResult GetJunctionFromOSMID(long osmId, bool populatePOICategories)
        {
            return Json(((IStopByStopService)this).GetJunctionFromOSMID(osmId, populatePOICategories), JsonRequestBehavior.AllowGet);
        }
        Junction IStopByStopService.GetJunctionFromOSMID(long osmId, bool populatePOICategories)
        {
            return StopByStopService.Instance.GetJunctionFromOSMID(osmId, populatePOICategories);
        }
        #endregion

        #region GetLastRoutes
        public JsonResult GetLastRoutes()
        {
            return Json(((IStopByStopService)this).GetLastRoutes(), JsonRequestBehavior.AllowGet);
        }

        Route[] IStopByStopService.GetLastRoutes()
        {
            return StopByStopService.Instance.GetLastRoutes();
        }
        #endregion

        #region GetLocationFromPlaceID
        public JsonResult GetLocationFromPlaceID(string placeId)
        {
            return Json(((IStopByStopService)this).GetLocationFromPlaceID(placeId), JsonRequestBehavior.AllowGet);
        }
        Location IStopByStopService.GetLocationFromPlaceID(string placeId)
        {
            return StopByStopService.Instance.GetLocationFromPlaceID(placeId);
        }
        #endregion

        #region GetPois
        public JsonResult GetPois(string poiAreaString)
        {
            Location poiArea = JsonConvert.DeserializeObject<Location>(poiAreaString);
            return Json(((IStopByStopService)this).GetPois(poiArea), JsonRequestBehavior.AllowGet);
        }

        PoisWithAreaDiagnostics IStopByStopService.GetPois(Location poiArea)
        {
            return StopByStopService.Instance.GetPois(poiArea);
        }
        #endregion

        #region GetReviews
        Review[] IStopByStopService.GetReviews(string SBSID)
        {
            return StopByStopService.Instance.GetReviews(SBSID);
        }
        public JsonResult GetReviews(string SBSID)
        {
            return Json(((IStopByStopService)this).GetReviews(SBSID), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetRoute
        public JsonResult GetRoute(string routeId, string startString, string endString, string routeOptionsString)
        {
            Location start = JsonConvert.DeserializeObject<Location>(startString);
            Location end = JsonConvert.DeserializeObject<Location>(endString);
            RouteOptions routeOptions = JsonConvert.DeserializeObject<RouteOptions>(routeOptionsString);

            return Json(((IStopByStopService)this).GetRoute(routeId, start, end, routeOptions), JsonRequestBehavior.AllowGet);
        }
        Route IStopByStopService.GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions)
        {
            return StopByStopService.Instance.GetRoute(routeId, start, end, routeOptions);
        }
        #endregion

        #region GetRouteLocationsFromRoutePathId
        public JsonResult GetRouteLocationsFromRoutePathId(string pathId)
        {
            throw new NotImplementedException();
        }
        Location[] IStopByStopService.GetRouteLocationsFromRoutePathId(string pathId)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region SubmitReview
        public JsonResult SubmitReview(string SBSID, string reviewString)
        {
            Review review = JsonConvert.DeserializeObject<Review>(reviewString);
            ((IStopByStopService)this).SubmitReview(SBSID, review);
            return Json("");
        }
        void IStopByStopService.SubmitReview(string SBSID, Review review)
        {
            StopByStopService.Instance.SubmitReview(SBSID, review);
        }
        #endregion

        #region UpdateRouteProgress
        public JsonResult UpdateRouteProgress(string routeId, string currentLocationString)
        {
            Location currentLocation = JsonConvert.DeserializeObject<Location>(currentLocationString);
            return Json(((IStopByStopService)this).UpdateRouteProgress(routeId, currentLocation), JsonRequestBehavior.AllowGet);
        }
        Route IStopByStopService.UpdateRouteProgress(string routeId, Location currentLocation)
        {
            return StopByStopService.Instance.UpdateRouteProgress(routeId, currentLocation);
        }
        #endregion
    }
}