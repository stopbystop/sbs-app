/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
/// <reference path="InitUrls.ts"/>
/// <reference path="ViewModels/IAppViewModel.ts" />
/// <reference path="ViewModels/AppViewModel.ts" />
/// <reference path="ViewModels/RouteViewModel.ts" />
/// <reference path="ViewModels/JunctionAppViewModel.ts" />


module StopByStop {

    export class Init {

        //private static _app: IAppViewModel;
        //private static _route: RouteViewModel;
        //private static _junction: RouteJunctionViewModel;

        private static _app: KnockoutObservable<AppViewModel>;
        private static _initDone: boolean = false;

        public static initialize(settings: IInitSettings): void {

            Init.InitSettings = settings;

            var initUrls = <IInitUrls>{};
            var imageBaseUrl = window["CDN_ROOT"] + "/client/content/v1/icons/";

            if (Init.InitSettings.app === SBSApp.Cordova) {
                window["BASE_URL"] = "http://localhost/stopbystopweb";
                imageBaseUrl = "images/";
            }

            Init.InitSettings.urls = new InitUrls(window["BASE_URL"], imageBaseUrl);
            Init._app = ko.observable<AppViewModel>(new AppViewModel(null));

            (<any>ko).options.deferUpdates = true;
            Init.enableUAMatch();




            /* common initialization for all pages */
            $(document).on("pageinit", ".jqm-demos", (event) => {
                var page = $(this);

                if (Init.InitSettings.app === SBSApp.Cordova) {
                    Init.initSPA();
                }


                /* For Web app initialize menu programmatically*/
                if (Init.InitSettings.app === SBSApp.Web) {
                    $(".jqm-navmenu-panel ul").listview();
                    $(".jqm-navmenu-link").on("click", () => {
                        (<any>page.find(".jqm-navmenu-panel:not(.jqm-panel-page-nav)")).panel().panel("open");
                    });
                }

                // Initialize breadcrumb on applicable pages
                jQuery(document).ready(() => {
                    (<any>jQuery("#breadCrumb0")).jBreadCrumb();
                })

                // wire up click on the social button
                $(".social-btn").click(() => {
                    Telemetry.trackEvent(TelemetryEvent.SocialButtonClick);
                });

                $(".filter-btn").click(() => {
                    Telemetry.trackEvent(TelemetryEvent.FilterButtonClick);
                });

            });
            /* end of common initialiazation for all pages */

            /* home page initialization */
            $(document).on("pageinit", ".sbs-homePG", function (event) {
                var currentLocationString = "Current location";
                // populate from with 'current location'
                var currentLocationData = null;
                var setCurrentLocation = function () {
                    if (navigator && navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position: Position) => {
                                var srcLat = position.coords.latitude;
                                var srcLon = position.coords.longitude;

                                if (srcLat > S_LAT_BOUNDARY && srcLat < N_LAT_BOUNDARY && srcLon > W_LON_BOUNDARY && srcLon < E_LON_BOUNDARY) {
                                    currentLocationData = { n: currentLocationString, i: srcLat.toFixed(5) + "," + srcLon.toFixed(5) };

                                    $("#from").val(currentLocationString);
                                    $("#from").data({ place: currentLocationData });

                                    Telemetry.trackEvent(TelemetryEvent.LocationIN);
                                }
                                else {
                                    Telemetry.trackEvent(TelemetryEvent.LocationOUT);
                                }
                            },
                            (positionError: PositionError) => {
                                var positionErrorReason = "UNAVAILABLE";
                                switch (positionError.code) {
                                    case positionError.PERMISSION_DENIED:
                                        positionErrorReason = "PERMISSION_DENIED";
                                        break;
                                    case positionError.POSITION_UNAVAILABLE:
                                        positionErrorReason = "POSITION_UNAVAILABLE";
                                        break;
                                    case positionError.TIMEOUT:
                                        positionErrorReason = "TIMEOUT";
                                        break;
                                }

                                Telemetry.trackError(new Error("getCurrentPositionErrorHomePage-" + positionErrorReason));
                            },
                            {
                                maximumAge: 60000,
                                timeout: 5000,
                                enableHighAccuracy: true,
                            }
                        );
                    }
                };
                setCurrentLocation();

                $(".input-wrapper input").on("keyup", function (e, data) {
                    var $wrapper = $(this).closest('.input-wrapper');
                    var that = this;
                    var $ul = $wrapper.find('ul'),
                        $input = $(this),
                        value = $input.val();
                    //html = "";
                    //$ul.html("");
                    if (value) {
                        //$.mobile.loading('show');
                        $wrapper.append("<div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div>");
                        //$ul.listview("refresh");


                        $.ajax({
                            url: Init.InitSettings.urls.PlacesUrl + value,
                            dataType: 'json',
                            method: 'GET',
                            success: function (data) {
                                $wrapper.find('.ui-loader').remove();
                                //$.mobile.loading('hide');
                                $ul.empty();
                                var otherDropDown = $(that).attr('id') === 'from' ? $('#to') : $('#from');
                                var otherDropDownSelectedID = null;
                                if (otherDropDown.data('place')) {
                                    otherDropDownSelectedID = otherDropDown.data('place').i;
                                }

                                if ($(that).attr('id') === 'from' && currentLocationData) {
                                    var $li = $('<li data-icon="false"><a href="#">' + currentLocationString + '</a></li>');
                                    $li.data('place', currentLocationData);
                                    $ul.append($li);
                                }

                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].i !== otherDropDownSelectedID) {
                                        var $li = $('<li data-icon="false"><a href="#">' + data[i].n + '</a></li>');
                                        $li.data('place', data[i]);
                                        $ul.append($li);
                                    }
                                }
                                $ul.listview("refresh");
                                $ul.trigger("updatelayout");
                            }
                        });
                    }
                });

                $(".autocomplete").on('click', 'li', function (event) {

                    var $input = $(this).closest('div').find('input');
                    var place = $(this).data('place');
                    if (place) {
                        $input.val(place.n).data('place', place);
                        $(this).closest('ul').empty();

                        if ($("#from").data('place') && $("#to").data('place')) {
                            $("#view_trip").removeClass("ui-disabled");
                        }
                    }

                    Telemetry.trackEvent(TelemetryEvent.CityDropdownClick);
                });

                $('.input-wrapper input').on('focus', function (event) {

                    var that = $(this);
                    window.setTimeout(function () {
                        that.select();
                    }, 100);

                    var $wrapper = $(this).closest('.input-wrapper');
                    $wrapper.find('ul').show();
                    $wrapper.find('.input-tip').hide();
                });

                $('.view-trip').on('click', function (event) {
                    Telemetry.trackEvent(TelemetryEvent.ViewTripButtonClick, null, null, true);


                    var $from = $('#from');
                    var $to = $('#to');
                    var startlocation = $from.data('place');
                    var endlocation = $to.data('place');
                    if (startlocation != undefined && endlocation != undefined) {
                        if (Init.InitSettings.app === SBSApp.Web) {
                            var url = Init.InitSettings.urls.RouteUrl + startlocation.i + '-to-' + endlocation.i;
                            $("#view_trip").addClass("ui-disabled");
                            /* navigate without using AJAX navigation */
                            window.location.assign(url);
                        } else {
                            Init.InitSettings.routeId = startlocation.i + '-to-' + endlocation.i;
                            Init.loadRoute(Init.InitSettings.routeId);
                            $.mobile.pageContainer.pagecontainer(
                                "change",
                                "#route?" + startlocation.i + '-to-' + endlocation.i);
                        }
                    }
                });

                if ($("#from").data('place') && $("#to").data('place')) {
                    $("#view_trip").removeClass("ui-disabled");
                }
            });
            /* end of home page initialization */


            /* route page initialization */
            $(document).on("pageinit", ".route-page", function (event) {


            });
            /* end of route page initialization */

            /* exit page initialization */
            $(document).on("pageinit", ".exit-page", function (event) {
                Init.wireupPOIGroup();
            });
            /* end of exit page initialization */

            /* poi group page initialization */
            $(document).on("pageinit", ".poigroup-page", function (event) {
                Init.wireupPOIGroup();
                var poiGroupInitialized = false;
                $(document).scroll(function () {
                    if (!poiGroupInitialized) {
                        poiGroupInitialized = true;
                        Telemetry.trackEvent(TelemetryEvent.POIGroupPageScroll);
                    }
                });
            });
            /* end of poi group page initialization */
        }

        private static loadRoute(routeId: string): void {

            Init.InitSettings.routePromise = $.ajax({
                url: Init.InitSettings.urls.RouteDataUrl + routeId,
                dataType: 'json',
                method: 'GET',
                success: function (data) {
                    var route = <IRoute>data;
                    var app = new AppViewModel(route, Init.InitSettings);
                    Init._app(app);

                }
            });

        }

        private static initSPA(): void {

            if (!Init._initDone) {
                /* apply root bindings for Cordova app */
                var sbsRootNode = $("#sbsRoot")[0];
                ko.applyBindings(Init._app, sbsRootNode);

                /* initialize UI */
                $(".filter-btn").click(() => Init.openFilterPopup());

                Init._initDone = true;
            }

            var pageBeforeShowTime: number;

            $.mobile.pageContainer.pagecontainer({

                beforeshow: function (event, ui) {
                    pageBeforeShowTime = new Date().getTime();
                    var pageIdSelector: string = "#" + ui.toPage.attr("id");
                    Utils.pageInfo = {
                        pageName: ui.toPage.data("page-name"),
                        telemetryPageName: ui.toPage.data("telemetry-page-name"),
                    };

                    (<any>$("#sbsheader")
                        .prependTo(pageIdSelector))
                        .toolbar({ position: "fixed" });

                    (<any>$("#menupanel")
                        .appendTo(pageIdSelector))
                        .panel();

                    $("#menupanel-list").listview();
                    $("#menupanel-list>li a").removeClass("ui-btn-active");

                    (<any>$("#sbsfooter")
                        .appendTo(pageIdSelector))
                        .toolbar({ position: "fixed" });

                    (<any>$.mobile).resetActivePageHeight();

                    <any>$(pageIdSelector).css(
                        {
                            paddingTop: "51px",
                            paddingBottom: "50px"
                        });

                    if (Utils.pageInfo.pageName === "exit-page") {
                        var exitOsmIdWithPoiType = Init.getOsmIdFromExitPageNavigationEvent(event);
                        var selectedRouteJunction = Init._app().routePlan.junctionMap[exitOsmIdWithPoiType.osmid];
                        var poiType = exitOsmIdWithPoiType.poiType;

                        var appViewModel = Init._app();

                        var junctionAppViewModel = new JunctionSPAAppViewModel(
                            selectedRouteJunction,
                            appViewModel.filter,
                            appViewModel.routePlan,
                            poiType);

                        appViewModel.selectedJunction(junctionAppViewModel);
                    }

                },
                show: function (event, ui) {
              
                    // this is a hack. But I am not sure why this class is added despite the fact that
                    // sbsheader is added with {position:fixed}
                    $("#sbsheader").removeClass("ui-fixed-hidden");

                   

                    switch (Utils.pageInfo.pageName) {
                        case "exit-page":                            
                            $(".filter-btn").show();

                            // to ensure the switch between map and list view is initialized
                            $("#exit").trigger("create");

                            Init.wireupPOIGroup();
                            Init.initJunctionMap(<JunctionSPAAppViewModel>Init._app().selectedJunction());
                            break;
                        case "route-page":                           
                            $(".filter-btn").show();
                            break;
                        default:
                            $(".filter-btn").hide();
                            break;
                    }

                    // this triggers initialization of radio buttons
                    if (Utils.pageInfo.pageName === "exit-page") {


                    }

                    Telemetry.trackPageView(
                        Utils.pageInfo.telemetryPageName,
                        "#" + Utils.pageInfo.pageName,
                        (new Date()).getTime() - pageBeforeShowTime);
                }
            });
        }

        private static initJunctionMap(junctionAppViewModel: JunctionSPAAppViewModel) {
            var mapElement = $("#map")[0];
            var mapContainerElement = $(".poi-map")[0];
            if (mapElement && mapContainerElement) {
                junctionAppViewModel.initMap(mapElement, mapContainerElement);
            } else {
                window.setTimeout(() => Init.initJunctionMap(junctionAppViewModel), 200);
            }
        }

        private static getOsmIdFromExitPageNavigationEvent(event: any): { osmid: string, poiType: PoiType } {
            const osmIdSelector = "#exit?osmid=osm-";
            const poiTypeSelector = "&poitype=";

            var uri = event.target.baseURI;
            var osmidWithPoiType = uri.substr(uri.indexOf(osmIdSelector) + osmIdSelector.length);

            if (osmidWithPoiType.indexOf(poiTypeSelector) > -1) {
                var poiType = PoiType.General;
                var poiTypeString = osmidWithPoiType.substr(poiTypeSelector);
                if (poiTypeString.toLowerCase() === "gas") {
                    poiType = PoiType.Gas;
                }
                else if (poiTypeString.toLowerCase() === "food") {
                    poiType == PoiType.Food;
                }

                return {
                    osmid: osmidWithPoiType.substr(0, osmidWithPoiType.indexOf(poiTypeSelector)),
                    poiType: poiType
                };
            }
            else {
                return {
                    osmid: osmidWithPoiType,
                    poiType: PoiType.General
                };
            }
        }

        private static wireupPOIGroup(): void {
            $(".view-mode-switch").on("change", function () {
                var modeVal = $(".view-mode-switch :radio:checked").val();
                if (modeVal === "list") {
                    $(".poi-table").show();
                    $(".poi-map").hide();
                    Telemetry.trackEvent(TelemetryEvent.POIGroupSwitchList);
                }
                else {
                    $(".poi-table").hide();
                    $(".poi-map").show();
                    //TODO: refactor this to not expose map object globally
                    window["map"].setZoom(13);
                    Telemetry.trackEvent(TelemetryEvent.POIGroupSwitchMap);
                }
            });

            $(".yelp-btn").on("click", function () {
                Telemetry.trackEvent(TelemetryEvent.YelpLinkClick, null, null, true);
            });

            $(".tel-btn").on("click", function () {
                Telemetry.trackEvent(TelemetryEvent.TelLinkClick);
            });
        };

        private static enableUAMatch(): void {

            /* UA MATCH */
            var matched, browser;
            jQuery["uaMatch"] = function (ua) {
                ua = ua.toLowerCase();

                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) ||
                    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                    [];

                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            };

            matched = jQuery["uaMatch"](navigator.userAgent);
            browser = {};

            if (matched.browser) {
                browser[matched.browser] = true;
                browser.version = matched.version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if (browser.chrome) {
                browser.webkit = true;
            } else if (browser.webkit) {
                browser.safari = true;
            }

            jQuery["browser"] = browser;

            /* END OF UA_MATCH */
        }

        /** TODO: make private **/
        public static InitSettings: IInitSettings;

        public static openFilterPopup(): void {            
            var fd = $("." + Utils.pageInfo.pageName + " .filter-dlg")
            if (fd.length > 0) {
                fd.popup();
                fd.trigger("create");
                fd.popup("open", {
                    positionTo: "origin",
                    transition: "slidedown"
                });
            }
        }
    }
}