// <copyright file="PlacesTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Npgsql;
    using Places;
    using Utils;

    /// <summary>
    /// Places test
    /// </summary>
    [TestClass]
    public class PlacesTest
    {
        /// <summary>
        /// Verifies expected values after loading places from embedded file
        /// </summary>
        [TestMethod]
        public void VerifyPlacesLoaderGetGeoPlacesFromEmbeddedFile()
        {
            var places = PlacesLoader.GetGeoPlacesFromEmbeddedFile().OrderByDescending(gp => gp.Population).ToArray();

            Assert.AreEqual<string>("New York City", places.First().ShortName);
            Assert.AreEqual<string>("40.7--74.0", places.First().Location.ShortKey);
            Assert.AreEqual<string>("St Marys", places.Last().ShortName);
        }

        /// <summary>
        /// Verifies the table records
        /// </summary>
        [TestMethod]
        public void VerifyCitiesTableRecords()
        {
            var places = PlacesLoader.GetGeoPlacesFromEmbeddedFile();

            List<GeoPlace> allGeo = new List<GeoPlace>();

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

                        place.Location = new Location();
                        place.Location.Lat = dr.GetDouble(3);
                        place.Location.Lon = dr.GetDouble(4);
                        place.Population = dr.GetInt64(5);

                        allGeo.Add(place);
                    }
                }
            }

            foreach (var place in places)
            {
                var exists = allGeo.Where(x => x.ID == place.ID).Any();

                Assert.AreEqual<bool>(true, exists);
            }
        }

        /// <summary>
        /// Test Test
        /// </summary>
        [TestMethod]
        public void FindPlacesInArea()
        {
            List<GeoPlace> allGeo = new List<GeoPlace>();

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

                        place.Location = new Location();
                        place.Location.Lat = dr.GetDouble(3);
                        place.Location.Lon = dr.GetDouble(4);
                        place.Population = dr.GetInt64(5);

                        allGeo.Add(place);
                    }
                }
            }

            PlacesService service = new PlacesService();

            foreach (var geoPlace in allGeo)
            {
                var result2 = service.FindPlacesInArea(geoPlace.Location, 0.0001);

                // at least 1 result should returns. (it self)
                Assert.AreNotEqual<int>(0, result2.Length);

                // check if the it self has returned.
                bool includes = result2.Where(x => x.ID == geoPlace.ID).Any();
                Assert.AreEqual<bool>(includes, true);
            }
        }
    }
}
