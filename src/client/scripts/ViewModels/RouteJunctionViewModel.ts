/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../AppState.ts"/>

"use strict";
module StopByStop {
    export class RouteJunctionViewModel {

        private _obj: IRouteJunction;

        constructor(obj: IRouteJunction, routeStartTime: Date, app: IAppViewModel) {
            this._obj = this.routeJunction = obj;
            this.distanceFromRouteStartText = ko.observable(Utils.getMileString(this._obj.dfrs));



            this.junction = new JunctionViewModel(this._obj, app);
            this.visible = ko.observable(true);
            this.top = ko.observable("");

            this.visibleGasPois = ko.observableArray([]);
            this.visibleFoodPois = ko.observableArray([]);
            this.closestFoodPoiDistance = ko.observable("");
            this.closestGasPoiDistance = ko.observable("");
            this.gasPoiCountString = ko.observable("");
            this.foodPoiCountString = ko.observable("");
            this.stops = ko.observableArray<RouteStopViewModel>();

            this.etaWithoutStops = new Date(routeStartTime.getTime() + this._obj.tfrs * 1000);
            this.eta = ko.observable(this.etaWithoutStops);
            this.hasStops = ko.computed(() => this.stops().length > 0);

            this.description = ko.computed(() => this.junction.name +
                ". " + this.gasPoiCountString() + " gas stations, " +
                this.foodPoiCountString() + " restaurants within 5 mile travel distance.");

            this.etaString = ko.computed(() => {
                var s = Utils.getTimeString(this.eta());
                if (this.hasStops()) {
                    s = Utils.getTimeString(this.eta()) + "-" + Utils.getTimeString(this.etd());
                }
                return s;
            });

            this.etd = ko.computed(() => {
                var totalDetourTime = 0;
                for (var i = 0; i < this.stops().length; i++) {
                    totalDetourTime += this.stops()[i].detourDuration();
                }
                return new Date(this.eta().getTime() + totalDetourTime * 1000);
            });
        }
        public routeJunction: IRouteJunction;
        public distanceFromRouteStartText: KnockoutObservable<string>;
        public junction: JunctionViewModel;
        public visible: KnockoutObservable<boolean>;
        public top: KnockoutObservable<string>;

        public visibleGasPois: KnockoutObservableArray<PoiOnJunctionViewModel>;
        public visibleFoodPois: KnockoutObservableArray<PoiOnJunctionViewModel>;
        public closestGasPoiDistance: KnockoutObservable<string>;
        public closestFoodPoiDistance: KnockoutObservable<string>;
        public gasPoiCountString: KnockoutObservable<string>;
        public foodPoiCountString: KnockoutObservable<string>;
        public stops: KnockoutObservableArray<RouteStopViewModel>;

        public etaWithoutStops: Date;
        public eta: KnockoutObservable<Date>;
        public etaString: KnockoutComputed<string>;
        public etd: KnockoutComputed<Date>;
        public hasStops: KnockoutComputed<boolean>;
        public description: KnockoutComputed<string>;

        public applyFilter(filter: FilterViewModel): void {
            this.visibleGasPois.removeAll();
            this.visibleFoodPois.removeAll();

            for (var i = 0; i < this.junction.pois().length; i++) {
                var poi = this.junction.pois()[i];
                poi.poi.visible(false);
                var maxDistanceFromJunction = parseInt(filter.maxDistanceFromJunction(), 10);
                if (poi.poi.poiType === PoiType.Food && filter.showRestaurants() &&
                    poi.dfe <= maxDistanceFromJunction) {
                    var poiFoodCategories = poi.poi.poiCategoryIDs;

                    // in some cases as was discovered poiFoodCategories can be null
                    // see if categories are specified and if not then add poi anyway
                    if (poiFoodCategories && poiFoodCategories.length > 0) {
                        for (var k = 0; k < poiFoodCategories.length; k++) {
                            if (filter.isFoodCategoryVisible(poiFoodCategories[k])) {
                                this.visibleFoodPois().push(poi);
                                poi.poi.visible(true);
                                break;
                            }
                        }
                    } else {
                        this.visibleFoodPois().push(poi);
                        poi.poi.visible(true);
                    }
                } else if (poi.poi.poiType === PoiType.Gas && filter.showGasStations() &&
                    poi.dfe <= maxDistanceFromJunction) {
                    // TODO: understand why it we may ever end up in this situation
                    this.visibleGasPois().push(poi);
                    poi.poi.visible(true);
                }
            }

            this.visible((this.visibleFoodPois().length > 0 || this.visibleGasPois().length > 0));

            this.closestFoodPoiDistance(this.visibleFoodPois().length > 0 ? Utils.getMileString(this.visibleFoodPois()[0].dfe) : "");
            this.closestGasPoiDistance(this.visibleGasPois().length > 0 ? Utils.getMileString(this.visibleGasPois()[0].dfe) : "");

            this.gasPoiCountString(this.visibleGasPois().length > 9 ? "9+" : this.visibleGasPois().length.toString());
            this.foodPoiCountString(this.visibleFoodPois().length > 9 ? "9+" : this.visibleFoodPois().length.toString());
        }

        public navigateToExitPage(): void {
            Utils.spaPageNavigate(SBSPage.exit, AppState.current.navigationLocation.routeId, this.junction.osmid.toString());
        }

        public navigateToExitFoodPage(): void {
            Utils.spaPageNavigate(SBSPage.exit, AppState.current.navigationLocation.routeId, this.junction.osmid.toString(), PoiType.Food);
        }


        public navigateToExitGasPage(): void {
            Utils.spaPageNavigate(SBSPage.exit, AppState.current.navigationLocation.routeId, this.junction.osmid.toString(), PoiType.Gas);
        }



    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          