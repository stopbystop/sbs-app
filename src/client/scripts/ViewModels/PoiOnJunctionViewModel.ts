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
module StopByStop {
    export class PoiOnJunctionViewModel implements IStopPlace {
        private _app: IAppViewModel;

        constructor(obj: IPoiOnJunction, exit: IRouteJunction, app: IAppViewModel) {
            this.obj = obj;
            this._app = app;
            this.id = this.obj.id;
            this.dfe = this.obj.dfj;
            this.dtefrs = exit.dfrs;
            this.exitId = exit.j.oid.toString();
            this.distanceFromJunctionText = Utils.getMileString(this.dfe) + " miles from exit";
            this.poi = new PoiViewModel(this.obj.p);
            this.name = this.poi.name;
            this.lat = this.poi.location.lat;
            this.lon = this.poi.location.lon;
            this.type = obj.p.t;
            this.poiTypeString = PoiType[this.type].toLowerCase();
        }

        public poiTypeString:string;
        public obj: IPoiOnJunction;
        public id: string;
        public exitId: string;
        public name: string;
        public location: LocationViewModel;
        public dfe: number;
        public dtefrs: number;
        public distanceFromJunctionText: string;
        public poi: PoiViewModel;
        public duration: number;
        public lat: number;
        public lon: number;
        public type: PoiType;


        public addToRouteOptionsClick(): void {
            var plannedStop = this._app.routePlan.getOrCreateStop(this);
            this._app.routePlan.showStopSettings(plannedStop);
        }
    }
}   