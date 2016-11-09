using AlgoLib;
using BenchmarkDotNet.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yojowa.StopByStop;
using Yojowa.StopByStop.Places;
using Yojowa.StopByStop.Utils;

namespace BenchmarkConsole
{
    public class PlaceTest
    {
        PlacesService service;

        List<GeoPlace> AllGeo;
        Trie<List<GeoPlace>> AllGeoTrie;
        SegmentCollection AllSegments;

        public PlaceTest()
        {
            this.service = new PlacesService();
            this.AllGeo = PlacesService.AllGeo;
            this.AllGeoTrie = PlacesService.AllGeoTrie;
            this.AllSegments = PlacesService.AllSegments;
        }

        [Benchmark]
        public void FindPlacesInArea()
        {
            Location center = new Location(41.68508, -70.90642);
            service.FindPlacesInArea(center, 100);

            Location center1 = new Location(39, 30.90642);
            service.FindPlacesInArea(center1, 100);

            Location center2 = new Location(44, -44.90642);
            service.FindPlacesInArea(center2, 10);

            Location center3 = new Location(60.68508, -60.90642);
            service.FindPlacesInArea(center3, 1000);
        }

        [Benchmark]
        public void FindPlacesInArea_DirectLinq()
        {
            Location center = new Location(41.68508, -70.90642);
            FindPlacesInArea_Linq(center, 100);

            Location center1 = new Location(39, 30.90642);
            FindPlacesInArea_Linq(center1, 100);

            Location center2 = new Location(44, -44.90642);
            FindPlacesInArea_Linq(center2, 10);

            Location center3 = new Location(60.68508, -60.90642);
            FindPlacesInArea_Linq(center3, 1000);
        }

        [Benchmark]
        public void FindPlacesByPartialMatch()
        {
            service.FindPlacesByPartialMatch("a", 100);
            service.FindPlacesByPartialMatch("abc", 100);
            service.FindPlacesByPartialMatch("abb", 10);
            service.FindPlacesByPartialMatch("b", 10);
        }

        [Benchmark]
        public void FindPlacesByPartialMatch_Contains()
        {
            FindPlacesByPartialMatch_Contains("a", 100);
            FindPlacesByPartialMatch_Contains("abc", 100);
            FindPlacesByPartialMatch_Contains("abb", 10);
            FindPlacesByPartialMatch_Contains("b", 10);
        }

        public GeoPlace[] FindPlacesInArea_Linq(Location center, double radiusInMiles)
        {
            if (center == null)
                throw new ArgumentNullException("center");
            if (radiusInMiles <= 0)
                throw new ArgumentOutOfRangeException("radius must be positive.");

            return AllGeo.Where(x => x.Location.DistanceTo(center, UnitOfLength.Miles) <= radiusInMiles)
                          .OrderBy(x => x.Location.DistanceTo(center, UnitOfLength.Miles)).ToArray();
        }

        public GeoPlace[] FindPlacesByPartialMatch_Contains(string text, int maxItems)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                throw new ArgumentNullException("text");
            }

            if (maxItems <= 0)
            {
                throw new ArgumentOutOfRangeException("maxItems should be > 0.");
            }

            // Search should be case insensitive.
            string loweredText = text.ToLowerInvariant();

            return this.AllGeo.Where(x => x.NameLowered.StartsWith(loweredText)).OrderByDescending(x => x.Population).Take(maxItems).ToArray();
        }
    }
}
