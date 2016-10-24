

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;

    public static class CookieUtils
    {
        public static void WriteCookie(string name, string value)
        {
            var cookie = new HttpCookie(name, value);
            cookie.Expires = DateTime.UtcNow.AddYears(1);
            HttpContext.Current.Response.Cookies.Set(cookie);
        }

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
