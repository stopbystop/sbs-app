/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>

module StopByStop {

    export class AppState {
        public static current: IAppState = {
            baseDataUrl: null,
            baseImageUrl: null,
            windowOpenTarget: "_system",
            metadata: null
        };
    }
}