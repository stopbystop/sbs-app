// <copyright file="PoiIDGeneratorTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using Xunit;
    using Utils;

    /// <summary>
    /// POI identifier generator test
    /// </summary>
    public class PoiIDGeneratorTest
    {
        /// <summary>
        /// Tests the identifier generator v1
        /// </summary>
        [Fact]
        public void TestIDGeneratorV1()
        {
            Assert.Equal<long>(1155000001234567891, PoiIDGenerator.GenerateIDV1("1234567891", -115.00, 40));
            Assert.Equal<long>(1155444441234567891, PoiIDGenerator.GenerateIDV1("+1-123-456-7891", -115.11111, 40.33333));
            Assert.Equal<long>(2155444441111133333, PoiIDGenerator.GenerateIDV1(null, -115.11111, 40.33333));
            Assert.Equal<long>(2155444441111133333, PoiIDGenerator.GenerateIDV1("+++", -115.11111, 40.33333));
            Assert.Equal<long>(1155444441234567890, PoiIDGenerator.GenerateIDV1("+1-123-4J6-78z0", -115.11111, 40.33333));
        }
    }
}
