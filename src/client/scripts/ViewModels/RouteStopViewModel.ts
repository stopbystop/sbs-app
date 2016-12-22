/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../Telemetry.ts"/>

/// <reference path="PoiOnJunctionViewModel.ts"/>


"use strict";
module StopByStop {
    export class RouteStopViewModel {

        constructor(stopPlace: IStopPlace) {
            this.stopPlace = stopPlace;
            this.sbsid = stopPlace.id;
            this.location = new LocationViewModel({ a: stopPlace.lat, o: stopPlace.lon });
            this.name = stopPlace.name;

            this.stopDurationFastUpdate = ko.observable(stopPlace.duration || 15); //default stop time is 15 minutes

            this.stopDuration = ko.observable(stopPlace.duration || 15); //default stop time is 15 minutes
            
            this.stopDuration.extend({ rateLimit: { timeout: 1000, method: "notifyWhenChangesStop" } });


            this.exitEta = ko.observable(new Date());
            this.etaString = ko.computed(() => {
                var drivingTimeToPlaceInSeconds = this.getDrivingTimeToPlaceInSeconds();
                var stopEta = new Date(this.exitEta().getTime() + drivingTimeToPlaceInSeconds * 1000);
                var stopEtd = new Date(stopEta.getTime() + this.stopDuration() * 60 * 1000);
                return Utils.getTimeString(stopEta) + "-" + Utils.getTimeString(stopEtd);
            });
            this.stopDurationHours = ko.computed(() => {
                var n = (Math.floor(this.stopDurationFastUpdate() / 60)).toString();
                if (n.length === 1) {
                    n = "0" + n;
                }
                return n;
            });

            this.stopDurationMinutes = ko.computed(() => {
                var n = (this.stopDurationFastUpdate() % 60).toString();
                if (n.length === 1) {
                    n = "0" + n;
                }
                return n;
            });

            this.detourDuration = ko.computed(() => {
                var drivigTimeToPlaceInSeconds = this.getDrivingTimeToPlaceInSeconds() * 2;
                var stopDurationInSeconds = this.stopDuration() * 60;
                return drivigTimeToPlaceInSeconds + stopDurationInSeconds;
            });
        }

        private getDrivingTimeToPlaceInSeconds(): number {
            // for now let's assume 20mph non-highway speed
            return this.stopPlace.dfe / 20 * 3600;
        }

        public add5MinutesToDuration(): void {
            Telemetry.trackEvent(TelemetryEvent.Add5MinToStop);
            this.stopDurationFastUpdate(this.stopDurationFastUpdate() + 5);
            this.stopDuration(this.stopDurationFastUpdate());
        }

        public subtract5MinutesFromDuration(): void {
            Telemetry.trackEvent(TelemetryEvent.Remove5MinFromStop);
            this.stopDurationFastUpdate(Math.max(0, this.stopDurationFastUpdate() - 5));
            this.stopDuration(this.stopDurationFastUpdate());
        }

        public navigate(): void {
            Telemetry.trackEvent(TelemetryEvent.StopPopupNavigateClick, null, null, true);
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position: Position) => {

                        var srcLat = position.coords.latitude;
                        var srcLon = position.coords.longitude;
                        var navigationUrl = "https://maps.google.com/maps?saddr="
                            + srcLat + ","
                            + srcLon + "&daddr="
                            + this.location.lat.toString() + ","
                            + this.location.lon.toString();


                        Telemetry.trackEvent(
                            TelemetryEvent.StopPopupNavigateBeforeDirect,
                            [
                                { k: TelemetryProperty.NavigationUrl, v: navigationUrl }
                            ],
                            null,
                            true);

                        window.open(navigationUrl, AppState.current.windowOpenTarget, "location=yes");
                    },
                    (positionError: PositionError) => {
                        try {
                            Telemetry.trackError(new Error("getCurrentPositionError"));
                        }
                        catch (ex) { }
                        window.alert("Please allow StopByStop.com to share your location.");
                    });
            }
        };

        public stopDuration: KnockoutObservable<number>;
        public stopDurationFastUpdate: KnockoutObservable<number>;
        public stopDurationHours: KnockoutComputed<string>;
        public stopDurationMinutes: KnockoutComputed<string>;
        public visible: KnockoutComputed<boolean>;
        public roadlineTopOffsetPart: KnockoutComputed<number>;


        /** total detour duration in seconds */
        public detourDuration: KnockoutComputed<number>;
        public exitEta: KnockoutObservable<Date>;
        public etaString: KnockoutComputed<string>;
        public sbsid: string;
        public location: LocationViewModel;
        public name: string;
        public stopPlace: IStopPlace;

    }
}