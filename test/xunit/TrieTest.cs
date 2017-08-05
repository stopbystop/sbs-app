// <copyright file="TrieTest.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>10/30/2016</date>

namespace Yojowa.StopByStop.UnitTests
{
    using System;
    using System.Linq;
    using Xunit;
    using Utils;

    /// <summary>
    /// <c>Trie</c> test
    /// </summary>
    public class TrieTest
    {
        /// <summary>
        /// Verifies expected values after loading places from embedded file
        /// </summary>
        [Fact]
        public void VerifyTrieInsertAndRetrieve()
        {
            Trie<string> trie = new Trie<string>(k => k.ToLowerInvariant());
            trie.Add("abcd");
            trie.Add("xyz");
            trie.Add("abcde");
            trie.Add("abxy");
            trie.Add("abc");

            Assert.Equal<int>(1, trie.GetItemsMatchingPrefix("x").Count());
            Assert.Equal<int>(4, trie.GetItemsMatchingPrefix("ab").Count());
            Assert.Equal<int>(3, trie.GetItemsMatchingPrefix("abc").Count());
            Assert.Equal<int>(0, trie.GetItemsMatchingPrefix("qwe").Count());
        }

        /// <summary>
        /// Verifies <c>trie</c> character range
        /// </summary>
        [Fact]
        public void VerifyTrieCharacterRange()
        {
            Trie<string> trie = new Trie<string>(k => k.ToLowerInvariant());
            trie.Add("'Abcd");
            trie.Add("Xyz");
            trie.Add("'ab-cde");
            trie.Add("'ab-xy");
            trie.Add("'ab-c");

            Assert.Equal<int>(1, trie.GetItemsMatchingPrefix("x").Count());
            Assert.Equal<int>(4, trie.GetItemsMatchingPrefix("'ab").Count());
            Assert.Equal<int>(2, trie.GetItemsMatchingPrefix("'ab-c").Count());
            Assert.Equal<int>(0, trie.GetItemsMatchingPrefix("qwe").Count());
        }

        /// <summary>
        /// Verifies <c>trie</c> character range
        /// </summary>
        [Fact]
        public void VerifyTrieCharacterRangeInvalidInput()
        {
            Trie<string> trie = new Trie<string>(k => k.ToLowerInvariant());
            Assert.Throws<ArgumentOutOfRangeException>(()=>trie.Add("Abcd("));
        }
    }
}
