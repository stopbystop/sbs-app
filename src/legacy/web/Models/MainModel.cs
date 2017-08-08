namespace Yojowa.StopByStop.Web.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Web;
    using System.Web.Mvc;
    using Yojowa.StopByStop.Utils;
    using System.Linq;


    public class MainModel
    {
        public MainModel(Metadata metadata, UrlHelper urlHelper)
        {
            this.BaseDataUrl = RouteUtils.ProxyService ?
                "https://www.stopbystop.com/" :
                HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + urlHelper.Content("~/");

            this.BasePortalUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + urlHelper.Content("~/");
            this.BaseImageUrl = RenderHelper.GetCDNUrl("/client/content/v1/icons/");
            this.Metadata = metadata;
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
        public PoiType2 PoiType { get; set; }

         [JsonProperty("purl")]
        public string BasePortalUrl { get; set; }

        [JsonProperty("durl")]
        public string BaseDataUrl { get; set; }

        [JsonProperty("iurl")]
        public string BaseImageUrl { get; set; }

        [JsonProperty("t")]
        public string Title { get; private set; }

        [JsonProperty("d")]
        public string Description { get; private set; }

        [JsonProperty("m")]
        public Metadata Metadata { get; private set; }

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

                    long osmId = 0;
                    string exitName = "";

                    Dictionary<PoiType2, MutableTuple<int, int>> categoryCounts = new Dictionary<PoiType2, MutableTuple<int, int>>();

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
                                     if (!categoryCounts.ContainsKey(pj.Poi.PoiType))
                                     {
                                         categoryCounts.Add(pj.Poi.PoiType, MutableTuple<int, int>.Create(0, 0));
                                     }

                                     categoryCounts[pj.Poi.PoiType].Item1++;
                                     if (countPoisInExit)
                                     {
                                         categoryCounts[pj.Poi.PoiType].Item2++;
                                     }
                                 });
                        }));

                    if (this.Route.FromLocation.IsCustom)
                    {
                        fromLocation = "Your location";
                        fromLocationInDescription = "your location";
                    }



                    string poiTypeCountDescription = string.Join(" ", categoryCounts
                        .Select((cc) =>
                        {
                            var singlePluralLabel = Metadata.RootPoiCategories[cc.Key].SinglePluralLabel;
                            if (singlePluralLabel == null)
                            {
                                return cc.Value.Item1 + " item(s)";
                            }

                            return singlePluralLabel(cc.Value.Item1);
                        }));


                    if (this.Page == ClientPage.Route)
                    {
                        this.Title = string.Format("{0} to {1} - Stop by Stop", fromLocation, toLocation);
                        this.Description = string.Format("Traveling from {0} to {1}? This route is {2} miles and will take you {3} to drive. " +
                            "It has {4} within 5 miles from exit",
                            fromLocationInDescription,
                            toLocation,
                            (int)this.Route.Distance,
                            travelTime,
                            poiTypeCountDescription);
                    }

                    if (this.Page == ClientPage.Exit)
                    {
                        string exitPoiTypeCountDescription = string.Join(" ", categoryCounts
                            .Select((cc) =>
                            {
                                var singlePluralLabel = Metadata.RootPoiCategories[cc.Key].SinglePluralLabel;
                                if (singlePluralLabel == null)
                                {
                                    return cc.Value.Item2 + " item(s)";
                                }

                                return singlePluralLabel(cc.Value.Item2);
                            }));

                        this.Title = string.Format("{0} on the way from {1} to {2} - Stop by Stop", exitName, fromLocation, toLocation);
                        this.Description = string.Format("{0} on the way from {1} to {2} has {3} within 5 miles from exit",
                            exitName, fromLocation, toLocation, exitPoiTypeCountDescription);
                    }

                    break;
            }

        }
    }
}