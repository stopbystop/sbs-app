// <copyright file="PoiIDGeneratorTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Utils;

    /// <summary>
    /// POI identifier generator test
    /// </summary>
    [TestClass]
    public class PoiIDGeneratorTest
    {
        /// <summary>
        /// Tests the identifier generator v1
        /// </summary>
        [TestMethod]
        public void TestIDGeneratorV1()
        {
            Assert.AreEqual<long>(1011150401234567890, PoiIDGenerator.GenerateIDV1(CountryCode.US, "1234567890", -115.00, 40));
            Assert.AreEqual<long>(1011150401234567890, PoiIDGenerator.GenerateIDV1(CountryCode.US, "+1-123-456-7890", -115.1234, 40.789));
            Assert.AreEqual<long>(1011150401234078900, PoiIDGenerator.GenerateIDV1(CountryCode.US, null, -115.1234, 40.789));
            Assert.AreEqual<long>(1011150401234078900, PoiIDGenerator.GenerateIDV1(CountryCode.US, "+++++", -115.1234, 40.789));
            Assert.AreEqual<long>(1011150401234567890, PoiIDGenerator.GenerateIDV1(CountryCode.US, "+1-123-4J6-78z0", -115.1234, 40.789));
        }
    }
}
