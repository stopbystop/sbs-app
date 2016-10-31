/// <reference path="tsdef/jquery.d.ts"/>
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

    export interface IPageInfo {
        pageName: string;
        telemetryPageName: string;
    }

    export class Utils {
        public static pageInfo: IPageInfo = null;
        public static getMileString(distance: number): string {
            if (distance < 0.1) {
                return "<0.1mi";
            }

            return distance.toString() + "mi";
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
    }
}