// <copyright file="DBUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/30/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections;
    using System.Linq;
    using Newtonsoft.Json;

    /// <summary>
    /// Database utility methods
    /// </summary>
    public static class DBUtils
    {
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
                strVal = strVal.Replace("'", "''");
                return "'" + strVal + "'";
            }

            if (val is Array)
            {
                var json = JsonConvert.SerializeObject((Array)val);
                json = json.Replace("[", "{");
                json = json.Replace("]", "}");
                json = json.Replace("'", "''");
                return "'" + json + "'";
            }

            if (val is IEnumerable)
            {
                return EncodeValue(((IEnumerable)val).Cast<object>().ToArray());
            }

            return val.ToString();
        }
    }
}
