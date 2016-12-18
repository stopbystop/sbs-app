// <copyright file="TrieTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Utils;
    using System;

    /// <summary>
    /// Trie test
    /// </summary>
    [TestClass]
    public class TrieTest
    {
        /// <summary>
        /// Verifies expected values after loading places from embedded file
        /// </summary>
        [TestMethod]
        public void VerifyTrieInsertAndRetrieve()
        {
            Trie<string> trie = new Trie<string>(k => k.ToLowerInvariant());
            trie.Add("abcd");
            trie.Add("xyz");
            trie.Add("abcde");
            trie.Add("abxy");
            trie.Add("abc");

            Assert.AreEqual<int>(1, trie.GetItemsMatchingPrefix("x").Count());
            Assert.AreEqual<int>(4, trie.GetItemsMatchingPrefix("ab").Count());
            Assert.AreEqual<int>(3, trie.GetItemsMatchingPrefix("abc").Count());
            Assert.AreEqual<int>(0, trie.GetItemsMatchingPrefix("qwe").Count());
        }

        /// <summary>
        /// Verifies trie character range
        /// </summary>
        [TestMethod]
        public void VerifyTrieCharacterRange()
        {
            Trie<string> trie = new Trie<string>(k => k.ToLowerInvariant());
            trie.Add("'Abcd");
            trie.Add("Xyz");
            trie.Add("'ab-cde");
            trie.Add("'ab-xy");
            trie.Add("'ab-c");

            Assert.AreEqual<int>(1, trie.GetItemsMatchingPrefix("x").Count());
            Assert.AreEqual<int>(4, trie.GetItemsMatchingPrefix("'ab").Count());
            Assert.AreEqual<int>(2, trie.GetItemsMatchingPrefix("'ab-c").Count());
            Assert.AreEqual<int>(0, trie.GetItemsMatchingPrefix("qwe").Count());
        }

        /// <summary>
        /// Verifies trie character range
        /// </summary>
        [TestMethod]
        [ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VerifyTrieCharacterRangeInvalidInput()
        {
            Trie<string> trie = new Trie<string>(k => k.ToLowerInvariant());
            trie.Add("Abcd(");
        }
    }
}
