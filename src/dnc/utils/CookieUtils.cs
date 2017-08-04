// <copyright file="CookieUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System.Linq;
    using System;
    using Microsoft.AspNetCore.Http;

    /// <summary>
    /// Cookie utils
    /// </summary>
    public static class CookieUtils
    {
        /// <summary>
        /// Writes the cookie.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        public static void WriteCookie (HttpContext context, string name, string value)
        {
            CookieOptions options = new CookieOptions ();
            options.Expires = DateTime.Now.AddYears (1);
            context.Response.Cookies.Append (name, value, options);
        }

        /// <summary>
        /// Reads the cookie.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>Cookie value</returns>
        public static string ReadCookie (HttpContext context, string name)
        {
            foreach (var headers in context.Response.Headers.Values)
            foreach (var header in headers)
            if (header.StartsWith (name))
            {
                var p1 = header.IndexOf ('=');
                var p2 = header.IndexOf (';');
                return header.Substring (p1 + 1, p2 - p1 - 1);
            }

            foreach (var headers in context.Request.Headers.Values)
            foreach (var header in headers)
            if (header.StartsWith (name))
            {
                var p1 = header.IndexOf ('=');
                var p2 = header.IndexOf (';');
                return header.Substring (p1 + 1, p2 - p1 - 1);
            }

            return null;
        }
    }
}