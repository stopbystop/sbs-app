// <copyright file="DBUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>01/30/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Text.RegularExpressions;
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
            else if (typeof(T) == typeof(Location))
            {
                var coordsText = Regex.Match((string)obj, "POINT\\(([-0-9\\s\\.]+)\\)").Groups[1].Value;
                var coords = coordsText.Split(' ');

                return (T)(object)new Location(double.Parse(coords[1]), double.Parse(coords[0]));
            }
            else
            {
                Type typeToConvertTo = Nullable.GetUnderlyingType(typeof(T)) ?? typeof(T);
                return (T)Convert.ChangeType(obj, typeToConvertTo);
            }
        }

        /// <summary>
        /// Encodes the value.
        /// </summary>
        /// <param name="val">The value.</param>
        /// <returns>Encoded value</returns>
        public static string EncodeValue(object val)
        {
            if (val == null)
            {
                return "NULL";
            }

            if (val is string)
            {
                string strVal = (string)val;
                strVal = strVal.Replace("'", "''");
                return "'" + strVal + "'";
            }

            if (val is Guid)
            {
                return "'" + ((Guid)val).ToString() + "'";
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

            if (val is Location)
            {
                return string.Format("ST_GeomFromText('POINT({0} {1})', 4326)", ((Location)val).Lon, ((Location)val).Lat);
            }

            return val.ToString();
        }

        /// <summary>
        /// Builds the where clause.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <returns>Where clause with filters</returns>
        public static string BuildWhereClause(IList<string> filters)
        {
            StringBuilder whereClauseBuilder = new StringBuilder();
            for (int i = 0; i < filters.Count; i++)
            {
                if (i == 0)
                {
                    whereClauseBuilder.Append("WHERE ");
                }

                whereClauseBuilder.Append(filters[i]);

                if (i < filters.Count - 1)
                {
                    whereClauseBuilder.Append(" AND ");
                }
            }

            return whereClauseBuilder.ToString();
        }
    }
}
