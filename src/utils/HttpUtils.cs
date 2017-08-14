// <copyright file="HttpUtils.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>03/12/2017</date>

namespace Yojowa.StopByStop.Utils
{
    using System.Diagnostics;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Net;
    using System;
    using Newtonsoft.Json;

    /// <summary>
    /// HTTP utilities
    /// </summary>
    public static class HttpUtils
    {
        /// <summary>
        /// The HTTP client
        /// </summary>
        private static HttpClient httpClient = new HttpClient ();

        /// <summary>
        /// Initializes static members of the <see cref="HttpUtils"/> class.
        /// </summary>
        static HttpUtils ()
        {
            httpClient.DefaultRequestHeaders.Add ("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36");
        }

        /// <summary>
        /// Loads string from url with retries
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <param name="onFail">The on fail action.</param>
        /// <returns>String loaded from this ur</returns>
        public static string StringFromUrl (string url, Action<HttpStatusCode, string> onFail = null, string token = null)
        {
            int attemptsMade = 0;
            string htmlData = null;
            FunctionRunningUtils.RunWithRetries<object> (
                5,
                (int attemptIndex) =>
                {
                    try
                    {
                        var task = httpClient.GetStringAsync (url);
                        var request = new HttpRequestMessage (HttpMethod.Get, "url");
                        if (!string.IsNullOrEmpty (token))
                        {
                            request.Headers.Authorization = new AuthenticationHeaderValue ("Bearer", token);
                        }

                        HttpResponseMessage response = httpClient.SendAsync (request).Result;
                        if (!response.IsSuccessStatusCode && onFail != null)
                        {
                            onFail (response.StatusCode, response.Content.ReadAsStringAsync ().Result);
                        }

                        htmlData = response.Content.ReadAsStringAsync ().Result;
                    }
                    catch (Exception ex)
                    {
                        Trace.TraceWarning ("LoadHtml exception: {0}.{1}", ex.Message, attemptIndex < 5 ? " Retrying." : "Exceeded max number of retries.");
                        throw;
                    }

                    return null;
                },
                ex => { },
                ref attemptsMade);

            return htmlData;
        }

        /// <summary>
        /// Load object from URL with retries.
        /// </summary>
        /// <typeparam name="T">The type of object</typeparam>
        /// <param name="url">The URL.</param>
        /// <param name="onFail">The on fail.</param>
        /// <returns>Loaded object</returns>
        public static T ObjectFromUrl<T> (string url, Action<HttpStatusCode, string> onFail)
        {
            string jsonData = StringFromUrl (url, onFail);
            return JsonConvert.DeserializeObject<T> (jsonData);
        }
    }
}