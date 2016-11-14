var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="tsdef/ai.d.ts"/>
var StopByStop;
(function (StopByStop) {
    (function (TelemetryEvent) {
        TelemetryEvent[TelemetryEvent["Add5MinToStop"] = 0] = "Add5MinToStop";
        TelemetryEvent[TelemetryEvent["AddStopToRoute"] = 1] = "AddStopToRoute";
        TelemetryEvent[TelemetryEvent["CityDropdownClick"] = 2] = "CityDropdownClick";
        TelemetryEvent[TelemetryEvent["FilterButtonClick"] = 3] = "FilterButtonClick";
        TelemetryEvent[TelemetryEvent["FilterMaxDistanceFromJunctionChanged"] = 4] = "FilterMaxDistanceFromJunctionChanged";
        TelemetryEvent[TelemetryEvent["FilterShowGasStationsChanged"] = 5] = "FilterShowGasStationsChanged";
        TelemetryEvent[TelemetryEvent["FilterShowRestaurantsChanged"] = 6] = "FilterShowRestaurantsChanged";
        TelemetryEvent[TelemetryEvent["LocationIN"] = 7] = "LocationIN";
        TelemetryEvent[TelemetryEvent["LocationOUT"] = 8] = "LocationOUT";
        TelemetryEvent[TelemetryEvent["LocationOUTPopupDisplayed"] = 9] = "LocationOUTPopupDisplayed";
        TelemetryEvent[TelemetryEvent["POIGroupPageScroll"] = 10] = "POIGroupPageScroll";
        TelemetryEvent[TelemetryEvent["POIGroupSwitchList"] = 11] = "POIGroupSwitchList";
        TelemetryEvent[TelemetryEvent["POIGroupSwitchMap"] = 12] = "POIGroupSwitchMap";
        TelemetryEvent[TelemetryEvent["Remove5MinFromStop"] = 13] = "Remove5MinFromStop";
        TelemetryEvent[TelemetryEvent["RemoveStopFromRoute"] = 14] = "RemoveStopFromRoute";
        TelemetryEvent[TelemetryEvent["RoutePageScroll"] = 15] = "RoutePageScroll";
        TelemetryEvent[TelemetryEvent["RoutePlanNavigateClick"] = 16] = "RoutePlanNavigateClick";
        TelemetryEvent[TelemetryEvent["RoutePlanNavigateBeforeDirect"] = 17] = "RoutePlanNavigateBeforeDirect";
        TelemetryEvent[TelemetryEvent["ShowStopSettingsPopup"] = 18] = "ShowStopSettingsPopup";
        TelemetryEvent[TelemetryEvent["SideBarThumbTouch"] = 19] = "SideBarThumbTouch";
        TelemetryEvent[TelemetryEvent["SocialButtonClick"] = 20] = "SocialButtonClick";
        TelemetryEvent[TelemetryEvent["StopPopupNavigateClick"] = 21] = "StopPopupNavigateClick";
        TelemetryEvent[TelemetryEvent["StopPopupNavigateBeforeDirect"] = 22] = "StopPopupNavigateBeforeDirect";
        TelemetryEvent[TelemetryEvent["TelLinkClick"] = 23] = "TelLinkClick";
        TelemetryEvent[TelemetryEvent["ViewTripButtonClick"] = 24] = "ViewTripButtonClick";
        TelemetryEvent[TelemetryEvent["YelpLinkClick"] = 25] = "YelpLinkClick";
    })(StopByStop.TelemetryEvent || (StopByStop.TelemetryEvent = {}));
    var TelemetryEvent = StopByStop.TelemetryEvent;
    (function (TelemetryProperty) {
        TelemetryProperty[TelemetryProperty["FilterVisibility"] = 0] = "FilterVisibility";
        TelemetryProperty[TelemetryProperty["LoadStopsFromCache"] = 1] = "LoadStopsFromCache";
        TelemetryProperty[TelemetryProperty["PageName"] = 2] = "PageName";
        TelemetryProperty[TelemetryProperty["StopCount"] = 3] = "StopCount";
        TelemetryProperty[TelemetryProperty["NavigationUrl"] = 4] = "NavigationUrl";
    })(StopByStop.TelemetryProperty || (StopByStop.TelemetryProperty = {}));
    var TelemetryProperty = StopByStop.TelemetryProperty;
    (function (TelemetryMeasurement) {
    })(StopByStop.TelemetryMeasurement || (StopByStop.TelemetryMeasurement = {}));
    var TelemetryMeasurement = StopByStop.TelemetryMeasurement;
    var Telemetry = (function () {
        function Telemetry() {
        }
        Telemetry.trackPageView = function (pageName, url, duration, telemetryProperties, telemetryMeasurements, flush) {
            if (telemetryProperties === void 0) { telemetryProperties = null; }
            if (telemetryMeasurements === void 0) { telemetryMeasurements = null; }
            if (flush === void 0) { flush = false; }
            try {
                var aiProps = Telemetry.getAIProperties(telemetryProperties);
                var aiMeasurements = Telemetry.getAIMeasurements(telemetryMeasurements);
                Telemetry._appInsights.trackPageView(pageName, url, aiProps, aiMeasurements, duration);
                if (flush) {
                    Telemetry._appInsights.flush();
                }
            }
            catch (ex) {
                Telemetry.logFatal(ex);
            }
        };
        Telemetry.trackEvent = function (telemetryEvent, telemetryProperties, telemetryMeasurements, flush) {
            if (telemetryProperties === void 0) { telemetryProperties = null; }
            if (telemetryMeasurements === void 0) { telemetryMeasurements = null; }
            if (flush === void 0) { flush = false; }
            try {
                var aiProps = Telemetry.getAIProperties(telemetryProperties);
                var aiMeasurements = Telemetry.getAIMeasurements(telemetryMeasurements);
                Telemetry._appInsights.trackEvent(TelemetryEvent[telemetryEvent], aiProps, aiMeasurements);
                if (flush) {
                    Telemetry._appInsights.flush();
                }
            }
            catch (ex) {
                Telemetry.logFatal(ex);
            }
        };
        Telemetry.trackError = function (error, telemetryProperties, telemetryMeasurements, flush) {
            if (telemetryProperties === void 0) { telemetryProperties = null; }
            if (telemetryMeasurements === void 0) { telemetryMeasurements = null; }
            if (flush === void 0) { flush = false; }
            try {
                var aiProps = Telemetry.getAIProperties(telemetryProperties);
                var aiMeasurements = Telemetry.getAIMeasurements(telemetryMeasurements);
                Telemetry.logFatal(error);
                Telemetry._appInsights.trackException(error, "", aiProps, aiMeasurements);
                if (flush) {
                    Telemetry._appInsights.flush();
                }
            }
            catch (ex) {
                Telemetry.logFatal(ex);
            }
        };
        Telemetry.logToConsole = function (message) {
            if (window.console) {
                window.console.log(message);
            }
        };
        Telemetry.getAIProperties = function (telemetryProperties) {
            var aiProps = {};
            aiProps[TelemetryProperty[TelemetryProperty.PageName]] = StopByStop.AppState.current.pageInfo.telemetryPageName;
            if (telemetryProperties) {
                $.each(telemetryProperties, function (i, v) { aiProps[TelemetryProperty[v.k]] = v.v; });
            }
            return aiProps;
        };
        Telemetry.getAIMeasurements = function (telemetryMeasurements) {
            var aiMeasurements = {};
            if (telemetryMeasurements) {
                $.each(telemetryMeasurements, function (i, v) { aiMeasurements[TelemetryMeasurement[v.k]] = v.v; });
            }
            return aiMeasurements;
        };
        Telemetry.logFatal = function (message) {
            Telemetry.logErrorToConsole("ERROR-TO-TELEMETRY:" + message);
        };
        Telemetry.logErrorToConsole = function (err) {
            if (window.console && window.console.error) {
                if (err.message) {
                    window.console.error(err.message);
                }
                else {
                    window.console.error(err);
                }
            }
        };
        Telemetry._appInsights = window["appInsights"];
        return Telemetry;
    }());
    StopByStop.Telemetry = Telemetry;
})(StopByStop || (StopByStop = {}));
/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
var StopByStop;
(function (StopByStop) {
    StopByStop.PAGENAME_HOME = "sbs-homePG";
    StopByStop.PAGENAME_Route = "route-page";
    StopByStop.PAGENAME_POIGroup = "poigroup-page";
    StopByStop.PAGENAME_Exit = "exit-page";
    StopByStop.PAGENAME_About = "about-page";
    StopByStop.N_LAT_BOUNDARY = 50.00;
    StopByStop.S_LAT_BOUNDARY = 25.00;
    StopByStop.W_LON_BOUNDARY = -125.00;
    StopByStop.E_LON_BOUNDARY = -66.00;
    StopByStop.ROUTE_PLAN_STORAGE_KEY = "sbsroutes";
    var Utils = (function () {
        function Utils() {
        }
        Utils.updateNavigationLocation = function (hash, navigationLocation) {
            if (!hash) {
                hash = "#home";
            }
            hash = hash.toLowerCase();
            var hashIndex = hash.indexOf("#");
            var queryStringPart = null;
            if (hashIndex < 0) {
                hash = "#home";
                hashIndex = 0;
            }
            if (hashIndex >= 0) {
                var indexOfPageNameEnd = hash.indexOf("&", hashIndex) - 1;
                if (indexOfPageNameEnd < 0) {
                    indexOfPageNameEnd = hash.length - 1;
                }
                else {
                    queryStringPart = hash.substr(indexOfPageNameEnd + 1);
                }
                var pageName = hash.substr(hashIndex + 1, indexOfPageNameEnd - hashIndex);
                if (StopByStop.SBSPage[pageName] !== undefined) {
                    navigationLocation.page = StopByStop.SBSPage[pageName];
                }
                if (queryStringPart) {
                    var queryStringParameterPairs = queryStringPart.split("&");
                    for (var i = 0; i < queryStringParameterPairs.length; i++) {
                        var qsParts = queryStringParameterPairs[i].split("=");
                        if (qsParts.length === 2) {
                            var parameter = qsParts[0];
                            var val = qsParts[1];
                            switch (parameter) {
                                case "routeid":
                                    navigationLocation.routeId = val;
                                    navigationLocation.poiType = undefined;
                                    break;
                                case "exitid":
                                    navigationLocation.exitId = val;
                                    break;
                                case "poitype":
                                    navigationLocation.poiType = StopByStop.PoiType.General;
                                    if (val === "food") {
                                        navigationLocation.poiType = StopByStop.PoiType.Food;
                                    }
                                    else if (val === "gas") {
                                        navigationLocation.poiType = StopByStop.PoiType.Gas;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        };
        Utils.getHashFromNavigationLocation = function (navigationLocation) {
            var loc = "#";
            if (StopByStop.SBSPage[navigationLocation.page]) {
                loc += StopByStop.SBSPage[navigationLocation.page];
            }
            else {
                loc += "home";
            }
            if (navigationLocation.routeId) {
                loc += ("&routeid=" + navigationLocation.routeId);
            }
            if (navigationLocation.exitId && navigationLocation.page === StopByStop.SBSPage.exit) {
                loc += ("&exitid=" + navigationLocation.exitId);
            }
            if (navigationLocation.poiType && navigationLocation.page === StopByStop.SBSPage.exit && StopByStop.PoiType[navigationLocation.poiType]) {
                loc += ("&poitype=" + StopByStop.PoiType[navigationLocation.poiType]);
            }
            return loc.toLowerCase();
        };
        Utils.getMileString = function (distance) {
            if (distance < 0.1) {
                return "<0.1mi";
            }
            return distance.toString() + "mi";
        };
        Utils.getTimeString = function (time, msOffset) {
            if (msOffset === void 0) { msOffset = 0; }
            time = new Date(time.getTime() + msOffset);
            return Utils.formatTime(time);
        };
        Utils.formatTime = function (date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var minutesString = minutes.toString();
            var ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            if (hours === 0) {
                hours = 12;
            }
            if (minutes < 10) {
                minutesString = "0" + minutesString;
            }
            return hours.toString() + ":" + minutesString + " " + ampm;
        };
        Utils.hasAnyOwnProperties = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return true;
                }
            }
            return false;
        };
        Utils.runOnce = function (func) {
            var ran = false;
            var memo;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (!ran) {
                    ran = true;
                    memo = func.apply(this, arguments);
                }
                return memo;
            };
        };
        ;
        Utils.spaPageNavigate = function (page, routeId, exitId, poiType, changeHash) {
            if (changeHash === void 0) { changeHash = true; }
            var pageId = "#home";
            switch (page) {
                case StopByStop.SBSPage.about:
                    pageId = "#about";
                    break;
                case StopByStop.SBSPage.exit:
                    pageId = "#exit";
                    break;
                case StopByStop.SBSPage.route:
                    pageId = "#route";
                    break;
            }
            var dataUrl = pageId;
            if (routeId) {
                dataUrl += "&routeid=" + routeId;
            }
            if (exitId) {
                dataUrl += "&exitid=" + exitId;
            }
            if (poiType) {
                dataUrl += "&poitype=" + StopByStop.PoiType[poiType].toLowerCase();
            }
            StopByStop.AppState.current.knownHashChangeInProgress = true;
            $.mobile.pageContainer.pagecontainer("change", pageId, { dataUrl: dataUrl, changeHash: changeHash });
        };
        // http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
        Utils.observeDOM = (function () {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;
            return function (obj, callback) {
                if (MutationObserver) {
                    // define a new observer
                    var obs = new MutationObserver(function (mutations, observer) {
                        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                            callback();
                    });
                    // have the observer observe foo for changes in children
                    obs.observe(obj, { childList: true, subtree: true });
                }
                else if (eventListenerSupported) {
                    obj.addEventListener('DOMNodeInserted', callback, false);
                    obj.addEventListener('DOMNodeRemoved', callback, false);
                }
            };
        })();
        return Utils;
    }());
    StopByStop.Utils = Utils;
})(StopByStop || (StopByStop = {}));
/// <reference path="tsdef/jquery.d.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    (function (SBSApp) {
        SBSApp[SBSApp["Web"] = 0] = "Web";
        SBSApp[SBSApp["SPA"] = 1] = "SPA";
    })(StopByStop.SBSApp || (StopByStop.SBSApp = {}));
    var SBSApp = StopByStop.SBSApp;
    ;
    (function (PoiType) {
        PoiType[PoiType["General"] = 0] = "General";
        PoiType[PoiType["Gas"] = 1] = "Gas";
        PoiType[PoiType["Food"] = 2] = "Food";
    })(StopByStop.PoiType || (StopByStop.PoiType = {}));
    var PoiType = StopByStop.PoiType;
    (function (SBSPage) {
        SBSPage[SBSPage["home"] = 0] = "home";
        SBSPage[SBSPage["route"] = 1] = "route";
        SBSPage[SBSPage["exit"] = 2] = "exit";
        SBSPage[SBSPage["about"] = 3] = "about";
    })(StopByStop.SBSPage || (StopByStop.SBSPage = {}));
    var SBSPage = StopByStop.SBSPage;
})(StopByStop || (StopByStop = {}));
/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
var StopByStop;
(function (StopByStop) {
    var AppState = (function () {
        function AppState() {
        }
        AppState.current = {
            baseDataUrl: null,
            baseImageUrl: null,
            app: null
        };
        return AppState;
    }());
    StopByStop.AppState = AppState;
})(StopByStop || (StopByStop = {}));
/// <reference path="stopbystop-interfaces.ts"/>
var StopByStop;
(function (StopByStop) {
    var InitUrls = (function () {
        function InitUrls(baseUrl, baseImageUrl) {
            if (typeof baseUrl !== "string") {
                baseUrl = "/";
            }
            else if (!/\/$/.test(baseUrl)) {
                baseUrl += "/";
            }
            this.MapExitIconUrl = baseImageUrl + "exit_map.png";
            this.MapFoodIconUrl = baseImageUrl + "food_map2.png";
            this.MapGasIconUrl = baseImageUrl + "gas_map.png";
            this.BaseUrl = baseUrl;
            this.RouteUrl = baseUrl + "route/";
            this.PlacesUrl = baseUrl + "place/";
            this.RouteDataUrl = baseUrl + "routedata/";
            this.PoiUrl = baseUrl + "poi/";
        }
        return InitUrls;
    }());
    StopByStop.InitUrls = InitUrls;
})(StopByStop || (StopByStop = {}));
/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="AppState.ts" />
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
/// <reference path="InitUrls.ts"/>
var StopByStop;
(function (StopByStop) {
    var InitHome = (function () {
        function InitHome() {
        }
        InitHome.wireup = function () {
            var currentLocationString = "Current location";
            // populate from with 'current location'
            var currentLocationData = null;
            var setCurrentLocation = function () {
                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var srcLat = position.coords.latitude;
                        var srcLon = position.coords.longitude;
                        if (srcLat > StopByStop.S_LAT_BOUNDARY && srcLat < StopByStop.N_LAT_BOUNDARY && srcLon > StopByStop.W_LON_BOUNDARY && srcLon < StopByStop.E_LON_BOUNDARY) {
                            currentLocationData = { n: currentLocationString, i: srcLat.toFixed(5) + "," + srcLon.toFixed(5) };
                            $("#from").val(currentLocationString);
                            $("#from").data({ place: currentLocationData });
                            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.LocationIN);
                        }
                        else {
                            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.LocationOUT);
                        }
                    }, function (positionError) {
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
                        StopByStop.Telemetry.trackError(new Error("getCurrentPositionErrorHomePage-" + positionErrorReason));
                    }, {
                        maximumAge: 60000,
                        timeout: 5000,
                        enableHighAccuracy: true,
                    });
                }
            };
            setCurrentLocation();
            $(".input-wrapper input").on("keyup", function (e, data) {
                var $wrapper = $(this).closest('.input-wrapper');
                var that = this;
                var $ul = $wrapper.find('ul'), $input = $(this), value = $input.val();
                if (value) {
                    $wrapper.append("<div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div>");
                    $.ajax({
                        url: StopByStop.AppState.current.urls.PlacesUrl + value,
                        dataType: 'json',
                        method: 'GET',
                        success: function (data) {
                            $wrapper.find('.ui-loader').remove();
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
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.CityDropdownClick);
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
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.ViewTripButtonClick, null, null, true);
                var $from = $('#from');
                var $to = $('#to');
                var startlocation = $from.data('place');
                var endlocation = $to.data('place');
                if (startlocation != undefined && endlocation != undefined) {
                    if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                        var url = StopByStop.AppState.current.urls.RouteUrl + startlocation.i + '-to-' + endlocation.i;
                        $("#view_trip").addClass("ui-disabled");
                        /* navigate without using AJAX navigation */
                        window.location.assign(url);
                    }
                    else {
                        StopByStop.Utils.spaPageNavigate(StopByStop.SBSPage.route, startlocation.i + '-to-' + endlocation.i);
                    }
                }
            });
            if ($("#from").data('place') && $("#to").data('place')) {
                $("#view_trip").removeClass("ui-disabled");
            }
        };
        return InitHome;
    }());
    StopByStop.InitHome = InitHome;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var PoiCategoryViewModel = (function () {
        function PoiCategoryViewModel(obj) {
            this._obj = obj;
            this.sbsid = this._obj.id;
            this.type = this._obj.t;
            this.yid = this._obj.yid;
            this.parentIDs = this._obj.p;
            this.name = this._obj.n;
        }
        return PoiCategoryViewModel;
    }());
    StopByStop.PoiCategoryViewModel = PoiCategoryViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="PoiCategoryViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    ;
    var FilterCacheManager = (function () {
        function FilterCacheManager(filterViewModel) {
            var _this = this;
            this.itemKey = "sbsfilters";
            this.storage = sessionStorage;
            this.data = {
                d: "3", g: true, r: true, drc: []
            };
            this.itemKey = this.itemKey + filterViewModel.routeId;
            var dataString = this.storage.getItem(this.itemKey);
            if (dataString) {
                try {
                    this.data = JSON.parse(dataString);
                }
                catch (ex) {
                    StopByStop.Telemetry.trackError(new Error(ex.toString()));
                }
            }
            filterViewModel.maxDistanceFromJunction(this.data.d);
            var mdarr = [
                [filterViewModel.maxDistanceFromJunctionIs1, "1"],
                [filterViewModel.maxDistanceFromJunctionIs2, "2"],
                [filterViewModel.maxDistanceFromJunctionIs3, "3"],
                [filterViewModel.maxDistanceFromJunctionIs4, "4"],
                [filterViewModel.maxDistanceFromJunctionIs5, "5"]
            ];
            for (var i = 0; i < mdarr.length; i++) {
                mdarr[i][0](mdarr[i][1] === this.data.d);
            }
            filterViewModel.maxDistanceFromJunction.subscribe(function (newValue) {
                _this.data.d = newValue;
                _this.saveData();
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.FilterMaxDistanceFromJunctionChanged);
            });
            filterViewModel.showGasStations(this.data.g);
            filterViewModel.showRestaurants(this.data.r);
            if (filterViewModel.preserveShowAllSettings) {
                filterViewModel.showGasStations.subscribe(function (newValue) {
                    _this.data.g = newValue;
                    _this.saveData();
                    if (StopByStop.AppState.current.pageInfo.pageName !== StopByStop.PAGENAME_POIGroup) {
                        StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.FilterShowGasStationsChanged, [{ k: StopByStop.TelemetryProperty.FilterVisibility, v: newValue.toString() }]);
                    }
                });
                filterViewModel.showRestaurants.subscribe(function (newValue) {
                    _this.data.r = newValue;
                    _this.saveData();
                    if (StopByStop.AppState.current.pageInfo.pageName !== StopByStop.PAGENAME_POIGroup) {
                        StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.FilterShowRestaurantsChanged, [{ k: StopByStop.TelemetryProperty.FilterVisibility, v: newValue.toString() }]);
                    }
                });
            }
            $.each(filterViewModel.foodCategoriesEnablement(), function (indexInArray, valueOfElement) {
                var category = valueOfElement;
                if (_this.data.drc.indexOf(valueOfElement.category.sbsid) > -1) {
                    category.visible(false);
                }
                category.visible.subscribe(function (newValue) {
                    var catId = category.category.sbsid;
                    var i = _this.data.drc.indexOf(catId);
                    if (newValue) {
                        if (i > -1) {
                            _this.data.drc.splice(i, 1);
                            _this.saveData();
                        }
                    }
                    else {
                        if (i < 0) {
                            _this.data.drc.push(catId);
                            _this.saveData();
                        }
                    }
                });
            });
        }
        FilterCacheManager.prototype.saveData = function () {
            this.storage.setItem(this.itemKey, JSON.stringify(this.data));
        };
        return FilterCacheManager;
    }());
    var FilterViewModel = (function () {
        function FilterViewModel(routeId, rjs, foodPoiCategoryOccurrences, topLevelFoodCategories, preserveShowAllSettings) {
            var _this = this;
            if (preserveShowAllSettings === void 0) { preserveShowAllSettings = true; }
            this.allCategories = {};
            this.foodCategoriesEnablementLookup = {};
            this.allRestaurantCategoriesSelected = ko.observable(false);
            this.routeId = routeId;
            this.routeJunctions = rjs;
            this.preserveShowAllSettings = preserveShowAllSettings;
            this.showGasStations = ko.observable(true);
            this.showRestaurants = ko.observable(true);
            this.foodCategoriesEnablement = ko.observableArray([]);
            foodPoiCategoryOccurrences.sort(function (a, b) { return b.c - a.c; });
            for (var i = 0; i < foodPoiCategoryOccurrences.length; i++) {
                var categoryOccurrence = foodPoiCategoryOccurrences[i];
                var categoryViewModel = new StopByStop.PoiCategoryViewModel(categoryOccurrence.cat);
                this.allCategories[categoryViewModel.sbsid] = categoryViewModel;
                // if this category is in the list of top level categories, put it in the list of filters popup
                if (topLevelFoodCategories.indexOf(categoryViewModel.sbsid) > -1) {
                    var categoryEnablement = this.createCategoryEnablement(categoryOccurrence);
                    this.foodCategoriesEnablement.push(categoryEnablement);
                    this.foodCategoriesEnablementLookup[categoryEnablement.category.sbsid] = categoryEnablement;
                }
            }
            this.maxDistanceFromJunction = ko.observable("3");
            this.maxDistanceFromJunctionIs1 = ko.observable(false);
            this.maxDistanceFromJunctionIs2 = ko.observable(false);
            this.maxDistanceFromJunctionIs3 = ko.observable(true);
            this.maxDistanceFromJunctionIs4 = ko.observable(false);
            this.maxDistanceFromJunctionIs5 = ko.observable(false);
            var mdarr = [
                [this.maxDistanceFromJunctionIs1, "1"],
                [this.maxDistanceFromJunctionIs2, "2"],
                [this.maxDistanceFromJunctionIs3, "3"],
                [this.maxDistanceFromJunctionIs4, "4"],
                [this.maxDistanceFromJunctionIs5, "5"]
            ];
            for (var i = 0; i < mdarr.length; i++) {
                var selectedmdpair = mdarr[i];
                selectedmdpair[0].subscribe((function (newValue) {
                    var pair = arguments[0];
                    var val = arguments[1];
                    if (val) {
                        this.maxDistanceFromJunction(pair[1]);
                        for (var j = 0; j < mdarr.length; j++) {
                            if (mdarr[j][1] !== pair[1]) {
                                mdarr[j][0](false);
                            }
                        }
                    }
                }).bind(this, selectedmdpair));
            }
            this.filteredFoodCount = ko.observable(1);
            this.filteredGasStationCount = ko.observable(1);
            // load filters for cache for Web App
            // TBD SPA
            if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                this.filterCacheManager = new FilterCacheManager(this);
            }
            var self = this;
            this.selectAllFoodCategories = function () {
                $.each(_this.foodCategoriesEnablement(), function (i, item) { return item.visible(true); });
                _this.allRestaurantCategoriesSelected(true);
            };
            this.unselectAllFoodCategories = function () {
                $.each(_this.foodCategoriesEnablement(), function (i, item) { return item.visible(false); });
                _this.allRestaurantCategoriesSelected(false);
            };
            this.updateFilteredCounts();
            this.maxDistanceFromJunction.subscribe(function (newValue) { return _this.updateFilteredCounts(); });
        }
        FilterViewModel.prototype.selectAllFoodCategories = function () { };
        FilterViewModel.prototype.unselectAllFoodCategories = function () { };
        FilterViewModel.prototype.getCategoryName = function (sbsid) {
            if (this.allCategories[sbsid]) {
                return this.allCategories[sbsid].name;
            }
            return "";
        };
        ;
        FilterViewModel.prototype.isFoodCategoryVisible = function (sbsid) {
            if (this.foodCategoriesEnablementLookup[sbsid]) {
                return this.foodCategoriesEnablementLookup[sbsid].visible();
            }
            if (this.allCategories[sbsid] && this.allCategories[sbsid].parentIDs.length > 0) {
                for (var i = 0; i < this.allCategories[sbsid].parentIDs.length; i++) {
                    var isParentVisible = this.isFoodCategoryVisible(this.allCategories[sbsid].parentIDs[i]);
                    if (isParentVisible) {
                        return true;
                    }
                }
                // this category has parents and all of them are hidden
                return false;
            }
            else {
                // this category is not in allCategories list or it has no parents (top level category)
                // if we reached top level category it means we haven't accounted for it in our filtering
                return true;
            }
        };
        FilterViewModel.prototype.updateFilteredCounts = function () {
            var _this = this;
            var fCount = 0;
            var gsCount = 0;
            var distance = parseInt(this.maxDistanceFromJunction());
            $.each(this.foodCategoriesEnablement(), function (i, item) { return item.tempCount = 0; });
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var rj = this.routeJunctions[i];
                for (var j = 0; j < rj.j.p.length; j++) {
                    var poiOnJunction = rj.j.p[j];
                    if (poiOnJunction.dfj <= distance) {
                        if (poiOnJunction.p.pt === StopByStop.PoiType.Food) {
                            fCount++;
                            $.each(poiOnJunction.p.c, function (i, categoryId) {
                                if (_this.foodCategoriesEnablementLookup[categoryId]) {
                                    _this.foodCategoriesEnablementLookup[categoryId].tempCount++;
                                }
                            });
                        }
                        else if (poiOnJunction.p.pt === StopByStop.PoiType.Gas) {
                            gsCount++;
                        }
                    }
                }
            }
            $.each(this.foodCategoriesEnablement(), function (i, item) {
                item.count(item.tempCount);
            });
            this.foodCategoriesEnablement.sort(function (a, b) { return b.count() - a.count(); });
            this.filteredFoodCount(fCount);
            this.filteredGasStationCount(gsCount);
        };
        ;
        FilterViewModel.prototype.createCategoryEnablement = function (categoryOccurrence) {
            var categoryEnablement = {
                category: new StopByStop.PoiCategoryViewModel(categoryOccurrence.cat),
                count: ko.observable(categoryOccurrence.c),
                tempCount: 0,
                visible: ko.observable(true)
            };
            return categoryEnablement;
        };
        ;
        return FilterViewModel;
    }());
    StopByStop.FilterViewModel = FilterViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var PoiImageViewModel = (function () {
        function PoiImageViewModel(obj) {
            this._obj = obj;
            this.imageUrl = ko.observable(this._obj.u);
        }
        return PoiImageViewModel;
    }());
    StopByStop.PoiImageViewModel = PoiImageViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var LocationViewModel = (function () {
        function LocationViewModel(obj) {
            this.lat = obj.a;
            this.lon = obj.o;
            this.placeDescription = obj.pd || "";
        }
        LocationViewModel.getGridLocations = function (location) {
            var mainLocation = new LocationViewModel({
                a: LocationViewModel.roundToNLat(location.a),
                o: LocationViewModel.roundToWLon(location.o)
            });
            // n locations
            var nwLocation = new LocationViewModel({
                a: mainLocation.lat + LocationViewModel.GRAIN,
                o: mainLocation.lon - LocationViewModel.GRAIN
            });
            var nLocation = new LocationViewModel({
                a: mainLocation.lat + LocationViewModel.GRAIN,
                o: mainLocation.lon
            });
            var neLocation = new LocationViewModel({
                a: mainLocation.lat + LocationViewModel.GRAIN,
                o: mainLocation.lon + LocationViewModel.GRAIN
            });
            // e locations
            var eLocation = new LocationViewModel({
                a: mainLocation.lat,
                o: mainLocation.lon + LocationViewModel.GRAIN
            });
            var seLocation = new LocationViewModel({
                a: mainLocation.lat - LocationViewModel.GRAIN,
                o: mainLocation.lon + LocationViewModel.GRAIN
            });
            // s locations
            var sLocation = new LocationViewModel({
                a: mainLocation.lat - LocationViewModel.GRAIN,
                o: mainLocation.lon
            });
            var swLocation = new LocationViewModel({
                a: mainLocation.lat - LocationViewModel.GRAIN,
                o: mainLocation.lon - LocationViewModel.GRAIN
            });
            // w location
            var wLocation = new LocationViewModel({
                a: mainLocation.lat,
                o: mainLocation.lon - LocationViewModel.GRAIN
            });
            return [
                mainLocation,
                nwLocation,
                nLocation,
                neLocation,
                eLocation,
                seLocation,
                sLocation,
                swLocation,
                wLocation
            ];
        };
        LocationViewModel.roundToNLat = function (lat) {
            var roundedLat = LocationViewModel.round1DecimalDigit(lat);
            if (roundedLat < lat) {
                roundedLat += 0.1;
            }
            return roundedLat;
        };
        LocationViewModel.roundToWLon = function (lon) {
            var roundedLon = LocationViewModel.round1DecimalDigit(lon);
            if (roundedLon > lon) {
                roundedLon -= 0.1;
            }
            return roundedLon;
        };
        LocationViewModel.round1DecimalDigit = function (n) {
            return Math.round(n * 10) / 10;
        };
        LocationViewModel.GRAIN = 0.1;
        return LocationViewModel;
    }());
    StopByStop.LocationViewModel = LocationViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var ReviewGroupViewModel = (function () {
        function ReviewGroupViewModel(obj) {
            this._obj = obj;
            this.name = ko.observable(this._obj.n);
            this.icon = ko.observable(this._obj.i);
            this.reviewCount = ko.observable(this._obj.rc);
            this.reviewPageUrl = ko.observable(this._obj.u);
            this.ratingImageUrl = ko.observable(this._obj.riu);
            this.rating = ko.observable(this._obj.r);
        }
        return ReviewGroupViewModel;
    }());
    StopByStop.ReviewGroupViewModel = ReviewGroupViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="PoiImageViewModel.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="ReviewGroupViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var PoiViewModel = (function () {
        function PoiViewModel(obj) {
            this._obj = obj;
            this.sbsid = this._obj.id;
            this.poiCategoryIDs = this._obj.c;
            this.poiType = this._obj.pt;
            this.name = this._obj.n;
            this.description = ko.observable(this._obj.d);
            this.location = new StopByStop.LocationViewModel(this._obj.l);
            this.visible = ko.observable(true);
            this.telPhoneString = "";
            if (this.sbsid.indexOf("y_") === 0) {
                this.telPhoneString = this.sbsid.substr(2);
            }
            this.isYInfoLoading = ko.observable(true);
            this.yUrl = ko.observable("#");
            this.yStarClass = ko.observable("stars_0");
            this.yReviewCountString = ko.observable("");
            /*
            if (this._obj.i) {
                this.images = ko.observableArray($.map(this._obj.i, (valueOfElement: IPoiImage, indexInArray: number) =>
                    new PoiImageViewModel(valueOfElement)));
            }
            */
            /*
            if (this._obj.rg) {
                this.reviewGroups = ko.observableArray($.map(this._obj.rg, (valueOfElement: IReviewGroup, indexInArray: number) =>
                    new ReviewGroupViewModel(valueOfElement)));
            }
            */
        }
        PoiViewModel.prototype.updateYInfo = function (poi) {
            if (poi.rg && poi.rg.length > 0) {
                this.yUrl(poi.rg[0].u);
                this.yStarClass(PoiViewModel.getYStarClass(poi.rg[0].r));
                this.yReviewCountString(PoiViewModel.getReviewsString(poi.rg[0].rc));
                this.isYInfoLoading(false);
            }
        };
        /*
        public images: KnockoutObservableArray<PoiImageViewModel>;
        public reviewGroups: KnockoutObservableArray<ReviewGroupViewModel>;
        */
        PoiViewModel.getReviewsString = function (reviewCount) {
            if (reviewCount === 0) {
                return "no reviews";
            }
            else if (reviewCount === 1) {
                return "1 review";
            }
            return reviewCount.toString() + " reviews";
        };
        ;
        PoiViewModel.getYStarClass = function (rating) {
            var starClassName = null;
            switch (rating.toString()) {
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
        };
        return PoiViewModel;
    }());
    StopByStop.PoiViewModel = PoiViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
"use strict";
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="PoiImageViewModel.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="ReviewGroupViewModel.ts"/>
/// <reference path="PoiViewModel.ts"/>
/// <reference path="IStopPlace.ts"/>
/// <reference path="../Utils.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var PoiOnJunctionViewModel = (function () {
        function PoiOnJunctionViewModel(obj, exit, app) {
            this._obj = obj;
            this._app = app;
            this.id = this._obj.id;
            this.dfe = this._obj.dfj;
            this.dtefrs = exit.dfrs;
            this.exitId = exit.j.oid.toString();
            this.distanceFromJunctionText = StopByStop.Utils.getMileString(this.dfe) + " miles from exit";
            this.poi = new StopByStop.PoiViewModel(this._obj.p);
            this.name = this.poi.name;
            this.lat = this.poi.location.lat;
            this.lon = this.poi.location.lon;
            this.type = obj.p.pt;
        }
        PoiOnJunctionViewModel.prototype.addToRouteOptionsClick = function () {
            var plannedStop = this._app.routePlan.getOrCreateStop(this);
            this._app.routePlan.showStopSettings(plannedStop);
        };
        return PoiOnJunctionViewModel;
    }());
    StopByStop.PoiOnJunctionViewModel = PoiOnJunctionViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="PoiOnJunctionViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var RouteStopViewModel = (function () {
        function RouteStopViewModel(stopPlace) {
            var _this = this;
            this.stopPlace = stopPlace;
            this.sbsid = stopPlace.id;
            this.location = new StopByStop.LocationViewModel({ a: stopPlace.lat, o: stopPlace.lon });
            this.name = stopPlace.name;
            this.stopDurationFastUpdate = ko.observable(stopPlace.duration || 15); //default stop time is 15 minutes
            this.stopDuration = ko.observable(stopPlace.duration || 15); //default stop time is 15 minutes
            this.stopDuration.extend({ rateLimit: { timeout: 1000, method: "notifyWhenChangesStop" } });
            this.exitEta = ko.observable(new Date());
            this.etaString = ko.computed(function () {
                var drivingTimeToPlaceInSeconds = _this.getDrivingTimeToPlaceInSeconds();
                var stopEta = new Date(_this.exitEta().getTime() + drivingTimeToPlaceInSeconds * 1000);
                var stopEtd = new Date(stopEta.getTime() + _this.stopDuration() * 60 * 1000);
                return StopByStop.Utils.getTimeString(stopEta) + "-" + StopByStop.Utils.getTimeString(stopEtd);
            });
            this.stopDurationHours = ko.computed(function () {
                var n = (Math.floor(_this.stopDurationFastUpdate() / 60)).toString();
                if (n.length === 1) {
                    n = "0" + n;
                }
                return n;
            });
            this.stopDurationMinutes = ko.computed(function () {
                var n = (_this.stopDurationFastUpdate() % 60).toString();
                if (n.length === 1) {
                    n = "0" + n;
                }
                return n;
            });
            this.detourDuration = ko.computed(function () {
                var drivigTimeToPlaceInSeconds = _this.getDrivingTimeToPlaceInSeconds() * 2;
                var stopDurationInSeconds = _this.stopDuration() * 60;
                return drivigTimeToPlaceInSeconds + stopDurationInSeconds;
            });
        }
        RouteStopViewModel.prototype.getDrivingTimeToPlaceInSeconds = function () {
            // for now let's assume 20mph non-highway speed
            return this.stopPlace.dfe / 20 * 3600;
        };
        RouteStopViewModel.prototype.add5MinutesToDuration = function () {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.Add5MinToStop);
            this.stopDurationFastUpdate(this.stopDurationFastUpdate() + 5);
            this.stopDuration(this.stopDurationFastUpdate());
        };
        RouteStopViewModel.prototype.subtract5MinutesFromDuration = function () {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.Remove5MinFromStop);
            this.stopDurationFastUpdate(Math.max(0, this.stopDurationFastUpdate() - 5));
            this.stopDuration(this.stopDurationFastUpdate());
        };
        RouteStopViewModel.prototype.navigate = function () {
            var _this = this;
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.StopPopupNavigateClick, null, null, true);
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var srcLat = position.coords.latitude;
                    var srcLon = position.coords.longitude;
                    var navigationUrl = "http://maps.google.com/maps?saddr="
                        + srcLat + ","
                        + srcLon + "&daddr="
                        + _this.location.lat.toString() + ","
                        + _this.location.lon.toString();
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.StopPopupNavigateBeforeDirect, [
                        { k: StopByStop.TelemetryProperty.NavigationUrl, v: navigationUrl }
                    ], null, true);
                    window.location.assign(navigationUrl);
                }, function (positionError) {
                    try {
                        StopByStop.Telemetry.trackError(new Error("getCurrentPositionError"));
                    }
                    catch (ex) { }
                    window.alert("Please allow StopByStop.com to share your location.");
                });
            }
        };
        ;
        return RouteStopViewModel;
    }());
    StopByStop.RouteStopViewModel = RouteStopViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="PoiOnJunctionViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var JunctionViewModel = (function () {
        function JunctionViewModel(robj, app) {
            this.poiLookup = {};
            this._obj = robj.j;
            this._app = app;
            this.name = this._obj.n;
            this.index = this._obj.i;
            this.osmid = this._obj.oid;
            this.highwayName = this._obj.hn;
            this.ref = this._obj.r;
            this.location = new StopByStop.LocationViewModel(this._obj.l);
            this.exitTo = this._obj.et;
            this.exitToLeft = this._obj.etl;
            this.exitToRight = this._obj.etr;
            if (this._obj.p) {
                this.pois = ko.observableArray();
                for (var i = 0; i < this._obj.p.length; i++) {
                    var poiOnJunctionViewModel = new StopByStop.PoiOnJunctionViewModel(this._obj.p[i], robj, this._app);
                    this.pois.push(poiOnJunctionViewModel);
                    this.poiLookup[poiOnJunctionViewModel.id] = poiOnJunctionViewModel;
                }
            }
            this.pois.sort(function (l, r) { return l.dfe - r.dfe; });
        }
        return JunctionViewModel;
    }());
    StopByStop.JunctionViewModel = JunctionViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../AppState.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var RouteJunctionViewModel = (function () {
        function RouteJunctionViewModel(obj, routeStartTime, app) {
            var _this = this;
            this._obj = this.routeJunction = obj;
            this.distanceFromRouteStartText = ko.observable(StopByStop.Utils.getMileString(this._obj.dfrs));
            this.junction = new StopByStop.JunctionViewModel(this._obj, app);
            this.visible = ko.observable(true);
            this.top = ko.observable("");
            this.visibleGasPois = ko.observableArray([]);
            this.visibleFoodPois = ko.observableArray([]);
            this.closestFoodPoiDistance = ko.observable("");
            this.closestGasPoiDistance = ko.observable("");
            this.gasPoiCountString = ko.observable("");
            this.foodPoiCountString = ko.observable("");
            this.stops = ko.observableArray();
            this.etaWithoutStops = new Date(routeStartTime.getTime() + this._obj.tfrs * 1000);
            this.eta = ko.observable(this.etaWithoutStops);
            this.hasStops = ko.computed(function () { return _this.stops().length > 0; });
            if (app.title && app.title()) {
                var routeTitle = app.title();
                routeTitle = (routeTitle.substr(0, 1).toLowerCase() + routeTitle.substr(1));
                this.title = this.junction.name + " on the way from " + routeTitle;
            }
            // TODO: fix this
            this.description = ko.computed(function () { return _this.junction.name +
                ". " + _this.gasPoiCountString() + " gas stations, " +
                _this.foodPoiCountString() + " restaurants within 5 mile travel distance."; });
            this.etaString = ko.computed(function () {
                var s = StopByStop.Utils.getTimeString(_this.eta());
                if (_this.hasStops()) {
                    s = StopByStop.Utils.getTimeString(_this.eta()) + "-" + StopByStop.Utils.getTimeString(_this.etd());
                }
                return s;
            });
            this.etd = ko.computed(function () {
                var totalDetourTime = 0;
                for (var i = 0; i < _this.stops().length; i++) {
                    totalDetourTime += _this.stops()[i].detourDuration();
                }
                return new Date(_this.eta().getTime() + totalDetourTime * 1000);
            });
        }
        RouteJunctionViewModel.prototype.applyFilter = function (filter) {
            this.visibleGasPois.removeAll();
            this.visibleFoodPois.removeAll();
            for (var i = 0; i < this.junction.pois().length; i++) {
                var poi = this.junction.pois()[i];
                poi.poi.visible(false);
                var maxDistanceFromJunction = parseInt(filter.maxDistanceFromJunction(), 10);
                if (poi.poi.poiType === StopByStop.PoiType.Food && filter.showRestaurants() &&
                    poi.dfe <= maxDistanceFromJunction) {
                    var poiFoodCategories = poi.poi.poiCategoryIDs;
                    // in some cases as was discovered poiFoodCategories can be null
                    // see if categories are specified and if not then add poi anyway
                    if (poiFoodCategories && poiFoodCategories.length > 0) {
                        for (var k = 0; k < poiFoodCategories.length; k++) {
                            if (filter.isFoodCategoryVisible(poiFoodCategories[k])) {
                                this.visibleFoodPois().push(poi);
                                poi.poi.visible(true);
                                break;
                            }
                        }
                    }
                    else {
                        this.visibleFoodPois().push(poi);
                        poi.poi.visible(true);
                    }
                }
                else if (poi.poi.poiType === StopByStop.PoiType.Gas && filter.showGasStations() &&
                    poi.dfe <= maxDistanceFromJunction) {
                    // TODO: understand why it we may ever end up in this situation
                    this.visibleGasPois().push(poi);
                    poi.poi.visible(true);
                }
            }
            this.visible((this.visibleFoodPois().length > 0 || this.visibleGasPois().length > 0));
            this.closestFoodPoiDistance(this.visibleFoodPois().length > 0 ? StopByStop.Utils.getMileString(this.visibleFoodPois()[0].dfe) : "");
            this.closestGasPoiDistance(this.visibleGasPois().length > 0 ? StopByStop.Utils.getMileString(this.visibleGasPois()[0].dfe) : "");
            this.gasPoiCountString(this.visibleGasPois().length > 9 ? "9+" : this.visibleGasPois().length.toString());
            this.foodPoiCountString(this.visibleFoodPois().length > 9 ? "9+" : this.visibleFoodPois().length.toString());
        };
        RouteJunctionViewModel.prototype.navigateToExitPage = function () {
            StopByStop.Utils.spaPageNavigate(StopByStop.SBSPage.exit, StopByStop.AppState.current.navigationLocation.routeId, this.junction.osmid.toString());
        };
        RouteJunctionViewModel.prototype.navigateToExitFoodPage = function () {
            StopByStop.Utils.spaPageNavigate(StopByStop.SBSPage.exit, StopByStop.AppState.current.navigationLocation.routeId, this.junction.osmid.toString(), StopByStop.PoiType.Food);
        };
        RouteJunctionViewModel.prototype.navigateToExitGasPage = function () {
            StopByStop.Utils.spaPageNavigate(StopByStop.SBSPage.exit, StopByStop.AppState.current.navigationLocation.routeId, this.junction.osmid.toString(), StopByStop.PoiType.Gas);
        };
        return RouteJunctionViewModel;
    }());
    StopByStop.RouteJunctionViewModel = RouteJunctionViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="../AppState.ts"/>
/// <reference path="RouteStopViewModel.ts"/>
/// <reference path="RouteJunctionViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    ;
    var RoutePlanViewModel = (function () {
        function RoutePlanViewModel(routeId, routeDistance, destination, storageOverride) {
            if (storageOverride === void 0) { storageOverride = null; }
            this._stopDictionary = {};
            this._storage = window.sessionStorage;
            this._storageItem = {};
            this.junctionMap = {};
            this.routeDistance = routeDistance;
            this._storage = storageOverride || window.sessionStorage;
            this._routeId = routeId;
            this.stops = ko.observableArray([]);
            this.editedStop = ko.observable(null);
            this._stopDictionary = {};
            this._destination = destination;
        }
        RoutePlanViewModel.prototype.loadStopsFromStorage = function () {
            this.stops([]);
            this._stopDictionary = {};
            if (this._storage.getItem(StopByStop.ROUTE_PLAN_STORAGE_KEY)) {
                this._storageItem = JSON.parse(this._storage.getItem(StopByStop.ROUTE_PLAN_STORAGE_KEY));
            }
            else {
                this._storageItem = {};
            }
            if (!this._storageItem[this._routeId]) {
                this._storageItem[this._routeId] = { stops: {} };
            }
            else {
                var stops = this._storageItem[this._routeId].stops;
                for (var id in stops) {
                    var routeStopViewModel = this.getOrCreateStop(stops[id]);
                    this.addStopToRoute(routeStopViewModel, true);
                }
            }
            this.saveRouteToStorage();
        };
        RoutePlanViewModel.prototype.getOrCreateStop = function (placeObj, reloadFromCache) {
            if (reloadFromCache === void 0) { reloadFromCache = false; }
            /* Ensure that object only contains members that are part of IStopPlace interface,
               as this is about to be serialized. Is there a better way to do it? */
            var place = {
                dfe: placeObj.dfe,
                dtefrs: placeObj.dtefrs,
                duration: placeObj.duration,
                exitId: placeObj.exitId,
                id: placeObj.id,
                lat: placeObj.lat,
                lon: placeObj.lon,
                name: placeObj.name,
                type: placeObj.type || StopByStop.PoiType.Food
            };
            var sbsid = place.id;
            if (!this._stopDictionary[sbsid]) {
                var routeStopViewModel = new StopByStop.RouteStopViewModel(place);
                this._stopDictionary[sbsid] = routeStopViewModel;
            }
            var stop = this._stopDictionary[sbsid];
            return stop;
        };
        RoutePlanViewModel.prototype.addEditedStopToRoute = function () {
            this.addStopToRoute(this.editedStop());
            StopByStop.Utils.spaPageNavigate(StopByStop.SBSPage.route, StopByStop.AppState.current.navigationLocation.routeId);
        };
        RoutePlanViewModel.prototype.removeEditedStop = function () {
            this.removeStop(this.editedStop());
            this.closeStopSettings();
        };
        RoutePlanViewModel.prototype.navigateToEditedStop = function () {
            this.editedStop().navigate();
        };
        RoutePlanViewModel.prototype.addStopToRoute = function (routeStopViewModel, reloadFromCache) {
            var _this = this;
            if (reloadFromCache === void 0) { reloadFromCache = false; }
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.AddStopToRoute, [{ k: StopByStop.TelemetryProperty.LoadStopsFromCache, v: reloadFromCache.toString() }]);
            var place = routeStopViewModel.stopPlace;
            // only add it to stops if it is not already in the collection
            var alreadyAdded = false;
            $.each(this.stops(), function (index, value) {
                if (value.sbsid === place.id) {
                    alreadyAdded = true;
                }
            });
            if (!alreadyAdded) {
                this.stops.push(this._stopDictionary[place.id]);
                var routeJunctionViewModel = this.junctionMap[place.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.push(routeStopViewModel);
                }
                else {
                    StopByStop.Telemetry.trackError(new Error("RouteStopViewModel.addStopToRoute.0"), null, null);
                }
                if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                    // legacy path: we'll remove it completely, once fully migrated to SPA mode
                    // add to stop collection bound to UI
                    if (StopByStop.AppState.current.pageInfo.pageName === "route-page") {
                        var routeJunctionViewModel = this.junctionMap[place.exitId];
                        if (routeJunctionViewModel) {
                            routeJunctionViewModel.stops.push(routeStopViewModel);
                        }
                        else {
                            alert("Couldn't find routeJunctionViewModel");
                        }
                    }
                    // update storage item for persistence
                    place.duration = routeStopViewModel.stopDuration();
                    this._storageItem[this._routeId].stops[place.id] = place;
                    // subscribe for duration updates
                    routeStopViewModel.stopDuration.subscribe(function (newValue) {
                        _this._storageItem[_this._routeId].stops[place.id].duration = newValue;
                        _this.saveRouteToStorage();
                    });
                    this.saveRouteToStorage();
                }
            }
        };
        RoutePlanViewModel.prototype.removeStop = function (stop) {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RemoveStopFromRoute);
            var sbsid = stop.sbsid;
            if (this._stopDictionary[sbsid]) {
                var stop = this._stopDictionary[sbsid];
                this.stops.remove(stop);
                var routeJunctionViewModel = this.junctionMap[stop.stopPlace.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.remove(stop);
                }
                delete this._stopDictionary[sbsid];
                if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                    delete this._storageItem[this._routeId].stops[sbsid];
                    this.saveRouteToStorage();
                }
            }
        };
        RoutePlanViewModel.prototype.showStopSettings = function (plannedStop) {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.ShowStopSettingsPopup);
            this.editedStop(plannedStop);
            var stopSettingsDialog = StopByStop.AppState.current.app === StopByStop.SBSApp.SPA ?
                $("." + StopByStop.AppState.current.pageInfo.pageName + " .stop-settings-dialog") :
                $("#stopSettingsDialog");
            stopSettingsDialog.popup({
                transition: "slidedown",
                corners: true
            });
            ko.tasks.runEarly();
            stopSettingsDialog.trigger("create");
            stopSettingsDialog.popup("open");
        };
        RoutePlanViewModel.prototype.closeStopSettings = function () {
            var stopSettingsDialog = StopByStop.AppState.current.app === StopByStop.SBSApp.SPA ?
                $("." + StopByStop.AppState.current.pageInfo.pageName + " .stop-settings-dialog") :
                $("#stopSettingsDialog");
            stopSettingsDialog.popup("close");
        };
        RoutePlanViewModel.prototype.navigate = function () {
            var _this = this;
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RoutePlanNavigateClick, null, null, true);
            if (this._destination && navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var srcLat = position.coords.latitude;
                    var srcLon = position.coords.longitude;
                    var daddrStr = "";
                    for (var i = 0; i < _this.stops().length; i++) {
                        if (i > 0) {
                            daddrStr += "+to:";
                        }
                        daddrStr += (_this.stops()[i].location.lat + "," + _this.stops()[i].location.lon);
                    }
                    if (daddrStr !== "") {
                        daddrStr += "+to:";
                    }
                    daddrStr += _this._destination.lat + "," + _this._destination.lon;
                    var navigationUrl = "http://maps.google.com/maps?saddr="
                        + srcLat + ","
                        + srcLon + "&daddr="
                        + daddrStr;
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RoutePlanNavigateBeforeDirect, [
                        { k: StopByStop.TelemetryProperty.StopCount, v: _this.stops().length.toString() },
                        { k: StopByStop.TelemetryProperty.NavigationUrl, v: navigationUrl }
                    ], null, true);
                    window.location.assign(navigationUrl);
                }, function (positionError) {
                    StopByStop.Telemetry.trackError(new Error("getCurrentPositionError"));
                    window.alert("Please allow StopByStop.com to share your location.");
                });
            }
        };
        ;
        RoutePlanViewModel.prototype.saveRouteToStorage = function () {
            if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                this._storage.setItem(StopByStop.ROUTE_PLAN_STORAGE_KEY, JSON.stringify(this._storageItem));
            }
        };
        return RoutePlanViewModel;
    }());
    StopByStop.RoutePlanViewModel = RoutePlanViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="RouteStopViewModel.ts"/>
/// <reference path="RoutePlanViewModel.ts"/>
"use strict";
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="../Utils.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var RouteSegmentViewModel = (function () {
        function RouteSegmentViewModel(obj, routeStartTime, app) {
            var _this = this;
            this._obj = obj;
            this._app = app;
            this.highwayNameText = ko.observable("");
            if (this._obj.r) {
                this.highwayNameText(this._obj.r);
                if (this._obj.hn && this._obj.hn !== this._obj.r) {
                    this.highwayNameText(this._obj.r + " - " + this._obj.hn);
                }
            }
            else {
                if (this._obj.hn) {
                    this.highwayNameText(this._obj.hn);
                }
                else {
                    /* this was setting it to "unnamed highway" before */
                    this.highwayNameText("");
                }
            }
            this.start = ko.observable(new StopByStop.LocationViewModel(this._obj.s));
            this.end = ko.observable(new StopByStop.LocationViewModel(this._obj.e));
            this.distance = ko.observable(this._obj.d);
            this.routeJunctions = [];
            if (this._obj.j) {
                for (var i = 0; i < this._obj.j.length; i++) {
                    var routeJunctionViewModel = new StopByStop.RouteJunctionViewModel(this._obj.j[i], routeStartTime, this._app);
                    this._app.routePlan.junctionMap[routeJunctionViewModel.junction.osmid.toString()] = routeJunctionViewModel;
                    this.routeJunctions.push(routeJunctionViewModel);
                }
            }
            this.routeVisibleJunctions = ko.observableArray([]);
            this.portionCompleted = ko.observable(this._obj.pc);
            this.startIndex = ko.observable(this._obj.si);
            this.endIndex = ko.observable(this._obj.ei);
            this.height = ko.computed(function () {
                return (_this.routeVisibleJunctions().length *
                    RouteSegmentViewModel.SPACE_FOR_JUNCTION +
                    RouteSegmentViewModel.SEGMENT_INITIAL_SPACE).toString() + "em";
            });
            this.distanceText = ko.computed(function () {
                return StopByStop.Utils.getMileString(_this.distance());
            });
            this.maneuver = this._obj.m;
            this.instructions = this._obj.i || "";
            this.instructionsTip = this.instructions.replace(/(<([^>]+)>)/ig, "");
            this.layoutJunctions();
        }
        RouteSegmentViewModel.prototype.applyFilter = function (filter) {
            this.layoutJunctions(filter);
        };
        RouteSegmentViewModel.prototype.layoutJunctions = function (filter) {
            if (filter === void 0) { filter = null; }
            this.routeVisibleJunctions.removeAll();
            var visibleJunctionIndex = 0;
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var junction = this.routeJunctions[i];
                if (filter) {
                    junction.applyFilter(filter);
                }
                if (junction.visible()) {
                    this.routeVisibleJunctions.push(junction);
                    junction.top((RouteSegmentViewModel.SEGMENT_INITIAL_SPACE + visibleJunctionIndex
                        * RouteSegmentViewModel.SPACE_FOR_JUNCTION).toString() + "em");
                    visibleJunctionIndex++;
                }
            }
        };
        RouteSegmentViewModel.SEGMENT_INITIAL_SPACE = 7;
        RouteSegmentViewModel.SPACE_FOR_JUNCTION = 8;
        return RouteSegmentViewModel;
    }());
    StopByStop.RouteSegmentViewModel = RouteSegmentViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="RouteSegmentViewModel.ts" />
/// <reference path="FilterViewModel.ts" />
/// <reference path="RoutePlanViewModel.ts" />
"use strict";
var StopByStop;
(function (StopByStop) {
    var SideBarStopViewModel = (function () {
        function SideBarStopViewModel(stop, routePlan) {
            this.stop = stop;
            this.routePlan = routePlan;
            this.poiTypeClass = stop.stopPlace.type === StopByStop.PoiType.Food ? "food" : "gas";
            this.top = ko.observable("");
            this.left = ko.observable("");
        }
        SideBarStopViewModel.prototype.click = function () {
            this.routePlan.showStopSettings(this.stop);
        };
        return SideBarStopViewModel;
    }());
    StopByStop.SideBarStopViewModel = SideBarStopViewModel;
    var SideBarViewModel = (function () {
        function SideBarViewModel(routePlan, routeViewModel, initSettings) {
            var _this = this;
            this._headerHeight = 0;
            this._footerHeight = 0;
            this._thumbHeight = 0;
            this._scrollProcessingScheduled = false;
            this._thumbPageY = null;
            this._thumbTopAtDragStart = 0;
            this._routeContentSelector = ".route-page .ui-content";
            this._sideBarInit = StopByStop.Utils.runOnce(function () {
                $("#sidebar-thumb").unbind();
                $(_this._routeContentSelector).unbind();
                $("#sidebar-thumb").bind("touchstart mousedown", function (e) {
                    _this.onTouchStart(e);
                });
                $("#sidebar-thumb").bind("touchend mouseup", function (e) {
                    _this.onTouchEnd(e);
                });
                $(_this._routeContentSelector).bind("mousemove", function (e) {
                    _this.onTouchMove(e, e.pageY);
                });
                $(_this._routeContentSelector).bind("touchmove", function (e) {
                    _this.onTouchMove(e, e.originalEvent["touches"][0].pageY);
                });
            });
            this._sideBarFirstScrollInit = StopByStop.Utils.runOnce(this.sideBarFirstScrollInit.bind(this));
            this.sideBarHeight = ko.observable(0);
            this.sideBarInnerHeight = ko.observable(0);
            this.sideBarInnerTop = ko.observable(0);
            this.sideBarPosition = ko.observable("absolute");
            this.sideBarTop = ko.observable("40px");
            this.sideBarBottom = ko.observable("");
            this.sideBarThumbTop = ko.observable("0px");
            this.isDraggingThumb = ko.observable(false);
            this.stops = ko.observableArray([]);
            this._routePlanViewModel = routePlan;
            this._routeViewModel = routeViewModel;
            $(document).scroll(function () {
                if (!_this._scrollProcessingScheduled) {
                    window.setTimeout(function () {
                        _this.onScroll();
                        _this._scrollProcessingScheduled = false;
                    }, 20);
                    _this._scrollProcessingScheduled = true;
                }
            });
            // in web app, run postInit, right away
            // in Cordova app it will be called in postRender
            if (initSettings.app === StopByStop.SBSApp.Web) {
                this.postInit();
            }
        }
        SideBarViewModel.prototype.postInit = function () {
            this._sideBarInit();
        };
        SideBarViewModel.prototype.onTouchStart = function (eventObject) {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.SideBarThumbTouch);
            this.isDraggingThumb(true);
            this._thumbTopAtDragStart = parseInt(this.sideBarThumbTop());
            ;
            eventObject.preventDefault();
        };
        ;
        SideBarViewModel.prototype.onTouchEnd = function (eventObject) {
            if (this.isDraggingThumb()) {
                this._thumbPageY = null;
                this.isDraggingThumb(false);
                var thumbTop = parseInt(this.sideBarThumbTop());
                var pixelsScrolled = thumbTop - this._thumbTopAtDragStart;
                var routePixelsScrolled = ($(".route").innerHeight() / (this.sideBarInnerHeight() - this._thumbHeight)) * pixelsScrolled;
                window.scrollBy(0, routePixelsScrolled);
                eventObject.preventDefault();
            }
        };
        ;
        SideBarViewModel.prototype.onTouchMove = function (e, pageY) {
            if (this.isDraggingThumb()) {
                if (this._thumbPageY) {
                    var oldThumbTop = parseInt(this.sideBarThumbTop());
                    var newThumbTop = oldThumbTop + (pageY - this._thumbPageY);
                    newThumbTop = Math.max(0, newThumbTop);
                    newThumbTop = Math.min(this.sideBarInnerHeight() - this._thumbHeight, newThumbTop);
                    this.sideBarThumbTop(newThumbTop.toString() + "px");
                }
                this._thumbPageY = pageY;
                e.preventDefault();
            }
        };
        SideBarViewModel.prototype.onScroll = function () {
            this._sideBarFirstScrollInit();
            var documentScrollTop = $(document).scrollTop();
            var routeOffsetTop = $(this._routeContentSelector).offset().top;
            if (documentScrollTop > routeOffsetTop) {
                this.sideBarPosition("fixed");
                // this.sideBarTop((this._headerHeight + 41).toString() + "px");
                this.sideBarTop("");
                this.sideBarBottom((this._footerHeight).toString() + "px");
                this._portionOfRouteScrolled = Math.min(1.0, (documentScrollTop - routeOffsetTop) /
                    ($(".route").innerHeight() - $(window).height() - this._footerHeight));
                this.recalcThumbPosition();
            }
            else {
                this.sideBarPosition("absolute");
                this.sideBarTop("40px");
                this.sideBarBottom("");
                this.sideBarThumbTop("0px");
            }
        };
        SideBarViewModel.prototype.recalcThumbPosition = function () {
            this.sideBarThumbTop(((this.sideBarInnerHeight() - this._thumbHeight) * this._portionOfRouteScrolled).toString() + "px");
        };
        SideBarViewModel.prototype.sideBarFirstScrollInit = function () {
            var _this = this;
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RoutePageScroll);
            SideBarViewModel.recalculateSideBarPosition(this);
            // check if there's already a resize handle attached from the previous instance of SideBarViewModel
            // if so, detach it
            if (SideBarViewModel._recalcOnWindowResize) {
                $(window).off("resize", SideBarViewModel._recalcOnWindowResize);
            }
            SideBarViewModel._recalcOnWindowResize = SideBarViewModel.recalculateSideBarPosition.bind(this);
            $(window).on("resize", SideBarViewModel._recalcOnWindowResize);
            this._routePlanViewModel.stops.subscribe(function () { return _this.updateStopsOnSidebar(); });
            this._routeViewModel.roadLineHeight.subscribe(function () { return _this.updateStopsOnSidebar(); });
        };
        SideBarViewModel.prototype.updateStopsOnSidebar = function () {
            var _this = this;
            this.stops.removeAll();
            var sideBarStopItems = $.map(this._routePlanViewModel.stops(), function (elementOfArray, indexInArray) { return new SideBarStopViewModel(elementOfArray, _this._routePlanViewModel); });
            if (sideBarStopItems.length > 0 && StopByStop.Utils.hasAnyOwnProperties(this._routeViewModel.routeJunctionElementLookup)) {
                // sort by distance to exit from route start. This is so that we can render exits belonging to the same exit
                // next to each other
                sideBarStopItems.sort(function (a, b) { return a.stop.stopPlace.dtefrs - b.stop.stopPlace.dtefrs; });
                var currentExitId = "";
                var currentIndexOnThisExit = 0;
                for (var i = 0; i < sideBarStopItems.length; i++) {
                    var sideBarStopViewModel = sideBarStopItems[i];
                    var poiExitId = sideBarStopViewModel.stop.stopPlace.exitId;
                    if (!this._routeViewModel.routeJunctionElementLookup[poiExitId]) {
                        continue;
                    }
                    if (poiExitId === currentExitId) {
                        currentIndexOnThisExit++;
                    }
                    else {
                        currentIndexOnThisExit = 0;
                        currentExitId = poiExitId;
                    }
                    /*
                    routeDistance    sideBarInnerHeight
                    -------------- = ---------------------  =>
                    distanceToExit          x
                          sideBarInnerHeight*distanceToExit
                    x = --------------------------------------------
                          routeDistance
                    */
                    /* available height is slightly smaller because we don't want POI to overlap with ETA time */
                    /* this is to address Bug 126: Sidebar - location of chosen POIs on the sidebar */
                    var sideBarAvailableHeight = this.sideBarInnerHeight() - 32;
                    /* 1.15 is a magic contant to adjust stops on the sidebar */
                    var distanceToExitInPixels = (sideBarAvailableHeight * this._routeViewModel.routeJunctionElementLookup[poiExitId].top * 1.15 /
                        this._routeViewModel.roadLineHeight());
                    sideBarStopViewModel.top((distanceToExitInPixels).toString() + "px");
                    sideBarStopViewModel.left((-28 + currentIndexOnThisExit * 8).toString() + "px"); /* 28 is another magic constant */
                    this.stops.push(sideBarStopViewModel);
                }
            }
            StopByStop.Telemetry.logToConsole(sideBarStopItems.length.toString() + " stops on sidebar updated");
        };
        SideBarViewModel.recalculateSideBarPosition = function (sbvm) {
            if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                sbvm._headerHeight = $(".ui-header").outerHeight();
                sbvm._footerHeight = $(".ui-footer").outerHeight();
            }
            else {
                // we have multiple copies of header and footer on SPA app
                sbvm._headerHeight = $("." + StopByStop.AppState.current.pageInfo.pageName + " .ui-header").outerHeight();
                sbvm._footerHeight = $("." + StopByStop.AppState.current.pageInfo.pageName + " .ui-footer").outerHeight();
            }
            sbvm._thumbHeight = $("#sidebar-thumb").outerHeight();
            var sidebarTopInfoHeight = $(".sidebar-top").outerHeight();
            var sidebarBottomInfoHeight = $(".sidebar-bottom").outerHeight();
            var windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
            ;
            var sideBarHeightPixels = windowHeight - sbvm._headerHeight - sbvm._footerHeight;
            var sideBarInnerHeightPixels = sideBarHeightPixels - sidebarBottomInfoHeight - sidebarTopInfoHeight;
            sbvm.sideBarHeight(sideBarHeightPixels);
            sbvm.sideBarInnerHeight(sideBarInnerHeightPixels);
            sbvm.sideBarInnerTop(sidebarTopInfoHeight);
            sbvm.recalcThumbPosition();
            sbvm.updateStopsOnSidebar();
        };
        return SideBarViewModel;
    }());
    StopByStop.SideBarViewModel = SideBarViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="RouteSegmentViewModel.ts" />
/// <reference path="FilterViewModel.ts" />
/// <reference path="SideBarViewModel.ts" />
"use strict";
var StopByStop;
(function (StopByStop) {
    var RouteViewModel = (function () {
        function RouteViewModel(route, app, filter, initSettings, routeInitializationComplete) {
            var _this = this;
            this._stopDurationSubscriptions = [];
            this._junctionElementCount = 0;
            this._subscribedForBoundElement = false;
            this.routeJunctionElementLookup = {};
            this.roadLineHeight = ko.observable(0);
            this.routeHeightPx = ko.observable(0);
            this.boundElement = ko.observable(null);
            this._route = this.route = route;
            this._app = app;
            this._routeInitializationComplete = routeInitializationComplete;
            this._filter = filter;
            this.sideBar = new StopByStop.SideBarViewModel(app.routePlan, this, initSettings);
            this.fromLocation = new StopByStop.LocationViewModel(this._route.fl);
            this.toLocation = new StopByStop.LocationViewModel(this._route.tl);
            this.currentLocation = ko.observable(new StopByStop.LocationViewModel(this._route.cl));
            this._routeStartTime = new Date();
            this.startTimeString = ko.observable(StopByStop.Utils.getTimeString(this._routeStartTime));
            this.etaString = ko.observable(StopByStop.Utils.getTimeString(this._routeStartTime, this._route.t * 1000));
            this.routeId = this._route.rid;
            this.distance = this._route.d;
            if (this.fromLocation.placeDescription.indexOf("Start location (") === 0) {
                this.fromLocation.placeDescription = "Your location";
            }
            this.title = this.fromLocation.placeDescription + " to " + this.toLocation.placeDescription;
            var exitCount = 0;
            $.each(route.s, function (i, v) { return exitCount += v.j.length; });
            this.description =
                "Traveling by car from "
                    + this.fromLocation.placeDescription.toString()
                    + " to "
                    + this.toLocation.placeDescription.toString()
                    + " and looking for best place to stop for food or gas? This route is "
                    + this.distance.toString()
                    + " miles and has "
                    + exitCount.toString()
                    + " exits.Check this out. ";
            this.shortDescription = "Distance " + this.distance.toString() + ". " + exitCount.toString() + " exits";
            this.routeSegments = ko.observableArray([]);
            this.createSegmentFirstTime(0);
            this.boundElement = ko.observable(null);
            this.boundElement.subscribe(function (newElement) {
                if (newElement && !_this._subscribedForBoundElement) {
                    _this._subscribedForBoundElement = true;
                    _this.recalcRoadLine(newElement);
                    StopByStop.Utils.observeDOM(newElement, function () {
                        _this.recalcRoadLine(newElement);
                    });
                }
            });
        }
        RouteViewModel.prototype.recalcRoadLine = function (roadLineElement) {
            var _this = this;
            var junctionElements = $(roadLineElement).find(".junction-wrapper");
            var junctionCount = junctionElements.length;
            var lastJunctionTop = "";
            var newRoadLineHeight = $(this.boundElement()).height();
            // recalculate positions if roadline height changes or if junction count changes
            // no point recalculating if roadLineHeight is 0
            if (newRoadLineHeight !== 0 && (junctionCount !== this._junctionElementCount || this.roadLineHeight() !== newRoadLineHeight)) {
                this.roadLineHeight(newRoadLineHeight);
                this._junctionElementCount = junctionCount;
                this.routeJunctionElementLookup = {};
                junctionElements.each(function (index, elem) {
                    lastJunctionTop = $(roadLineElement).offset().top.toString();
                    _this.routeJunctionElementLookup[elem.getAttribute("osmid")] = { top: $(elem).offset().top - $(roadLineElement).offset().top };
                });
                StopByStop.Telemetry.logToConsole("recaldRoadLine: " + this.roadLineHeight() + ". last junction top: " + lastJunctionTop);
            }
        };
        RouteViewModel.prototype.applyFilter = function (filter) {
            $.each(this.routeSegments(), function (indexInArray, valueOfElement) { return valueOfElement.applyFilter(filter); });
        };
        RouteViewModel.prototype.createSegmentFirstTime = function (segmentIndex) {
            var _this = this;
            var segmentViewModel = new StopByStop.RouteSegmentViewModel(this._route.s[segmentIndex], this._routeStartTime, this._app);
            segmentViewModel.applyFilter(this._filter);
            this.routeSegments.push(segmentViewModel);
            segmentIndex++;
            if (this._route.s.length > segmentIndex) {
                window.setTimeout(function () { return _this.createSegmentFirstTime(segmentIndex); }, 100);
            }
            else {
                this._routeInitializationComplete();
                this.initializeEtaTimes();
            }
        };
        RouteViewModel.prototype.initializeEtaTimes = function () {
            var _this = this;
            this.updateEtaTimes();
            this.updateStopDurationChangeSubscriptions();
            this._app.routePlan.stops.subscribe(function () {
                _this.updateEtaTimes();
                _this.updateStopDurationChangeSubscriptions();
            });
        };
        RouteViewModel.prototype.updateStopDurationChangeSubscriptions = function () {
            var _this = this;
            $.each(this._stopDurationSubscriptions, function (i, s) {
                s.dispose();
            });
            $.each(this._app.routePlan.stops(), function (i, stop) {
                _this._stopDurationSubscriptions.push(stop.stopDuration.subscribe(function () { return _this.updateEtaTimes(); }));
            });
        };
        RouteViewModel.prototype.updateEtaTimes = function () {
            var t = this._routeStartTime;
            var totalDelaysSoFarInMs = 0;
            for (var i = 0; i < this.routeSegments().length; i++) {
                for (var k = 0; k < this.routeSegments()[i].routeJunctions.length; k++) {
                    var routeJunction = this.routeSegments()[i].routeJunctions[k];
                    routeJunction.eta(new Date(routeJunction.etaWithoutStops.getTime() + totalDelaysSoFarInMs));
                    var delaysForThisJunctionMs = 0;
                    for (var l = 0; l < routeJunction.stops().length; l++) {
                        var stop = routeJunction.stops()[l];
                        delaysForThisJunctionMs += (stop.detourDuration() * 1000);
                        stop.exitEta(routeJunction.eta());
                    }
                    totalDelaysSoFarInMs += delaysForThisJunctionMs;
                }
            }
            this.etaString(StopByStop.Utils.getTimeString(this._routeStartTime, this._route.t * 1000 + totalDelaysSoFarInMs));
        };
        return RouteViewModel;
    }());
    StopByStop.RouteViewModel = RouteViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="RouteViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="IAppViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var AppViewModel = (function () {
        function AppViewModel(route, initSettings, routeInitializationComplete) {
            var _this = this;
            if (initSettings === void 0) { initSettings = null; }
            if (routeInitializationComplete === void 0) { routeInitializationComplete = null; }
            this.route = null;
            this.url = ko.observable("");
            this.title = ko.observable("");
            // initialize filter to an empty object, so that it doesn't require IFs which would require delayed jqm initialization
            this.filter = {};
            this.routePlan = null;
            this.selectedJunction = ko.observable(null);
            this.url(location.toString());
            if (route) {
                this._route = route;
                var rjs = [];
                $.each(route.s, function (i, v) { return rjs.push.apply(rjs, v.j); });
                this.filter = new StopByStop.FilterViewModel(route.rid, rjs, route.fcat, route.tfcat);
                this.routePlan = new StopByStop.RoutePlanViewModel(this._route.rid, this._route.d, new StopByStop.LocationViewModel(route.tl));
                this.route = new StopByStop.RouteViewModel(this._route, this, this.filter, initSettings, function () {
                    if (initSettings.app === StopByStop.SBSApp.Web) {
                        _this.routePlan.loadStopsFromStorage();
                    }
                    if (routeInitializationComplete) {
                        routeInitializationComplete();
                    }
                });
                ko.computed(function () { return ko.toJS(_this.filter); }).subscribe(function () {
                    _this.route.applyFilter(_this.filter);
                });
                this.title(this.route.title + " - Stop by Stop");
            }
            else {
                this.title("See best places to stop on the way to your destination - Stop by Stop");
            }
            window.document.title = this.title();
        }
        AppViewModel.prototype.initSideBar = function () {
            if (this.route && this.route.sideBar) {
                this.route.sideBar.postInit();
            }
        };
        return AppViewModel;
    }());
    StopByStop.AppViewModel = AppViewModel;
})(StopByStop || (StopByStop = {}));
"use strict";
String.prototype.f = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var s = this, i = args.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
};
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../tsdef/google.maps.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var JunctionMapViewModel = (function () {
        function JunctionMapViewModel(mapDiv, mapContainerDiv, junction, urls) {
            var _this = this;
            this.mapDivInitialized = false;
            this.junction = junction;
            this.mapDiv = mapDiv;
            this.mapContainerDiv = mapContainerDiv;
            this.urls = urls;
            if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                if (this.mapDiv && this.mapContainerDiv) {
                    window.setTimeout(function () {
                        _this.initMapDiv();
                        window.setTimeout(function () {
                            $(_this.mapContainerDiv).hide();
                        }, 500);
                    }, 300);
                }
            }
        }
        JunctionMapViewModel.prototype.initMapDiv = function () {
            if (!this.mapDivInitialized) {
                $(this.mapDiv).css({ 'height': $(this.mapDiv).width() + 'px' });
                this.onMapReady();
                this.mapDivInitialized = true;
            }
        };
        JunctionMapViewModel.prototype.onMapReady = function () {
            var junctionPoint = new google.maps.LatLng(this.junction.junction.location.lat, this.junction.junction.location.lon);
            this.map = new google.maps.Map(this.mapDiv, {
                zoom: 14,
                center: junctionPoint,
                disableDefaultUI: false
            });
            var junctionMarker = new google.maps.Marker({
                position: junctionPoint,
                map: this.map,
                icon: this.urls.MapExitIconUrl
            });
            this.createPois();
        };
        ;
        JunctionMapViewModel.prototype.createPois = function () {
            var _this = this;
            var pois = this.junction.junction.pois();
            $.each(pois, function (indexInArray, valueOfElement) {
                var poi = valueOfElement;
                var poiPoint = new google.maps.LatLng(poi.poi.location.lat, poi.poi.location.lon);
                var poiMarker = new google.maps.Marker({
                    position: poiPoint,
                    icon: poi.poi.poiType === StopByStop.PoiType.Food ? _this.urls.MapFoodIconUrl : _this.urls.MapGasIconUrl,
                    map: _this.map
                });
                poiMarker.setVisible(poi.poi.visible());
                poiMarker.addListener('click', function () {
                    if (_this.poiInfoWindow) {
                        _this.poiInfoWindow.close();
                    }
                    ko.cleanNode($("#poiPopupTemplate")[0]);
                    ko.applyBindings(poi, $("#poiPopupTemplate")[0]);
                    if (!poiMarker["iw"]) {
                        var gmapsInfoWindow = new google.maps.InfoWindow({
                            content: $("#poiPopupTemplate").html()
                        });
                        poiMarker["iw"] = gmapsInfoWindow;
                        poi.poi.isYInfoLoading.subscribe(function () {
                            ko.cleanNode($("#poiPopupTemplate")[0]);
                            ko.applyBindings(poi, $("#poiPopupTemplate")[0]);
                            gmapsInfoWindow.setContent($("#poiPopupTemplate").html());
                        });
                    }
                    _this.poiInfoWindow = poiMarker["iw"];
                    window.showPoiOptionsForMapPopup = function () {
                        poi.addToRouteOptionsClick();
                    };
                    _this.poiInfoWindow.open(_this.map, poiMarker);
                });
                poi.poi.visible.subscribe(function (newValue) {
                    poiMarker.setVisible(newValue);
                    if (!newValue && poiMarker["iw"]) {
                        poiMarker["iw"].close();
                    }
                });
            });
        };
        ;
        return JunctionMapViewModel;
    }());
    StopByStop.JunctionMapViewModel = JunctionMapViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../tsdef/google.maps.d.ts"/>
/// <reference path="../extensions.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Init.ts"/>
/// <reference path="RouteViewModel.ts"/>
/// <reference path="JunctionMapViewModel.ts"/>
/// <reference path="IAppViewModel.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    var JunctionAppBaseViewModel = (function () {
        function JunctionAppBaseViewModel() {
            this._locationToLoadIndex = 0;
        }
        JunctionAppBaseViewModel.prototype.loadFullPoiData = function () {
            var _this = this;
            if (this._locationToLoadIndex < this._poiLocations.length) {
                var locationToLoad = this._poiLocations[this._locationToLoadIndex++];
                var latStr = locationToLoad.lat.toFixed(1);
                var lonStr = locationToLoad.lon.toFixed(1);
                $.ajax(StopByStop.AppState.current.urls.PoiUrl + latStr + "," + lonStr)
                    .done(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var p = data[i];
                        if (_this.routeJunction.junction.poiLookup[p.id]) {
                            _this.routeJunction.junction.poiLookup[p.id].poi.updateYInfo(p);
                        }
                    }
                    _this.loadFullPoiData();
                });
            }
        };
        return JunctionAppBaseViewModel;
    }());
    StopByStop.JunctionAppBaseViewModel = JunctionAppBaseViewModel;
    ;
    var JunctionSPAAppViewModel = (function (_super) {
        __extends(JunctionSPAAppViewModel, _super);
        function JunctionSPAAppViewModel(route, routeJunctionViewModel, filter, routePlan, poiTypeToShow) {
            var _this = this;
            if (poiTypeToShow === void 0) { poiTypeToShow = StopByStop.PoiType.General; }
            _super.call(this);
            // TODO: here
            this.routePlan = routePlan;
            this.routeJunction = routeJunctionViewModel;
            this.filter = new StopByStop.FilterViewModel(filter.routeId, [this.routeJunction.routeJunction], route.fcat, route.tfcat, false);
            var junctionLocationViewModel = this.routeJunction.junction.location;
            this._poiLocations = StopByStop.LocationViewModel.getGridLocations({
                a: junctionLocationViewModel.lat,
                o: junctionLocationViewModel.lon
            });
            if (poiTypeToShow === StopByStop.PoiType.Food) {
                this.filter.showGasStations(false);
            }
            else if (poiTypeToShow === StopByStop.PoiType.Gas) {
                this.filter.showRestaurants(false);
            }
            this.loadFullPoiData();
            this.routeJunction.applyFilter(this.filter);
            ko.computed(function () { return ko.toJS(_this.filter); }).subscribe(function () {
                _this.routeJunction.applyFilter(_this.filter);
            });
        }
        ;
        JunctionSPAAppViewModel.prototype.initMap = function (mapDiv, mapContainerDiv) {
            this.junctionMapViewModel = new StopByStop.JunctionMapViewModel(mapDiv, mapContainerDiv, this.routeJunction, StopByStop.AppState.current.urls);
            return this.junctionMapViewModel;
        };
        return JunctionSPAAppViewModel;
    }(JunctionAppBaseViewModel));
    StopByStop.JunctionSPAAppViewModel = JunctionSPAAppViewModel;
    var JunctionAppViewModel = (function (_super) {
        __extends(JunctionAppViewModel, _super);
        function JunctionAppViewModel(routeJunction, poiTypeToShow, routeId, mapDiv, mapContainerDiv) {
            var _this = this;
            _super.call(this);
            var routeStartTime = new Date();
            this._routeJunction = routeJunction;
            this.routePlan = new StopByStop.RoutePlanViewModel(routeId, 0, /* not needed here */ null);
            this.routePlan.loadStopsFromStorage();
            this.filter = new StopByStop.FilterViewModel(routeId, [routeJunction], routeJunction.j.fcat, routeJunction.j.tfcat, false);
            this.filter.showRestaurants(true);
            this.filter.showGasStations(true);
            if (poiTypeToShow === StopByStop.PoiType.Food) {
                this.filter.showGasStations(false);
            }
            else if (poiTypeToShow === StopByStop.PoiType.Gas) {
                this.filter.showRestaurants(false);
            }
            this.routeJunction = new StopByStop.RouteJunctionViewModel(this._routeJunction, routeStartTime, this);
            this.routeJunction.applyFilter(this.filter);
            ko.computed(function () { return ko.toJS(_this.filter); }).subscribe(function () {
                _this.routeJunction.applyFilter(_this.filter);
            });
            this.junctionMapViewModel = new StopByStop.JunctionMapViewModel(mapDiv, mapContainerDiv, this.routeJunction, StopByStop.AppState.current.urls);
            this._poiLocations = StopByStop.LocationViewModel.getGridLocations(routeJunction.j.l);
            this.loadFullPoiData();
        }
        return JunctionAppViewModel;
    }(JunctionAppBaseViewModel));
    StopByStop.JunctionAppViewModel = JunctionAppViewModel;
})(StopByStop || (StopByStop = {}));
/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="AppState.ts" />
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
/// <reference path="InitUrls.ts"/>
/// <reference path="InitHome.ts"/>
/// <reference path="ViewModels/IAppViewModel.ts" />
/// <reference path="ViewModels/AppViewModel.ts" />
/// <reference path="ViewModels/RouteViewModel.ts" />
/// <reference path="ViewModels/JunctionAppViewModel.ts" />
var StopByStop;
(function (StopByStop) {
    var Init = (function () {
        function Init() {
        }
        Init.initialize = function (settings) {
            var _this = this;
            StopByStop.AppState.current = settings;
            StopByStop.AppState.current.urls = new StopByStop.InitUrls(settings.baseDataUrl, settings.baseImageUrl);
            Init._app = ko.observable(new StopByStop.AppViewModel(null));
            ko.options.deferUpdates = true;
            Init.enableUAMatch();
            /* common initialization for all pages */
            $(document).on("pageinit", ".jqm-demos", function (event) {
                var page = $(_this);
                if (StopByStop.AppState.current.app === StopByStop.SBSApp.SPA) {
                    Init._initSPAOnce();
                }
                /* For Web app initialize menu programmatically*/
                if (StopByStop.AppState.current.app === StopByStop.SBSApp.Web) {
                    $(".jqm-navmenu-panel ul").listview();
                    $(".jqm-navmenu-link").on("click", function () {
                        page.find(".jqm-navmenu-panel:not(.jqm-panel-page-nav)").panel().panel("open");
                    });
                }
                // Initialize breadcrumb on applicable pages
                jQuery(document).ready(function () {
                    jQuery("#breadCrumb0").jBreadCrumb();
                });
                // wire up click on the social button
                $(".social-btn").click(function () {
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.SocialButtonClick);
                });
                $(".filter-btn").click(function () {
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.FilterButtonClick);
                });
            });
            /* end of common initialiazation for all pages */
            /* home page initialization */
            $(document).on("pageinit", ".sbs-homePG", function (event) {
                StopByStop.InitHome.wireup();
            });
            /* end of home page initialization */
            /* route page initialization */
            $(document).on("pageinit", ".route-page", function (event) {
            });
            /* end of route page initialization */
            /* exit page initialization */
            $(document).on("pageinit", ".exit-page", function (event) {
            });
            /* end of exit page initialization */
            /* poi group page initialization */
            $(document).on("pageinit", ".poigroup-page", function (event) {
                var poiGroupInitialized = false;
                $(document).scroll(function () {
                    if (!poiGroupInitialized) {
                        poiGroupInitialized = true;
                        StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.POIGroupPageScroll);
                    }
                });
            });
            /* end of poi group page initialization */
            /* handle unknown hash change */
            var scheduledUnknownChange = false;
            $(window).hashchange(function () {
                if (!scheduledUnknownChange) {
                    scheduledUnknownChange = true;
                    window.setTimeout(function () {
                        if (!StopByStop.AppState.current.knownHashChangeInProgress) {
                            var newHash = location.hash;
                            var oldPage = StopByStop.AppState.current.navigationLocation.page;
                            StopByStop.Utils.updateNavigationLocation(newHash, StopByStop.AppState.current.navigationLocation);
                            if (oldPage !== StopByStop.AppState.current.navigationLocation.page) {
                                StopByStop.Utils.spaPageNavigate(StopByStop.AppState.current.navigationLocation.page, StopByStop.AppState.current.navigationLocation.routeId, StopByStop.AppState.current.navigationLocation.exitId, StopByStop.AppState.current.navigationLocation.poiType, false);
                            }
                        }
                        StopByStop.AppState.current.knownHashChangeInProgress = false;
                        scheduledUnknownChange = false;
                    }, 100);
                }
            });
            /* trigger initial hash change */
            $(window).hashchange();
        };
        Init.loadRoute = function (routeId) {
            var deferred = $.Deferred();
            $.ajax({
                url: StopByStop.AppState.current.urls.RouteDataUrl + routeId,
                dataType: 'json',
                method: 'GET',
                success: function (data) {
                    var route = data;
                    var app = new StopByStop.AppViewModel(route, StopByStop.AppState.current, function () {
                        deferred.resolve();
                    });
                    Init._app(app);
                }
            });
            return deferred.promise();
        };
        Init.completeExitPageInit = function () {
            var selectedRouteJunction = Init._app().routePlan.junctionMap[StopByStop.AppState.current.navigationLocation.exitId];
            var poiType = StopByStop.AppState.current.navigationLocation.poiType;
            var appViewModel = Init._app();
            var junctionAppViewModel = new StopByStop.JunctionSPAAppViewModel(appViewModel.route.route, selectedRouteJunction, appViewModel.filter, appViewModel.routePlan, poiType);
            appViewModel.selectedJunction(junctionAppViewModel);
            Init.initJunctionMapWhenReady(junctionAppViewModel).then(function (jmmv) {
                // to ensure the switch between map and list view is initialized
                $(".view-mode-switch").controlgroup();
                $(".view-mode-switch").trigger("create");
                Init.wireupPOIGroup(jmmv);
            });
            Init._app().url(location.toString());
            Init._app().title(junctionAppViewModel.routeJunction.title);
            document.title = Init._app().title();
        };
        Init.initSPA = function () {
            var _this = this;
            /* apply root bindings for Cordova app */
            var sbsRootNode = $("#sbsRoot")[0];
            ko.applyBindings(Init._app, sbsRootNode);
            /* initialize UI */
            $(".filter-btn").click(function () { return Init.openFilterPopup(); });
            $(".jqm-navmenu-link").click(function () { return Init.openNavigationMenu(); });
            /* initialize page navigation events */
            var pageBeforeShowTime;
            var navigationAbandoned = false;
            $.mobile.pageContainer.pagecontainer({
                beforeshow: function (event, ui) {
                    navigationAbandoned = false;
                    pageBeforeShowTime = new Date().getTime();
                    var pageBeingLoaded = ui.toPage.attr("id");
                    var pageIdSelector = "#" + pageBeingLoaded;
                    if (!StopByStop.AppState.current.navigationLocation) {
                        StopByStop.AppState.current.navigationLocation = { page: StopByStop.SBSPage.home };
                    }
                    StopByStop.Utils.updateNavigationLocation(location.hash, StopByStop.AppState.current.navigationLocation);
                    var updatedHash = StopByStop.Utils.getHashFromNavigationLocation(StopByStop.AppState.current.navigationLocation);
                    if (location.hash !== updatedHash) {
                        StopByStop.AppState.current.knownHashChangeInProgress = true;
                        location.replace(updatedHash);
                    }
                    StopByStop.AppState.current.pageInfo = {
                        pageName: ui.toPage.data("page-name"),
                        telemetryPageName: ui.toPage.data("telemetry-page-name"),
                    };
                    // are we loading correct page?
                    var pageBeingLoaded = ui.toPage[0].id;
                    if (StopByStop.SBSPage[StopByStop.AppState.current.navigationLocation.page] !== pageBeingLoaded) {
                        StopByStop.Utils.spaPageNavigate(StopByStop.AppState.current.navigationLocation.page, StopByStop.AppState.current.navigationLocation.routeId, StopByStop.AppState.current.navigationLocation.exitId, StopByStop.AppState.current.navigationLocation.poiType, false);
                        navigationAbandoned = true;
                    }
                    $(pageIdSelector).css({
                        paddingTop: "51px",
                        paddingBottom: "50px"
                    });
                    /*
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

                    */
                },
                show: function (event, ui) {
                    if (navigationAbandoned) {
                        return;
                    }
                    switch (StopByStop.AppState.current.navigationLocation.page) {
                        case StopByStop.SBSPage.route:
                        case StopByStop.SBSPage.exit:
                            $(".filter-btn").show();
                            if (Init._currentRouteId !== StopByStop.AppState.current.navigationLocation.routeId) {
                                Init._currentRouteId = StopByStop.AppState.current.navigationLocation.routeId;
                                Init._app(new StopByStop.AppViewModel(null));
                                Init.loadRoute(StopByStop.AppState.current.navigationLocation.routeId).done(function () {
                                    if (StopByStop.AppState.current.navigationLocation.page === StopByStop.SBSPage.exit) {
                                        Init.completeExitPageInit();
                                    }
                                });
                            }
                            else {
                                _this._app().url(location.toString());
                                if (StopByStop.AppState.current.navigationLocation.page === StopByStop.SBSPage.route) {
                                    _this._app().route.recalcRoadLine($(".route")[0]);
                                    _this._app().title(_this._app().route.shortDescription);
                                }
                                else if (StopByStop.AppState.current.navigationLocation.page === StopByStop.SBSPage.exit) {
                                    Init.completeExitPageInit();
                                }
                            }
                            break;
                        default:
                            $(".filter-btn").hide();
                            break;
                    }
                    // this is a hack. But I am not sure why this class is added despite the fact that
                    // sbsheader is added with {position:fixed}
                    // $("#sbsheader").removeClass("ui-fixed-hidden");
                    StopByStop.Telemetry.trackPageView(StopByStop.AppState.current.pageInfo.telemetryPageName, "#" + StopByStop.AppState.current.pageInfo.pageName, (new Date()).getTime() - pageBeforeShowTime);
                }
            });
        };
        Init.initJunctionMapWhenReady = function (junctionAppViewModel) {
            var dfd = jQuery.Deferred();
            var mapElement = $("#map")[0];
            var mapContainerElement = $(".poi-map")[0];
            if (mapElement && mapContainerElement) {
                var junctionMapViewModel = junctionAppViewModel.initMap(mapElement, mapContainerElement);
                dfd.resolve(junctionMapViewModel);
            }
            else {
                window.setTimeout(function () {
                    Init.initJunctionMapWhenReady(junctionAppViewModel)
                        .then(function (jmvm) { return dfd.resolve(jmvm); });
                }, 50);
            }
            return dfd.promise();
        };
        Init.wireupPOIGroup = function (jmvm) {
            $(".view-mode-switch").on("change", function () {
                var modeVal = $(".view-mode-switch :radio:checked").val();
                if (modeVal === "list") {
                    $(".poi-table").show();
                    $(".poi-map").hide();
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.POIGroupSwitchList);
                }
                else {
                    $(".poi-table").hide();
                    $(".poi-map").show();
                    jmvm.initMapDiv();
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.POIGroupSwitchMap);
                }
            });
            $(".yelp-btn").on("click", function () {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.YelpLinkClick, null, null, true);
            });
            $(".tel-btn").on("click", function () {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.TelLinkClick);
            });
        };
        ;
        Init.enableUAMatch = function () {
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
            }
            else if (browser.webkit) {
                browser.safari = true;
            }
            jQuery["browser"] = browser;
            /* END OF UA_MATCH */
        };
        Init.openNavigationMenu = function () {
            var fd = $("." + StopByStop.AppState.current.pageInfo.pageName + " .nav-menu");
            if (fd.length > 0) {
                fd.panel();
                fd.trigger("create");
                fd.panel("open");
            }
        };
        Init.openFilterPopup = function () {
            var fd = $("." + StopByStop.AppState.current.pageInfo.pageName + " .filter-dlg");
            if (fd.length > 0) {
                fd.popup();
                fd.trigger("create");
                fd.popup("open", {
                    positionTo: "origin",
                    transition: "slidedown"
                });
            }
        };
        Init._initSPAOnce = StopByStop.Utils.runOnce(Init.initSPA);
        return Init;
    }());
    StopByStop.Init = Init;
})(StopByStop || (StopByStop = {}));
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
/// <reference path="../../client/scripts/tsdef/ai.d.ts"/>
/// <reference path="../../client/scripts/Init.ts"/>
/// <reference path="../../client/scripts/Telemetry.ts"/>
var StopByStop;
(function (StopByStop) {
    var Cordova;
    (function (Cordova) {
        "use strict";
        var Application;
        (function (Application) {
            function initialize() {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            Application.initialize = initialize;
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
        })(Application = Cordova.Application || (Cordova.Application = {}));
        var snippet = {
            config: {
                instrumentationKey: "6abbda64-056b-42f3-b87b-e9bfab2a3245"
            }
        };
        var init = new Microsoft.ApplicationInsights.Initialization(snippet);
        StopByStop.Telemetry._appInsights = init.loadAppInsights();
        $.mobile.ajaxEnabled = true;
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
        StopByStop.Init.initialize({
            app: StopByStop.SBSApp.SPA,
            baseDataUrl: "https://www.stopbystop.com/",
            baseImageUrl: "images/",
            navigationLocation: { page: StopByStop.SBSPage.home }
        });
        window.onload = function () {
            Application.initialize();
        };
    })(Cordova = StopByStop.Cordova || (StopByStop.Cordova = {}));
})(StopByStop || (StopByStop = {}));
//# sourceMappingURL=appBundle.js.map