namespace Yojowa.StopByStop
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web.Script.Serialization;

    public enum PoiDataKind
    {
        Cache,
        Live,
        Backup
    }



    public interface IBEStore
    {
        /// <summary>
        /// Returns overpass data from a single unit defined by top left lat-long coordinate. Lat and long can have a single decimal point that can be either 0 or 5, 
        /// that is the grain is 0.5. For example it can be 47.0, 47.5, 48.0, but not 48.2
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        string GetOverpassJunctionData(Location topLeft);


        /// <summary>
        /// Returns POIs from a single unit defined by top left lat-long coordinate. The grain is 0.1. For example it can be 47.0, 47.1, 48.0, but not 48.15
        /// </summary>
        /// <param name="nWest">North-west coordinate of the region</param>
        /// <param name="dataKind">Kind of data to retrieve</param>
        /// <returns></returns>
        Yojowa.StopByStop.Poi[] GetPois(Location nWest, PoiDataKind dataKind, DateTime fromTime);


        void SavePois(Location location, Yojowa.StopByStop.Poi[] pois, PoiDataKind dataKind);


        /// <summary>
        /// Gets places by name
        /// </summary>
        /// <param name="name">Name typed by user</param>
        /// <returns>List of places to display in the dropdown</returns>
        GeoPlace[] FindPlacesByName(string name, bool userCache);

        /// <summary>
        /// Submit user feedback. Feedback can be submitted for PoiOnJunction object and for Poi object - SBS id is present for both
        /// </summary>
        /// <param name="SBSID">ID</param>
        /// <param name="comment">User comment - limited to 256 characters</param>
        void SubmitReview(string SBSID, Review review);

        /// <summary>
        /// Gets reviews for SBSID
        /// </summary>
        /// <param name="SBSID"></param>
        /// <returns></returns>
        Review[] GetReviews(string SBSID);

        /// <summary>
        /// Gets stored route
        /// </summary>
        /// <param name="fromLocation"></param>
        /// <param name="toLocation"></param>
        /// <returns></returns>
        StopByStop.Route GetStoredRoute(string routeId);

        /// <summary>
        /// Saves route
        /// </summary>
        /// <param name="fromLocation"></param>
        /// <param name="toLocaiton"></param>
        /// <param name="route"></param>
        void SaveRoute(string routeId, StopByStop.Route route);

        /// <summary>
        /// Gets location from place id
        /// </summary>
        /// <param name="placeId">Place id</param>
        /// <returns>Location object</returns>
        Location GetLocationFromPlaceId(string placeId);


        Junction[] GetJunctionsWithinBounds(decimal south, decimal west, decimal north, decimal east);

        /// <summary>
        /// Gets all POIs
        /// </summary>
        /// <returns></returns>
        IEnumerable<Yojowa.StopByStop.Poi> GetAllPois();
    }

    public interface IPlacesService
    {
        /// <summary>
        /// Gets location from place id
        /// </summary>
        /// <param name="placeId">Place id</param>
        /// <returns>Location object</returns>
        Location GetLocationFromPlaceId(string placeId);

        /// <summary>
        /// Gets places by partial match
        /// </summary>
        /// <param name="text">Text typed by user</param>
        /// <param name="maxItems">Max number of items to return</param>
        /// <returns>Places to matching the input (not case sensitive), sorted by population in reverse order (starting from most populous)</returns>
        GeoPlace[] FindPlacesByPartialMatch(string name, int maxItems);

        /// <summary>
        /// Gets places around specified center location
        /// </summary>
        /// <param name="center">Center location</param>
        /// <param name="radiusInMiles">Max radius around the center location to search</param>
        /// <param name="maxItems">Max number of items to return (starting from the closest to the center</param>
        /// <returns></returns>
        GeoPlace[] FindPlacesInArea(Location center, double radiusInMiles);
    }

    public interface IStopByStopService
    {

        /// <summary>
        /// Gets the route
        /// </summary>
        /// <param name="start">Start location</param>
        /// <param name="end">End location</param>
        /// <param name="routeOptions">Route options. Please pass all default options</param>
        /// <returns></returns>
        Route GetRoute(string routeId, Location start, Location end, RouteOptions routeOptions);

        /// <summary>
        /// Call this API with current user location to get back the updated information about the route progress. In the object returned PortionCompleted
        /// property of RouteSegment's will be updated
        /// </summary>
        /// <param name="route">Route object</param>
        /// <param name="currentLocation">Current user location</param>
        Route UpdateRouteProgress(string routeId, Location currentLocation);

        /// <summary>
        /// Gets places by name
        /// </summary>
        /// <param name="name">Name typed by user</param>
        /// <returns>List of places to display in the dropdown</returns>
        GeoPlace[] FindPlacesByName(string name, bool useCache);

        /// <summary>
        /// Submit user feedback. Feedback can be submitted for PoiOnJunction object and for Poi object - SBS id is present for both
        /// </summary>
        /// <param name="SBSID">ID</param>
        /// <param name="comment">User comment - limited to 256 characters</param>
        void SubmitReview(string SBSID, Review review);

        /// <summary>
        /// Gets reviews for SBSID
        /// </summary>
        /// <param name="SBSID"></param>
        /// <returns></returns>
        Review[] GetReviews(string SBSID);


        /// <summary>
        /// Gets last routes
        /// </summary>
        /// <returns></returns>
        Route[] GetLastRoutes();

        /// <summary>
        /// Gets location from place id
        /// </summary>
        /// <param name="placeId"></param>
        /// <returns></returns>
        Location GetLocationFromPlaceID(string placeId);

        /// <summary>
        /// Gets junction from OSM id
        /// </summary>
        /// <param name="osmId"></param>
        /// <returns></returns>
        Junction GetJunctionFromOSMID(long osmId, bool populatePOICategories);

        /// <summary>
        /// Gets POIs and diagnostics information about the retrieval
        /// </summary>
        /// <param name="poiArea">POI area</param>
        /// <returns></returns>
        PoisWithAreaDiagnostics GetPois(Location poiArea);

        /// <summary>
        /// Gets route locations from path ID
        /// </summary>
        /// <param name="pathId">Path ID</param>
        /// <returns>Array consisting of 2 location elements</returns>
        Location[] GetRouteLocationsFromRoutePathId(string pathId);
    }




    public class GeoPlace
    {
        [JsonProperty("i")]
        public string ID { get; set; }

        [JsonProperty("sn")]
        public string ShortName { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }  

        [JsonProperty("p")]
        public long Population { get; set; }
    }


    public class RouteOptions
    {
        /// <summary>
        /// When set to true only exits with non-empty ExitTo, ExitToLeft, ExitToRight are included
        /// </summary>
        public bool ExcludeJunctionsWithoutExitInfo { get; set; }

        /// <summary>
        /// Distance in miles that defines POIs search radius
        /// </summary>
        // public double JunctionSearchRadius { get; set; }

        public IBEStore Store { get; set; }

        public bool OldTableNames { get; set; }

        public RouteOptions()
        {
        }

        public RouteOptions(bool ExcludeJunctionsWithoutExitInfo)
        {
            this.ExcludeJunctionsWithoutExitInfo = ExcludeJunctionsWithoutExitInfo;
        }

    }

    public class Location
    {
        public Location()
        {
        }

        public Location(double lat, double lon, string place = null, string placeDescription = null)
        {
            this.Lat = lat;
            this.Lon = lon;
            this.Place = place;
            this.PlaceDescription = placeDescription;
        }

        public static readonly Location Unknown = new Location() { IsCustom = true, Place = string.Empty, PlaceDescription = string.Empty };

        [JsonProperty("a")]
        public double Lat { get; set; }

        [JsonProperty("o")]
        public double Lon { get; set; }

        [JsonIgnore]
        public string Place { get; set; }

        [JsonProperty("pd")]
        public string PlaceDescription { get; set; }

        [JsonIgnore]
        [ScriptIgnore]
        public string PlaceDescriptionShort
        {
            get
            {

                if (!string.IsNullOrEmpty(this.PlaceDescription) && this.PlaceDescription.Contains("("))
                {
                    return this.PlaceDescription.Substring(0, this.PlaceDescription.IndexOf('('));
                }

                return this.PlaceDescription;
            }

        }

        [JsonIgnore]
        public string ShortKey
        {
            get
            {
                return string.Format("{0:0.0}-{1:0.0}", Math.Round(this.Lat, 1), Math.Round(this.Lon, 1));
            }
        }

        /// <summary>
        /// True if this is a custom (unnamed) location, false otherwise
        /// </summary>
        [JsonIgnore]
        public bool IsCustom { get; set; }

        public override string ToString()
        {
            return string.Format("{0:0.0}-{1:0.0}", Math.Round(this.Lat, 4), Math.Round(this.Lon, 4));
        }
    }


    public class RouteDiagnostics
    {

        [JsonProperty(PropertyName = "fmc")]
        public bool FromMemoryCache { get; set; }

        [JsonProperty(PropertyName = "fdc")]
        public bool FromDBCache { get; set; }

        [JsonProperty(PropertyName = "dbcheck")]
        public long DBCheckDuration { get; set; }

        [JsonProperty(PropertyName = "dbsave")]
        public long DBSaveDuration { get; set; }

        [JsonProperty(PropertyName = "poi")]
        public long POIPopulationDuration { get; set; }

        [JsonProperty(PropertyName = "route")]
        public long RouteRetrivalDuration { get; set; }

        [JsonProperty(PropertyName = "jcnt")]
        public int JunctionsCount { get; set; }
    }


    public class JunctionDiagnostics
    {
        [JsonProperty(PropertyName = "d")]
        public long ProcessDuration { get; set; }

        [JsonProperty(PropertyName = "area")]
        public AreaDiagnostics[] AreaDiagnosticItems { get; set; }
    }


    public class AreaDiagnostics
    {
        [JsonProperty(PropertyName = "i")]
        public string AreaInfo { get; set; }

        [JsonProperty(PropertyName = "fc")]
        public bool FromCache { get; set; }


    }

    public class PoisWithAreaDiagnostics
    {
        [JsonProperty(PropertyName ="p")]
        public Poi[] Pois { get; set; }

        [JsonProperty(PropertyName = "a")]
        public AreaDiagnostics AreaDiagnostics { get; set; }
    }


    public class Route
    {
        [JsonProperty("fl")]
        public Location FromLocation { get; set; }

        [JsonProperty("tl")]
        public Location ToLocation { get; set; }

        [JsonProperty("s")]
        public RouteSegment[] RouteSegments { get; set; }

        [JsonIgnore]
        public Location[] Poly { get; set; }

        [JsonProperty("cl")]
        public Location CurrentLocation { get; set; }

        [JsonProperty("rid")]
        public string RouteId { get; set; }

        [JsonProperty("d")]
        public double Distance { get; set; }

        [JsonProperty("t")]
        public int TimeInSeconds { get; set; }

        [JsonProperty("fcat")]
        public PoiCategoryOccurrence[] FoodPoiCategories { get; set; }

        [JsonProperty("tfcat")]
        public string[] TopLevelFoodCategories { get; set; }

        [JsonProperty(PropertyName = "diag")]
        public RouteDiagnostics Diagnostics { get; set; }
    }

    public class PoiCategoryOccurrence
    {
        [JsonProperty("cat")]
        public PoiCategory Category { get; set; }

        [JsonProperty("c")]
        public int Count { get; set; }
    }


    public class RouteSegment
    {
        [JsonProperty("hn")]
        public string HighwayName { get; set; }

        [JsonProperty("r")]
        public string Ref { get; set; }

        [JsonProperty("s")]
        public Location Start { get; set; }

        [JsonProperty("e")]
        public Location End { get; set; }

        [JsonProperty("d")]
        public double Distance { get; set; }

        [JsonProperty("j")]
        public RouteJunction[] RouteJunctions { get; set; }

        [JsonProperty("pc")]
        public double PortionCompleted { get; set; }

        [JsonProperty("si")]
        public int StartIndex { get; set; }

        [JsonProperty("ei")]
        public int EndIndex { get; set; }

        [JsonProperty("m")]
        public string Maneuver { get; set; }

        [JsonProperty("i")]
        public string Instructions { get; set; }

        [JsonIgnore]
        public string Points { get; set; }

        [JsonIgnore]
        public Location[] Poly { get; set; }
    }


    public class RouteJunction
    {
        [JsonIgnore]
        public double DistanceFromRouteSegmentStart { get; set; }

        [JsonProperty("dfrs")]
        public double DistanceFromRouteStart { get; set; }

        [JsonProperty("tfrs")]
        public int TimeFromRouteStart { get; set; }

        [JsonProperty("i")]
        public int Index { get; set; }

        [JsonProperty("j")]
        public Junction Junction { get; set; }
        public override string ToString()
        {
            return this.Junction.ToString() + " @ " + DistanceFromRouteSegmentStart.ToString("0.000");
        }
    }


    public class Junction
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("oid")]
        public long OSMID { get; set; }

        [JsonProperty("hn")]
        // name of the highway on which there's a junction
        public string HighwayName { get; set; }

        [JsonProperty("r")]
        public string Ref { get; set; }

        [JsonProperty("shr")]
        public string ShortRef { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonIgnore]
        public Location SnappedLocation { get; set; }

        /// <summary>
        /// exit_to from Overpass API - where exit leads. Either exit_to is populated or both exit_to:left and exit_to:right are populated
        /// </summary>
        [JsonProperty("et")]
        public string ExitTo { get; set; }


        /// <summary>
        /// exit_to:left from Overpass API - where exit leads after left turn
        /// </summary>
        [JsonProperty("etl")]
        public string ExitToLeft { get; set; }

        [JsonProperty("etr")]
        public string ExitToRight { get; set; }

        [JsonProperty("p")]
        public PoiOnJunction[] Pois { get; set; }

        public override string ToString()
        {
            return this.Ref;
        }

        [JsonProperty(PropertyName = "jd")]
        public JunctionDiagnostics Diagnostics { get; set; }

        [JsonProperty("fcat")]
        public PoiCategoryOccurrence[] FoodPoiCategories { get; set; }

        [JsonProperty("tfcat")]
        public string[] TopLevelFoodCategories { get; set; }
    }


    public class PoiOnJunction
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("dfj")]
        public double DistanceFromJunction { get; set; }

        [JsonProperty("p")]
        public Yojowa.StopByStop.Poi Poi { get; set; }

        public override string ToString()
        {
            return SBSID + " " + Poi.ToString();
        }

    }


    [Flags]
    public enum PoiType
    {
        General = 0,
        Gas = 1,
        Food = 2,
    }

    public class PoiCategory
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("t")]
        public string Type { get; set; }

        [JsonProperty("yid")]
        public string YID { get; set; }

        [JsonProperty("p")]
        public string[] ParentIDs { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }
    }

    public class Poi
    {
        [JsonProperty("id")]
        public string SBSID { get; set; }

        [JsonProperty("c")]
        public string[] PoiCategoryIDs { get; set; }

        [JsonProperty("pt")]
        public PoiType PoiType { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("d")]
        public string Description { get; set; }

        [JsonProperty("l")]
        public Location Location { get; set; }

        [JsonProperty("i")]
        public PoiImage[] Images { get; set; }


        [JsonProperty("rg")]
        public ReviewGroup[] ReviewGroups { get; set; }

        public override string ToString()
        {
            return string.Format("{0} ({1},{2})", this.SBSID, this.Location.Lat, this.Location.Lon);
        }
    }


    public class PoiImage
    {

        [JsonProperty("u")]
        public string ImageUrl { get; set; }
    }


    public class ReviewGroup
    {
        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("i")]
        public string Icon { get; set; }

        [JsonProperty("rc")]
        public int ReviewCount { get; set; }

        [JsonProperty("u")]
        public string ReviewPageUrl { get; set; }


        [JsonProperty("riu")]
        public string RatingImageUrl { get; set; }

        [JsonProperty("r")]
        public double Rating { get; set; }
    }



    public class Review
    {
        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("r")]
        public int? Rating { get; set; }

        [JsonProperty("c")]
        public string Comment { get; set; }

        [JsonProperty("d")]
        public DateTime ReviewDate { get; set; }
    }
}
