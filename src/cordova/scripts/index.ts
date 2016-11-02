// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

/// <reference path="../../client/Scripts/tsdef/ai.d.ts"/>
/// <reference path="../../client/Scripts/Init.ts"/>
/// <reference path="../../client/Scripts/Telemetry.ts"/>

module StopByStop.Cordova {
    "use strict";

    export module Application {
        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);

        }

        function onDeviceReady() {
            console.log("in onDeviceReady");
            // FastClick lib: https://github.com/ftlabs/fastclick
            var attachFastClick = window["Origami"].fastclick;
            attachFastClick(document.body);

            // instead of target-density-dpi: http://stackoverflow.com/questions/11592015/support-for-target-densitydpi-is-removed-from-webkit
            var viewPortScale = 1 / window.devicePixelRatio;
            $('#viewport').attr('content', 'user-scalable=no, initial-scale=' + viewPortScale + ', width=device-width');


        }

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }

    }

    var snippet = {
        config: {
            instrumentationKey: "6abbda64-056b-42f3-b87b-e9bfab2a3245"
        }
    };
    var init = new (<any>Microsoft.ApplicationInsights).Initialization(snippet);
    Telemetry._appInsights = init.loadAppInsights();   

    $.mobile.ajaxEnabled = true;
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;       

    StopByStop.Init.initialize({
        app: SBSApp.Cordova
    });

    window.onload = function () {
        Application.initialize();
    }
}
