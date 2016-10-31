/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

"use strict";
module StopByStop {
    export class LocationViewModel {
        constructor(obj: ILocation) {
            this.lat = obj.a;
            this.lon = obj.o;
            this.placeDescription = obj.pd || "";
        }

        public lat: number;
        public lon: number;
        public placeDescription: string;

        private static GRAIN: number = 0.1;
        public static getGridLocations(location: ILocation): LocationViewModel[]
        {
            var mainLocation = new LocationViewModel(
                {
                    a: LocationViewModel.roundToNLat(location.a),
                    o: LocationViewModel.roundToWLon(location.o)
                });
            

            // n locations
            var nwLocation = new LocationViewModel({
                a: mainLocation.lat + LocationViewModel.GRAIN,
                o: mainLocation.lon - LocationViewModel.GRAIN
            });
            var nLocation = new LocationViewModel({
                a: mainLocation.lat + LocationViewModel.GRAIN,
                o: mainLocation.lon
            });
            var neLocation = new LocationViewModel({
                a: mainLocation.lat + LocationViewModel.GRAIN,
                o: mainLocation.lon + LocationViewModel.GRAIN
            });

          

            // e locations
            var eLocation = new LocationViewModel({
                a: mainLocation.lat,
                o: mainLocation.lon + LocationViewModel.GRAIN
            });
            var seLocation = new LocationViewModel({
                a: mainLocation.lat - LocationViewModel.GRAIN,
                o: mainLocation.lon + LocationViewModel.GRAIN
            });


            // s locations
            var sLocation = new LocationViewModel({
                a: mainLocation.lat - LocationViewModel.GRAIN,
                o: mainLocation.lon
            });
            var swLocation = new LocationViewModel({
                a: mainLocation.lat - LocationViewModel.GRAIN,
                o: mainLocation.lon - LocationViewModel.GRAIN
            });
            

            // w location
            var wLocation = new LocationViewModel({
                a: mainLocation.lat,
                o: mainLocation.lon - LocationViewModel.GRAIN
            });

            return [
                mainLocation,
                nwLocation,
                nLocation,
                neLocation,
                eLocation,
                seLocation,
                sLocation,
                swLocation,
                wLocation
            ];
        }
        private static roundToNLat(lat: number): number {

            var roundedLat = LocationViewModel.round1DecimalDigit(lat);
            if (roundedLat < lat) {
                roundedLat += 0.1;
            }
            return roundedLat;
        }
        private static roundToWLon(lon: number): number {
            var roundedLon = LocationViewModel.round1DecimalDigit(lon);
            if (roundedLon > lon) {
                roundedLon -= 0.1;
            }
            return roundedLon;
        }
        private static round1DecimalDigit(n: number): number {
            return Math.round(n * 10) / 10
        }
    }
}