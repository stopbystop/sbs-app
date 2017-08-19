namespace Yojowa.StopByStop.Web
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System;
    using Microsoft.AspNetCore.Hosting;

    public class Program
    {
        public static void Main (string[] args)
        {
            var host = new WebHostBuilder ()
                .UseKestrel (options =>
                {
                    //options.UseHttps ("localhost.pfx", "");
                })
                .UseContentRoot (Directory.GetCurrentDirectory ())
                .UseIISIntegration ()
                .UseUrls("http://*:5000")
                .UseStartup<Startup> ()

                .Build ();

            host.Run ();
        }
    }
}