// <copyright file="Box.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>02/02/2017</date>

namespace Yojowa.StopByStop.Utils
{
    /// <summary>
    /// Simple wrapper for primitives
    /// </summary>
    /// <typeparam name="T">Type to wrap</typeparam>
    public class Box<T>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Box{T}"/> class.
        /// </summary>
        public Box()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Box{T}"/> class.
        /// </summary>
        /// <param name="value">The value.</param>
        public Box(T value)
        {
            this.Value = value;
        }

        /// <summary>
        /// Gets or sets the value.
        /// </summary>
        /// <value>
        /// The value.
        /// </value>
        public T Value { get; set; }
    }
}
