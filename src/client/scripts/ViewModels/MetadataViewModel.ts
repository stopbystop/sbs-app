/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>

"use strict";
module StopByStop {
    export class MetadataViewModel {
        private _obj: IMetadata;

        constructor(obj: IMetadata) {
            this._obj = obj;
        }

        public getCategoryName(categoryId: number): string {
            return this._obj.c[categoryId].n;
        }
    }
}