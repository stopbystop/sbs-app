namespace Yojowa.StopByStop.UnitTests
{
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Places;

    [TestClass]
    public class PlacesTest
    {
        [TestMethod]
        public void VerifyPlacesLoaderGetGeoPlacesFromEmbeddedFile()
        {
            var places = PlacesLoader.GetGeoPlacesFromEmbeddedFile().OrderByDescending(gp => gp.Population).ToArray();
            
            Assert.AreEqual<string>("New York City", places.First().ShortName);
            Assert.AreEqual<string>("40.7--74.0", places.First().Location.ShortKey);
            Assert.AreEqual<string>("Fillmore", places.Last().ShortName);
        }

        [TestMethod]
        public void VerifyFindPlacesByPartialMatchCompareWithSBSService()
        {
            PlacesLoader.CreateTable();
        }
    }
}
