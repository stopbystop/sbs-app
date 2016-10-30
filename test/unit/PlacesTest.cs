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
        /// Verifies the table is created without errors
        /// </summary>
        [TestMethod]
        public void VerifyTableCreationWithoutErrors()
        {
            PlacesLoader.CreateTable();
        }
    }
}
