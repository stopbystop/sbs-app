// <copyright file="Trie.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>
namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Trie or prefix tree
    /// </summary>
    /// <typeparam name="T">Element type</typeparam>
    public class Trie<T>
    {
        /// <summary>
        /// The alphabet size. Includes all letters, '-' and ' ' and '.' and '
        /// </summary>
        private const int AlphabetSize = 30;

        /// <summary>
        /// The key selector
        /// </summary>
        private Func<T, string> keySelector;

        /// <summary>
        /// The root node
        /// </summary>
        private TrieNode root;

        /// <summary>
        /// Initializes a new instance of the <see cref="Trie{T}"/> class.
        /// </summary>
        /// <param name="keySelector">The key selector.</param>
        public Trie(Func<T, string> keySelector)
        {
            this.keySelector = keySelector;
            this.root = new TrieNode();
        }

        /// <summary>
        /// Adds the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        public void Add(T item)
        {
            string key = this.keySelector(item);
            this.root.Add(key, 0, item);
        }

        /// <summary>
        /// Gets the items matching prefix.
        /// </summary>
        /// <param name="prefix">The prefix.</param>
        /// <returns>Items matching prefix</returns>
        public IEnumerable<T> GetItemsMatchingPrefix(string prefix)
        {
            return this.root.GetItemsMatchingPrefix(prefix, 0);
        }

        /// <summary>
        /// Translates the character into alphabet index
        /// </summary>
        /// <param name="c">The character</param>
        /// <returns>Alphabet index</returns>
        private static int GetAlphabetIndex(char c)
        {
            switch (c)
            {
                case '-':
                    return 26;
                case ' ':
                    return 27;
                case '.':
                    return 28;
                case '\'':
                    return 29;
                default:
                    if (c >= 'a' && c <= 'z')
                    {
                        return c - 'a';
                    }
                    else if (c >= 'A' && c <= 'Z')
                    {
                        return c - 'A';
                    }

                    throw new ArgumentOutOfRangeException("Character argument can only be between a and z, space or dash.");
            }
        }

        /// <summary>
        /// Trie node
        /// </summary>
        private class TrieNode
        {
            /// <summary>
            /// Child nodes
            /// </summary>
            private TrieNode[] nodes;

            /// <summary>
            /// Values associated with the node
            /// </summary>
            private List<T> values;

            /// <summary>
            /// Initializes a new instance of the <see cref="TrieNode"/> class.
            /// </summary>
            public TrieNode()
            {
                this.nodes = new TrieNode[AlphabetSize];

                this.values = new List<T>();
            }

            /// <summary>
            /// Adds the item
            /// </summary>
            /// <param name="key">The key.</param>
            /// <param name="position">Character position in the key.</param>
            /// <param name="value">The value.</param>
            public void Add(string key, int position, T value)
            {
                if (key.Length <= position)
                {
                    this.values.Add(value);
                }
                else
                {
                    char charAtPosition = key[position];
                    var index = GetAlphabetIndex(charAtPosition);
                    TrieNode node = this.nodes[index];
                    if (node == null)
                    {
                        node = new TrieNode();
                        this.nodes[index] = node;
                    }

                    node.Add(key, position + 1, value);
                }
            }

            /// <summary>
            /// Gets the items matching prefix.
            /// </summary>
            /// <param name="prefix">The prefix.</param>
            /// <param name="prefixPosition">Character position in prefix</param>
            /// <returns>Items matching prefix</returns>
            public IEnumerable<T> GetItemsMatchingPrefix(string prefix, int prefixPosition)
            {
                if (prefix.Length == prefixPosition)
                {
                    return this.GetItemsRecursive();
                }
                else
                {
                    char charAtPosition = prefix[prefixPosition];
                    var index = GetAlphabetIndex(charAtPosition);
                    if (this.nodes[index] == null)
                    {
                        return Enumerable.Empty<T>();
                    }
                    else
                    {
                        return this.nodes[index].GetItemsMatchingPrefix(prefix, prefixPosition + 1);
                    }
                }
            }

            /// <summary>
            /// Gets the items recursively
            /// </summary>
            /// <returns>Items associated with the node</returns>
            private IEnumerable<T> GetItemsRecursive()
            {
                foreach (var trieNode in this.nodes)
                {
                    if (trieNode != null)
                    {
                        foreach (var item in trieNode.GetItemsRecursive())
                        {
                            yield return item;
                        }
                    }
                }

                foreach (var item in this.values)
                {
                    yield return item;
                }
            }
        }
    }
}
