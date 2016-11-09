// <copyright file="PlacesTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Places;
    using System.Collections.Generic;
    using Npgsql;
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

            List<GeoPlace> AllGeo = new List<GeoPlace>();

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

                        AllGeo.Add(place);
                    }
                }
            }

            foreach (var place in places)
            {
                var exists = AllGeo.Where(x => x.ID == place.ID).Any();

                Assert.AreEqual<bool>(true, exists);
            }
        }

        [TestMethod]
        public void FindPlacesInArea()
        {
            List<GeoPlace> AllGeo = new List<GeoPlace>();

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

                        AllGeo.Add(place);
                    }
                }
            }



            Segment s1 = new Segment(-180, 90, 10, 20);

            Segment s2 = new Segment(180, -90, 10, 20);

            Segment s3 = Segment.FromLTRB(-180, 90, -170, 70);

            var a = s1.IntersectsWith(s2);

            var b = s1.IntersectsWith(s3);

            var c = s2.IntersectsWith(s3);

            PlacesService service = new PlacesService();

            var aa = service.FindPlacesByPartialMatch("united", 50);
            var aa1 = service.FindPlacesByPartialMatch("a", 500);

            GeoPlace p = aa1.First();

            var result = service.FindPlacesInArea(p.Location, 700);

            var result1 = service.FindPlacesInArea(p.Location, 10);


            foreach (var geoPlace in AllGeo)
            {
                var result2 = service.FindPlacesInArea(geoPlace.Location, 0.000001);

                Assert.AreNotEqual<int>(0, result2.Length);
            }
        }
    }
}
