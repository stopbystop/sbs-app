// <copyright file="MutableTuple.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>03/02/2017</date>

namespace Yojowa.StopByStop.Utils
{
    /// <summary>
    /// Mutable tuple
    /// </summary>
    /// <typeparam name="T1">The type of the 1.</typeparam>
    /// <typeparam name="T2">The type of the 2.</typeparam>
    public class MutableTuple<T1, T2>
    {
        /// <summary>
        /// Gets or sets the item1.
        /// </summary>
        /// <value>
        /// The item1.
        /// </value>
        public T1 Item1 { get; set; }

        /// <summary>
        /// Gets or sets the item2.
        /// </summary>
        /// <value>
        /// The item2.
        /// </value>
        public T2 Item2 { get; set; }

        /// <summary>
        /// Creates the  tuple
        /// </summary>
        /// <param name="item1">The item1.</param>
        /// <param name="item2">The item2.</param>
        /// <returns>Tuple instance</returns>
        public static MutableTuple<T1, T2> Create(T1 item1, T2 item2)
        {
            return new MutableTuple<T1, T2>() { Item1 = item1, Item2 = item2 };
        }
    }
}
