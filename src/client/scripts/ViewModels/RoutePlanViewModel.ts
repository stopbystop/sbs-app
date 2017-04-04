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

    export class RoutePlanViewModel {
        private _stopDictionary: { [id: string]: RouteStopViewModel } = {};
        private _routeId: string;
        private _destination: LocationViewModel;

        constructor(routeId: string, routeDistance: number, destination: LocationViewModel) {
            this.routeDistance = routeDistance;
            this._routeId = routeId;
            this.stops = ko.observableArray([]);
            this.editedStop = ko.observable<RouteStopViewModel>(null);
            this._stopDictionary = {};
            this._destination = destination;
        }

        public junctionMap: { [id: string]: RouteJunctionViewModel } = {};
        public routeDistance: number;
        public stops: KnockoutObservableArray<RouteStopViewModel>;
        public editedStop: KnockoutObservable<RouteStopViewModel>;

        public getOrCreateStop(poi: PoiOnJunctionViewModel): RouteStopViewModel {
            var id = poi.poi.id;
            if (!this._stopDictionary[id]) {
                var routeStopViewModel = new RouteStopViewModel(poi);
                this._stopDictionary[id] = routeStopViewModel;
            }

            var stop = this._stopDictionary[id];
            return stop;
        }

        public addEditedStopToRoute(): void {
            this.addStopToRoute(this.editedStop());
            Utils.spaPageNavigate(
                {
                    page: SBSPage.route,
                    routeId: AppState.current.navigationLocation.routeId
                });
        }

        public removeEditedStop(): void {
            this.removeStop(this.editedStop());
            this.closeStopSettings();
        }

        public navigateToEditedStop(): void {
            this.editedStop().navigate();
        }

        public addStopToRoute(routeStopViewModel: RouteStopViewModel, reloadFromCache: boolean = false): void {
            Telemetry.trackEvent(TelemetryEvent.AddStopToRoute, [{ k: TelemetryProperty.LoadStopsFromCache, v: reloadFromCache.toString() }]);

            // only add it to stops if it is not already in the collection
            var alreadyAdded = false;
            $.each(this.stops(), (index: number, value: RouteStopViewModel) => {
                if (value.poiOnJunction.poi.id === routeStopViewModel.poiOnJunction.poi.id) {
                    alreadyAdded = true;
                }
            });

            if (!alreadyAdded) {
                this.stops.push(this._stopDictionary[routeStopViewModel.poiOnJunction.poi.id]);
                var routeJunctionViewModel = this.junctionMap[routeStopViewModel.poiOnJunction.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.push(routeStopViewModel);
                } else {
                    Telemetry.trackError(new Error("RouteStopViewModel.addStopToRoute.0"), null, null);
                }
            }
        }

        public removeStop(stop: RouteStopViewModel) {
            Telemetry.trackEvent(TelemetryEvent.RemoveStopFromRoute);
            var sbsid = stop.poiOnJunction.poi.id;

            if (this._stopDictionary[sbsid]) {
                var stop = this._stopDictionary[sbsid];
                this.stops.remove(stop);

                var routeJunctionViewModel = this.junctionMap[stop.poiOnJunction.exitId];
                if (routeJunctionViewModel) {
                    routeJunctionViewModel.stops.remove(stop);
                }

                delete this._stopDictionary[sbsid];

            }
        }

        public showStopSettings(plannedStop: RouteStopViewModel): void {
            Telemetry.trackEvent(TelemetryEvent.ShowStopSettingsPopup);
            this.editedStop(plannedStop);

            var stopSettingsDialog = $("." + AppState.current.pageInfo.pageName + " .stop-settings-dialog");

            stopSettingsDialog.on('popupafteropen', function () {
                var hCenter = ($(window).width() - stopSettingsDialog.width()) / 2;
                var vCenter = ($(window).height() - stopSettingsDialog.height()) / 2;
                $('.ui-popup-container').css({
                    top: vCenter,
                    left: hCenter,
                    position: "fixed"
                });
            });


            stopSettingsDialog.popup({
                transition: "slidedown",
                corners: true
            });

            (<any>ko).tasks.runEarly();

            stopSettingsDialog.trigger("create");
            stopSettingsDialog.popup("open");
        }

        private closeStopSettings() {
            var stopSettingsDialog =
                $("." + AppState.current.pageInfo.pageName + " .stop-settings-dialog");
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
                            daddrStr += (this.stops()[i].poiOnJunction.poi.location.lat + "," + this.stops()[i].poiOnJunction.poi.location.lon);
                        }

                        if (daddrStr !== "") {
                            daddrStr += "+to:";
                        }

                        daddrStr += this._destination.lat + "," + this._destination.lon;
                        var navigationUrl = "https://maps.google.com/maps?saddr="
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

                        Utils.windowOpen(navigationUrl);

                    },
                    (positionError: PositionError) => {
                        Telemetry.trackError(new Error("getCurrentPositionError"));
                        window.alert("Please allow StopByStop.com to share your location.");
                    });
            }
        };
    }
}