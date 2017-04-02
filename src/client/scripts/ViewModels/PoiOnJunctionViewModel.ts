﻿/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
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
           
            this.poi = new PoiViewModel(this.obj.p, app, this);
            this.name = this.poi.name;
            this.lat = this.poi.location.lat;
            this.lon = this.poi.location.lon;
            this.type = obj.p.t;
            
   
        }

        
        public obj: IPoiOnJunction;
        public id: string;
        public exitId: string;
        public name: string;
        public location: LocationViewModel;
        public dfe: number;
        public dtefrs: number;
       
        public poi: PoiViewModel;
        public duration: number;
        public lat: number;
        public lon: number;
        public type: PoiType;
    }
}   