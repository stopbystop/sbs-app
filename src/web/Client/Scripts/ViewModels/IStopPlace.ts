/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

"use strict";
module StopByStop {
    export interface IStopPlace {
        id: string;
        exitId: string;
        name: string;
        lat: number;
        lon: number;
        duration: number;
        /** distance to exit from route start */
        dtefrs: number;
        /** distance from exit */
        dfe: number;
        type: PoiType;
    }
}