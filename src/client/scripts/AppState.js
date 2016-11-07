/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
var StopByStop;
(function (StopByStop) {
    var AppState = (function () {
        function AppState() {
        }
        AppState.current = null;
        return AppState;
    }());
    StopByStop.AppState = AppState;
})(StopByStop || (StopByStop = {}));
//# sourceMappingURL=AppState.js.map