// <copyright file="CookieUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Linq;
    using System.Web;

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
        public static void WriteCookie(string name, string value)
        {
            var cookie = new HttpCookie(name, value);
            cookie.Expires = DateTime.UtcNow.AddYears(1);
            HttpContext.Current.Response.Cookies.Set(cookie);
        }

        /// <summary>
        /// Reads the cookie.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>Cookie value</returns>
        public static string ReadCookie(string name)
        {
            if (HttpContext.Current.Response.Cookies.AllKeys.Contains(name))
            {
                var cookie = HttpContext.Current.Response.Cookies[name];
                return cookie.Value;
            }

            if (HttpContext.Current.Request.Cookies.AllKeys.Contains(name))
            {
                var cookie = HttpContext.Current.Request.Cookies[name];
                return cookie.Value;
            }

            return null;
        }
    }
}
