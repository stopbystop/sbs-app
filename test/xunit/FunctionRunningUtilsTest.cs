﻿// <copyright file="FunctionRunningUtilsTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/17/2017</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System;
    using Xunit;
    using Utils;

    /// <summary>
    /// Tests function running utils
    /// </summary>
    public class FunctionRunningUtilsTest
    {
        /// <summary>
        /// Increment variable to test retries
        /// </summary>
        private int runnerIncrement = 0;

        /// <summary>
        /// Verifies eventually successful run with retries
        /// </summary>
        [Fact]
        public void TestSuccessRunWithRetries()
        {
            this.runnerIncrement = 0;
            int attempts = 0;
            string result = FunctionRunningUtils.RunWithRetries(5, (attemptIndex) => this.MethodToRunWithRetries(3), (e) => { }, ref attempts);
            Assert.Equal<string>("foo", result);
            Assert.Equal<int>(3, attempts);
        }

        /// <summary>
        /// Verifies eventually failing run with retries
        /// </summary>
        [Fact]
        public void TestFailRunWithRetries()
        {
            this.runnerIncrement = 0;
            int attempts = 0;
            try
            {
                Assert.Throws<AggregateException> (()=>FunctionRunningUtils.RunWithRetries(5, (attemptIndex) => this.MethodToRunWithRetries(6), (e) => { }, ref attempts));
            }
            finally
            {
                Assert.Equal<int>(5, attempts);
            }
        }

        /// <summary>
        /// Method that is run with retries
        /// </summary>
        /// <param name="successIncrement">If runner increment is less than this value, method will fail</param>
        /// <returns>Some result</returns>
        private string MethodToRunWithRetries(int successIncrement)
        {
            this.runnerIncrement++;
            if (this.runnerIncrement < successIncrement)
            {
                throw new InvalidOperationException();
            }

            return "foo";
        }
    }
}
