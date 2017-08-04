    namespace Yojowa.StopByStop.UnitTests
    {
        using System.Collections.Generic;
        using System.Linq;
        using System;
        using Xunit;
        using Yojowa.StopByStop.Utils;

        /// <summary>
        /// Location tests
        /// </summary>
        public class LocationTests
        {
            /// <summary>
            /// Gets the North West locations for center location test.
            /// </summary>
            [Fact]
            public void GetNWLocationsForCenterLocationTest ()
            {
                var locations = new Location[]
                {
                    new Location () { Lat = 45.6, Lon = -110.6 },
                    new Location () { Lat = 45.7, Lon = -110.7 },
                    new Location () { Lat = 45.7, Lon = -110.6 },
                    new Location () { Lat = 45.7, Lon = -110.5 },
                    new Location () { Lat = 45.6, Lon = -110.5 },
                    new Location () { Lat = 45.5, Lon = -110.5 },
                    new Location () { Lat = 45.5, Lon = -110.6 },
                    new Location () { Lat = 45.5, Lon = -110.7 },
                    new Location () { Lat = 45.6, Lon = -110.7 },
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
                };
                VerifyLocations (
                    LocationUtils.GetNWLocationsForCenterLocation (new Location () { Lat = 45.515, Lon = -110.515 }),
                    locations);
            }

            /// <summary>
            /// Tests city id normalization
            /// </summary>
            [Fact]
            public void NormalizeCityIDTest ()
            {
                Assert.AreEqual<string> (
                    "k-i-sawyer-s-air-force-base-united-states",
                    LocationUtils.NormalizeCityId ("K.I.Sawyer's Air Force Base-united-states"));
            }

            /// <summary>
            /// Verifies the locations.
            /// </summary>
            /// <param name="locationsToVerify">The locations to verify.</param>
            /// <param name="expectedLocations">The expected locations.</param>
            private static void VerifyLocations (IEnumerable<Location> locationsToVerify, IEnumerable<Location> expectedLocations)
            {
                Assert.AreEqual<int> (expectedLocations.Count (), locationsToVerify.Count ());

                for (int i = 0; i < locationsToVerify.Count (); i++)
                {
                    var locationToVerify = locationsToVerify.ToArray ()[i];
                    var expectedLocation = expectedLocations.ToArray ()[i];

                    Assert.AreEqual<double> (Math.Round (locationToVerify.Lat, 1), Math.Round (expectedLocation.Lat, 1));
                    Assert.AreEqual<double> (Math.Round (locationToVerify.Lon, 1), Math.Round (expectedLocation.Lon, 1));
                }
            }
        }
    }