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

        constructor(route: IRoute, initSettings: IAppState = null, routeInitializationComplete: () => void = null) {
            this.url(location.toString());
            if (route) {
                this._route = route;
                var rjs: IRouteJunction[] = [];

                $.each(route.s, (i, v: IRouteSegment) => rjs.push(...v.j));

                this.filter = new FilterViewModel(route.rid, rjs, route.fcat, route.tfcat);
                this.routePlan = new RoutePlanViewModel(this._route.rid, this._route.d, new LocationViewModel(route.tl));

                this.route = new RouteViewModel(this._route, this, this.filter, initSettings, () => {

                    if (initSettings.app === SBSApp.Web) {
                        this.routePlan.loadStopsFromStorage();
                    }

                    if (routeInitializationComplete) {
                        routeInitializationComplete();
                    }
                });


                ko.computed(() => ko.toJS(this.filter)).subscribe(() => {
                    this.route.applyFilter(this.filter);
                });
                this.title(this.route.title + " - Stop by Stop");
            } else {
                this.title("See best places to stop on the way to your destination - Stop by Stop");
            }

            window.document.title = this.title();
        }

        public route: RouteViewModel = null;
        public url: KnockoutObservable<string> = ko.observable("");
        public title: KnockoutObservable<string> = ko.observable("");
        // initialize filter to an empty object, so that it doesn't require IFs which would require delayed jqm initialization
        public filter: FilterViewModel = <FilterViewModel>{};
        public routePlan: RoutePlanViewModel = null;
        public selectedJunction: KnockoutObservable<JunctionAppBaseViewModel> = ko.observable(null);

        public initSideBar(): void {
            if (this.route && this.route.sideBar) {
                this.route.sideBar.postInit();
            }
        }
    }
}