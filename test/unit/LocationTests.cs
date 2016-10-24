using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using Yojowa.StopByStop.Utils;

namespace Yojowa.StopByStop.UnitTests
{
    [TestClass]
    public class LocationTests
    {
        [TestMethod]
        public void GetNWLocationsForCenterLocationTest()
        {
            VerifyLocations(LocationUtils.GetNWLocationsForCenterLocation(new Location() { Lat = 45.515, Lon = -110.515 }),
                new Location[]
                {
                    new Location(){Lat=45.6, Lon=-110.6},
                    new Location(){Lat=45.7, Lon=-110.7},
                    new Location(){Lat=45.7, Lon=-110.6},
                    new Location(){Lat=45.7, Lon=-110.5},
                    new Location(){Lat=45.6, Lon=-110.5},
                    new Location(){Lat=45.5, Lon=-110.5},
                    new Location(){Lat=45.5, Lon=-110.6},
                    new Location(){Lat=45.5, Lon=-110.7},
                    new Location(){Lat=45.6, Lon=-110.7},
                    /*
                    new Location(){Lat=45.8, Lon=-110.8},
                    new Location(){Lat=45.8, Lon=-110.7},
                    new Location(){Lat=45.8, Lon=-110.6},
                    new Location(){Lat=45.8, Lon=-110.5},

                    new Location(){Lat=45.8, Lon=-110.4},
                    new Location(){Lat=45.7, Lon=-110.4},
                    new Location(){Lat=45.6, Lon=-110.4},
                    new Location(){Lat=45.5, Lon=-110.4},

                    new Location(){Lat=45.4, Lon=-110.4},
                    new Location(){Lat=45.4, Lon=-110.5},
                    new Location(){Lat=45.4, Lon=-110.6},
                    new Location(){Lat=45.4, Lon=-110.7},

                    new Location(){Lat=45.4, Lon=-110.8},
                    new Location(){Lat=45.7, Lon=-110.8},
                    new Location(){Lat=45.6, Lon=-110.8},
                    new Location(){Lat=45.5, Lon=-110.8},
                    */
                });



        }

        private static void VerifyLocations(IEnumerable<Location> locationsToVerify, IEnumerable<Location> expectedLocations)
        {
            Assert.AreEqual<int>(expectedLocations.Count(), locationsToVerify.Count());

            for (int i = 0; i < locationsToVerify.Count(); i++)
            {
                var locationToVerify = locationsToVerify.ToArray()[i];
                var expectedLocation = expectedLocations.ToArray()[i];

                Assert.AreEqual<double>(Math.Round(locationToVerify.Lat, 1), Math.Round(expectedLocation.Lat, 1));
                Assert.AreEqual<double>(Math.Round(locationToVerify.Lon, 1), Math.Round(expectedLocation.Lon, 1));
            }
        }
    }
}
