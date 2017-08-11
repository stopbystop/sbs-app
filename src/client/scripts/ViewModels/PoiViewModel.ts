/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="ReviewGroupViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>

"use strict";
module StopByStop {

    export interface IPoiPropertyViewModel {
        id: string;
        poiTypeString: string;
        name: string;
        values: string[];
    }

    export class PoiSimplePropertyViewModel implements IPoiPropertyViewModel {
        constructor(id:string, poiTypeString:string, name: string, propertyValues: string[]) {
            this.name = name;
            this.values = propertyValues;
            this.id = id;
            this.poiTypeString = poiTypeString;
        }

        public id: string;
        public poiTypeString: string;
        public name: string;
        public values: string[];
    }

    export class PoiMetadataPropertyViewModel implements IPoiPropertyViewModel {
        constructor(poiTypeString: string, metadata: IPoiPropertyMetadata, propertyValues: number[]) {
            this.id = metadata.id;
            this.poiTypeString = poiTypeString;
            this.metadata = metadata;
            this.name = metadata.n;
            this.values = propertyValues.map((value: number, index: number, array: number[]) => metadata.v[value].n);
        }

        public id: string;
        public poiTypeString: string;
        public metadata: IPoiPropertyMetadata;
        public name: string;
        public values: string[];
    }

    export class PoiViewModel {
        private _obj: IPoi;
        private _reviewDataItem: IReviewGroup;
        private _app: IAppViewModel;
        private _poiOnJunction: PoiOnJunctionViewModel;

        constructor(obj: IPoi, app: IAppViewModel, poiOnJunction: PoiOnJunctionViewModel = null) {
            this._poiOnJunction = poiOnJunction;
            this._poiOnJunction.poi = this;
            this._obj = obj;
            this._app = app;
            this.id = this._obj.id;
            this.categories = this._obj.c.map((value, index, arr) => AppState.current.metadata.c[value]);
            this.poiType = this._obj.t;
            this.name = this._obj.n;
            this.description = ko.observable(this._obj.d);
            this.location = new LocationViewModel(this._obj.l);
            this.visible = ko.observable(true);

            this.telPhoneString = this._obj.p;

            this.isYInfoLoading = ko.observable(true);
            this.isYInfoVisible = ko.observable(true);
            this.yUrl = ko.observable("#");
            this.yStarClass = ko.observable("stars_0");
            this.yReviewCountString = ko.observable("");
            this.urlName = this._obj.un;
            this.poiTypeString = PoiType[this.poiType].toLowerCase();

            if (this._poiOnJunction) {
                this.stop = this._app.routePlan.getOrCreateStop(this._poiOnJunction);
            }

            this.properties = [];
            var metadata = AppState.current.metadata;

            for (var p in this._obj.pp) {
                if (this._obj.pp[p]) {
                    var propertyMetadata = metadata.ppm[p];
                    if (propertyMetadata) {
                        var values = this._obj.pp[p];
                        this.properties.push(new PoiMetadataPropertyViewModel(this.poiTypeString, propertyMetadata, values));
                    }
                }
            }
        }

        public addToRouteOptionsClick(): void {
            if (this.stop) {
                Telemetry.trackEvent(TelemetryEvent.POIPageAddToRouteClick, null, null, false);
                this._app.routePlan.showStopSettings(this.stop);
            }
        }

        public navigateNowClick(): void {
            if (this.stop) {
                Telemetry.trackEvent(TelemetryEvent.POIPageNavigateClick, null, null, false);
                var getNavUrlPromise: JQueryPromise<string> = Utils.getNavigationUrlFromCurrentLocation(this.stop.poiOnJunction.poi.location);
                getNavUrlPromise.done((navigationUrl: string) => {

                    Telemetry.trackEvent(
                        TelemetryEvent.POIPageNavigateBeforeDirect,
                        [
                            { k: TelemetryProperty.NavigationUrl, v: navigationUrl }
                        ],
                        null,
                        true);

                    Utils.windowOpen(navigationUrl);
                });
            }
        }

        public updateYInfo(reviewDataItem: IReviewGroup): void {
            if (reviewDataItem) {
                this.yUrl(reviewDataItem.u);
                this.yStarClass(PoiViewModel.getYStarClass(reviewDataItem.r));
                this.yReviewCountString(PoiViewModel.getReviewsString(reviewDataItem.rc));
                this.isYInfoLoading(false);
                this._reviewDataItem = reviewDataItem;
            } else if (!this._reviewDataItem) {
                this.isYInfoVisible(false);
            }
        }

        public stop: RouteStopViewModel;
        public distanceFromJunctionText: string;
        public poiTypeString: string;
        public urlName: string;
        public categories: IPoiCategory[];
        public id: string;
        public poiType: PoiType;
        public name: string;
        public url: string;
        public description: KnockoutObservable<string>;
        public location: LocationViewModel;
        public visible: KnockoutObservable<boolean>;
        public telPhoneString: string;
        public isYInfoLoading: KnockoutObservable<boolean>;
        public isYInfoVisible: KnockoutObservable<boolean>;
        public yUrl: KnockoutObservable<string>;
        public yStarClass: KnockoutObservable<string>;
        public yReviewCountString: KnockoutObservable<string>;
        public properties: IPoiPropertyViewModel[];

        private static getReviewsString(reviewCount: number): string {
            if (reviewCount === 0) {
                return "no reviews";
            } else if (reviewCount === 1) {
                return "1 review";
            }
            return reviewCount.toString() + " reviews";
        };

        private static getYStarClass(rating: number): string {
            var starClassName: string = null;
            switch (rating.toString()) {
                case "5":
                    starClassName = "stars_5";
                    break;
                case "4.5":
                    starClassName = "stars_4_half";
                    break;
                case "4":
                    starClassName = "stars_4";
                    break;
                case "3.5":
                    starClassName = "stars_3_half";
                    break;
                case "3":
                    starClassName = "stars_3";
                    break;
                case "2.5":
                    starClassName = "stars_2_half";
                    break;
                case "2":
                    starClassName = "stars_2";
                    break;
                case "1.5":
                    starClassName = "stars_1_half";
                    break;
                case "1":
                    starClassName = "stars_1";
                    break;
                case "0":
                    starClassName = "stars_0";
                    break;
            }

            return starClassName;
        }
    }
}   