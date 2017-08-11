﻿namespace Yojowa.StopByStop.Web
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static  class RenderHelper
    {
        public static string GetCDNUrl(string relativeUrl)
        {
            if (string.IsNullOrEmpty(relativeUrl) || relativeUrl[0] !='/')
            {
                throw new ArgumentException("relativeUrl is expected to start with '/'");
            }

            return GetCDNRoot() + relativeUrl;
        }

        public static string GetCDNRoot()
        {
            string cdnRoot = Startup.SBSConfiguration.CDNRoot;
            return cdnRoot.TrimEnd('/');
        }

        public static string GetYelpStarClassName(double rating)
        {
            string starClassName = null;
            switch (rating.ToString())
            {
                case "5":
                    starClassName = "stars_5";
                    break;
                case "4.5":
                    starClassName = "stars_4_half";
                    break;
                case "4":
                    starClassName = "stars_4";
                    break;
                case "3.5":
                    starClassName = "stars_3_half";
                    break;
                case "3":
                    starClassName = "stars_3";
                    break;
                case "2.5":
                    starClassName = "stars_2_half";
                    break;
                case "2":
                    starClassName = "stars_2";
                    break;
                case "1.5":
                    starClassName = "stars_1_half";
                    break;
                case "1":
                    starClassName = "stars_1";
                    break;
                case "0":
                    starClassName = "stars_0";
                    break;
            }

            return starClassName;
        }

        public static string ToJSON(object model)
        {
            return JsonConvert.SerializeObject(model, new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore });
            //return serializer.Serialize(model);
        }

       
    }

    
}