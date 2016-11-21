var StopByStop;
(function (StopByStop) {
    var WebInit = (function () {
        function WebInit() {
        }
        WebInit.initialize = function (webInitData) {
            if (webInitData.r) {
                StopByStop.Init._cachedRoutes[webInitData.rid] = webInitData.r;
            }
            if (webInitData.exd && webInitData.exd.indexOf("osm-") === 0) {
                webInitData.exd = webInitData.exd.substr("osm-".length);
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
                },
                historyDisabled: true
            };
            StopByStop.Init.initialize(appState);
            if (!location.hash) {
                var hash = StopByStop.Utils.getHashFromNavigationLocation(appState.navigationLocation);
                location.hash = hash;
            }
        };
        return WebInit;
    }());
    StopByStop.WebInit = WebInit;
})(StopByStop || (StopByStop = {}));
