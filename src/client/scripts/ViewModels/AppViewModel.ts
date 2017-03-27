/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="RouteViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="IAppViewModel.ts"/>

"use strict";
module StopByStop {
    export class AppViewModel implements IAppViewModel {


        private _route: IRoute;

        constructor(route: IRoute, initSettings: IAppState, routeTitle: string, routeInitializationComplete: () => void = null) {
            this.isRouteLoading(true);
            this.routeLoadingMessage("Loading route " + routeTitle + " ...");
            this.url(Utils.getShareUrl(initSettings.basePortalUrl, initSettings.navigationLocation));

            if (route) {
                this._route = route;
                var rjs: IRouteJunction[] = [];

                $.each(route.s, (i, v: IRouteSegment) => { rjs.push(...v.j); });

                this.filter = new FilterViewModel(route.rid, rjs, AppState.current.metadata);
                this.filter.onFilterUpdated = this.onPoiFilterUpdated.bind(this);
                this.routePlan = new RoutePlanViewModel(this._route.rid, this._route.d, new LocationViewModel(route.tl));

                this.isRouteLoading(false);
                this.routeId = route.rid;
                this.route = new RouteViewModel(this._route, this, initSettings, () => {


                    $.each(this.route.routeSegments(), (i, rs) => {
                        $.each(rs.routeJunctions, (i2, rj) => {
                            rj.onPoiVisibilityUpdated();
                        });
                        rs.onJunctionVisibilityUpdated();
                    });

                    if (routeInitializationComplete) {
                        routeInitializationComplete();
                    }
                });


                this.title(this.route.title + " - Stop by Stop");
            } else {
                this.title("See best places to stop on the way to your destination - Stop by Stop");
            }

            window.document.title = this.title();
        }

        public routeId: string;
        public route: RouteViewModel = null;
        public url: KnockoutObservable<string> = ko.observable("");
        public title: KnockoutObservable<string> = ko.observable("");
        // initialize filter to an empty object, so that it doesn't require IFs which would require delayed jqm initialization
        public filter: FilterViewModel = <FilterViewModel>{};
        public routePlan: RoutePlanViewModel = null;
        public isRouteLoading: KnockoutObservable<boolean> = ko.observable(false);
        public routeLoadingMessage: KnockoutObservable<string> = ko.observable("");
        public selectedJunction: KnockoutObservable<ExitPageViewModel> = ko.observable(null);
        public selectedPoi: KnockoutObservable<PoiViewModel> = ko.observable(null);

        public initSideBar(): void {
            if (this.route && this.route.sideBar) {
                this.route.sideBar.postInit();
            }
        }

        public onPoiFilterUpdated(): void {
            $.each(this.route.routeSegments(), (i, rs) => {
                var atLeastOneJunctionVisibilityChanged = false;
                $.each(rs.routeJunctions, (i2, rj) => {
                    var junctionVisibilityChanged = rj.onPoiVisibilityUpdated();
                    if (junctionVisibilityChanged) {
                        atLeastOneJunctionVisibilityChanged = true;
                    }
                });

                if (atLeastOneJunctionVisibilityChanged) {
                    rs.onJunctionVisibilityUpdated();
                }
            });
        }
    }
}