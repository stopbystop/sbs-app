// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

/// <reference path="../../client/scripts/tsdef/ai.d.ts"/>
/// <reference path="../../client/scripts/tsdef/fb.d.ts"/>
/// <reference path="../../client/scripts/Init.ts"/>
/// <reference path="../../client/scripts/Telemetry.ts"/>

module StopByStop.Cordova {
    "use strict";

    export module Application {
        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);

        }

        function onDeviceReady() {
            console.log("in onDeviceReady");

            //console.log(device.platform);
            // FastClick lib: https://github.com/ftlabs/fastclick
            var attachFastClick = window["Origami"].fastclick;
            attachFastClick(document.body);

            // instead of target-density-dpi: http://stackoverflow.com/questions/11592015/support-for-target-densitydpi-is-removed-from-webkit
            var viewPortScale = 1 / window.devicePixelRatio;
            $('#viewport').attr('content', 'user-scalable=no, initial-scale=' + viewPortScale + ', width=device-width');

            StopByStop.Init.initialize({
                app: SBSApp.SPA,
                baseDataUrl: "https://www.stopbystop.com/",
                baseImageUrl: "images/",
                navigationLocation: { page: SBSPage.home },
                historyDisabled: true,
                windowOpenTarget: "_system",
                metadata: null
            });

            AppState.current.pageInfo = {
                pageName: "sbs-homePG",
                telemetryPageName: "Home"
            };

            InitHome.wireup();
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
            // instrumentationKey: "866f136d-4f4a-47bc-8377-fb086bfddb10" // dev instrumentation key
            instrumentationKey: "6abbda64-056b-42f3-b87b-e9bfab2a3245"//prod instrumentation key
        }
    };
    var init = new (<any>Microsoft.ApplicationInsights).Initialization(snippet);
    Telemetry._appInsights = init.loadAppInsights();


    try {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1385725698401226',
                xfbml: true,
                version: 'v2.8'
            });

            (<any>FB).AppEvents.activateApp();
        };
    }
    catch (ex) {
        Telemetry.trackError(new Error(ex.toString()));
    }

    $.mobile.ajaxEnabled = true;
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;



    window.onload = function () {
        Application.initialize();
    }
}
