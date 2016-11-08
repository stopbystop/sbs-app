using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yojowa.StopByStop.Utils
{
    public class SqlUtil
    {
        public static string EscapeString(string s)
        {
            return s.Replace("'", "''");
        }
    }
}
