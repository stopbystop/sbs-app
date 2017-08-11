// <copyright file="Web.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>08/08/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System.Linq;
    using System;
    using Microsoft.AspNetCore.Http;

    public static class WebUtils
    {
        public static string GetRF (HttpContext context)
        {
            string rf = context.Request.Query["rf"];
            if (string.IsNullOrEmpty (rf))
            {
                rf = CookieUtils.ReadCookie (context, "rf");
            }
            if (string.IsNullOrEmpty (rf))
            {
                rf = "";
            }

            return rf;

        }

        public static string GetFullUrl (HttpContext context)
        {
            return string.Format ("{0}://{1}{2}{3}",
                context.Request.Scheme,
                context.Request.Host,
                context.Request.Path,
                context.Request.QueryString);
        }

        public static string GetHostName (HttpContext context)
        {
            return string.Format ("{0}://{1}",
                context.Request.Scheme,
                context.Request.Host);
        }
    }
}