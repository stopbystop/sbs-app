/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="../AppState.ts"/>

/// <reference path="RouteStopViewModel.ts"/>
/// <reference path="RouteJunctionViewModel.ts"/>


"use strict";
module StopByStop {

    export interface IRoutePlan {
        stops: { [id: string]: IStopPlace };
    };

    export class RoutePlanViewModel {
        private _stopDictionary: { [id: string]: RouteStopViewModel } = {};
        private _storage: Storage = window.sessionStorage;
        private _storageItem: { [id: string]: IRoutePlan } = {};
        private _routeId: string;
        private _destination: LocationViewModel;

        constructor(routeId: string, routeDistance: number, destination: LocationViewModel, storageOverride: Storage = null) {
            this.routeDistance = routeDistance;
            this._storage = storageOverride || window.sessionStorage;
            this._routeId = routeId;
            this.stops = ko.observableArray([]);
            this.editedStop = ko.observable<RouteStopViewModel>(null);
            this._stopDictionary = {};
            this._destination = destination;
        }

        public loadStopsFromStorage(): void {
            this.stops([]);
            this._stopDictionary = {};
            if (this._storage.getItem(ROUTE_PLAN_STORAGE_KEY)) {
                this._storageItem = JSON.parse(this._storage.getItem(ROUTE_PLAN_STORAGE_KEY));
            } else {
                this._storageItem = {};
            }

            if (!this._storageItem[this._routeId]) {
                this._storageItem[this._routeId] = { stops: {} };
            } else {
                var stops = this._storageItem[this._routeId].stops;

                for (var id in stops) {
                    var routeStopViewModel = this.getOrCreateStop(stops[id]);
                    this.addStopToRoute(routeStopViewModel, true);
                }
            }

            this.saveRouteToStorage();
        }

        public junctionMap: { [id: string]: RouteJunctionViewModel } = {};
        public routeDistance: number;
        public stops: KnockoutObservableArray<RouteStopViewModel>;
        public editedStop: KnockoutObservable<RouteStopViewModel>;

        public getOrCreateStop(placeObj: IStopPlace, reloadFromCache: boolean = false): RouteStopViewModel {
            /* Ensure that object only contains members that are part of IStopPlace interface,
               as this is about to be serialized. Is there a better way to do it? */
            var place: IStopPlace = {
                dfe: placeObj.dfe,
                dtefrs: placeObj.dtefrs,
                duration: placeObj.duration,
                exitId: placeObj.exitId,
                id: placeObj.id,
                lat: placeObj.lat,
                lon: placeObj.lon,
                name: placeObj.name,
                type: placeObj.type || PoiType.Food
            };

            var sbsid = place.id;

            if (!this._stopDictionary[sbsid]) {
                var routeStopViewModel = new RouteStopViewModel(place);
                this._stopDictionary[sbsid] = routeStopViewModel;
            }

            var stop = this._stopDictionary[sbsid];
            return stop;
        }

        public addEditedStopToRoute():void {
            this.addStopToRoute(this.editedStop());
            Utils.spaPageNavigate(
                SBSPage.route,
                AppState.current.navigationLocation.routeId);
        }

        public removeEditedStop():void {
            this.removeStop(this.editedStop());
            this.closeStopSettings();
        }

        public navigateToEditedStop(): void {
            this.editedStop().navigate();
        }

        public addStopToRoute(routeStopViewModel: RouteStopViewModel, reloadFromCache: boolean = false): void {
            Telemetry.trackEvent(TelemetryEvent.AddStopToRoute, [{ k: TelemetryProperty.LoadStopsFromCache, v: reloadFromCache.toString() }]);


            var place = routeStopViewModel.stopPlace;

            // only add it to stops if it is not already in the collection
            var alreadyAdded = false;
            $.each(this.stops(), (index: number, value: RouteStopViewModel) => {
                if (value.sbsid === place.id) {
                    alreadyAdded = true;
                }
            });

            if (!alreadyAdded) {
                this.stops.push(this._stopDictionary[place.id]);   
                var routeJunctionViewModel = this.junctionMap[place.exitId];

                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.push(routeStopViewModel);
                } else {
                    Telemetry.trackError(new Error("RouteStopViewModel.addStopToRoute.0"), null, null);                      
                }

                              
                if (AppState.current.app === SBSApp.Web) {
                    // legacy path: we'll remove it completely, once fully migrated to SPA mode
                    // add to stop collection bound to UI
                    if (AppState.current.pageInfo.pageName === "route-page") {
                        var routeJunctionViewModel = this.junctionMap[place.exitId];
                        if (routeJunctionViewModel) {
                            routeJunctionViewModel.stops.push(routeStopViewModel);
                        }
                        else {
                            alert("Couldn't find routeJunctionViewModel");
                        }
                    }

                    // update storage item for persistence
                    place.duration = routeStopViewModel.stopDuration();

                    this._storageItem[this._routeId].stops[place.id] = place;
              
                    // subscribe for duration updates
                    routeStopViewModel.stopDuration.subscribe((newValue: number) => {
                        this._storageItem[this._routeId].stops[place.id].duration = newValue;
                        this.saveRouteToStorage();

                    });

                    this.saveRouteToStorage();
                }
            }
        }

        public removeStop(stop: RouteStopViewModel) {
            Telemetry.trackEvent(TelemetryEvent.RemoveStopFromRoute);
            var sbsid = stop.sbsid;

            if (this._stopDictionary[sbsid]) {
                var stop = this._stopDictionary[sbsid];
                this.stops.remove(stop);

                var routeJunctionViewModel = this.junctionMap[stop.stopPlace.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.remove(stop);
                }

                delete this._stopDictionary[sbsid];

                if (AppState.current.app === SBSApp.Web) {
                    delete this._storageItem[this._routeId].stops[sbsid];
                    this.saveRouteToStorage();
                }
            }
        }

        public showStopSettings(plannedStop: RouteStopViewModel): void {
            Telemetry.trackEvent(TelemetryEvent.ShowStopSettingsPopup);
            this.editedStop(plannedStop);

            var stopSettingsDialog = AppState.current.app === SBSApp.SPA ?
                $("." + AppState.current.pageInfo.pageName + " .stop-settings-dialog") :
                $("#stopSettingsDialog");

            stopSettingsDialog.popup({
                transition: "slidedown",
                corners: true
            });

            (<any>ko).tasks.runEarly();

            stopSettingsDialog.trigger("create");
            stopSettingsDialog.popup("open");
        }

        private closeStopSettings() {
            var stopSettingsDialog = AppState.current.app === SBSApp.SPA ?
                $("." + AppState.current.pageInfo.pageName + " .stop-settings-dialog") :
                $("#stopSettingsDialog");
            stopSettingsDialog.popup("close");
        }

        public navigate(): void {
            Telemetry.trackEvent(TelemetryEvent.RoutePlanNavigateClick, null, null, true);
            if (this._destination && navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position: Position) => {

                        var srcLat = position.coords.latitude;
                        var srcLon = position.coords.longitude;

                        var daddrStr = "";
                        for (var i = 0; i < this.stops().length; i++) {
                            if (i > 0) {
                                daddrStr += "+to:";
                            }
                            daddrStr += (this.stops()[i].location.lat + "," + this.stops()[i].location.lon);
                        }

                        if (daddrStr !== "") {
                            daddrStr += "+to:";
                        }

                        daddrStr += this._destination.lat + "," + this._destination.lon;
                        var navigationUrl = "http://maps.google.com/maps?saddr="
                            + srcLat + ","
                            + srcLon + "&daddr="
                            + daddrStr;

                        Telemetry.trackEvent(
                            TelemetryEvent.RoutePlanNavigateBeforeDirect,
                            [
                                { k: TelemetryProperty.StopCount, v: this.stops().length.toString() },
                                { k: TelemetryProperty.NavigationUrl, v: navigationUrl }
                            ],
                            null,
                            true);

                        window.location.assign(navigationUrl);

                    },
                    (positionError: PositionError) => {
                        Telemetry.trackError(new Error("getCurrentPositionError"));
                        window.alert("Please allow StopByStop.com to share your location.");
                    });
            }
        };

        private saveRouteToStorage(): void {
            if (AppState.current.app === SBSApp.Web) {
                this._storage.setItem(ROUTE_PLAN_STORAGE_KEY, JSON.stringify(this._storageItem));
            }
        }
    }
}