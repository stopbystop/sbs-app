// <copyright file="PlacesService.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.Places
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AlgoLib;
    using Npgsql;
    using Utils;

    /// <summary>
    /// Places service
    /// </summary>
    /// <seealso cref="Yojowa.StopByStop.IPlacesService" />
    public class PlacesService : IPlacesService
    {
        /// <summary>
        /// Initializes static members of the <see cref="PlacesService" /> class.
        /// </summary>
        static PlacesService()
        {
            // Populate Geo list
            using (var conn = new NpgsqlConnection(PlacesLoader.PGConnection))
            {
                conn.Open();

                string selectQuery = "SELECT id,shortname,name,lat,lng,population FROM cities order by name asc";

                using (NpgsqlCommand command = new NpgsqlCommand(selectQuery, conn))
                {
                    var dr = command.ExecuteReader();

                    while (dr.Read())
                    {
                        GeoPlace place = new GeoPlace();
                        place.ID = dr.GetString(0);
                        place.ShortName = dr.GetString(1);
                        place.Name = dr.GetString(2);

                        // Generate pre-lowered
                        place.NameLowered = place.Name.ToLowerInvariant();

                        place.Location = new Location();
                        place.Location.Lat = dr.GetDouble(3);
                        place.Location.Lon = dr.GetDouble(4);
                        place.Population = dr.GetInt64(5);

                        AllGeo.Add(place);
                    }
                }
            }

            // Populate trie //https://github.com/kpol/trie
            foreach (GeoPlace geo in AllGeo)
            {
                string key = geo.NameLowered;

                List<GeoPlace> tempGeoList;

                if (AllGeoTrie.TryGetValue(key, out tempGeoList))
                {
                    tempGeoList.Add(geo);
                }
                else
                {
                    tempGeoList = new List<GeoPlace>();
                    tempGeoList.Add(geo);
                    AllGeoTrie.Add(key, tempGeoList);
                }
            }

            // Get dictonary from segmentUtil
            AllSegments = SegmentUtil.GetAllSegments(AllGeo);
        }

        /// <summary>
        /// Gets Cached all geo list
        /// </summary>
        public static List<GeoPlace> AllGeo { get; private set; } = new List<GeoPlace>();

        /// <summary>
        /// Gets A Geo tri by loweredName, can be used for prefix search
        /// </summary>
        public static Trie<List<GeoPlace>> AllGeoTrie { get; private set; } = new Trie<List<GeoPlace>>();

        /// <summary>
        /// Gets All segments that have result in it.
        /// </summary>
        public static SegmentCollection AllSegments { get; private set; }

        /// <summary>
        /// Gets places by partial match
        /// </summary>
        /// <param name="text">Text that user entered</param>
        /// <param name="maxItems">Max number of items to return</param>
        /// <returns>
        /// Places to matching the input (not case sensitive), sorted by population in reverse order (starting from most populous)
        /// </returns>
        public GeoPlace[] FindPlacesByPartialMatch(string text, int maxItems)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                throw new ArgumentNullException("text");
            }

            if (maxItems <= 0)
            {
                throw new ArgumentOutOfRangeException("maxItems should be > 0.");
            }

            List<GeoPlace> result = new List<GeoPlace>();

            // Search should be case insensitive.
            string loweredText = text.ToLowerInvariant();

            foreach (TrieEntry<List<GeoPlace>> trieEntry in AllGeoTrie.GetByPrefix(loweredText))
            {
                result.AddRange(trieEntry.Value);
            }

            return result.OrderByDescending(x => x.Population).Take(maxItems).ToArray();
        }

        /// <summary>
        /// Gets places around specified center location
        /// </summary>
        /// <param name="center">Center location</param>
        /// <param name="radiusInMiles">Max radius around the center location to search</param>
        /// <returns>List of geo places</returns>
        public GeoPlace[] FindPlacesInArea(Location center, double radiusInMiles)
        {
            return AllSegments.GetGeosForSearch(center, radiusInMiles)
                               .Where(x => x.Location.DistanceTo(center, UnitOfLength.Miles) <= radiusInMiles)
                               .OrderBy(x => x.Location.DistanceTo(center, UnitOfLength.Miles)).ToArray();
        }

        /// <summary>
        /// Gets location from place id
        /// </summary>
        /// <param name="placeId">Place id</param>
        /// <returns>
        /// Location object
        /// </returns>
        public Location GetLocationFromPlaceId(string placeId)
        {
            if (string.IsNullOrEmpty(placeId))
            {
                return null;
            }

            // Find geo by id
            GeoPlace geo = AllGeo.Where(x => x.ID == placeId).FirstOrDefault();

            if (geo != null)
            {
                return geo.Location;
            }

            return null;
        }
    }
}
