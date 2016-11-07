/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../tsdef/google.maps.d.ts"/>
/// <reference path="../extensions.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Init.ts"/>
/// <reference path="RouteViewModel.ts"/>
/// <reference path="JunctionMapViewModel.ts"/>
/// <reference path="IAppViewModel.ts"/>

"use strict";
module StopByStop {

    export abstract class JunctionAppBaseViewModel implements IAppViewModel {
        protected _poiLocations: LocationViewModel[];
        protected _locationToLoadIndex: number = 0;

        public filter: FilterViewModel;
        public routePlan: RoutePlanViewModel;
        public routeJunction: RouteJunctionViewModel;
        public junctionMapViewModel: JunctionMapViewModel;

        protected loadFullPoiData() {
            if (this._locationToLoadIndex < this._poiLocations.length) {
                var locationToLoad = this._poiLocations[this._locationToLoadIndex++];

                var latStr = locationToLoad.lat.toFixed(1);
                var lonStr = locationToLoad.lon.toFixed(1);

                $.ajax(AppState.current.urls.PoiUrl + latStr + "," + lonStr)
                    .done((data: IPoi[]) => {

                        for (var i = 0; i < data.length; i++) {
                            var p = data[i];
                            if (this.routeJunction.junction.poiLookup[p.id]) {
                                this.routeJunction.junction.poiLookup[p.id].poi.updateYInfo(p);
                            }
                        }

                        this.loadFullPoiData();
                    });
            }
        }

    };

    export class JunctionSPAAppViewModel extends JunctionAppBaseViewModel {
        constructor(
            routeJunctionViewModel: RouteJunctionViewModel,
            filter: FilterViewModel,
            routePlan: RoutePlanViewModel,
            poiTypeToShow: PoiType = PoiType.General
        ) {
            super();
            this.filter = filter;
            this.routePlan = routePlan;
            this.routeJunction = routeJunctionViewModel;

            
            var junctionLocationViewModel = this.routeJunction.junction.location;

            this._poiLocations = LocationViewModel.getGridLocations({
                a: junctionLocationViewModel.lat,
                o: junctionLocationViewModel.lon
            });

            if (poiTypeToShow === PoiType.Food) {
                this.filter.showGasStations(false);
            } else if (poiTypeToShow === PoiType.Gas) {
                this.filter.showRestaurants(false);
            }

            this.loadFullPoiData();
            
        };

        public initMap(mapDiv: Element, mapContainerDiv: Element) {
            this.junctionMapViewModel = new JunctionMapViewModel(mapDiv, mapContainerDiv, this.routeJunction, AppState.current.urls);
        }
    }

    export class JunctionAppViewModel extends JunctionAppBaseViewModel {
        private _routeJunction: IRouteJunction;
        

        constructor(
            routeJunction: IRouteJunction,
            poiTypeToShow: PoiType,
            routeId: string,
            mapDiv: Element,
            mapContainerDiv: Element) {

            super();

            var routeStartTime = new Date();
            this._routeJunction = routeJunction;

            this.routePlan = new RoutePlanViewModel(
                routeId,
                0, /* not needed here */
                null);

            this.routePlan.loadStopsFromStorage();
            this.filter = new FilterViewModel(routeId, [routeJunction], routeJunction.j.fcat, routeJunction.j.tfcat, false);

            this.filter.showRestaurants(true);
            this.filter.showGasStations(true);

            if (poiTypeToShow === PoiType.Food) {
                this.filter.showGasStations(false);
            } else if (poiTypeToShow === PoiType.Gas) {
                this.filter.showRestaurants(false);
            }

            this.routeJunction = new RouteJunctionViewModel(this._routeJunction, routeStartTime, this);
            this.routeJunction.applyFilter(this.filter);

            ko.computed(() => ko.toJS(this.filter)).subscribe(() => {
                this.routeJunction.applyFilter(this.filter);
            });

            this.junctionMapViewModel = new JunctionMapViewModel(mapDiv, mapContainerDiv, this.routeJunction, AppState.current.urls);
            this._poiLocations = LocationViewModel.getGridLocations(routeJunction.j.l);
            this.loadFullPoiData();
        }
    }
}