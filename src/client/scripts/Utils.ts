/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>

module StopByStop {
    export const PAGENAME_HOME = "sbs-homePG";
    export const PAGENAME_Route = "route-page";
    export const PAGENAME_POIGroup = "poigroup-page";
    export const PAGENAME_Exit = "exit-page";
    export const PAGENAME_About = "about-page";
    export const N_LAT_BOUNDARY = 50.00;
    export const S_LAT_BOUNDARY = 25.00;
    export const W_LON_BOUNDARY = -125.00;
    export const E_LON_BOUNDARY = -66.00;
    export const ROUTE_PLAN_STORAGE_KEY = "sbsroutes";

    export class Utils {
        public static updateNavigationLocation(hash: string, navigationLocation: ISBSNavigationLocation): void {
            if (!hash) {
                hash = "#home";
            }
            hash = hash.toLowerCase();
            var hashIndex = hash.indexOf("#");
            var queryStringPart: string = null;

            if (hashIndex < 0) {
                hash = "#home";
                hashIndex = 0;
            }

            if (hashIndex >= 0) {
                var indexOfPageNameEnd = hash.indexOf("&", hashIndex) - 1;
                if (indexOfPageNameEnd < 0) {
                    indexOfPageNameEnd = hash.length - 1;
                } else {
                    queryStringPart = hash.substr(indexOfPageNameEnd + 1);
                }
                var pageName = hash.substr(hashIndex + 1, indexOfPageNameEnd - hashIndex);
                if (SBSPage[pageName] !== undefined) {
                    navigationLocation.page = SBSPage[pageName];
                }

                if (queryStringPart) {
                    var queryStringParameterPairs: string[] = queryStringPart.split("&");
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
                                    navigationLocation.poiType = PoiType.General;
                                    if (val === "food") {
                                        navigationLocation.poiType = PoiType.Food;
                                    } else if (val === "gas") {
                                        navigationLocation.poiType = PoiType.Gas;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        }

        public static getHashFromNavigationLocation(navigationLocation: ISBSNavigationLocation): string {
            var loc = "#";

            if (SBSPage[navigationLocation.page]) {
                loc += SBSPage[navigationLocation.page];
            } else {
                loc += "home";
            }

            if (navigationLocation.routeId) {
                loc += ("&routeid=" + navigationLocation.routeId);
            }

            if (navigationLocation.exitId && navigationLocation.page === SBSPage.exit) {
                loc += ("&exitid=" + navigationLocation.exitId);
            }

            if (navigationLocation.poiType && navigationLocation.page === SBSPage.exit && PoiType[navigationLocation.poiType]) {
                loc += ("&poitype=" + PoiType[navigationLocation.poiType]);
            }

            return loc.toLowerCase();
        }

        public static getMileString(distance: number): string {
            if (distance < 0.1) {
                return "<0.1mi";
            }

            return distance.toString() + "mi";
        }

        public static getHours(seconds: number): number {
            return Math.floor(((seconds % 31536000) % 86400) / 3600);
        }

        public static getMinutes(seconds: number): number {
            return Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        }

        public static getTimeString(time: Date, msOffset: number = 0): string {
            time = new Date(time.getTime() + msOffset);
            return Utils.formatTime(time);
        }

        public static formatTime(date: Date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var minutesString: string = minutes.toString();
            var ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            if (hours === 0) {
                hours = 12;
            }

            if (minutes < 10) {
                minutesString = "0" + minutesString;
            }
            return hours.toString() + ":" + minutesString + " " + ampm;

        }

        // http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
        public static observeDOM: (obj: Element, callback: () => void) => void = (() => {
            var MutationObserver = (<any>window).MutationObserver || (<any>window).WebKitMutationObserver,
                eventListenerSupported = window.addEventListener;

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
            }
        })();

        public static hasAnyOwnProperties(obj: Object): boolean {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return true;
                }
            }
            return false;
        }

        public static runOnce<T>(func: (...args: any[]) => T): (...args: any[]) => T {
            var ran = false;
            var memo: T;
            return function (...args: any[]) {
                if (!ran) {
                    ran = true;
                    memo = func.apply(this, arguments);
                }
                return memo;
            };
        };

        public static spaPageNavigate(page: SBSPage, routeId?: string, exitId?: string, poiType?: PoiType, changeHash: boolean = true): void {
            var pageId = "#home";
            switch (page) {
                case SBSPage.about:
                    pageId = "#about";
                    break;
                case SBSPage.exit:
                    pageId = "#exit";
                    break;
                case SBSPage.route:
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
                dataUrl += "&poitype=" + PoiType[poiType].toLowerCase();
            }

            AppState.current.knownHashChangeInProgress = true;
            $.mobile.pageContainer.pagecontainer(
                "change",
                pageId, { dataUrl: dataUrl, changeHash: changeHash, transition: "slide" });
        }

        public static getShareUrl(hostName: string, navLocation: ISBSNavigationLocation) {
            var shareUrl = hostName;
            if (shareUrl.substr(shareUrl.length - 1) !== "/") {
                shareUrl += "/";
            }

            switch (navLocation.page) {
                case SBSPage.route:
                case SBSPage.exit:
                    shareUrl += "route/" + navLocation.routeId;

                    if (navLocation.page === SBSPage.exit) {
                        shareUrl += "/exit/osm-" + navLocation.exitId;
                    }
                    break;
            }

            return shareUrl;
        }

        public static getRouteTitleFromRouteId(routeId: string): string {
            var routeTitle = "";

            if (routeId && routeId.indexOf("-to-") > 1) {
                var fromAndTo = routeId.split("-to-");
                var fromString = fromAndTo[0];
                var toString = fromAndTo[1];

                if (fromString.length > 1 && toString.length > 1) {
                    if ($.isNumeric(fromString[0])) {
                        fromString = "your location";
                    } else {
                        fromString = Utils.getPlaceNameFromPlaceId(fromString);
                    }
                }

                toString = Utils.getPlaceNameFromPlaceId(toString);
                if (fromString && toString) {
                    routeTitle = "from " + fromString + " to " + toString;
                } else {
                    routeTitle = "";
                }
            }

            return routeTitle;
        }

        private static getPlaceNameFromPlaceId(placeId: string) {
            var placeName = "";
            var usIndex = placeId.indexOf("-united-states");
            if (usIndex > 0) {
                placeId = placeId.substr(0, usIndex);

                var state = placeId.substr(placeId.length - 2, 2).toUpperCase();
                placeId = placeId.substr(0, placeId.length - 3);
                placeId = placeId.replace(/-/g, ' ');
                placeName = placeId.replace(/([^ \t]+)/g, (_, word: string) =>
                {
                    return word[0].toUpperCase() + word.substr(1);
                }) + ", " + state;
            }

            return placeName;
        }
    }
}