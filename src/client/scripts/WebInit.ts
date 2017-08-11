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
/// <reference path="ViewModels/ExitPageViewModel.ts" />


module StopByStop {
    export class WebInit {
        public static startup(webInitData: IWebInitData): void {

            if (webInitData.r) {
                Init._cachedRoutes[webInitData.rid] = webInitData.r;
            }

            if (webInitData.exd && webInitData.exd.indexOf("osm-") === 0) {
                webInitData.exd = webInitData.exd.substr("osm-".length);
            }

            var appState: IAppState = {
                baseDataUrl: webInitData.durl,
                baseImageUrl: webInitData.iurl,
                basePortalUrl: webInitData.purl,
                navigationLocation: {
                    page: webInitData.p,
                    exitId: webInitData.exd,
                    poiType: webInitData.pt,
                    routeId: webInitData.rid
                },
                historyDisabled: true,
                windowOpenTarget: "_blank",
                metadata: webInitData.m
            };

            Init.startup(appState);

            if (!location.hash) {
                var hash = Utils.getHashFromNavigationLocation(appState.navigationLocation);
                location.hash = hash;
            }
        }
    }
}