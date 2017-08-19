﻿namespace Yojowa.StopByStop.Web
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Rewrite;
    using Microsoft.AspNetCore.StaticFiles;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;

    public class Startup
    {
        public Startup (IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder ()
                .SetBasePath (env.ContentRootPath)
                .AddJsonFile ("appsettings.json", optional : false, reloadOnChange : true)
                .AddJsonFile ($"appsettings.{env.EnvironmentName}.json", optional : true)
                .AddEnvironmentVariables ();

            Configuration = builder.Build ();
            Startup.SBSConfiguration = new SBSConfiguration ();
            Configuration.GetSection ("SBS").Bind (Startup.SBSConfiguration);
        }

        public IConfigurationRoot Configuration { get; private set; }
        public static SBSConfiguration SBSConfiguration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry (Startup.SBSConfiguration.AppInsightsIKey);

            // Add framework services.
            services.AddMvc ();

            services.Configure<MvcOptions> (options =>
            {
                //options.Filters.Add (new RequireHttpsAttribute ());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole (Configuration.GetSection ("Logging"));
            loggerFactory.AddDebug ();

            if (env.IsDevelopment ())
            {
                app.UseDeveloperExceptionPage ();
                app.UseBrowserLink ();
            }
            else
            {
                app.UseExceptionHandler ("/Home/Error");
            }

            var options = new StaticFileOptions
            {
                ContentTypeProvider = new FileExtensionContentTypeProvider ()
            };

            ((FileExtensionContentTypeProvider) options.ContentTypeProvider).Mappings.Add (new KeyValuePair<string, string> (".less", "text/css"));
            ((FileExtensionContentTypeProvider) options.ContentTypeProvider).Mappings.Add (new KeyValuePair<string, string> (".webmanifest", "application/manifest+json"));

            app.UseStaticFiles (options);

            app.UseMvc (routes =>
            {
                routes.MapRoute (
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            /*
            var rewriteOptions = new RewriteOptions().AddRedirectToHttps();
            app.UseRewriter (rewriteOptions);
            */
        }
    }
}