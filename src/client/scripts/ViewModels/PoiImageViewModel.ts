/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

"use strict";
module StopByStop {
    export class PoiImageViewModel {
        private _obj: IPoiImage;

        constructor(obj: IPoiImage) {
            this._obj = obj;
            this.imageUrl = ko.observable(this._obj.u);
        }

        public imageUrl: KnockoutObservable<string>;
    }
}