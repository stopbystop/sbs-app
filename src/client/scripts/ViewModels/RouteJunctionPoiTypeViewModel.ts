/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../AppState.ts"/>

"use strict";
module StopByStop {
    export class RouteJunctionPoiTypeViewModel {

        constructor() {
        }

        public visiblePois: KnockoutObservableArray<PoiOnJunctionViewModel>;
        public closestPoiDistance: KnockoutObservable<string>;
        public poiCountString: KnockoutObservable<string>;
    }
}