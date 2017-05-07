/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../Telemetry.ts"/>

/// <reference path="PoiOnJunctionViewModel.ts"/>


"use strict";
module StopByStop {
    export class RouteStopViewModel {

        constructor(poiOnJunction: PoiOnJunctionViewModel) {
            this.poiOnJunction = poiOnJunction;
            this.stopDurationFastUpdate = ko.observable(15); //default stop time is 15 minutes
            this.stopDuration = ko.observable(15); //default stop time is 15 minutes
            this.stopDuration.extend({ rateLimit: { timeout: 1000, method: "notifyWhenChangesStop" } });

            this.exitEta = ko.observable(new Date());


            this.etaToStopString = ko.computed(() => {
                var stopEta = new Date(this.exitEta().getTime() + Utils.getNonHighwayDrivingTimeToPlaceInSeconds(this.poiOnJunction.dfe) * 1000);
                return "you will be there by " + Utils.getTimeString(stopEta);
            });


            this.etaString = ko.computed(() => {
                var stopEta = new Date(this.exitEta().getTime() + Utils.getNonHighwayDrivingTimeToPlaceInSeconds(this.poiOnJunction.dfe) * 1000);
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
                var drivigTimeToPlaceInSeconds = Utils.getNonHighwayDrivingTimeToPlaceInSeconds(this.poiOnJunction.dfe) * 2;
                var stopDurationInSeconds = this.stopDuration() * 60;
                return drivigTimeToPlaceInSeconds + stopDurationInSeconds;
            });
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
            var getNavUrlPromise: JQueryPromise<string> = Utils.getNavigationUrlFromCurrentLocation(this.poiOnJunction.poi.location);
            getNavUrlPromise.done((navigationUrl: string) => {

                Telemetry.trackEvent(
                    TelemetryEvent.StopPopupNavigateBeforeDirect,
                    [
                        { k: TelemetryProperty.NavigationUrl, v: navigationUrl }
                    ],
                    null,
                    true);

                Utils.windowOpen(navigationUrl);
            });
        };

        public poiOnJunction: PoiOnJunctionViewModel;
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
        public etaToStopString: KnockoutComputed<string>;
    }
}