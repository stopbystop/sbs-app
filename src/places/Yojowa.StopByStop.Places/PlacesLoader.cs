// <copyright file="PlacesLoader.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.Places
{
    using System.Collections.Generic;
    using System.IO;
    using System.Text;
    using Npgsql;
    using Utils;

    /// <summary>
    /// Loads geo places. All DB communication should be done through this class
    /// </summary>
    public class PlacesLoader
    {
        //feature2 commit test

        /// <summary>
        /// The POSTGRESQL DB connection string 
        /// </summary>
        public static readonly string PGConnection = "server=stopbystop.centralus.cloudapp.azure.com;User Id=cities_user;Password=chicago;MinPoolSize=8;Database=cities;Timeout=60;CommandTimeout=60;";

        /// <summary>
        /// Cleans the and reloads the table containing geo data
        /// </summary>
        public static void CleanAndReloadDb()
        {
            List<GeoPlace> geoList = GetGeoPlacesFromEmbeddedFile();

            using (var conn = new NpgsqlConnection(PGConnection))
            {
                conn.Open();

                // Re-create table
                string createTableQuery = @"DROP TABLE IF EXISTS tng_cities_test;
                                                    CREATE TABLE tng_cities_test
                                                    (
                                                        id varchar(250) NOT NULL,
                                                        shortname varchar(250) NOT NULL,
                                                        name varchar(250) NOT NULL,
                                                        lat numeric(9, 6) NOT NULL,
                                                        lng numeric(9, 6) NOT NULL,
                                                        population bigserial NOT NULL
                                                    )WITH(OIDS = FALSE); ";
                using (NpgsqlCommand command = new NpgsqlCommand(createTableQuery, conn))
                {
                    command.ExecuteNonQuery();
                }

                // populate table
                int batchSize = 50;

                foreach (IEnumerable<GeoPlace> geoBatch in geoList.Batch(batchSize))
                {
                    // Prepare batch command
                    // 1 command length can be about 400-450
                    StringBuilder sb = new StringBuilder(batchSize * 500);

                    foreach (GeoPlace geo in geoBatch)
                    {
                        sb.AppendFormat("insert into tng_cities_test(id, shortname, name, lat, lng, population) values('{0}','{1}','{2}',{3},{4},{5});", SqlUtil.EscapeString(geo.ID), SqlUtil.EscapeString(geo.ShortName), SqlUtil.EscapeString(geo.Name), geo.Location.Lat, geo.Location.Lon, geo.Population);
                    }

                    string cmdText = sb.ToString();

                    using (NpgsqlCommand command = new NpgsqlCommand(cmdText, conn))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
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
