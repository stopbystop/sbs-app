// <copyright file="PoiIDGenerator.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// POI identifier generator
    /// </summary>
    public static class PoiIDGenerator
    {
        /// <summary>
        /// Generates the identifier (version 1)
        /// </summary>
        /// <param name="phoneNumber">The phone number.</param>
        /// <param name="lon">The longitude</param>
        /// <param name="lat">The latitude</param>
        /// <returns>
        /// Generated identifier
        /// </returns>
        /// <remarks>
        /// Format is V,LL,LLL,LLL,PPP,PPP,PPPP
        /// </remarks>
        public static long GenerateIDV1(string phoneNumber, double lon, double lat)
        {
            long version = 1;

            long id = 0;
            long multiplier = 1;
            int l = 0;

            Tuple<char[], long>[] charGroups = new Tuple<char[], long>[]
            {
                new Tuple<char[], long>(new char[] { '1' }, 1),
                new Tuple<char[], long>(new char[] { '2', 'a', 'b', 'c' }, 2),
                new Tuple<char[], long>(new char[] { '3', 'd', 'e', 'f' }, 3),
                new Tuple<char[], long>(new char[] { '4', 'g', 'h', 'i' }, 4),
                new Tuple<char[], long>(new char[] { '5', 'j', 'k', 'l' }, 5),
                new Tuple<char[], long>(new char[] { '6', 'm', 'n', 'o' }, 6),
                new Tuple<char[], long>(new char[] { '7', 'p', 'q', 'r', 's' }, 7),
                new Tuple<char[], long>(new char[] { '8', 't', 'u', 'v' }, 8),
                new Tuple<char[], long>(new char[] { '9', 'w', 'x', 'y', 'z' }, 9),
                new Tuple<char[], long>(new char[] { '0' }, 0),
            };

            // replace null phone number with empty string
            if (phoneNumber == null)
            {
                phoneNumber = string.Empty;
            }
            else
            {
                phoneNumber = phoneNumber.ToLowerInvariant();
            }

            lon = Math.Abs(lon);
            lat = Math.Abs(lat);

            StringBuilder phoneNumberDigits = new StringBuilder();

            // iterate over characters in phone number starting from the end
            for (int i = phoneNumber.Length - 1; i >= 0; i--)
            {
                char c = phoneNumber[i];
                foreach (var charGroup in charGroups)
                {
                    bool match = false;
                    foreach (var charInGroup in charGroup.Item1)
                    {
                        if (charInGroup == c)
                        {
                            // prepend it by adding to id with current multipler applied
                            id += charGroup.Item2 * multiplier;

                            // adjust multiplier
                            multiplier *= 10;

                            // incremeent length
                            l++;
                            match = true;
                            break;
                        }

                        if (match)
                        {
                            break;
                        }
                    }
                }

                if (l == 10)
                {
                    break;
                }
            }

            if (l == 0)
            {
                // substitute phone number with fractional parts of lat and lon
                id = (long)Math.Ceiling((lat - (int)lat) * 100000.00) + ((long)Math.Ceiling((lon - (int)lon) * 100000.00) * 100000);
                l = 10;
                multiplier *= 10000000000;
                version = 2;
            }

            // prepend with zeros so the phone number takes 9 digits
            if (l < 10)
            {
                multiplier = multiplier * (long)Math.Pow(10, 10 - l);
            }

            // add up latitude and longitude and shift 5 positions
            id += (long)Math.Ceiling((lat + lon) * 100000) * multiplier;
            multiplier *= 100000000;

            id += version * multiplier;

            return id;
        }
    }
}
