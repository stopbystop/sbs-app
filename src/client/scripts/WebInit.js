/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="AppState.ts" />
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
/// <reference path="InitUrls.ts"/>
/// <reference path="InitHome.ts"/>
/// <reference path="ViewModels/IAppViewModel.ts" />
/// <reference path="ViewModels/AppViewModel.ts" />
/// <reference path="ViewModels/RouteViewModel.ts" />
/// <reference path="ViewModels/JunctionAppViewModel.ts" />
var StopByStop;
(function (StopByStop) {
    var WebInit = (function () {
        function WebInit() {
        }
        WebInit.initialize = function (webInitData) {
            if (webInitData.r) {
                StopByStop.Init._cachedRoutes[webInitData.rid] = webInitData.r;
            }
            var appState = {
                app: StopByStop.SBSApp.SPA,
                baseDataUrl: webInitData.durl,
                baseImageUrl: webInitData.iurl,
                navigationLocation: {
                    page: webInitData.p,
                    exitId: webInitData.exd,
                    poiType: webInitData.pt,
                    routeId: webInitData.rid
                }
            };
            StopByStop.Init.initialize(appState);
        };
        return WebInit;
    }());
    StopByStop.WebInit = WebInit;
})(StopByStop || (StopByStop = {}));
//# sourceMappingURL=WebInit.js.map