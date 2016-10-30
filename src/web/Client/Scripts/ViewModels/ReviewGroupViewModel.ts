/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

"use strict";
module StopByStop {
    export class ReviewGroupViewModel {
        private _obj: IReviewGroup;

        constructor(obj: IReviewGroup) {
            this._obj = obj;
            this.name = ko.observable(this._obj.n);
            this.icon = ko.observable(this._obj.i);
            this.reviewCount = ko.observable(this._obj.rc);
            this.reviewPageUrl = ko.observable(this._obj.u);
            this.ratingImageUrl = ko.observable(this._obj.riu);
            this.rating = ko.observable(this._obj.r);
        }

        public name: KnockoutObservable<string>;
        public icon: KnockoutObservable<string>;
        public reviewCount: KnockoutObservable<number>;
        public reviewPageUrl: KnockoutObservable<string>;
        public ratingImageUrl: KnockoutObservable<string>;
        public rating: KnockoutObservable<number>;
    }
}