/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="ReviewGroupViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>

"use strict";
module StopByStop {
    export class PoiViewModel {
        private _obj: IPoi;
        private _reviewDataItem: IReviewGroup;
        private _navLocation: ISBSNavigationLocation;
        private _app: IAppViewModel;
        private _stopPlace: IStopPlace;

        constructor(obj: IPoi, app: IAppViewModel, stopPlace: IStopPlace = null) {
            this._obj = obj;
            this._app = app;
            this._stopPlace = stopPlace;
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
            this._navLocation = {
                page: SBSPage.poi,
                routeId: AppState.current.navigationLocation.routeId,
                exitId: stopPlace ? stopPlace.exitId : null,
                poiId: this.id,
                poiPath: this.id + "-" + this.urlName
            };

            this.poiTypeString = PoiType[this.poiType].toLowerCase();


            this.url = Utils.getShareUrl(AppState.current.basePortalUrl, this._navLocation);

            if (stopPlace) {
                this.distanceFromJunctionText = Utils.getMileString(stopPlace.dfe) + " miles from exit";
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

        public navigateToPoiPageClick(): void {
            this._app.selectedPoi(this);
            Utils.spaPageNavigate(this._navLocation);
        }

        public addToRouteOptionsClick(): void {
            var plannedStop = this._app.routePlan.getOrCreateStop(this._stopPlace);
            this._app.routePlan.showStopSettings(plannedStop);
        }
    }
}   