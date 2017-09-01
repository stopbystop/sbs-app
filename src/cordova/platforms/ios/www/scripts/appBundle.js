/// <reference path="tsdef/jquery.d.ts"/>
"use strict";
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
            this.BaseImageUrl = baseImageUrl;
            this.BaseUrl = baseUrl;
            this.PlacesDataUrlV2 = baseUrl + "placev2/";
            this.RouteDataUrlV2 = baseUrl + "routedatav2/";
            this.PoiDataUrlV2 = baseUrl + "poiv2/";
            this.PlacesNearbyDataUrlV2 = baseUrl + "placesnearbyv2/";
            this.CityImagesUrl = baseImageUrl + "city_images/";
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
        /*
        The functionality below pulls the image url based on lat long
        And populates the images inside a div
        If an image is not available, it is shown as a blank div
        */
        InitHome.addImagesDynamically = function (prevPlace, currentLocationString) {
            var prevPlace = $('#Images').data('prevPlace');
            var place = $('#from').data('place');
            if (place === null) {
                return true;
            }
            if (prevPlace && prevPlace.n === place.n) {
                // Dont proceed further as the same place is being selected
                return true;
            }
            // Continue with the processing if the previous place doesnt match with the current returned place
            $('#Images').data('prevPlace', place);
            //Remove any div contents from the previous population before adding new divs
            $("#Images").empty();
            var placesNearbyUrl = "";
            //If the place returned is the current location, the processing should be different, 
            //should be picked up from place.i
            if (place.n === currentLocationString) {
                var modifiedCurrentLocation = place.i.replace(",", "/");
                placesNearbyUrl = StopByStop.AppState.current.urls.PlacesNearbyDataUrlV2 + modifiedCurrentLocation;
            }
            else {
                placesNearbyUrl = StopByStop.AppState.current.urls.PlacesNearbyDataUrlV2 + place.l.a + '/' + place.l.o;
            }
            $.ajax({
                url: placesNearbyUrl,
                dataType: 'json',
                method: 'GET',
                success: function (result) {
                    var imageDiv = $("#Images"), myDivs = [], divIndex = 0, numOfDivs = result.length;
                    if (numOfDivs > 10 && window.screen.width > 480) {
                        numOfDivs = 10; //Restrict results to 10 for a desktop screen
                    }
                    if (numOfDivs > 6 && window.screen.width < 480) {
                        numOfDivs = 6; //Restrict results to 6 for a mobile screen
                    }
                    for (divIndex; divIndex < numOfDivs; divIndex += 1) {
                        var divId = "appendedImagediv" + divIndex;
                        var imageId = "appendedImageId" + divIndex;
                        myDivs.push(InitHome.createDiv(divIndex, result[divIndex]));
                        $(myDivs[divIndex]).data('place', result[divIndex]);
                        $("#Images").append(myDivs[divIndex]);
                        $(myDivs[divIndex]).on('click', function () {
                            $("#to").val($(this).data('place').n);
                            var placeData = { n: $(this).data('place').n, i: $(this).data('place').i };
                            $("#to").data('place', placeData);
                            $("#view_trip").removeClass("ui-disabled");
                        });
                        var imgurl = StopByStop.AppState.current.urls.CityImagesUrl + result[divIndex].i + '.jpg';
                        $('#appendedImagediv' + divIndex).css('background-image', 'url(' + imgurl + ')');
                    }
                    InitHome.moveImageInBackground();
                }
            });
        };
        InitHome.moveImageInBackground = function () {
            InitHome.yIncrement = InitHome.yIncrement + 1;
            var divIndexCount = 0;
            var requestID = null;
            for (divIndexCount = 0; divIndexCount < 10; divIndexCount++) {
                var appendedImagediv = $('#appendedImagediv' + divIndexCount);
                if (appendedImagediv) {
                    $(appendedImagediv).css('background-position', '0px ' + InitHome.yIncrement + 'px');
                }
            }
            requestID = requestAnimationFrame(InitHome.moveImageInBackground);
            if (InitHome.yIncrement >= 0) {
                cancelAnimationFrame(requestID);
                InitHome.yIncrement = -100;
            }
        };
        InitHome.createDiv = function (divIndex, data) {
            var imageDiv = document.createElement("div");
            imageDiv.id = 'appendedImagediv' + divIndex;
            imageDiv.className = "imageholder";
            var innerDiv = document.createElement("div");
            innerDiv.id = 'appendedInnerdiv' + divIndex;
            innerDiv.className = "childdiv";
            innerDiv.innerHTML = data.sn;
            imageDiv.appendChild(innerDiv);
            innerDiv.onclick = function () {
                $("#to").val($(this).parent('div').data('place').n);
                var placeData = { n: $(this).parent('div').data('place').n, i: $(this).parent('div').data('place').i };
                $("#to").data('place', placeData);
                $("#view_trip").removeClass("ui-disabled");
            };
            return imageDiv;
        };
        InitHome.wireup = function () {
            var currentLocationString = "Current location";
            var fromCityListData = null;
            var prevPlace = null;
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
                            if ($("#from").data('place')) {
                                InitHome.addImagesDynamically(prevPlace, currentLocationString);
                            }
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
                        url: StopByStop.AppState.current.urls.PlacesDataUrlV2 + value,
                        dataType: 'json',
                        method: 'GET',
                        success: function (data) {
                            fromCityListData = data;
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
                    InitHome.addImagesDynamically(prevPlace, currentLocationString);
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
                StopByStop.Utils.spaPageNavigate({
                    page: StopByStop.SBSPage.route,
                    routeId: startlocation.i + '-to-' + endlocation.i
                });
            });
            if ($("#from").data('place') && $("#to").data('place')) {
                $("#view_trip").removeClass("ui-disabled");
            }
        };
        InitHome.yIncrement = -100;
        return InitHome;
    }());
    StopByStop.InitHome = InitHome;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var PoiTypeFilterViewModel = (function () {
        function PoiTypeFilterViewModel(poiType, metadata, filter) {
            var _this = this;
            this._metadata = metadata;
            this.rootCategory = metadata.rpc[StopByStop.PoiType[poiType]];
            this.categoryName = this.rootCategory.n;
            this.typeName = StopByStop.PoiType[poiType].toLowerCase();
            this.isOn = ko.observable(true);
            this.type = poiType;
            this.categoryFilter = new MultiValueFilterViewModel({ n: "Categories", id: "categories" }, this);
            this.propertyEnablementLookup = {};
            this.propertyList = [];
            this._pois = [];
            this.filteredCount = ko.observable(0);
            this.filteredCountWithFeatures = ko.observable(0);
            this._maxDistanceFromJunction = 3;
            this._filter = filter;
            this.isOn.subscribe(function (newValue) { return _this.updatePoisVisibility(); });
        }
        PoiTypeFilterViewModel.prototype.updatePoisVisibility = function (maxDistanceFromJunction, notifyParentFilter) {
            var _this = this;
            if (notifyParentFilter === void 0) { notifyParentFilter = true; }
            this._maxDistanceFromJunction = maxDistanceFromJunction || this._maxDistanceFromJunction;
            var filteredWithFeatures = 0;
            $.each(this._pois, function (i, poi) {
                var v = _this.isOn();
                if (v) {
                    if (poi.dfj > _this._maxDistanceFromJunction) {
                        v = false;
                    }
                    else if (_this.rootCategory.scf && !_this.categoryFilter.isOn(poi.p.c)) {
                        v = false;
                    }
                    else {
                        $.each(_this.propertyList, function (i2, prop) {
                            if (!prop.isOn(poi.p.pp[prop.id])) {
                                v = false;
                            }
                        });
                    }
                }
                poi.v = v;
                if (v) {
                    filteredWithFeatures++;
                }
            });
            this.filteredCountWithFeatures(filteredWithFeatures);
            if (notifyParentFilter) {
                this._filter.onFilterUpdated();
            }
        };
        PoiTypeFilterViewModel.prototype.initWithPoi = function (poiOnJuntion) {
            var _this = this;
            this._pois.push(poiOnJuntion);
            var poi = poiOnJuntion.p;
            if (this.rootCategory.scf) {
                var categoryValues = poi.c;
                for (var i = 0; i < categoryValues.length; i++) {
                    var category = this._metadata.c[categoryValues[i]];
                    var categoryName = (category.id === this.rootCategory.c) ? "All other" : category.n;
                    var valueMetadata = { id: category.id, n: categoryName };
                    var categoryValue = this.categoryFilter.addValue(valueMetadata);
                    categoryValue.tempCount++;
                }
            }
            // add property
            for (var prop in poi.pp) {
                // is it a property described in metadata?
                if (this._metadata.ppm[prop]) {
                    if (!this.propertyEnablementLookup[prop]) {
                        var propertyFilterViewModel = new MultiValueFilterViewModel(this._metadata.ppm[prop], this);
                        this.propertyEnablementLookup[prop] = propertyFilterViewModel;
                        this.propertyList.push(propertyFilterViewModel);
                    }
                    $.each(poi.pp[prop], function (i, propertyValue) {
                        var valueViewModel = _this.propertyEnablementLookup[prop].addValue(_this._metadata.ppm[prop].v[propertyValue]);
                        valueViewModel.tempCount++;
                    });
                }
            }
        };
        PoiTypeFilterViewModel.prototype.sortValuesByOccurrence = function () {
            this.categoryFilter.sortByOccurrence();
            $.each(this.propertyList, function (i, item) { item.sortByOccurrence(); });
        };
        PoiTypeFilterViewModel.prototype.getCategoriesEnablement = function () {
            return this.categoryFilter.getValuesEnablement();
        };
        PoiTypeFilterViewModel.prototype.setCategoriesEnablement = function (enablement) {
            this.categoryFilter.setValuesEnablement(enablement);
        };
        PoiTypeFilterViewModel.prototype.getPropertiesEnablement = function () {
            var propertiesEnablement = {};
            $.each(this.propertyList, function (i, item) { propertiesEnablement[item.id] = item.getValuesEnablement(); });
            return propertiesEnablement;
        };
        PoiTypeFilterViewModel.prototype.setPropertiesEnablement = function (enablement) {
            $.each(this.propertyList, function (i, item) { item.setValuesEnablement(enablement[item.id]); });
        };
        PoiTypeFilterViewModel.prototype.resetTempCount = function () {
            this._tempCount = 0;
            this.categoryFilter.resetTempCount();
            $.each(this.propertyList, function (i, item) { item.resetTempCount(); });
        };
        PoiTypeFilterViewModel.prototype.applyTempCount = function () {
            this.filteredCount(this._tempCount);
            this.categoryFilter.applyTempCount();
            $.each(this.propertyList, function (i, item) { item.applyTempCount(); });
        };
        PoiTypeFilterViewModel.prototype.incrementTempCountForPoi = function (poi) {
            this._tempCount++;
            this.categoryFilter.incrementTempCount(poi.c);
            for (var prop in poi.pp) {
                if (this.propertyEnablementLookup[prop]) {
                    var values = poi.pp[prop];
                    this.propertyEnablementLookup[prop].incrementTempCount(values);
                }
            }
        };
        return PoiTypeFilterViewModel;
    }());
    StopByStop.PoiTypeFilterViewModel = PoiTypeFilterViewModel;
    var MultiValueFilterViewModel = (function () {
        function MultiValueFilterViewModel(p, filter) {
            this.isCollapsed = ko.observable(true);
            this.valueEnablementLookup = {};
            this.valueList = [];
            this.name = p.n;
            this.id = p.id;
            this.filter = filter;
        }
        MultiValueFilterViewModel.prototype.addValue = function (pv) {
            if (!this.valueEnablementLookup[pv.id]) {
                var valueFilterViewModel = new ValueFilterViewModel(pv.id, pv.n, this, this.filter);
                this.valueEnablementLookup[pv.id] = valueFilterViewModel;
                this.valueList.push(valueFilterViewModel);
            }
            return this.valueEnablementLookup[pv.id];
        };
        MultiValueFilterViewModel.prototype.sortByOccurrence = function () {
            this.valueList.sort(function (a, b) { return b.tempCount - a.tempCount; });
        };
        MultiValueFilterViewModel.prototype.expand = function () {
            this.isCollapsed(false);
        };
        MultiValueFilterViewModel.prototype.collapse = function () {
            this.isCollapsed(true);
        };
        MultiValueFilterViewModel.prototype.isOn = function (values) {
            var _this = this;
            var on = false;
            $.each(values, function (i, val) {
                if (_this.valueEnablementLookup[val].isOn()) {
                    on = true;
                }
            });
            return on;
        };
        MultiValueFilterViewModel.prototype.getValuesEnablement = function () {
            var valuesEnablement = {};
            $.each(this.valueList, function (i, item) {
                valuesEnablement[item.id] = item.isOn();
            });
            return valuesEnablement;
        };
        MultiValueFilterViewModel.prototype.setValuesEnablement = function (enablement) {
            $.each(this.valueList, function (i, item) {
                item.isOn(enablement[item.id]);
            });
        };
        MultiValueFilterViewModel.prototype.selectAll = function () {
            $.each(this.valueList, function (i, item) {
                item.processingBulkUpdate = true;
                try {
                    item.isOn(true);
                }
                finally {
                    item.processingBulkUpdate = false;
                }
            });
            this.filter.updatePoisVisibility();
        };
        MultiValueFilterViewModel.prototype.unselectAll = function () {
            $.each(this.valueList, function (i, item) {
                item.processingBulkUpdate = true;
                try {
                    item.isOn(false);
                }
                finally {
                    item.processingBulkUpdate = false;
                }
            });
            this.filter.updatePoisVisibility();
        };
        MultiValueFilterViewModel.prototype.resetTempCount = function () {
            $.each(this.valueList, function (i, item) { item.tempCount = 0; });
        };
        MultiValueFilterViewModel.prototype.applyTempCount = function () {
            $.each(this.valueList, function (i, item) { item.count(item.tempCount); });
        };
        MultiValueFilterViewModel.prototype.incrementTempCount = function (propertyValues) {
            $.each(this.valueList, function (i, item) {
                if (propertyValues.indexOf(item.id) > -1) {
                    item.tempCount++;
                }
            });
        };
        return MultiValueFilterViewModel;
    }());
    StopByStop.MultiValueFilterViewModel = MultiValueFilterViewModel;
    var ValueFilterViewModel = (function () {
        function ValueFilterViewModel(id, name, parentCategory, filterViewModel) {
            var _this = this;
            this.parentCategory = parentCategory;
            this.id = id;
            this.isOn = ko.observable(true);
            this.count = ko.observable(0);
            this.tempCount = 0;
            this.name = name;
            this._filter = filterViewModel;
            this.processingBulkUpdate = false;
            this.isOn.subscribe(function (newValue) {
                if (!_this.processingBulkUpdate) {
                    _this._filter.updatePoisVisibility();
                }
            });
        }
        return ValueFilterViewModel;
    }());
    StopByStop.ValueFilterViewModel = ValueFilterViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var FilterViewModel = (function () {
        function FilterViewModel(routeId, rjs, metadata, preserveShowAllSettings) {
            if (preserveShowAllSettings === void 0) { preserveShowAllSettings = true; }
            var _this = this;
            this.routeId = routeId;
            this.routeJunctions = rjs;
            this.preserveShowAllSettings = preserveShowAllSettings;
            this.typeFiltersList = [];
            this.typeFiltersLookup = {};
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
            this.populate(metadata);
            $.each(this.typeFiltersList, function (i, item) { item.updatePoisVisibility(parseInt(_this.maxDistanceFromJunction()), false); });
            this.updateCounts();
            this.maxDistanceFromJunction.subscribe(function (newValue) {
                $.each(_this.typeFiltersList, function (i, item) { item.updatePoisVisibility(parseInt(newValue), false); });
                _this.updateCounts();
                _this.onFilterUpdated();
            });
        }
        FilterViewModel.prototype.copyEnablement = function (filter) {
            for (var i = 0; i < filter.typeFiltersList.length; i++) {
                var categoriesEnablement = filter.typeFiltersList[i].getCategoriesEnablement();
                var propertyEnablement = filter.typeFiltersList[i].getPropertiesEnablement();
                if (this.typeFiltersLookup[filter.typeFiltersList[i].type]) {
                    this.typeFiltersLookup[filter.typeFiltersList[i].type].setCategoriesEnablement(categoriesEnablement);
                    this.typeFiltersLookup[filter.typeFiltersList[i].type].setPropertiesEnablement(propertyEnablement);
                }
            }
        };
        FilterViewModel.prototype.populate = function (metadata) {
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var rj = this.routeJunctions[i];
                for (var j = 0; j < rj.j.p.length; j++) {
                    var poiOnJunction = rj.j.p[j];
                    var poi = poiOnJunction.p;
                    if (!this.typeFiltersLookup[poi.t]) {
                        var typeFilterViewModel = new StopByStop.PoiTypeFilterViewModel(poi.t, metadata, this);
                        this.typeFiltersList.push(typeFilterViewModel);
                        this.typeFiltersLookup[poi.t] = typeFilterViewModel;
                    }
                    this.typeFiltersLookup[poi.t].initWithPoi(poiOnJunction);
                }
            }
            $.each(this.typeFiltersList, function (i, item) { item.sortValuesByOccurrence(); });
        };
        FilterViewModel.prototype.updateCounts = function () {
            var distance = parseInt(this.maxDistanceFromJunction());
            $.each(this.typeFiltersList, function (i, item) { item.resetTempCount(); });
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var rj = this.routeJunctions[i];
                for (var j = 0; j < rj.j.p.length; j++) {
                    var poiOnJunction = rj.j.p[j];
                    if (poiOnJunction.dfj <= distance) {
                        var poi = poiOnJunction.p;
                        this.typeFiltersLookup[poi.t].incrementTempCountForPoi(poi);
                    }
                }
            }
            $.each(this.typeFiltersList, function (i, item) { item.applyTempCount(); });
        };
        ;
        return FilterViewModel;
    }());
    StopByStop.FilterViewModel = FilterViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var LocationViewModel = (function () {
        function LocationViewModel(obj) {
            this.a = this.lat = obj.a;
            this.o = this.lon = obj.o;
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
var StopByStop;
(function (StopByStop) {
    var PoiSimplePropertyViewModel = (function () {
        function PoiSimplePropertyViewModel(id, poiTypeString, name, propertyValues) {
            this.name = name;
            this.values = propertyValues;
            this.id = id;
            this.poiTypeString = poiTypeString;
        }
        return PoiSimplePropertyViewModel;
    }());
    StopByStop.PoiSimplePropertyViewModel = PoiSimplePropertyViewModel;
    var PoiMetadataPropertyViewModel = (function () {
        function PoiMetadataPropertyViewModel(poiTypeString, metadata, propertyValues) {
            this.id = metadata.id;
            this.poiTypeString = poiTypeString;
            this.metadata = metadata;
            this.name = metadata.n;
            this.values = propertyValues.map(function (value, index, array) { return metadata.v[value].n; });
        }
        return PoiMetadataPropertyViewModel;
    }());
    StopByStop.PoiMetadataPropertyViewModel = PoiMetadataPropertyViewModel;
    var PoiViewModel = (function () {
        function PoiViewModel(obj, app, poiOnJunction) {
            if (poiOnJunction === void 0) { poiOnJunction = null; }
            this._poiOnJunction = poiOnJunction;
            this._poiOnJunction.poi = this;
            this._obj = obj;
            this._app = app;
            this.id = this._obj.id;
            this.categories = this._obj.c.map(function (value, index, arr) { return StopByStop.AppState.current.metadata.c[value]; });
            this.poiType = this._obj.t;
            this.name = this._obj.n;
            this.description = ko.observable(this._obj.d);
            this.location = new StopByStop.LocationViewModel(this._obj.l);
            this.visible = ko.observable(true);
            this.telPhoneString = this._obj.p;
            this.isYInfoLoading = ko.observable(true);
            this.isYInfoVisible = ko.observable(true);
            this.yUrl = ko.observable("#");
            this.yStarClass = ko.observable("stars_0");
            this.yReviewCountString = ko.observable("");
            this.urlName = this._obj.un;
            this.poiTypeString = StopByStop.PoiType[this.poiType].toLowerCase();
            if (this._poiOnJunction) {
                this.stop = this._app.routePlan.getOrCreateStop(this._poiOnJunction);
            }
            this.properties = [];
            var metadata = StopByStop.AppState.current.metadata;
            for (var p in this._obj.pp) {
                if (this._obj.pp[p]) {
                    var propertyMetadata = metadata.ppm[p];
                    if (propertyMetadata) {
                        var values = this._obj.pp[p];
                        this.properties.push(new PoiMetadataPropertyViewModel(this.poiTypeString, propertyMetadata, values));
                    }
                }
            }
        }
        PoiViewModel.prototype.addToRouteOptionsClick = function () {
            if (this.stop) {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.POIPageAddToRouteClick, null, null, false);
                this._app.routePlan.showStopSettings(this.stop);
            }
        };
        PoiViewModel.prototype.navigateNowClick = function () {
            if (this.stop) {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.POIPageNavigateClick, null, null, false);
                var getNavUrlPromise = StopByStop.Utils.getNavigationUrlFromCurrentLocation(this.stop.poiOnJunction.poi.location);
                getNavUrlPromise.done(function (navigationUrl) {
                    StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.POIPageNavigateBeforeDirect, [
                        { k: StopByStop.TelemetryProperty.NavigationUrl, v: navigationUrl }
                    ], null, true);
                    StopByStop.Utils.windowOpen(navigationUrl);
                });
            }
        };
        PoiViewModel.prototype.updateYInfo = function (reviewDataItem) {
            if (reviewDataItem) {
                this.yUrl(reviewDataItem.u);
                this.yStarClass(PoiViewModel.getYStarClass(reviewDataItem.r));
                this.yReviewCountString(PoiViewModel.getReviewsString(reviewDataItem.rc));
                this.isYInfoLoading(false);
                this._reviewDataItem = reviewDataItem;
            }
            else if (!this._reviewDataItem) {
                this.isYInfoVisible(false);
            }
        };
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
var StopByStop;
(function (StopByStop) {
    var PoiOnJunctionViewModel = (function () {
        function PoiOnJunctionViewModel(obj, exit, app) {
            this.obj = obj;
            this._app = app;
            this.dfe = this.obj.dfj;
            this.dtefrs = exit.dfrs;
            this.exitId = exit.osmid.toString();
            this.poi = new StopByStop.PoiViewModel(this.obj.p, app, this);
            this.distanceFromJunctionText = StopByStop.Utils.getMileString(this.dfe) + " from exit";
            this.distanceFromJunctionTextFull = StopByStop.Utils.getMileString(this.dfe) + " from " + exit.name;
            this._navLocation = {
                page: StopByStop.SBSPage.poi,
                routeId: StopByStop.AppState.current.navigationLocation.routeId,
                exitId: this.exitId,
                poiId: this.poi.id,
                poiPath: this.poi.id + "-" + this.poi.urlName
            };
        }
        PoiOnJunctionViewModel.prototype.navigateToPoiPageClick = function () {
            this._app.selectedPoi(this.poi);
            StopByStop.Utils.spaPageNavigate(this._navLocation);
        };
        return PoiOnJunctionViewModel;
    }());
    StopByStop.PoiOnJunctionViewModel = PoiOnJunctionViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var RouteStopViewModel = (function () {
        function RouteStopViewModel(poiOnJunction) {
            var _this = this;
            this.poiOnJunction = poiOnJunction;
            this.stopDurationFastUpdate = ko.observable(15); //default stop time is 15 minutes
            this.stopDuration = ko.observable(15); //default stop time is 15 minutes
            this.stopDuration.extend({ rateLimit: { timeout: 1000, method: "notifyWhenChangesStop" } });
            this.exitEta = ko.observable(new Date());
            this.etaToStopString = ko.computed(function () {
                var stopEta = new Date(_this.exitEta().getTime() + StopByStop.Utils.getNonHighwayDrivingTimeToPlaceInSeconds(_this.poiOnJunction.dfe) * 1000);
                return "you will be there by " + StopByStop.Utils.getTimeString(stopEta);
            });
            this.etaString = ko.computed(function () {
                var stopEta = new Date(_this.exitEta().getTime() + StopByStop.Utils.getNonHighwayDrivingTimeToPlaceInSeconds(_this.poiOnJunction.dfe) * 1000);
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
                var drivigTimeToPlaceInSeconds = StopByStop.Utils.getNonHighwayDrivingTimeToPlaceInSeconds(_this.poiOnJunction.dfe) * 2;
                var stopDurationInSeconds = _this.stopDuration() * 60;
                return drivigTimeToPlaceInSeconds + stopDurationInSeconds;
            });
        }
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
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.StopPopupNavigateClick, null, null, true);
            var getNavUrlPromise = StopByStop.Utils.getNavigationUrlFromCurrentLocation(this.poiOnJunction.poi.location);
            getNavUrlPromise.done(function (navigationUrl) {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.StopPopupNavigateBeforeDirect, [
                    { k: StopByStop.TelemetryProperty.NavigationUrl, v: navigationUrl }
                ], null, true);
                StopByStop.Utils.windowOpen(navigationUrl);
            });
        };
        ;
        return RouteStopViewModel;
    }());
    StopByStop.RouteStopViewModel = RouteStopViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var JunctionViewModel = (function () {
        function JunctionViewModel(robj, app) {
            this.poiLookup = {};
            this._obj = robj.j;
            this._app = app;
            this.dfrs = robj.dfrs;
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
                    var poiOnJunctionViewModel = new StopByStop.PoiOnJunctionViewModel(this._obj.p[i], this, this._app);
                    this.pois.push(poiOnJunctionViewModel);
                    //if (poiOnJunctionViewModel.poi.telPhoneString) {
                    //var normalizedPhoneNumberString = JunctionViewModel.normalizePhoneNumber(poiOnJunctionViewModel.poi.telPhoneString);
                    this.poiLookup[this._obj.p[i].p.id] = poiOnJunctionViewModel;
                    //}
                }
            }
            this.pois.sort(function (l, r) { return l.dfe - r.dfe; });
        }
        JunctionViewModel.prototype.completeYDataLoad = function () {
            for (var i = 0; i < this._obj.p.length; i++) {
                this.poiLookup[this._obj.p[i].p.id].poi.updateYInfo(null);
            }
        };
        JunctionViewModel.normalizePhoneNumber = function (phoneNumberString) {
            phoneNumberString = phoneNumberString.replace(/[^0-9]/g, "");
            phoneNumberString = phoneNumberString.substr(phoneNumberString.length - 10);
            return phoneNumberString;
        };
        return JunctionViewModel;
    }());
    StopByStop.JunctionViewModel = JunctionViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var RouteJunctionPoiTypeViewModel = (function () {
        function RouteJunctionPoiTypeViewModel(rootPoiCategory, junctionViewModel, app) {
            var _this = this;
            this._rpc = rootPoiCategory;
            this.visiblePois = ko.observableArray([]);
            this.closestPoiDistance = ko.observable("");
            this.poiCountString = ko.observable("");
            this._junctionViewModel = junctionViewModel;
            this.poiTypeString = StopByStop.PoiType[rootPoiCategory.t].toLowerCase();
            this.url = StopByStop.Utils.getShareUrl(StopByStop.AppState.current.basePortalUrl, {
                page: StopByStop.SBSPage.exit,
                routeId: app.routeId,
                exitId: this._junctionViewModel.osmid.toString(),
                poiType: this._rpc.t
            });
            this.poiCountStringWithLabel = ko.computed(function () {
                return _this.poiCountString() + " " + _this._rpc.n + "(s)";
            });
        }
        RouteJunctionPoiTypeViewModel.prototype.update = function () {
            this.visiblePois.sort(function (a, b) { return a.dfe - b.dfe; });
            this.closestPoiDistance(this.visiblePois().length > 0 ? StopByStop.Utils.getMileString(this.visiblePois()[0].dfe) : "");
            this.poiCountString(this.visiblePois().length > 9 ? "9+" : this.visiblePois().length.toString());
        };
        RouteJunctionPoiTypeViewModel.prototype.navigateToExitPage = function () {
            StopByStop.Utils.spaPageNavigate({
                page: StopByStop.SBSPage.exit,
                routeId: StopByStop.AppState.current.navigationLocation.routeId,
                exitId: this._junctionViewModel.osmid.toString(),
                poiType: this._rpc.t
            });
        };
        return RouteJunctionPoiTypeViewModel;
    }());
    StopByStop.RouteJunctionPoiTypeViewModel = RouteJunctionPoiTypeViewModel;
})(StopByStop || (StopByStop = {}));
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
            this.stops = ko.observableArray();
            this.poiTypeViewModels = ko.observableArray();
            this._poiTypeViewModelLookup = {};
            this.etaWithoutStops = new Date(routeStartTime.getTime() + this._obj.tfrs * 1000);
            this.eta = ko.observable(this.etaWithoutStops);
            this.hasStops = ko.computed(function () { return _this.stops().length > 0; });
            if (app.title && app.title()) {
                var routeTitle = app.title();
                routeTitle = (routeTitle.substr(0, 1).toLowerCase() + routeTitle.substr(1));
                this.title = this.junction.name + " on the way from " + routeTitle;
            }
            var rootPoiCategories = StopByStop.AppState.current.metadata.rpc;
            for (var rpcId in rootPoiCategories) {
                var rpc = rootPoiCategories[rpcId];
                var vm = new StopByStop.RouteJunctionPoiTypeViewModel(rpc, this.junction, app);
                this.poiTypeViewModels.push(vm);
                this._poiTypeViewModelLookup[rpc.t] = vm;
            }
            this.description = ko.computed(function () {
                var d = _this.junction.name + ". ";
                $.each(_this.poiTypeViewModels(), function (i, item) {
                    d += " " + item.poiCountStringWithLabel();
                });
                d += " within 5 mile travel distance";
                return d;
            });
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
            this.url = StopByStop.Utils.getShareUrl(StopByStop.AppState.current.basePortalUrl, {
                page: StopByStop.SBSPage.exit,
                routeId: app.routeId,
                exitId: this.routeJunction.j.oid.toString()
            });
        }
        RouteJunctionViewModel.prototype.onPoiVisibilityUpdated = function () {
            $.each(this.poiTypeViewModels(), function (i, item) { item.visiblePois.removeAll(); });
            var junctionVisibilityChanged = false;
            var visible = false;
            for (var i = 0; i < this.junction.pois().length; i++) {
                var poi = this.junction.pois()[i];
                if (poi.obj.v === undefined || poi.obj.v === true) {
                    this._poiTypeViewModelLookup[poi.poi.poiType].visiblePois.push(poi);
                    visible = true;
                }
            }
            $.each(this.poiTypeViewModels(), function (i, item) { item.update(); });
            junctionVisibilityChanged = this.visible() !== visible;
            this.visible(visible);
            return junctionVisibilityChanged;
        };
        RouteJunctionViewModel.prototype.navigateToExitPage = function () {
            StopByStop.Utils.spaPageNavigate({
                page: StopByStop.SBSPage.exit,
                routeId: StopByStop.AppState.current.navigationLocation.routeId,
                exitId: this.junction.osmid.toString()
            });
        };
        return RouteJunctionViewModel;
    }());
    StopByStop.RouteJunctionViewModel = RouteJunctionViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var RoutePlanViewModel = (function () {
        function RoutePlanViewModel(routeId, routeDistance, destination) {
            this._stopDictionary = {};
            this.junctionMap = {};
            this.routeDistance = routeDistance;
            this._routeId = routeId;
            this.stops = ko.observableArray([]);
            this.editedStop = ko.observable(null);
            this._stopDictionary = {};
            this._destination = destination;
        }
        RoutePlanViewModel.prototype.getOrCreateStop = function (poi) {
            var id = poi.poi.id;
            if (!this._stopDictionary[id]) {
                var routeStopViewModel = new StopByStop.RouteStopViewModel(poi);
                this._stopDictionary[id] = routeStopViewModel;
            }
            var stop = this._stopDictionary[id];
            return stop;
        };
        RoutePlanViewModel.prototype.addEditedStopToRoute = function () {
            this.addStopToRoute(this.editedStop());
            StopByStop.Utils.spaPageNavigate({
                page: StopByStop.SBSPage.route,
                routeId: StopByStop.AppState.current.navigationLocation.routeId
            });
        };
        RoutePlanViewModel.prototype.removeEditedStop = function () {
            this.removeStop(this.editedStop());
            this.closeStopSettings();
        };
        RoutePlanViewModel.prototype.navigateToEditedStop = function () {
            this.editedStop().navigate();
        };
        RoutePlanViewModel.prototype.addStopToRoute = function (routeStopViewModel, reloadFromCache) {
            if (reloadFromCache === void 0) { reloadFromCache = false; }
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.AddStopToRoute, [{ k: StopByStop.TelemetryProperty.LoadStopsFromCache, v: reloadFromCache.toString() }]);
            // only add it to stops if it is not already in the collection
            var alreadyAdded = false;
            $.each(this.stops(), function (index, value) {
                if (value.poiOnJunction.poi.id === routeStopViewModel.poiOnJunction.poi.id) {
                    alreadyAdded = true;
                }
            });
            if (!alreadyAdded) {
                this.stops.push(this._stopDictionary[routeStopViewModel.poiOnJunction.poi.id]);
                var routeJunctionViewModel = this.junctionMap[routeStopViewModel.poiOnJunction.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.push(routeStopViewModel);
                }
                else {
                    StopByStop.Telemetry.trackError(new Error("RouteStopViewModel.addStopToRoute.0"), null, null);
                }
            }
        };
        RoutePlanViewModel.prototype.removeStop = function (stop) {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RemoveStopFromRoute);
            var sbsid = stop.poiOnJunction.poi.id;
            if (this._stopDictionary[sbsid]) {
                var stop = this._stopDictionary[sbsid];
                this.stops.remove(stop);
                var routeJunctionViewModel = this.junctionMap[stop.poiOnJunction.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.remove(stop);
                }
                delete this._stopDictionary[sbsid];
            }
        };
        RoutePlanViewModel.prototype.showStopSettings = function (plannedStop) {
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.ShowStopSettingsPopup);
            this.editedStop(plannedStop);
            var stopSettingsDialog = $("." + StopByStop.AppState.current.pageInfo.pageName + " .stop-settings-dialog");
            stopSettingsDialog.on('popupafteropen', function () {
                var hCenter = ($(window).width() - stopSettingsDialog.width()) / 2;
                var vCenter = ($(window).height() - stopSettingsDialog.height()) / 2;
                $('.ui-popup-container').css({
                    top: vCenter,
                    left: hCenter,
                    position: "fixed"
                });
            });
            stopSettingsDialog.popup({
                transition: "slidedown",
                corners: true
            });
            ko.tasks.runEarly();
            stopSettingsDialog.trigger("create");
            stopSettingsDialog.popup("open");
        };
        RoutePlanViewModel.prototype.closeStopSettings = function () {
            var stopSettingsDialog = $("." + StopByStop.AppState.current.pageInfo.pageName + " .stop-settings-dialog");
            stopSettingsDialog.popup("close");
        };
        RoutePlanViewModel.prototype.navigate = function () {
            var _this = this;
            StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RoutePlanNavigateClick, null, null, true);
            var stopLocations = this.stops().map(function (rsvm) { return rsvm.poiOnJunction.poi.location; });
            stopLocations.push(this._destination);
            var getNavUrlPromise = StopByStop.Utils.getNavigationUrlFromCurrentLocation.apply(null, stopLocations);
            getNavUrlPromise.done(function (navigationUrl) {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.RoutePlanNavigateBeforeDirect, [
                    { k: StopByStop.TelemetryProperty.StopCount, v: _this.stops().length.toString() },
                    { k: StopByStop.TelemetryProperty.NavigationUrl, v: navigationUrl }
                ], null, true);
                StopByStop.Utils.windowOpen(navigationUrl);
            });
        };
        ;
        return RoutePlanViewModel;
    }());
    StopByStop.RoutePlanViewModel = RoutePlanViewModel;
})(StopByStop || (StopByStop = {}));
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
        }
        RouteSegmentViewModel.prototype.onJunctionVisibilityUpdated = function () {
            this.routeVisibleJunctions.removeAll();
            var visibleJunctionIndex = 0;
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var junction = this.routeJunctions[i];
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
var StopByStop;
(function (StopByStop) {
    var SideBarStopViewModel = (function () {
        function SideBarStopViewModel(stop, routePlan) {
            this.stop = stop;
            this.routePlan = routePlan;
            this.poiTypeClass = StopByStop.PoiType[stop.poiOnJunction.poi.poiType];
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
                // we have multiple copies of header and footer on SPA app
                _this._headerHeight = $("." + StopByStop.AppState.current.pageInfo.pageName + " .ui-header").outerHeight();
                _this._footerHeight = $("." + StopByStop.AppState.current.pageInfo.pageName + " .ui-footer").outerHeight();
                _this.sideBarHeight($(window).height());
                _this.sideBarInnerHeight($(window).height());
                _this.sideBarInnerTop($(".sidebar-top").outerHeight());
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
        }
        SideBarViewModel.prototype.postInit = function () {
            this._sideBarInit();
        };
        SideBarViewModel.prototype.recalculatePosition = function () {
            SideBarViewModel.recalculateSideBarPosition(this);
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
                this.sideBarTop("");
                this.sideBarBottom((this._footerHeight + 1).toString() + "px");
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
            ko.tasks.runEarly();
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
            SideBarViewModel._recalcOnWindowResize = SideBarViewModel.recalculateSideBarPosition.bind(null, this);
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
                sideBarStopItems.sort(function (a, b) { return a.stop.poiOnJunction.dtefrs - b.stop.poiOnJunction.dtefrs; });
                var currentExitId = "";
                var currentIndexOnThisExit = 0;
                for (var i = 0; i < sideBarStopItems.length; i++) {
                    var sideBarStopViewModel = sideBarStopItems[i];
                    var poiExitId = sideBarStopViewModel.stop.poiOnJunction.exitId;
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
                    var distanceToExitInPixels = (sideBarAvailableHeight * this._routeViewModel.routeJunctionElementLookup[poiExitId].top * 1.15 /
                        this._routeViewModel.roadLineHeight());
                    sideBarStopViewModel.top((distanceToExitInPixels).toString() + "px");
                    sideBarStopViewModel.left((-28 + currentIndexOnThisExit * 8).toString() + "px"); /* 28 is another magic constant */
                    this.stops.push(sideBarStopViewModel);
                }
            }
            // Telemetry.logToConsole(sideBarStopItems.length.toString() + " stops on sidebar updated");
        };
        SideBarViewModel.recalculateSideBarPosition = function (sbvm) {
            // we have multiple copies of header and footer on SPA app
            sbvm._headerHeight = $("." + StopByStop.AppState.current.pageInfo.pageName + " .ui-header").outerHeight();
            sbvm._footerHeight = $("." + StopByStop.AppState.current.pageInfo.pageName + " .ui-footer").outerHeight();
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
var StopByStop;
(function (StopByStop) {
    var RouteViewModel = (function () {
        function RouteViewModel(route, app, initSettings, routeInitializationComplete) {
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
            this.sideBar = new StopByStop.SideBarViewModel(app.routePlan, this, initSettings);
            this.fromLocation = new StopByStop.LocationViewModel(this._route.fl);
            this.toLocation = new StopByStop.LocationViewModel(this._route.tl);
            this.currentLocation = ko.observable(new StopByStop.LocationViewModel(this._route.cl));
            this._routeStartTime = new Date();
            this.startTimeString = ko.observable(StopByStop.Utils.getTimeString(this._routeStartTime));
            this.etaString = ko.observable(StopByStop.Utils.getTimeString(this._routeStartTime, this._route.t * 1000));
            this.tripTimeHours = ko.observable(StopByStop.Utils.getHours(this._route.t));
            this.tripTimeMinutes = ko.observable(StopByStop.Utils.getMinutes(this._route.t));
            this.routeId = this._route.rid;
            this.distance = this._route.d;
            if (this.fromLocation.placeDescription.indexOf("Start location (") === 0) {
                this.fromLocation.placeDescription = "Your location";
            }
            this.title = this.fromLocation.placeDescription + " to " + this.toLocation.placeDescription;
            var exitCount = 0;
            $.each(route.s, function (i, v) { exitCount += v.j.length; });
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
                // Telemetry.logToConsole("recaldRoadLine: " + this.roadLineHeight() + ". last junction top: " + lastJunctionTop);
            }
        };
        RouteViewModel.prototype.createSegmentFirstTime = function (segmentIndex) {
            var _this = this;
            var segmentViewModel = new StopByStop.RouteSegmentViewModel(this._route.s[segmentIndex], this._routeStartTime, this._app);
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
            this.tripTimeHours = ko.observable(StopByStop.Utils.getHours(this._route.t + totalDelaysSoFarInMs / 1000));
            this.tripTimeMinutes = ko.observable(StopByStop.Utils.getMinutes(this._route.t + totalDelaysSoFarInMs / 1000));
        };
        return RouteViewModel;
    }());
    StopByStop.RouteViewModel = RouteViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var AppViewModel = (function () {
        function AppViewModel(route, initSettings, routeTitle, routeInitializationComplete) {
            if (routeInitializationComplete === void 0) { routeInitializationComplete = null; }
            var _this = this;
            this.route = null;
            this.url = ko.observable("");
            this.title = ko.observable("");
            // initialize filter to an empty object, so that it doesn't require IFs which would require delayed jqm initialization
            this.filter = {};
            this.routePlan = null;
            this.isRouteLoading = ko.observable(false);
            this.routeLoadingMessage = ko.observable("");
            this.selectedJunction = ko.observable(null);
            this.selectedPoi = ko.observable(null);
            this.isRouteLoading(true);
            this.routeLoadingMessage("Loading route " + routeTitle + " ...");
            this.url(StopByStop.Utils.getShareUrl(initSettings.basePortalUrl, initSettings.navigationLocation));
            if (route) {
                this._route = route;
                var rjs = [];
                $.each(route.s, function (i, v) { rjs.push.apply(rjs, v.j); });
                this.filter = new StopByStop.FilterViewModel(route.rid, rjs, StopByStop.AppState.current.metadata);
                this.filter.onFilterUpdated = this.onPoiFilterUpdated.bind(this);
                this.routePlan = new StopByStop.RoutePlanViewModel(this._route.rid, this._route.d, new StopByStop.LocationViewModel(route.tl));
                this.isRouteLoading(false);
                this.routeId = route.rid;
                this.route = new StopByStop.RouteViewModel(this._route, this, initSettings, function () {
                    $.each(_this.route.routeSegments(), function (i, rs) {
                        $.each(rs.routeJunctions, function (i2, rj) {
                            rj.onPoiVisibilityUpdated();
                        });
                        rs.onJunctionVisibilityUpdated();
                    });
                    if (routeInitializationComplete) {
                        routeInitializationComplete();
                    }
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
        AppViewModel.prototype.onPoiFilterUpdated = function () {
            $.each(this.route.routeSegments(), function (i, rs) {
                var atLeastOneJunctionVisibilityChanged = false;
                $.each(rs.routeJunctions, function (i2, rj) {
                    var junctionVisibilityChanged = rj.onPoiVisibilityUpdated();
                    if (junctionVisibilityChanged) {
                        atLeastOneJunctionVisibilityChanged = true;
                    }
                });
                if (atLeastOneJunctionVisibilityChanged) {
                    rs.onJunctionVisibilityUpdated();
                }
            });
        };
        return AppViewModel;
    }());
    StopByStop.AppViewModel = AppViewModel;
})(StopByStop || (StopByStop = {}));
String.prototype.f = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var s = this, i = args.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
};
var StopByStop;
(function (StopByStop) {
    var JunctionMapViewModel = (function () {
        function JunctionMapViewModel(mapDiv, mapContainerDiv, junction, urls) {
            this.mapDivInitialized = false;
            this.junction = junction;
            this.mapDiv = mapDiv;
            this.mapContainerDiv = mapContainerDiv;
            this.urls = urls;
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
                icon: this.urls.BaseImageUrl + "icons/exit_map.png"
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
                StopByStop.Utils;
                var poiMarker = new google.maps.Marker({
                    position: poiPoint,
                    icon: StopByStop.Utils.getPoiIconUrl(poi.poi.poiType, StopByStop.PoiIconFormat.Map, _this.urls.BaseImageUrl),
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
                    window.navigateToPoiPage = function () {
                        poi.navigateToPoiPageClick();
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
var StopByStop;
(function (StopByStop) {
    var ExitPageViewModel = (function () {
        function ExitPageViewModel(route, routeJunctionViewModel, parentFilter, routePlan, metadata, poiTypeToShow) {
            // TODO: here
            if (poiTypeToShow === void 0) { poiTypeToShow = StopByStop.PoiType.all; }
            var _this = this;
            this._locationToLoadIndex = 0;
            this.routeId = route.rid;
            this.routePlan = routePlan;
            this.routeJunction = routeJunctionViewModel;
            this.filter = new StopByStop.FilterViewModel(parentFilter.routeId, [this.routeJunction.routeJunction], metadata, false);
            // propagate distance and restaurant enablement setting from parent route filter
            this.filter.maxDistanceFromJunction(parentFilter.maxDistanceFromJunction());
            var mdarr = [
                [this.filter.maxDistanceFromJunctionIs1, "1"],
                [this.filter.maxDistanceFromJunctionIs2, "2"],
                [this.filter.maxDistanceFromJunctionIs3, "3"],
                [this.filter.maxDistanceFromJunctionIs4, "4"],
                [this.filter.maxDistanceFromJunctionIs5, "5"]
            ];
            for (var i = 0; i < mdarr.length; i++) {
                mdarr[i][0](mdarr[i][1] === parentFilter.maxDistanceFromJunction());
            }
            this.filter.copyEnablement(parentFilter);
            for (var poiType in this.filter.typeFiltersLookup) {
                this.filter.typeFiltersLookup[poiType].isOn(poiTypeToShow === StopByStop.PoiType.all || parseInt(poiType) === poiTypeToShow);
            }
            this.filter.onFilterUpdated = function () { return _this.routeJunction.onPoiVisibilityUpdated(); };
            var junctionLocationViewModel = this.routeJunction.junction.location;
            this._poiLocations = StopByStop.LocationViewModel.getGridLocations({
                a: junctionLocationViewModel.lat,
                o: junctionLocationViewModel.lon
            });
            this.loadFullPoiData();
        }
        ;
        ExitPageViewModel.prototype.initMap = function (mapDiv, mapContainerDiv) {
            this.junctionMapViewModel = new StopByStop.JunctionMapViewModel(mapDiv, mapContainerDiv, this.routeJunction, StopByStop.AppState.current.urls);
            return this.junctionMapViewModel;
        };
        ExitPageViewModel.prototype.loadFullPoiData = function () {
            var _this = this;
            if (this._locationToLoadIndex < this._poiLocations.length) {
                var locationToLoad = this._poiLocations[this._locationToLoadIndex++];
                var latStr = locationToLoad.lat.toFixed(1);
                var lonStr = locationToLoad.lon.toFixed(1);
                $.ajax(StopByStop.AppState.current.urls.PoiDataUrlV2 + latStr + "," + lonStr)
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
            else {
                this.routeJunction.junction.completeYDataLoad();
            }
        };
        return ExitPageViewModel;
    }());
    StopByStop.ExitPageViewModel = ExitPageViewModel;
})(StopByStop || (StopByStop = {}));
var StopByStop;
(function (StopByStop) {
    var Init = (function () {
        function Init() {
        }
        Init.startup = function (settings) {
            ko.options.deferUpdates = true;
            Init.enableUAMatch();
            Init._wireUpOnce = StopByStop.Utils.runOnce(Init.wireupAndBind);
            /* common initialization for all pages */
            $(document).on("pageinit", ".jqm-demos", function (event) {
                Init.wireupAndBindOnce();
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
            StopByStop.AppState.current = settings;
            StopByStop.AppState.current.urls = new StopByStop.InitUrls(settings.baseDataUrl, settings.baseImageUrl);
            Init._app = ko.observable(new StopByStop.AppViewModel(null, StopByStop.AppState.current, ""));
            Init.wireupHashChange();
        };
        Init.wireupAndBindOnce = function () {
            Init._wireUpOnce();
        };
        Init.wireupAndBind = function () {
            Init.wireupOnShow();
            $(".jqm-navmenu-link").click(function () { return Init.openNavigationMenu(); });
            jQuery(".breadCrumb").jBreadCrumb();
            // wire up click on the social button
            $(".social-btn").click(function () {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.SocialButtonClick);
            });
            $(".filters-trigger").click(function () {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.FilterButtonClick);
                Init.openFilterPopup();
            });
            /* apply root bindings for Cordova app */
            var sbsRootNode = $("#sbsRoot")[0];
            ko.applyBindings(Init._app, sbsRootNode);
        };
        Init.wireupOnShow = function () {
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
                        StopByStop.Utils.spaPageNavigate(StopByStop.AppState.current.navigationLocation, false);
                        navigationAbandoned = true;
                    }
                    $(pageIdSelector).css({
                        paddingTop: "51px",
                        paddingBottom: "50px"
                    });
                    var filtersContainer = $("." + StopByStop.AppState.current.pageInfo.pageName + " .filters-container");
                    filtersContainer.css({ "right": "10%" });
                },
                show: function (event, ui) {
                    if (navigationAbandoned) {
                        return;
                    }
                    var shareUrl = StopByStop.Utils.getShareUrl(StopByStop.AppState.current.basePortalUrl, StopByStop.AppState.current.navigationLocation);
                    Init._app().url(shareUrl);
                    if (!StopByStop.AppState.current.historyDisabled && StopByStop.Utils.isHistoryAPISupported()) {
                        var newHistoryState = history.state;
                        newHistoryState.url = shareUrl + location.hash;
                        history.replaceState(newHistoryState, newHistoryState.title, shareUrl + location.hash);
                    }
                    switch (StopByStop.AppState.current.navigationLocation.page) {
                        case StopByStop.SBSPage.route:
                        case StopByStop.SBSPage.exit:
                        case StopByStop.SBSPage.poi:
                            if (Init._currentRouteId !== StopByStop.AppState.current.navigationLocation.routeId) {
                                Init._currentRouteId = StopByStop.AppState.current.navigationLocation.routeId;
                                Init._app(new StopByStop.AppViewModel(null, StopByStop.AppState.current, StopByStop.Utils.getRouteTitleFromRouteId(StopByStop.AppState.current.navigationLocation.routeId)));
                                Init._loadRoutePromise = Init.loadRoute(StopByStop.AppState.current.navigationLocation.routeId);
                                Init._loadRoutePromise.done(function (callback) {
                                    Init.completePageInit();
                                });
                            }
                            else {
                                Init.completePageInit();
                            }
                            break;
                        default:
                            break;
                    }
                    StopByStop.Telemetry.trackPageView(StopByStop.AppState.current.pageInfo.telemetryPageName, "#" + StopByStop.AppState.current.pageInfo.pageName, (new Date()).getTime() - pageBeforeShowTime);
                }
            });
        };
        Init.completePageInit = function () {
            switch (StopByStop.AppState.current.navigationLocation.page) {
                case StopByStop.SBSPage.route:
                    Init.completeRoutePageInit();
                    break;
                case StopByStop.SBSPage.exit:
                    Init.completeExitPageInit();
                    break;
                case StopByStop.SBSPage.poi:
                    Init.completePoiPageInit();
                    break;
            }
        };
        Init.wireupHashChange = function () {
            /* handle unknown hash change */
            var scheduledUnknownChange = false;
            var onBrowserHistoryChanged = function () {
                if (!scheduledUnknownChange) {
                    scheduledUnknownChange = true;
                    window.setTimeout(function () {
                        if (!StopByStop.AppState.current.knownHashChangeInProgress) {
                            var newHash = location.hash;
                            var oldPage = StopByStop.AppState.current.navigationLocation.page;
                            StopByStop.Utils.updateNavigationLocation(newHash, StopByStop.AppState.current.navigationLocation);
                            if (oldPage !== StopByStop.AppState.current.navigationLocation.page) {
                                StopByStop.Utils.spaPageNavigate(StopByStop.AppState.current.navigationLocation, false);
                            }
                        }
                        StopByStop.AppState.current.knownHashChangeInProgress = false;
                        scheduledUnknownChange = false;
                    }, 100);
                }
            };
            $(window).hashchange(onBrowserHistoryChanged);
            if (!StopByStop.AppState.current.historyDisabled && StopByStop.Utils.isHistoryAPISupported()) {
                window.onpopstate = onBrowserHistoryChanged;
            }
            /* trigger initial hash change */
            onBrowserHistoryChanged();
        };
        Init.loadRoute = function (routeId) {
            var deferred = $.Deferred();
            if (Init._cachedRoutes[routeId]) {
                Init.onRouteDataLoaded(routeId, Init._cachedRoutes[routeId], deferred);
            }
            else {
                var withMetadata = !StopByStop.AppState.current.metadata;
                $.ajax({
                    url: StopByStop.AppState.current.urls.RouteDataUrlV2 + routeId + "/metadata/" + withMetadata.toString().toLowerCase(),
                    dataType: 'json',
                    method: 'GET',
                    success: function (data) {
                        Init._cachedRoutes[routeId] = data;
                        if (withMetadata) {
                            StopByStop.AppState.current.metadata = data.m;
                        }
                        Init.onRouteDataLoaded(routeId, data, deferred);
                    }
                });
            }
            return deferred.promise();
        };
        Init.onRouteDataLoaded = function (routeId, data, done) {
            if (routeId === Init._currentRouteId) {
                var route = data;
                var app = new StopByStop.AppViewModel(route, StopByStop.AppState.current, StopByStop.Utils.getRouteTitleFromRouteId(routeId), function () {
                    done.resolve();
                });
                Init._app(app);
            }
            else {
                done.reject();
            }
        };
        Init.completePoiPageInit = function () {
            var selectedPoiId = StopByStop.AppState.current.navigationLocation.poiId;
            var selectedRouteJunction = Init._app().routePlan.junctionMap[StopByStop.AppState.current.navigationLocation.exitId];
            var appViewModel = Init._app();
            if (!appViewModel.selectedJunction()) {
                var junctionAppViewModel = new StopByStop.ExitPageViewModel(appViewModel.route.route, selectedRouteJunction, appViewModel.filter, appViewModel.routePlan, StopByStop.AppState.current.metadata, StopByStop.PoiType.all);
                appViewModel.selectedJunction(junctionAppViewModel);
            }
            var selectedPoi = selectedRouteJunction.junction.pois()
                .filter(function (value, index, arr) {
                return value.poi.id === selectedPoiId;
            })[0];
            appViewModel.selectedPoi(selectedPoi.poi);
            appViewModel.url(StopByStop.Utils.getShareUrl(StopByStop.AppState.current.basePortalUrl, StopByStop.AppState.current.navigationLocation));
            appViewModel.title(selectedPoi.poi.name);
            document.title = appViewModel.title();
        };
        Init.completeExitPageInit = function () {
            var selectedRouteJunction = Init._app().routePlan.junctionMap[StopByStop.AppState.current.navigationLocation.exitId];
            var poiType = StopByStop.AppState.current.navigationLocation.poiType;
            var appViewModel = Init._app();
            var junctionAppViewModel = new StopByStop.ExitPageViewModel(appViewModel.route.route, selectedRouteJunction, appViewModel.filter, appViewModel.routePlan, StopByStop.AppState.current.metadata, poiType);
            appViewModel.selectedJunction(junctionAppViewModel);
            Init.initJunctionMapWhenReady(junctionAppViewModel).then(function (jmmv) {
                // to ensure the switch between map and list view is initialized
                $(".view-mode-switch").controlgroup();
                $(".view-mode-switch").trigger("create");
                Init.wireupPOIGroup(jmmv);
            });
            appViewModel.url(StopByStop.Utils.getShareUrl(StopByStop.AppState.current.basePortalUrl, StopByStop.AppState.current.navigationLocation));
            appViewModel.title(junctionAppViewModel.routeJunction.title);
            document.title = appViewModel.title();
            Init.animateFiltersTrigger();
        };
        Init.completeRoutePageInit = function () {
            this._app().route.recalcRoadLine($(".route")[0]);
            this._app().title(this._app().route.shortDescription);
            this._app().route.sideBar.recalculatePosition();
            Init.animateFiltersTrigger();
        };
        Init.animateFiltersTrigger = function () {
            window.setTimeout(function () {
                var filtersContainer = $("." + StopByStop.AppState.current.pageInfo.pageName + " .filters-container");
                filtersContainer.css({ "right": "10%" });
                filtersContainer.animate({ "right": "35%" }, "slow");
            }, 50);
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
            $(".pois-list-filters-button").click(function () {
                StopByStop.Telemetry.trackEvent(StopByStop.TelemetryEvent.FilterButtonInlineExitPageClick);
                Init.openFilterPopup();
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
            fd.on('popupafteropen', function () {
                var hCenter = ($(window).width() - fd.width()) / 2;
                var vCenter = ($(window).height() - fd.height()) / 2;
                $('.ui-popup-container').css({
                    top: vCenter,
                    left: hCenter,
                    position: "fixed"
                });
            });
            if (fd.length > 0) {
                fd.popup();
                fd.trigger("create");
                fd.popup("open", {
                    positionTo: "origin",
                    transition: "slidedown"
                });
            }
        };
        Init._loadRoutePromise = null;
        Init._cachedRoutes = {};
        return Init;
    }());
    StopByStop.Init = Init;
})(StopByStop || (StopByStop = {}));
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
/// <reference path="../../client/scripts/tsdef/ai.d.ts"/>
/// <reference path="../../client/scripts/tsdef/fb.d.ts"/>
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
                try {
                    // FastClick lib: https://github.com/ftlabs/fastclick
                    var attachFastClick = window["Origami"].fastclick;
                    attachFastClick(document.body);
                    // instead of target-density-dpi: http://stackoverflow.com/questions/11592015/support-for-target-densitydpi-is-removed-from-webkit
                    var viewPortScale = 1 / window.devicePixelRatio;
                    $('#viewport').attr('content', 'user-scalable=no, initial-scale=' + viewPortScale + ', width=device-width');
                    StopByStop.Init.startup({
                        baseDataUrl: "https://www.stopbystop.com/",
                        basePortalUrl: "https://www.stopbystop.com/",
                        baseImageUrl: "images/",
                        navigationLocation: { page: StopByStop.SBSPage.home },
                        historyDisabled: true,
                        windowOpenTarget: "_system",
                        metadata: null
                    });
                    StopByStop.AppState.current.pageInfo = {
                        pageName: "sbs-homePG",
                        telemetryPageName: "Home"
                    };
                    StopByStop.Init.wireupAndBindOnce();
                    StopByStop.InitHome.wireup();
                }
                catch (e) {
                    alert("Error trying to initialize application: " + e);
                }
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
                // instrumentationKey: "866f136d-4f4a-47bc-8377-fb086bfddb10" // dev instrumentation key
                instrumentationKey: "6abbda64-056b-42f3-b87b-e9bfab2a3245" //prod instrumentation key
            }
        };
        var init = new Microsoft.ApplicationInsights.Initialization(snippet);
        StopByStop.Telemetry._appInsights = init.loadAppInsights();
        try {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1385725698401226',
                    xfbml: true,
                    version: 'v2.8'
                });
                FB.AppEvents.activateApp();
            };
        }
        catch (ex) {
            StopByStop.Telemetry.trackError(new Error(ex.toString()));
        }
        $.mobile.ajaxEnabled = true;
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
        Application.initialize();
    })(Cordova = StopByStop.Cordova || (StopByStop.Cordova = {}));
})(StopByStop || (StopByStop = {}));
//# sourceMappingURL=appBundle.js.map