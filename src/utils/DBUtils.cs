// <copyright file="DBUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/30/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Text.RegularExpressions;
    using Newtonsoft.Json;

    /// <summary>
    /// Database utility methods
    /// </summary>
    public static class DBUtils
    {
        /// <summary>
        /// Encodes SQL string
        /// </summary>
        /// <param name="unsafeString">String to encode</param>
        /// <returns>Encoded string</returns>
        public static string GetSafeSqlString(string unsafeString)
        {
            if (unsafeString == null)
            {
                unsafeString = string.Empty;
            }

            return unsafeString.Replace("'", "''");
        }

        /// <summary>
        /// Converts from database value.
        /// </summary>
        /// <typeparam name="T">Type to convert to</typeparam>
        /// <param name="obj">The object.</param>
        /// <returns>Converted value</returns>
        public static T ConvertFromDBVal<T>(object obj)
        {
            if (obj == null || obj == DBNull.Value)
            {
                return default(T); // returns the default value for the type
            }
            else
            {
                return (T)obj;
            }
        }

        /// <summary>
        /// Encodes the value.
        /// </summary>
        /// <param name="val">The value.</param>
        /// <returns>Encoded value</returns>
        public static string EncodeValue(object val)
        {
            if (val is string)
            {
                string strVal = (string)val;
                MatchEvaluator m = match =>
                {
                    if (match.Groups[1].Value == "\"")
                    {
                        return "\""; // Unescape \"
                    }

                    if (match.Groups[2].Value == "\"")
                    {
                        return "'";  // Replace " with '
                    }

                    if (match.Groups[2].Value == "'")
                    {
                        return "\\'"; // Escape '
                    }

                    return match.Value;                             // Leave \\ and \' unchanged
                };

                strVal = Regex.Replace(strVal, @"\\\\|\\(""|')|(""|')", m);
                return "'" + strVal + "'";
            }

            if (val is Array)
            {
                var json = JsonConvert.SerializeObject((Array)val);
                json = json.Replace("[", "{");
                json = json.Replace("]", "}");
                return "'" + json + "'";
            }

            return val.ToString();
        }
    }
}
