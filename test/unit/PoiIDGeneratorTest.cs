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
            Assert.AreEqual<long>(1001115040123456789, PoiIDGenerator.GenerateIDV1(CountryCode.US, "123456789", -115.00, 40));
            Assert.AreEqual<long>(1001115040123456789, PoiIDGenerator.GenerateIDV1(CountryCode.US, "+1-123-456-789", -115.1234, 40.789));
            Assert.AreEqual<long>(1001115040012347890, PoiIDGenerator.GenerateIDV1(CountryCode.US, null, -115.1234, 40.789));
            Assert.AreEqual<long>(1001115040012347890, PoiIDGenerator.GenerateIDV1(CountryCode.US, "+++++", -115.1234, 40.789));
            Assert.AreEqual<long>(1001115040123456789, PoiIDGenerator.GenerateIDV1(CountryCode.US, "+1-123-4J6-78z", -115.1234, 40.789));
        }
    }
}
