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
        private _pois: IPoi[];

        constructor(poiType: PoiType, metadata: IMetadata) {
            this._metadata = metadata;
            this.isOn = ko.observable(true);
            this.type = poiType;

            this.categoryFilter = new MultiValueFilterViewModel({ n: "Categories", i: "" });
            this._pois = [];
        }

        public updatePoisVisibility():void{

        }

        public initWithPoi(poi: IPoi): void {
            
            var categoryValues = poi.c;
            for (var i = 0; i < categoryValues.length; i++) {
                var category = this._metadata.c[categoryValues[i]];
                var valueMetadata: IPoiPropertyValueMetadata = { id: category.id, n: category.n };
                this.categoryFilter.addValue(valueMetadata);
            }


            // add property
            for (var prop in poi.pp) {
                if (!this.propertyEnablementLookup[prop]) {
                    var propertyFilterViewModel = new MultiValueFilterViewModel(this._metadata.ppm[prop]);
                    this.propertyEnablementLookup[prop] = propertyFilterViewModel;
                    this.propertyList.push(propertyFilterViewModel);
                }

                this.propertyEnablementLookup[prop].addValue(this._metadata.ppm[prop].v[poi.pp[prop]]);
            }
        }

        public type: PoiType;
        public isOn: KnockoutObservable<boolean>;
        public categoryFilter: MultiValueFilterViewModel;
        public propertyEnablementLookup: { [id: string]: MultiValueFilterViewModel };
        public propertyList: MultiValueFilterViewModel[];

        public getCategoriesEnablement(): { [id: number]: boolean }{
            return this.categoryFilter.getValuesEnablement();
        }

        public setCategoriesEnablement(enablement: { [id: number]: boolean }): void {
            this.categoryFilter.setValuesEnablement(enablement);
        }

        public getPropertiesEnablement(): {[id:string]:{ [id: number]: boolean }} {
            var propertiesEnablement: { [id: string]: { [id: number]: boolean } } = {};
            $.each(this.propertyList, (i, item) => propertiesEnablement[item.id] = item.getValuesEnablement());
            return propertiesEnablement;
        }

        public setPropertiesEnablement(enablement: { [id: string]: { [id: number]: boolean } }): void {
            $.each(this.propertyList, (i, item) => item.setValuesEnablement(enablement[item.id]));
        }

        public resetTempCount(): void {
            this.categoryFilter.resetTempCount();
            $.each(this.propertyList, (i, item) => item.resetTempCount());
        }

        public applyTempCount(): void {
            this.categoryFilter.applyTempCount();
            $.each(this.propertyList, (i, item) => item.applyTempCount());
        }

        public incrementTempCountForPoi(poi: IPoi) {
            this.categoryFilter.incrementTempCount(poi.c);
            for (var prop in poi.pp) {
                if (this.propertyEnablementLookup[prop]) {
                    var values: number[] = <number[]>poi.pp[prop];
                    this.propertyEnablementLookup[prop].incrementTempCount(values);
                }
            }
        }
    }

    export class MultiValueFilterViewModel {

        constructor(p: IPoiPropertyMetadata) {
            this.valueEnablementLookup = {};
            this.valueList = [];
            this.name = p.n;
            this.iconId = p.i;
            this.id = p.id;
        }

        public addValue(pv: IPoiPropertyValueMetadata) {
            if (!this.valueEnablementLookup[pv.id]) {
                var valueFilterViewModel = new ValueFilterViewModel(pv.id, pv.n);
                this.valueEnablementLookup[pv.id] = valueFilterViewModel;
                this.valueList.push(valueFilterViewModel);
            }
        }

        public id: string;
        public name: string;
        public iconId: string;
        public allValuesSelected: KnockoutObservable<boolean> = ko.observable(false);
        public valueEnablementLookup: { [id: number]: ValueFilterViewModel };
        public valueList: ValueFilterViewModel[];

        public getValuesEnablement(): { [id: number]: boolean } {
            var valuesEnablement: { [id: number]: boolean } = {};
            $.each(this.valueList, (i, item) => valuesEnablement[item.id] = item.isOn());
            return valuesEnablement;
        }

        public setValuesEnablement(enablement: { [id: number]: boolean }): void {
            $.each(this.valueList, (i, item) => item.isOn(enablement[item.id]));
        }

        public selectAll(): void {
            $.each(this.valueList, (i, item) => item.isOn(true));
            this.allValuesSelected(true);
        }
        public unselectAll(): void {
            $.each(this.valueList, (i, item) => item.isOn(false));
            this.allValuesSelected(false);
        }

        public resetTempCount(): void {
            $.each(this.valueList, (i, item) => item.tempCount = 0);
        }

        public applyTempCount(): void {
            $.each(this.valueList, (i, item) => item.count(item.tempCount));
        }

        public incrementTempCount(propertyValues: number[]): void {
            $.each(this.valueList, (i, item) => {
                if (propertyValues.indexOf(item.id) > -1) {
                    item.tempCount++;
                }
            });
        }
    }

    export class ValueFilterViewModel {
        constructor(id: number, name:string) {
            this.id = id;
            this.isOn = ko.observable(true);
            this.count = ko.observable(0);
            this.tempCount = 0;
            this.name = name;
        }

        public id: number;
        public isOn: KnockoutObservable<boolean>;
        public count: KnockoutObservable<number>;
        public tempCount: number;
        public name: string;
    }
}