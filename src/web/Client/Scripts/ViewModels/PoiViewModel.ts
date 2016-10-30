/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="PoiImageViewModel.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="ReviewGroupViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>

"use strict";
module StopByStop {
    export class PoiViewModel {
        private _obj: IPoi;

        constructor(obj: IPoi) {
            this._obj = obj;

            this.sbsid = this._obj.id;
            this.poiCategoryIDs = this._obj.c;
            this.poiType = this._obj.pt;
            this.name = this._obj.n;
            this.description = ko.observable(this._obj.d);
            this.location = new LocationViewModel(this._obj.l);
            this.visible = ko.observable(true);

            this.telPhoneString = "";
            if (this.sbsid.indexOf("y_") === 0) {
                this.telPhoneString = this.sbsid.substr(2);
            }

            this.isYInfoLoading = ko.observable(true);
            this.yUrl = ko.observable("#");
            this.yStarClass = ko.observable("stars_0");
            this.yReviewCountString = ko.observable("");

            /*
            if (this._obj.i) {
                this.images = ko.observableArray($.map(this._obj.i, (valueOfElement: IPoiImage, indexInArray: number) =>
                    new PoiImageViewModel(valueOfElement)));
            }
            */

            /*
            if (this._obj.rg) {
                this.reviewGroups = ko.observableArray($.map(this._obj.rg, (valueOfElement: IReviewGroup, indexInArray: number) =>
                    new ReviewGroupViewModel(valueOfElement)));
            }
            */
        }

        public updateYInfo(poi: IPoi): void {
            if (poi.rg && poi.rg.length > 0) {
                this.yUrl(poi.rg[0].u);
                this.yStarClass(PoiViewModel.getYStarClass(poi.rg[0].r));
                this.yReviewCountString(PoiViewModel.getReviewsString(poi.rg[0].rc));
                this.isYInfoLoading(false);
            }
        }

        public sbsid: string;
        public poiCategoryIDs: string[];
        public poiType: PoiType;
        public name: string;
        public description: KnockoutObservable<string>;
        public location: LocationViewModel;
        public visible: KnockoutObservable<boolean>;
        public telPhoneString: string;
        public isYInfoLoading: KnockoutObservable<boolean>;

        public yUrl: KnockoutObservable<string>;
        public yStarClass: KnockoutObservable<string>;
        public yReviewCountString: KnockoutObservable<string>;

        /*
        public images: KnockoutObservableArray<PoiImageViewModel>;  
        public reviewGroups: KnockoutObservableArray<ReviewGroupViewModel>;
        */

        private static getReviewsString(reviewCount: number):string {
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