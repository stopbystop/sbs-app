using Microsoft.ApplicationInsights;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Yojowa.StopByStop.Utils
{
    public static class LocationUtils
    {
        public const double Grain = 0.1;

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

        private static double RoundToNLat(double lat)
        {
            var roundedLat = Math.Round(lat, 1);
            if (roundedLat < lat)
            {
                roundedLat += 0.1;
            }
            return roundedLat;
        }

        private static double RoundToWLon(double lon)
        {
            var roundedLon = Math.Round(lon, 1);
            if (roundedLon > lon)
            {
                roundedLon -= 0.1;
            }
            return roundedLon;
        }

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

        public static string GetIPAddress()
        {
            //TelemetryClient telemetryClient = new TelemetryClient();
            System.Web.HttpContext context = System.Web.HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            //telemetryClient.TrackTrace(string.Format("IP is {0} from HTTP_X_FORWARDED_FOR header", ipAddress));
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

        public static Location GetCurrentLocation()
        {
            try
            {
                // TelemetryClient telemetryClient = new TelemetryClient();
                string ip = GetIPAddress();

                if (ip.IndexOf(":") > -1)
                {
                    ip = ip.Substring(0, ip.IndexOf(":"));
                }

                //telemetryClient.TrackTrace(string.Format("IP is {0} when GetIPAddress completes", ip));

                string url = "http://ip-api.com/json/" + ip.ToString();
                WebClient client = new WebClient();
                string jsonstring = client.DownloadString(url);

                //telemetryClient.TrackTrace(string.Format("Location JSON string is {0}", jsonstring));

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
    }
}
