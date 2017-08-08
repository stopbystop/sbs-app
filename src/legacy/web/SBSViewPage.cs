using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Yojowa.StopByStop.Web
{
    public abstract class SBSViewPage<TModel> : System.Web.Mvc.WebViewPage<TModel>
    {
       
        public override void Write(object value)
        {
            /*
            if (value != null)
            {
                var html = value.ToString();
                html = REGEX_TAGS.Replace(html, "> <");
                html = REGEX_ALL.Replace(html, " ");
                if (typeof(MvcHtmlString) == value.GetType())
                {
                    value = new MvcHtmlString(html);
                }
                else
                    value = html;
            }
            */
            base.Write(value);
        }

        public override void WriteLiteral(object value)
        {
            /*
            if (value != null)
            {
                var html = value.ToString();
                html = REGEX_TAGS.Replace(html, "> <");
                html = REGEX_ALL.Replace(html, " ");
                if (typeof(MvcHtmlString) == value.GetType())
                {
                    value = new MvcHtmlString(html);
                }
                else
                    value = html;
            }
            */
            base.WriteLiteral(value);
        }

        private static readonly Regex REGEX_TAGS = new Regex(@">\s+<", RegexOptions.Compiled);
        private static readonly Regex REGEX_ALL = new Regex(@"\s+|\t\s+|\n\s+|\r\s+", RegexOptions.Compiled);

      

    }
}