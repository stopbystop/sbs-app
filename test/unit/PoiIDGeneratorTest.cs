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
            Assert.AreEqual<long>(1155000001234567890, PoiIDGenerator.GenerateIDV1("1234567890", -115.00, 40));
            Assert.AreEqual<long>(1155444441234567890, PoiIDGenerator.GenerateIDV1("+1-123-456-7890", -115.11111, 40.33333));
            Assert.AreEqual<long>(2155444441111133333, PoiIDGenerator.GenerateIDV1(null, -115.11111, 40.33333));
            Assert.AreEqual<long>(2155444441111133333, PoiIDGenerator.GenerateIDV1("+++", -115.11111, 40.33333));
            Assert.AreEqual<long>(1155444441234567890, PoiIDGenerator.GenerateIDV1("+1-123-4J6-78z0", -115.11111, 40.33333));
        }
    }
}
