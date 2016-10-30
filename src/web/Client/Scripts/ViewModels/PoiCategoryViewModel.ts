/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

"use strict";
module StopByStop {
    export class PoiCategoryViewModel {
        private _obj: IPoiCategory;
        constructor(obj: IPoiCategory) {
            this._obj = obj;
            this.sbsid = this._obj.id;
            this.type = this._obj.t;
            this.yid = this._obj.yid;
            this.parentIDs = this._obj.p;
            this.name = this._obj.n;
        }

        public sbsid: string;
        public type: string;
        public yid: string;
        public parentIDs: string[];
        public name: string;
    }
}