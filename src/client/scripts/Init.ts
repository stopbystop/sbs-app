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

"use strict";

module StopByStop {

    export class Init {
        private static _app: KnockoutObservable<AppViewModel>;
        private static _currentRouteId: string;
        private static _loadRoutePromise: JQueryPromise<any> = null;
        public static _cachedRoutes: { [id: string]: IRoute } = {};
        private static _wireUpOnce: any;

        public static startup(settings: IAppState): void {
            (<any>ko).options.deferUpdates = true;
            Init.enableUAMatch();
            Init._wireUpOnce = Utils.runOnce(Init.wireupAndBind);

            /* common initialization for all pages */
            $(document).on("pageinit", ".jqm-demos", (event) => {
                Init.wireupAndBindOnce();
            });
            /* end of common initialiazation for all pages */

            /* home page initialization */
            $(document).on("pageinit", ".sbs-homePG", function (event) {
                InitHome.wireup();
            });
            /* end of home page initialization */


            /* route page initialization */
            $(document).on("pageinit", ".route-page", function (event) {


            });
            /* end of route page initialization */

            /* exit page initialization */
            $(document).on("pageinit", ".exit-page", function (event) {

            });
            /* end of exit page initialization */

            /* poi group page initialization */
            $(document).on("pageinit", ".poigroup-page", function (event) {
                var poiGroupInitialized = false;
                $(document).scroll(function () {
                    if (!poiGroupInitialized) {
                        poiGroupInitialized = true;
                        Telemetry.trackEvent(TelemetryEvent.POIGroupPageScroll);
                    }
                });
            });
            /* end of poi group page initialization */

            AppState.current = settings;
            AppState.current.urls = new InitUrls(settings.baseDataUrl, settings.baseImageUrl);
            Init._app = ko.observable<AppViewModel>(new AppViewModel(null, AppState.current, ""));
            Init.wireupHashChange();
        }

        public static wireupAndBindOnce(): void {
            Init._wireUpOnce();
        }

        private static wireupAndBind() {
            Init.wireupOnShow();
            $(".jqm-navmenu-link").click(() => Init.openNavigationMenu());
            (<any>jQuery(".breadCrumb")).jBreadCrumb();
            // wire up click on the social button
            $(".social-btn").click(() => {
                Telemetry.trackEvent(TelemetryEvent.SocialButtonClick);
            });
            $(".filters-trigger").click(() => {
                Telemetry.trackEvent(TelemetryEvent.FilterButtonClick);
                Init.openFilterPopup();
            });

            /* apply root bindings for Cordova app */
            var sbsRootNode = $("#sbsRoot")[0];
            ko.applyBindings(Init._app, sbsRootNode);
        }

        private static wireupOnShow() {
            /* initialize page navigation events */
            var pageBeforeShowTime: number;
            var navigationAbandoned = false;

            $.mobile.pageContainer.pagecontainer({
                beforeshow: (event, ui) => {
                    navigationAbandoned = false;
                    pageBeforeShowTime = new Date().getTime();
                    var pageBeingLoaded = ui.toPage.attr("id");

                    var pageIdSelector: string = "#" + pageBeingLoaded;


                    if (!AppState.current.navigationLocation) {
                        AppState.current.navigationLocation = { page: SBSPage.home };
                    }

                    Utils.updateNavigationLocation(location.hash, AppState.current.navigationLocation);
                    var updatedHash = Utils.getHashFromNavigationLocation(AppState.current.navigationLocation);

                    if (location.hash !== updatedHash) {
                        AppState.current.knownHashChangeInProgress = true;
                        location.replace(updatedHash);
                    }

                    AppState.current.pageInfo = {
                        pageName: ui.toPage.data("page-name"),
                        telemetryPageName: ui.toPage.data("telemetry-page-name"),
                    };


                    // are we loading correct page?
                    var pageBeingLoaded = ui.toPage[0].id;
                    if (SBSPage[AppState.current.navigationLocation.page] !== pageBeingLoaded) {
                        Utils.spaPageNavigate(AppState.current.navigationLocation, false);
                        navigationAbandoned = true;
                    }


                    <any>$(pageIdSelector).css(
                        {
                            paddingTop: "51px",
                            paddingBottom: "50px"
                        });

                    var filtersContainer = $("." + AppState.current.pageInfo.pageName + " .filters-container");
                    filtersContainer.css({ "right": "10%" });

                },
                show: (event, ui) => {
                    if (navigationAbandoned) {
                        return;
                    }

                    var shareUrl = Utils.getShareUrl(AppState.current.basePortalUrl, AppState.current.navigationLocation);
                    Init._app().url(shareUrl);

                    if (!AppState.current.historyDisabled && Utils.isHistoryAPISupported()) {
                        var newHistoryState = history.state;
                        newHistoryState.url = shareUrl + location.hash;
                        history.replaceState(newHistoryState, newHistoryState.title, shareUrl + location.hash);
                    }


                    switch (AppState.current.navigationLocation.page) {
                        case SBSPage.route:
                        case SBSPage.exit:
                            if (Init._currentRouteId !== AppState.current.navigationLocation.routeId) {
                                Init._currentRouteId = AppState.current.navigationLocation.routeId;
                                Init._app(new AppViewModel(null, AppState.current, Utils.getRouteTitleFromRouteId(AppState.current.navigationLocation.routeId)));

                                Init._loadRoutePromise = Init.loadRoute(AppState.current.navigationLocation.routeId);

                                Init._loadRoutePromise.done((callback: JQueryPromiseCallback<any>) => {

                                    if (AppState.current.navigationLocation.page === SBSPage.exit) {
                                        Init.completeExitPageInit();
                                    } else {
                                        this._app().route.sideBar.recalculatePosition();
                                        Init.animateFiltersTrigger();
                                    }
                                });
                            } else {
                                if (AppState.current.navigationLocation.page === SBSPage.route) {

                                    this._app().route.recalcRoadLine($(".route")[0]);
                                    this._app().title(this._app().route.shortDescription);
                                    this._app().route.sideBar.recalculatePosition();
                                    Init.animateFiltersTrigger();

                                } else if (AppState.current.navigationLocation.page === SBSPage.exit) {
                                    Init.completeExitPageInit();
                                }
                            }
                            break;
                        default:
                            break;
                    }


                    Telemetry.trackPageView(
                        AppState.current.pageInfo.telemetryPageName,
                        "#" + AppState.current.pageInfo.pageName,
                        (new Date()).getTime() - pageBeforeShowTime);
                }
            });
        }

        private static wireupHashChange(): void {

            /* handle unknown hash change */
            var scheduledUnknownChange = false;

            var onBrowserHistoryChanged = () => {
                if (!scheduledUnknownChange) {
                    scheduledUnknownChange = true;
                    window.setTimeout(() => {
                        if (!AppState.current.knownHashChangeInProgress) {
                            var newHash = location.hash;
                            var oldPage = AppState.current.navigationLocation.page;

                            Utils.updateNavigationLocation(newHash, AppState.current.navigationLocation);
                            if (oldPage !== AppState.current.navigationLocation.page) {
                                Utils.spaPageNavigate(AppState.current.navigationLocation, false);
                            }
                        }

                        AppState.current.knownHashChangeInProgress = false;
                        scheduledUnknownChange = false;
                    }, 100);
                }
            };


            (<any>$(window)).hashchange(onBrowserHistoryChanged);

            if (!AppState.current.historyDisabled && Utils.isHistoryAPISupported()) {
                window.onpopstate = onBrowserHistoryChanged;
            }

            /* trigger initial hash change */
            onBrowserHistoryChanged();
        }

        private static loadRoute(routeId: string): JQueryPromise<any> {
            var deferred = $.Deferred();
            if (Init._cachedRoutes[routeId]) {
                Init.onRouteDataLoaded(routeId, Init._cachedRoutes[routeId], deferred);
            } else {
                var withMetadata = !AppState.current.metadata;

                $.ajax({
                    url: AppState.current.urls.RouteDataUrlV2 + routeId + "/metadata/" + withMetadata.toString().toLowerCase(),
                    dataType: 'json',
                    method: 'GET',
                    success: (data) => {
                        Init._cachedRoutes[routeId] = data;
                        if (withMetadata) {
                            StopByStop.AppState.current.metadata = data.m;
                        }

                        Init.onRouteDataLoaded(routeId, data, deferred);
                    }
                });
            }

            return deferred.promise();
        }

        private static onRouteDataLoaded(routeId: string, data: IRoute, done: JQueryDeferred<any>): void {

            if (routeId === Init._currentRouteId) {
                var route = data;
                var app = new AppViewModel(route, AppState.current, Utils.getRouteTitleFromRouteId(routeId),
                    () => {
                        done.resolve();
                    });

                Init._app(app);
            } else {
                done.reject();
            }
        }

        private static completeExitPageInit(): void {
            var selectedRouteJunction = Init._app().routePlan.junctionMap[AppState.current.navigationLocation.exitId];
            var poiType = AppState.current.navigationLocation.poiType;

            var appViewModel = Init._app();

            var junctionAppViewModel = new JunctionSPAAppViewModel(
                appViewModel.route.route,
                selectedRouteJunction,
                appViewModel.filter,
                appViewModel.routePlan,
                AppState.current.metadata,
                poiType);

            appViewModel.selectedJunction(junctionAppViewModel);

            Init.initJunctionMapWhenReady(junctionAppViewModel).then((jmmv) => {
                // to ensure the switch between map and list view is initialized
                $(".view-mode-switch").controlgroup();
                $(".view-mode-switch").trigger("create");
                Init.wireupPOIGroup(jmmv);

            })

            Init._app().url(Utils.getShareUrl(AppState.current.basePortalUrl, AppState.current.navigationLocation));
            Init._app().title(junctionAppViewModel.routeJunction.title);
            document.title = Init._app().title();
            Init.animateFiltersTrigger();
        }

        private static animateFiltersTrigger() {
            window.setTimeout(() => {
                var filtersContainer = $("." + AppState.current.pageInfo.pageName + " .filters-container");
                filtersContainer.css({ "right": "10%" });
                filtersContainer.animate({ "right": "35%" }, "slow");
            }, 50);
        }

        private static initJunctionMapWhenReady(junctionAppViewModel: JunctionSPAAppViewModel): JQueryPromise<JunctionMapViewModel> {
            var dfd = jQuery.Deferred();
            var mapElement = $("#map")[0];
            var mapContainerElement = $(".poi-map")[0];

            if (mapElement && mapContainerElement) {
                var junctionMapViewModel = junctionAppViewModel.initMap(mapElement, mapContainerElement);
                dfd.resolve(junctionMapViewModel);
            } else {
                window.setTimeout(() => {
                    Init.initJunctionMapWhenReady(junctionAppViewModel)
                        .then((jmvm) => dfd.resolve(jmvm));
                }, 50);
            }

            return dfd.promise();
        }

        private static wireupPOIGroup(jmvm: JunctionMapViewModel): void {
            $(".view-mode-switch").on("change", function () {
                var modeVal = $(".view-mode-switch :radio:checked").val();
                if (modeVal === "list") {
                    $(".poi-table").show();
                    $(".poi-map").hide();
                    Telemetry.trackEvent(TelemetryEvent.POIGroupSwitchList);
                }
                else {
                    $(".poi-table").hide();
                    $(".poi-map").show();
                    jmvm.initMapDiv();
                    Telemetry.trackEvent(TelemetryEvent.POIGroupSwitchMap);
                }
            });

            $(".yelp-btn").on("click", function () {
                Telemetry.trackEvent(TelemetryEvent.YelpLinkClick, null, null, true);
            });

            $(".tel-btn").on("click", function () {
                Telemetry.trackEvent(TelemetryEvent.TelLinkClick);
            });

            $(".pois-list-filters-button").click(() => {
                Telemetry.trackEvent(TelemetryEvent.FilterButtonInlineExitPageClick);
                Init.openFilterPopup();
            });
        };

        private static enableUAMatch(): void {

            /* UA MATCH */
            var matched, browser;
            jQuery["uaMatch"] = function (ua) {
                ua = ua.toLowerCase();

                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) ||
                    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                    [];

                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            };

            matched = jQuery["uaMatch"](navigator.userAgent);
            browser = {};

            if (matched.browser) {
                browser[matched.browser] = true;
                browser.version = matched.version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if (browser.chrome) {
                browser.webkit = true;
            } else if (browser.webkit) {
                browser.safari = true;
            }

            jQuery["browser"] = browser;

            /* END OF UA_MATCH */
        }

        public static openNavigationMenu(): void {
            var fd = $("." + AppState.current.pageInfo.pageName + " .nav-menu")
            if (fd.length > 0) {
                (<any>fd).panel();
                fd.trigger("create");
                (<any>fd).panel("open");
            }
        }

        public static openFilterPopup(): void {
            var fd = $("." + AppState.current.pageInfo.pageName + " .filter-dlg")
            fd.on('popupafteropen', function () {
                var hCenter = ($(window).width() - fd.width()) / 2;
                var vCenter = ($(window).height() - fd.height()) / 2;
                $('.ui-popup-container').css({
                    top: vCenter,
                    left: hCenter,
                    position: "fixed"
                });
            });

            if (fd.length > 0) {
                fd.popup();
                fd.trigger("create");
                fd.popup("open", {
                    positionTo: "origin",
                    transition: "slidedown"
                });
            }
        }
    }
}