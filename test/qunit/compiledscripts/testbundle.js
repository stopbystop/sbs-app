/// <reference path="tsdef/jquery.d.ts"/>
"use strict";
var StopByStop;
(function (StopByStop) {
    ;
    var PoiType;
    (function (PoiType) {
        PoiType[PoiType["restaurants"] = 1] = "restaurants";
        PoiType[PoiType["gasstations"] = 2] = "gasstations";
        PoiType[PoiType["hotels"] = 4] = "hotels";
        PoiType[PoiType["sights"] = 8] = "sights";
        PoiType[PoiType["all"] = 15] = "all";
    })(PoiType = StopByStop.PoiType || (StopByStop.PoiType = {}));
    var SBSPage;
    (function (SBSPage) {
        SBSPage[SBSPage["home"] = 0] = "home";
        SBSPage[SBSPage["route"] = 1] = "route";
        SBSPage[SBSPage["exit"] = 2] = "exit";
        SBSPage[SBSPage["poi"] = 3] = "poi";
        SBSPage[SBSPage["about"] = 4] = "about";
    })(SBSPage = StopByStop.SBSPage || (StopByStop.SBSPage = {}));
    var PoiIconFormat;
    (function (PoiIconFormat) {
        PoiIconFormat[PoiIconFormat["Light"] = 1] = "Light";
        PoiIconFormat[PoiIconFormat["Dark"] = 2] = "Dark";
        PoiIconFormat[PoiIconFormat["Map"] = 4] = "Map";
    })(PoiIconFormat = StopByStop.PoiIconFormat || (StopByStop.PoiIconFormat = {}));
})(StopByStop || (StopByStop = {}));
/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="tsdef/ai.d.ts"/>
var StopByStop;
(function (StopByStop) {
    var TelemetryEvent;
    (function (TelemetryEvent) {
        TelemetryEvent[TelemetryEvent["Add5MinToStop"] = 0] = "Add5MinToStop";
        TelemetryEvent[TelemetryEvent["AddStopToRoute"] = 1] = "AddStopToRoute";
        TelemetryEvent[TelemetryEvent["CityDropdownClick"] = 2] = "CityDropdownClick";
        TelemetryEvent[TelemetryEvent["FilterButtonClick"] = 3] = "FilterButtonClick";
        TelemetryEvent[TelemetryEvent["FilterButtonInlineExitPageClick"] = 4] = "FilterButtonInlineExitPageClick";
        TelemetryEvent[TelemetryEvent["FilterMaxDistanceFromJunctionChanged"] = 5] = "FilterMaxDistanceFromJunctionChanged";
        TelemetryEvent[TelemetryEvent["FilterShowGasStationsChanged"] = 6] = "FilterShowGasStationsChanged";
        TelemetryEvent[TelemetryEvent["FilterShowRestaurantsChanged"] = 7] = "FilterShowRestaurantsChanged";
        TelemetryEvent[TelemetryEvent["LocationIN"] = 8] = "LocationIN";
        TelemetryEvent[TelemetryEvent["LocationOUT"] = 9] = "LocationOUT";
        TelemetryEvent[TelemetryEvent["LocationOUTPopupDisplayed"] = 10] = "LocationOUTPopupDisplayed";
        TelemetryEvent[TelemetryEvent["NonBounce"] = 11] = "NonBounce";
        TelemetryEvent[TelemetryEvent["POIGroupPageScroll"] = 12] = "POIGroupPageScroll";
        TelemetryEvent[TelemetryEvent["POIGroupSwitchList"] = 13] = "POIGroupSwitchList";
        TelemetryEvent[TelemetryEvent["POIGroupSwitchMap"] = 14] = "POIGroupSwitchMap";
        TelemetryEvent[TelemetryEvent["POIPageAddToRouteClick"] = 15] = "POIPageAddToRouteClick";
        TelemetryEvent[TelemetryEvent["POIPageNavigateClick"] = 16] = "POIPageNavigateClick";
        TelemetryEvent[TelemetryEvent["POIPageNavigateBeforeDirect"] = 17] = "POIPageNavigateBeforeDirect";
        TelemetryEvent[TelemetryEvent["Remove5MinFromStop"] = 18] = "Remove5MinFromStop";
        TelemetryEvent[TelemetryEvent["RemoveStopFromRoute"] = 19] = "RemoveStopFromRoute";
        TelemetryEvent[TelemetryEvent["RoutePageScroll"] = 20] = "RoutePageScroll";
        TelemetryEvent[TelemetryEvent["RoutePlanNavigateClick"] = 21] = "RoutePlanNavigateClick";
        TelemetryEvent[TelemetryEvent["RoutePlanNavigateBeforeDirect"] = 22] = "RoutePlanNavigateBeforeDirect";
        TelemetryEvent[TelemetryEvent["ShowStopSettingsPopup"] = 23] = "ShowStopSettingsPopup";
        TelemetryEvent[TelemetryEvent["SideBarThumbTouch"] = 24] = "SideBarThumbTouch";
        TelemetryEvent[TelemetryEvent["SocialButtonClick"] = 25] = "SocialButtonClick";
        TelemetryEvent[TelemetryEvent["StopPopupNavigateClick"] = 26] = "StopPopupNavigateClick";
        TelemetryEvent[TelemetryEvent["StopPopupNavigateBeforeDirect"] = 27] = "StopPopupNavigateBeforeDirect";
        TelemetryEvent[TelemetryEvent["TelLinkClick"] = 28] = "TelLinkClick";
        TelemetryEvent[TelemetryEvent["ViewTripButtonClick"] = 29] = "ViewTripButtonClick";
        TelemetryEvent[TelemetryEvent["YelpLinkClick"] = 30] = "YelpLinkClick";
    })(TelemetryEvent = StopByStop.TelemetryEvent || (StopByStop.TelemetryEvent = {}));
    var TelemetryProperty;
    (function (TelemetryProperty) {
        TelemetryProperty[TelemetryProperty["FilterVisibility"] = 0] = "FilterVisibility";
        TelemetryProperty[TelemetryProperty["LoadStopsFromCache"] = 1] = "LoadStopsFromCache";
        TelemetryProperty[TelemetryProperty["PageName"] = 2] = "PageName";
        TelemetryProperty[TelemetryProperty["StopCount"] = 3] = "StopCount";
        TelemetryProperty[TelemetryProperty["NavigationUrl"] = 4] = "NavigationUrl";
    })(TelemetryProperty = StopByStop.TelemetryProperty || (StopByStop.TelemetryProperty = {}));
    var TelemetryMeasurement;
    (function (TelemetryMeasurement) {
    })(TelemetryMeasurement = StopByStop.TelemetryMeasurement || (StopByStop.TelemetryMeasurement = {}));
    var Telemetry = /** @class */ (function () {
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
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.getNonHighwayDrivingTimeToPlaceInSeconds = function (distance) {
            // for now let's assume 20mph non-highway speed
            return distance / 20 * 3600;
        };
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
                                case "poiid":
                                    navigationLocation.poiId = val;
                                case "poitype":
                                    navigationLocation.poiType = StopByStop.PoiType.all;
                                    if (val) {
                                        navigationLocation.poiType = StopByStop.PoiType[val] || navigationLocation.poiType;
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
            if (navigationLocation.exitId &&
                (navigationLocation.page === StopByStop.SBSPage.exit || navigationLocation.page === StopByStop.SBSPage.poi)) {
                loc += ("&exitid=" + navigationLocation.exitId);
            }
            if (navigationLocation.poiId && navigationLocation.page === StopByStop.SBSPage.poi) {
                loc += ("&poiid=" + navigationLocation.poiId);
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
        Utils.getHours = function (seconds) {
            return Math.floor(((seconds % 31536000) % 86400) / 3600);
        };
        Utils.getMinutes = function (seconds) {
            return Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
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
                    args[_i] = arguments[_i];
                }
                if (!ran) {
                    ran = true;
                    memo = func.apply(this, arguments);
                }
                return memo;
            };
        };
        ;
        Utils.spaPageNavigate = function (navigationLocation, changeHash) {
            if (changeHash === void 0) { changeHash = true; }
            var pageId = "#home";
            switch (navigationLocation.page) {
                case StopByStop.SBSPage.about:
                    pageId = "#about";
                    break;
                case StopByStop.SBSPage.exit:
                    pageId = "#exit";
                    break;
                case StopByStop.SBSPage.poi:
                    pageId = "#poi";
                    break;
                case StopByStop.SBSPage.route:
                    pageId = "#route";
                    break;
            }
            var dataUrl = pageId;
            if (navigationLocation.routeId) {
                dataUrl += "&routeid=" + navigationLocation.routeId;
            }
            if (navigationLocation.exitId) {
                dataUrl += "&exitid=" + navigationLocation.exitId;
            }
            if (navigationLocation.poiType) {
                dataUrl += "&poitype=" + StopByStop.PoiType[navigationLocation.poiType].toLowerCase();
            }
            if (navigationLocation.poiId) {
                dataUrl += "&poiId=" + navigationLocation.poiId;
            }
            var reverse = (StopByStop.AppState.current.navigationLocation && StopByStop.AppState.current.navigationLocation.page > navigationLocation.page);
            StopByStop.AppState.current.knownHashChangeInProgress = true;
            $.mobile.pageContainer.pagecontainer("change", pageId, { dataUrl: dataUrl, changeHash: changeHash, transition: "slide", reverse: reverse });
        };
        Utils.getShareUrl = function (basePortalUrl, navLocation) {
            var shareUrl = basePortalUrl;
            if (shareUrl.substr(shareUrl.length - 1) !== "/") {
                shareUrl += "/";
            }
            switch (navLocation.page) {
                case StopByStop.SBSPage.route:
                case StopByStop.SBSPage.exit:
                    shareUrl += "route/" + navLocation.routeId;
                    if (navLocation.page === StopByStop.SBSPage.exit) {
                        shareUrl += "/exit/osm-" + navLocation.exitId;
                        if (navLocation.poiType) {
                            shareUrl += "/" + StopByStop.PoiType[navLocation.poiType];
                        }
                    }
                    break;
                case StopByStop.SBSPage.poi:
                    shareUrl += "poi/" + navLocation.poiPath;
                    break;
            }
            return shareUrl;
        };
        Utils.getRouteTitleFromRouteId = function (routeId) {
            var routeTitle = "";
            if (routeId && routeId.indexOf("-to-") > 1) {
                var fromAndTo = routeId.split("-to-");
                var fromString = fromAndTo[0];
                var toString = fromAndTo[1];
                if (fromString.length > 1 && toString.length > 1) {
                    if ($.isNumeric(fromString[0])) {
                        fromString = "your location";
                    }
                    else {
                        fromString = Utils.getPlaceNameFromPlaceId(fromString);
                    }
                }
                toString = Utils.getPlaceNameFromPlaceId(toString);
                if (fromString && toString) {
                    routeTitle = "from " + fromString + " to " + toString;
                }
                else {
                    routeTitle = "";
                }
            }
            return routeTitle;
        };
        Utils.isHistoryAPISupported = function () {
            return !!(window.history && history.pushState);
        };
        Utils.windowOpen = function (url) {
            if (StopByStop.AppState.current.windowOpenTarget === "_blank") {
                window.location.assign(url);
            }
            else {
                window.open(url, StopByStop.AppState.current.windowOpenTarget, "location=yes");
            }
        };
        Utils.getPoiIconUrl = function (poiType, iconFormat, baseImageUrl) {
            var poiTypeString = StopByStop.PoiType[poiType].toLowerCase();
            return baseImageUrl + "poi/" + poiTypeString + "/" + poiTypeString + "_" + iconFormat.toString() + ".png";
        };
        Utils.getNavigationUrlFromCurrentLocation = function () {
            var stops = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                stops[_i] = arguments[_i];
            }
            var deferred = $.Deferred();
            if (stops && stops.length > 0) {
                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var srcLat = position.coords.latitude;
                        var srcLon = position.coords.longitude;
                        var daddrStr = "";
                        for (var i = 0; i < stops.length - 1; i++) {
                            if (i > 0) {
                                daddrStr += "+to:";
                            }
                            daddrStr += (stops[i].a + "," + stops[i].o);
                        }
                        if (daddrStr !== "") {
                            daddrStr += "+to:";
                        }
                        var destination = stops[stops.length - 1];
                        daddrStr += destination.a + "," + destination.o;
                        var navigationUrl = "https://maps.google.com/maps?saddr="
                            + srcLat + ","
                            + srcLon + "&daddr="
                            + daddrStr;
                        deferred.resolve(navigationUrl);
                    }, function (positionError) {
                        var error = positionError.message;
                        StopByStop.Telemetry.trackError(new Error("getCurrentPositionError: " + error));
                        console.error("Please allow StopByStop.com to share your location.");
                        deferred.reject(error);
                    });
                }
            }
            else {
                deferred.reject();
            }
            return deferred.promise();
        };
        Utils.getPlaceNameFromPlaceId = function (placeId) {
            var placeName = "";
            var usIndex = placeId.indexOf("-united-states");
            if (usIndex > 0) {
                placeId = placeId.substr(0, usIndex);
                var state = placeId.substr(placeId.length - 2, 2).toUpperCase();
                placeId = placeId.substr(0, placeId.length - 3);
                placeId = placeId.replace(/-/g, ' ');
                placeName = placeId.replace(/([^ \t]+)/g, function (_, word) {
                    return word[0].toUpperCase() + word.substr(1);
                }) + ", " + state;
            }
            return placeName;
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
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
var StopByStop;
(function (StopByStop) {
    var AppState = /** @class */ (function () {
        function AppState() {
        }
        AppState.current = {
            basePortalUrl: null,
            baseDataUrl: null,
            baseImageUrl: null,
            windowOpenTarget: "_system",
            metadata: null
        };
        return AppState;
    }());
    StopByStop.AppState = AppState;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    QUnit.begin(function () {
        StopByStop.AppState.current.pageInfo = {
            pageName: "TestPageName",
            telemetryPageName: "TestPageName"
        };
    });
    QUnit.test("Utils: ParseUrlForNavigationLocation test", function (assert) {
        updateAndVerifyNavigationLocation(assert, "#route", { page: StopByStop.SBSPage.home }, { page: StopByStop.SBSPage.route });
        updateAndVerifyNavigationLocation(assert, "#route&routeId=route1", { page: StopByStop.SBSPage.home }, { page: StopByStop.SBSPage.route, routeId: "route1", poiType: undefined });
        updateAndVerifyNavigationLocation(assert, "https://hostname.com/page", { page: StopByStop.SBSPage.route, routeId: "route1" }, { page: StopByStop.SBSPage.home, routeId: "route1" });
        updateAndVerifyNavigationLocation(assert, "#exit&routeId=route1&exitId=exit1&poiType=gasstations", { page: StopByStop.SBSPage.home }, { page: StopByStop.SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations });
        updateAndVerifyNavigationLocation(assert, "#exit&routeId=route1&exitId=exit1&poiType=factory", { page: StopByStop.SBSPage.home }, { page: StopByStop.SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.all });
    });
    QUnit.test("Utils: GetHashFromNavigationLocation test", function (assert) {
        assert.equal(StopByStop.Utils.getHashFromNavigationLocation({ page: StopByStop.SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "#exit&routeid=route1&exitid=exit1&poitype=gasstations");
        assert.equal(StopByStop.Utils.getHashFromNavigationLocation({ page: StopByStop.SBSPage.route, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "#route&routeid=route1");
    });
    QUnit.test("Utils: GetShareUrl test", function (assert) {
        assert.equal(StopByStop.Utils.getShareUrl("https://www.host.com", { page: StopByStop.SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "https://www.host.com/route/route1/exit/osm-exit1/gasstations");
        assert.equal(StopByStop.Utils.getShareUrl("https://www.host.com/", { page: StopByStop.SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "https://www.host.com/route/route1/exit/osm-exit1/gasstations");
        assert.equal(StopByStop.Utils.getShareUrl("https://www.host.com", { page: StopByStop.SBSPage.about, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "https://www.host.com/");
        assert.equal(StopByStop.Utils.getShareUrl("https://www.host.com", { page: StopByStop.SBSPage.home, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "https://www.host.com/");
        assert.equal(StopByStop.Utils.getShareUrl("https://www.host.com", { page: StopByStop.SBSPage.route, routeId: "route1", exitId: "exit1", poiType: StopByStop.PoiType.gasstations }), "https://www.host.com/route/route1");
    });
    QUnit.test("Utils: GetRouteTitleFromRouteId test", function (assert) {
        assert.equal(StopByStop.Utils.getRouteTitleFromRouteId("47.68950,-122.03859-to-new-york-city-ny-united-states"), "from your location to New York City, NY");
        assert.equal(StopByStop.Utils.getRouteTitleFromRouteId("tacoma-wa-united-states-to-new-york-city-ny-united-states"), "from Tacoma, WA to New York City, NY");
        assert.equal(StopByStop.Utils.getRouteTitleFromRouteId(""), "");
        assert.equal(StopByStop.Utils.getRouteTitleFromRouteId("10-to-10"), "");
    });
    QUnit.test("Utils: runOnce test", function (assert) {
        var callback = sinon.spy();
        var proxy = StopByStop.Utils.runOnce(callback);
        proxy();
        proxy();
        assert.equal(callback.callCount, 1);
    });
    QUnit.test("Utils: getNavigationUrlFromCurrentLocation test", function (assert) {
        var fakeSuccessGetCurrentPosition = function (successCallback, errorCallback, options) {
            successCallback({
                coords: {
                    latitude: 45.0,
                    longitude: -100.0
                }
            });
        };
        var fakeFailGetCurrentPosition = function (successCallback, errorCallback, options) {
            errorCallback({
                code: 1,
                message: "Unavailable",
                PERMISSION_DENIED: 0,
                POSITION_UNAVAILABLE: 0,
                TIMEOUT: 0
            });
        };
        var loc1 = {
            a: 44,
            o: -100
        };
        var loc2 = {
            a: 43,
            o: -100
        };
        var navLocationStub = sinon.stub(navigator.geolocation, "getCurrentPosition", fakeSuccessGetCurrentPosition);
        var d1 = assert.async();
        StopByStop.Utils.getNavigationUrlFromCurrentLocation(loc1).then(function (val) {
            assert.equal(val, "https://maps.google.com/maps?saddr=45,-100&daddr=44,-100");
            assert.equal(navLocationStub.callCount, 1);
            d1();
        });
        var d2 = assert.async();
        StopByStop.Utils.getNavigationUrlFromCurrentLocation(loc1, loc2).then(function (val) {
            assert.equal(val, "https://maps.google.com/maps?saddr=45,-100&daddr=44,-100+to:43,-100");
            assert.equal(navLocationStub.callCount, 2);
            d2();
        });
        navLocationStub.restore();
        navLocationStub = sinon.stub(navigator.geolocation, "getCurrentPosition", fakeFailGetCurrentPosition);
        var d3 = assert.async();
        var successCb = sinon.spy();
        var errorCb = sinon.spy();
        StopByStop.Utils.getNavigationUrlFromCurrentLocation(loc1)
            .done(successCb)
            .fail(errorCb)
            .always(function (val) {
            assert.equal(val, "Unavailable");
            assert.equal(navLocationStub.callCount, 1);
            assert.equal(successCb.callCount, 0);
            assert.equal(errorCb.callCount, 1);
            d3();
        });
        navLocationStub.restore();
    });
    function updateAndVerifyNavigationLocation(assert, hash, inputLocation, expectedLocation) {
        StopByStop.Utils.updateNavigationLocation(hash, inputLocation);
        assert.deepEqual(inputLocation, expectedLocation);
    }
})(StopByStop || (StopByStop = {}));
/// <reference path="UtilsTests.ts" /> 
//# sourceMappingURL=testbundle.js.map