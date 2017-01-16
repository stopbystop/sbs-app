// <copyright file="LocationUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Text.RegularExpressions;
    using Microsoft.ApplicationInsights;
    using Newtonsoft.Json;

    /// <summary>
    /// Location utils
    /// </summary>
    public static class LocationUtils
    {
        /// <summary>
        /// The grain
        /// </summary>
        public const double Grain = 0.1;

        /// <summary>
        /// Gets the north-west locations for center location.
        /// </summary>
        /// <param name="location">The location.</param>
        /// <returns>List of locations</returns>
        public static IEnumerable<Location> GetNWLocationsForCenterLocation(Location location)
        {
            var mainLocation = new Location()
            {
                Lat = RoundToNLat(location.Lat),
                Lon = RoundToWLon(location.Lon)
            };
            yield return mainLocation;

            // n locations
            yield return new Location(mainLocation.Lat + Grain, mainLocation.Lon - Grain);
            yield return new Location(mainLocation.Lat + Grain, mainLocation.Lon);
            yield return new Location(mainLocation.Lat + Grain, mainLocation.Lon + Grain);

            // e locations
            yield return new Location(mainLocation.Lat, mainLocation.Lon + Grain);
            yield return new Location(mainLocation.Lat - Grain, mainLocation.Lon + Grain);

            // s locations
            yield return new Location(mainLocation.Lat - Grain, mainLocation.Lon);
            yield return new Location(mainLocation.Lat - Grain, mainLocation.Lon - Grain);

            // w location
            yield return new Location(mainLocation.Lat, mainLocation.Lon - Grain);

            /*
            //nn ww location
            yield return new Location(mainLocation.Lat + Grain + Grain, mainLocation.Lon - Grain - Grain);
            //nn locations
            yield return new Location(mainLocation.Lat + Grain + Grain, mainLocation.Lon - Grain);
            yield return new Location(mainLocation.Lat + Grain + Grain, mainLocation.Lon);
            yield return new Location(mainLocation.Lat + Grain + Grain, mainLocation.Lon + Grain);

            //nn ee location
            yield return new Location(mainLocation.Lat + Grain + Grain, mainLocation.Lon + Grain + Grain);
            //ee locations
            yield return new Location(mainLocation.Lat + Grain, mainLocation.Lon + Grain + Grain);
            yield return new Location(mainLocation.Lat, mainLocation.Lon + Grain + Grain);
            yield return new Location(mainLocation.Lat - Grain, mainLocation.Lon + Grain + Grain);

            //ee ss location
            yield return new Location(mainLocation.Lat - Grain - Grain, mainLocation.Lon + Grain + Grain);
            //ss locations
            yield return new Location(mainLocation.Lat - Grain - Grain, mainLocation.Lon + Grain);
            yield return new Location(mainLocation.Lat - Grain - Grain, mainLocation.Lon);
            yield return new Location(mainLocation.Lat - Grain - Grain, mainLocation.Lon - Grain);

            //ss ww location
            yield return new Location(mainLocation.Lat - Grain - Grain, mainLocation.Lon - Grain - Grain);
            //ww locations
            yield return new Location(mainLocation.Lat + Grain, mainLocation.Lon - Grain - Grain);
            yield return new Location(mainLocation.Lat, mainLocation.Lon - Grain - Grain);
            yield return new Location(mainLocation.Lat - Grain, mainLocation.Lon - Grain - Grain);
            */
        }

        /// <summary>
        /// Creates the custom location.
        /// </summary>
        /// <param name="locationString">The location string.</param>
        /// <returns>Custom location</returns>
        public static Location CreateCustomLocation(string locationString)
        {
            if (!string.IsNullOrEmpty(locationString) && locationString.Contains(","))
            {
                string latString = locationString.Split(',')[0];
                string lonString = locationString.Split(',')[1];

                double lat, lon;
                if (double.TryParse(latString, out lat) && double.TryParse(lonString, out lon))
                {
                    return new Location()
                    {
                        IsCustom = true,
                        Lat = lat,
                        Lon = lon,
                        PlaceDescription = string.Format("Start location ({0},{1})", Math.Round(lat, 3), Math.Round(lon, 3))
                    };
                }
            }

            return null;
        }

        /// <summary>
        /// Gets the IP address.
        /// </summary>
        /// <returns>IP address string</returns>
        public static string GetIPAddress()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }

        /// <summary>
        /// Gets the current location.
        /// </summary>
        /// <returns>Current location</returns>
        public static Location GetCurrentLocation()
        {
            try
            {
                string ip = GetIPAddress();

                if (ip.IndexOf(":") > -1)
                {
                    ip = ip.Substring(0, ip.IndexOf(":"));
                }

                string url = "http://ip-api.com/json/" + ip.ToString();
                WebClient client = new WebClient();
                string jsonstring = client.DownloadString(url);

                dynamic dynObj = JsonConvert.DeserializeObject(jsonstring);
                if (dynObj.lat == null)
                {
                    return null;
                }

                return new Location((double)dynObj.lat, (double)dynObj.lon);
            }
            catch (Exception ex)
            {
                TelemetryClient telemetryClient = new TelemetryClient();
                telemetryClient.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        /// Normalizes city id
        /// </summary>
        /// <param name="cityId">City id</param>
        /// <returns>Normalized city id</returns>
        public static string NormalizeCityId(string cityId)
        {
            cityId = Regex.Replace(cityId, "[^A-Za-z]", "-");
            return cityId.ToLowerInvariant();
        }

        /// <summary>
        /// Rounds to northern latitude coordinate
        /// </summary>
        /// <param name="lat">The latitude.</param>
        /// <returns>Rounded value</returns>
        private static double RoundToNLat(double lat)
        {
            var roundedLat = Math.Round(lat, 1);
            if (roundedLat < lat)
            {
                roundedLat += 0.1;
            }

            return roundedLat;
        }

        /// <summary>
        /// Rounds to west longitude.
        /// </summary>
        /// <param name="lon">The longitude.</param>
        /// <returns>Rounded value</returns>
        private static double RoundToWLon(double lon)
        {
            var roundedLon = Math.Round(lon, 1);
            if (roundedLon > lon)
            {
                roundedLon -= 0.1;
            }

            return roundedLon;
        }
    }
}
