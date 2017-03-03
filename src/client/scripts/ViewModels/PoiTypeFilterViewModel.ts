/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="PoiCategoryViewModel.ts"/>

"use strict";

module StopByStop {
    export class PoiTypeFilterViewModel {
        private _metadata: IMetadata;

        constructor(metadata: IMetadata) {
            this._metadata = metadata;
        }

        public isOn: KnockoutObservable<boolean>;
        public categoryFilter: MultiValueFilterViewModel;
        public propertyEnablementLookup: { [id: string]: MultiValueFilterViewModel };
        public propertyList: MultiValueFilterViewModel[];

        public resetTempCount(): void {

        }

        public applyTempCount(): void {

        }

        public incrementTempCountForCategories(categories: number[]) {

        }

        public incrementTempCountForProperty(propertyId: string, propertyValues: number[]) {

        }

    }

    export class MultiValueFilterViewModel {

        constructor() {
            this.selectAll = () => {
                $.each(this.valueList, (i, item) => item.isOn(true));
                this.allValuesSelected(true);
            };

            this.unselectAll = () => {
                $.each(this.valueList, (i, item) => item.isOn(false));
                this.allValuesSelected(false);
            };
        }

        public allValuesSelected: KnockoutObservable<boolean> = ko.observable(false);
        public valueEnablementLookup: { [id: number]: ValueFilterViewModel };
        public valueList: ValueFilterViewModel[];

        public selectAll(): void { }
        public unselectAll(): void { }

        public resetTempCount(): void {
            $.each(this.valueList, (i, item) => item.tempCount = 0);
        }

        public applyTempCount(): void {
            $.each(this.valueList, (i, item) => item.count(item.tempCount));
        }

        public incrementTempCount(propertyValues: number[]):void {
            $.each(this.valueList, (i, item) => {
                if (propertyValues.indexOf(item.id) > -1) {
                    item.tempCount++;
                }
            });
        }
    }

    export class ValueFilterViewModel {
        public id: number;
        public isOn: KnockoutObservable<boolean>;
        public count: KnockoutObservable<number>;
        public tempCount: number;
    }
}