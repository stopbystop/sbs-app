// <copyright file="PlacesLoader.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.Places
{
    using System.Collections.Generic;
    using System.IO;
    using Npgsql;

    /// <summary>
    /// Loads geo places. All DB communication should be done through this class
    /// </summary>
    public class PlacesLoader
    {
        /// <summary>
        /// The POSTGRESQL DB connection string 
        /// </summary>
        public static readonly string PGConnection = "server=stopbystop.centralus.cloudapp.azure.com;User Id=cities_user;Password=chicago;MinPoolSize=8;Database=cities;Timeout=60;CommandTimeout=60;";

        /// <summary>
        /// Cleans the and reloads the table containing geo data
        /// </summary>
        public static void CleanAndReloadDb()
        {
            List<GeoPlace> cities = GetGeoPlacesFromEmbeddedFile();

            // TODO: remove db if exists
            // TODO: create db and indexes
            // TOOD: insert cities into db
        }

        /// <summary>
        /// Creates the table.
        /// </summary>
        internal static void CreateTable()
        {
            // TODO: remove this method
            using (var conn = new NpgsqlConnection(PGConnection))
            {
                conn.Open();
                string createDbQuery = "DROP TABLE IF EXISTS cities_test;CREATE TABLE cities_test(lat numeric(9,6) NOT NULL,start_lon numeric(9,6) NOT NULL)WITH (OIDS = FALSE);DROP TABLE IF EXISTS cities_test";
                using (NpgsqlCommand command = new NpgsqlCommand(createDbQuery, conn))
                {
                    command.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        /// Gets the geo places from the file embedded into assembly
        /// </summary>
        /// <returns>List of geo places</returns>
        internal static List<GeoPlace> GetGeoPlacesFromEmbeddedFile()
        {
            List<GeoPlace> cities = new List<GeoPlace>();
            HashSet<string> insertedCityIds = new HashSet<string>();
            HashSet<string> unsupportedStates = new HashSet<string>(new string[] { "ak", "hi" });

            using (var stream = typeof(PlacesLoader).Assembly.GetManifestResourceStream("Yojowa.StopByStop.Places.cities1000.csv"))
            {
                using (var streamReader = new StreamReader(stream))
                {
                    string line = null;
                    while ((line = streamReader.ReadLine()) != null)
                    {
                        string[] parts = line.Split(',');
                        if (parts[3] == "US")
                        {
                            string state = parts[4];
                            if (!unsupportedStates.Contains(state))
                            {
                                string name = parts[0];
                                string description = string.Format("{0}, {1}, United States", parts[0], parts[4]);
                                string cityId = string.Format("{0}-{1}-United-States", parts[0], parts[4]).Replace(" ", "-").ToLowerInvariant();
                                double lat = double.Parse(parts[1]);
                                double lon = double.Parse(parts[2]);
                                long population = long.Parse(parts[5]);

                                if (!insertedCityIds.Contains(cityId))
                                {
                                    GeoPlace city = new GeoPlace()
                                    {
                                        ID = cityId,
                                        ShortName = name,
                                        Name = description,
                                        Location = new Location(lat, lon),
                                        Population = population
                                    };

                                    cities.Add(city);
                                    insertedCityIds.Add(cityId);
                                }
                            }
                        }
                    }
                }
            }

            return cities;
        }
    }
}
