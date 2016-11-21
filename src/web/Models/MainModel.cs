using Newtonsoft.Json;
using System;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Yojowa.StopByStop.Web.Models
{
    public class MainModel
    {
        public MainModel(UrlHelper urlHelper)
        {
            this.BaseDataUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + urlHelper.Content("~/");
            this.BaseImageUrl = RenderHelper.GetCDNUrl("/client/content/v1/icons/");
        }

        [JsonProperty("p")]
        public ClientPage Page { get; set; }

        [JsonProperty("rid")]
        public string RouteId { get; set; }

        [JsonProperty("r")]
        public Route Route { get; set; }

        [JsonProperty("exd")]
        public string ExitId { get; set; }

        [JsonProperty("pt")]
        public PoiType PoiType { get; set; }

        [JsonProperty("durl")]
        public string BaseDataUrl { get; set; }

        [JsonProperty("iurl")]
        public string BaseImageUrl { get; set; }

        [JsonProperty("t")]
        public string Title { get; private set; }

        [JsonProperty("d")]
        public string Description { get; private set; }

        public void GenerateTitleAndDescription()
        {
            switch (this.Page)
            {
                case ClientPage.Home:
                case ClientPage.About:
                    this.Title = "See best places to stop on the way to your destination - Stop by Stop";
                    this.Description = "Are you are travelling by car in the US and looking for best place to stop for food or gas? Check this out.";
                    break;
                case ClientPage.Route:
                case ClientPage.Exit:
                    string fromLocation = this.Route.FromLocation.PlaceDescriptionShort;
                    string fromLocationInDescription = this.Route.FromLocation.PlaceDescriptionShort;
                    string toLocation = this.Route.ToLocation.PlaceDescriptionShort;
                    var travelTimeSpan = TimeSpan.FromSeconds(this.Route.TimeInSeconds);
                    string travelTime = string.Format("{0} hours {1} minutes", (int)travelTimeSpan.TotalHours, travelTimeSpan.Minutes);
                    int rCount = 0;
                    int gCount = 0;
                    int exitRCount = 0;
                    int exitGCount = 0;
                    long osmId = 0;
                    string exitName = "";

                    if (this.Page == ClientPage.Exit)
                    {
                        long.TryParse(Regex.Match(this.ExitId, "osm-(?<id>[0-9]+)").Groups["id"].Value, out osmId);
                    }

                    Array.ForEach(
                    this.Route.RouteSegments, rs => Array.ForEach(
                        rs.RouteJunctions, rj =>
                        {
                            bool countPoisInExit = false;
                            if (this.Page == ClientPage.Exit && rj.Junction.OSMID == osmId)
                            {
                                countPoisInExit = true;
                                exitName = rj.Junction.Name;
                            }

                            Array.ForEach(
                                 rj.Junction.Pois, pj =>
                                 {
                                     switch (pj.Poi.PoiType)
                                     {
                                         case PoiType.Food:
                                             rCount++;
                                             if (countPoisInExit)
                                             {
                                                 exitRCount++;
                                             }
                                             break;
                                         case PoiType.Gas:
                                             gCount++;
                                             if (countPoisInExit)
                                             {
                                                 exitGCount++;
                                             }
                                             break;
                                     }
                                 });
                        }));

                    if (this.Route.FromLocation.IsCustom)
                    {
                        fromLocation = "Your location";
                        fromLocationInDescription = "your location";
                    }

                    if (this.Page == ClientPage.Route)
                    {
                        this.Title = string.Format("{0} to {1} - Stop by Stop", fromLocation, toLocation);
                        this.Description = string.Format("Traveling from {0} to {1}? This route is {2} miles and will take you {3} to drive. " +
                            "It has {4} restaurants and {5} gas stations within 5 miles from exit",
                            fromLocationInDescription,
                            toLocation,
                            (int)this.Route.Distance,
                            travelTime,
                            rCount,
                            gCount);
                    }

                    if (this.Page == ClientPage.Exit)
                    {
                        this.Title = string.Format("{0} on the way from {1} to {2} - Stop by Stop", exitName, fromLocation, toLocation);
                        this.Description = string.Format("{0} on the way from {1} to {2} has {3} restaurants and {4} gas stations within 5 miles from exit",
                            exitName, fromLocation, toLocation, exitRCount, exitGCount);
                    }

                    break;
            }

        }
    }
}