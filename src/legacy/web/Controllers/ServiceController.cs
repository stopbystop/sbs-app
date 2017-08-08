namespace Yojowa.StopByStop.Web.Controllers
{
    using Newtonsoft.Json;
    using Service;
    using System.Web.Mvc;
    using System;

    [NoCache]
    public class ServiceController : Controller, IRouteService, IPlacesService
    {
        #region IRouteService
        #region GetJunctionFromOSMID
        [HttpGet]
        public JsonResult GetJunctionFromOSMID(long osmId, bool populatePOICategories)
        {
            return Json(((IRouteService)this).GetJunctionFromOSMID(osmId, populatePOICategories), JsonRequestBehavior.AllowGet);
        }
        Junction IRouteService.GetJunctionFromOSMID(long osmId, bool populatePOICategories)
        {
            return StopByStopService.RouteServiceInstance.GetJunctionFromOSMID(osmId, populatePOICategories);
        }
        #endregion

        #region GetLastRoutes
        public JsonResult GetLastRoutes()
        {
            return Json(((IRouteService)this).GetLastRoutes(), JsonRequestBehavior.AllowGet);
        }

        Route[] IRouteService.GetLastRoutes()
        {
            return StopByStopService.RouteServiceInstance.GetLastRoutes();
        }
        #endregion

        #region GetPoisInArea
        public JsonResult GetPoisInArea(string poiAreaString, bool primaryFieldsOnly)
        {
            Location poiArea = JsonConvert.DeserializeObject<Location>(poiAreaString);
            return Json(((IRouteService)this).GetPoisInArea(poiArea, primaryFieldsOnly), JsonRequestBehavior.AllowGet);
        }

        Poi2[] IRouteService.GetPoisInArea(Location center, bool primaryFieldsOnly)
        {
            return StopByStopService.RouteServiceInstance.GetPoisInArea(center, primaryFieldsOnly);
        }
        #endregion

        #region GetPois
        public JsonResult GetPois(string poiIdsString, bool primaryFieldsOnly)
        {
            long[] poiIds = JsonConvert.DeserializeObject<long[]>(poiIdsString);
            return Json(((IRouteService)this).GetPois(poiIds, primaryFieldsOnly), JsonRequestBehavior.AllowGet);
        }

        Poi2[] IRouteService.GetPois(long[] poiIds, bool primaryFieldsOnly)
        {
            return StopByStopService.RouteServiceInstance.GetPois(poiIds, primaryFieldsOnly);
        }
        #endregion

        #region GetReviews
        Review[] IRouteService.GetReviews(string SBSID)
        {
            return StopByStopService.RouteServiceInstance.GetReviews(SBSID);
        }
        public JsonResult GetReviews(string SBSID)
        {
            return Json(((IRouteService)this).GetReviews(SBSID), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetRoute
        public JsonResult GetRoute(string routeId, string startString, string endString, string routeOptionsString)
        {
            Location start = JsonConvert.DeserializeObject<Location>(startString);
            Location end = JsonConvert.DeserializeObject<Location>(endString);
            RouteOptions routeOptions = JsonConvert.DeserializeObject<RouteOptions>(routeOptionsString);

            return Json(((IRouteService)this).GetRoute(routeId, start, end, routeOptions), JsonRequestBehavior.AllowGet);
        }
        Route IRouteService.GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions)
        {
            return StopByStopService.RouteServiceInstance.GetRoute(routeId, start, end, routeOptions);
        }
        #endregion

        #region SubmitReview
        public JsonResult SubmitReview(string SBSID, string reviewString)
        {
            Review review = JsonConvert.DeserializeObject<Review>(reviewString);
            ((IRouteService)this).SubmitReview(SBSID, review);
            return Json("");
        }
        void IRouteService.SubmitReview(string SBSID, Review review)
        {
            StopByStopService.RouteServiceInstance.SubmitReview(SBSID, review);
        }
        #endregion

        #region UpdateRouteProgress
        public JsonResult UpdateRouteProgress(string routeId, string currentLocationString)
        {
            Location currentLocation = JsonConvert.DeserializeObject<Location>(currentLocationString);
            return Json(((IRouteService)this).UpdateRouteProgress(routeId, currentLocation), JsonRequestBehavior.AllowGet);
        }


        Route IRouteService.UpdateRouteProgress(string routeId, Location currentLocation)
        {
            return StopByStopService.RouteServiceInstance.UpdateRouteProgress(routeId, currentLocation);
        }
        #endregion

        #region GetMetadata

        public JsonResult GetMetadata()
        {
            return Json(((IRouteService)this).GetMetadata(), JsonRequestBehavior.AllowGet);
        }

        Metadata IRouteService.GetMetadata()
        {
            return StopByStopService.RouteServiceInstance.GetMetadata();
        }

        #endregion

        #region GetPoiReviewData
        public JsonResult GetPoiReviewData(string areaString)
        {
            Location area = JsonConvert.DeserializeObject<Location>(areaString);
            return Json(((IRouteService)this).GetPoiReviewData(area), JsonRequestBehavior.AllowGet);
        }

        ReviewGroup[] IRouteService.GetPoiReviewData(Location area)
        {
            return StopByStopService.RouteServiceInstance.GetPoiReviewData(area);
        }
        #endregion

        #endregion

        #region IPlacesService
        #region GetPlaceById
        public JsonResult GetPlaceById(string placeId)
        {
            return Json(((IPlacesService)this).GetPlaceById(placeId), JsonRequestBehavior.AllowGet);
        }
        GeoPlace IPlacesService.GetPlaceById(string placeId)
        {
            return StopByStopService.PlacesServiceInstance.GetPlaceById(placeId);
        }
        #endregion

        #region FindPlacesByPartialMatch
        public JsonResult FindPlacesByPartialMatch(string name, int maxItems)
        {
            return Json(((IPlacesService)this).FindPlacesByPartialMatch(name, maxItems), JsonRequestBehavior.AllowGet);
        }

        GeoPlace[] IPlacesService.FindPlacesByPartialMatch(string name, int maxItems)
        {
            return StopByStopService.PlacesServiceInstance.FindPlacesByPartialMatch(name, maxItems);
        }
        #endregion

        #region FindPlacesInArea
        public JsonResult FindPlacesInArea(string locationString, int maxItems)
        {
            Location location = JsonConvert.DeserializeObject<Location>(locationString);
            return Json(((IPlacesService)this).FindPlacesInArea(location, maxItems), JsonRequestBehavior.AllowGet);
        }

        GeoPlace[] IPlacesService.FindPlacesInArea(Location center, int maxItems)
        {
            return StopByStopService.PlacesServiceInstance.FindPlacesInArea(center, maxItems);
        }
        #endregion

        #region GetLocationFromPlaceId
        public JsonResult GetLocationFromPlaceId(string placeId)
        {
            return Json(((IPlacesService)this).GetLocationFromPlaceId(placeId), JsonRequestBehavior.AllowGet);
        }

        Location IPlacesService.GetLocationFromPlaceId(string placeId)
        {
            return StopByStopService.PlacesServiceInstance.GetLocationFromPlaceId(placeId);
        }


        #endregion

        #endregion
    }
}