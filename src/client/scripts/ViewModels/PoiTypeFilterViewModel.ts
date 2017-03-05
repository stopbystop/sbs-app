/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>

"use strict";

module StopByStop {
    export class PoiTypeFilterViewModel {
        private _metadata: IMetadata;
        private _pois: IPoiOnJunction[];
        private _maxDistanceFromJunction: number;
        private _filter: FilterViewModel;
        private _tempCount: number;

        constructor(poiType: PoiType, metadata: IMetadata, filter: FilterViewModel) {
            this._metadata = metadata;
            this.categoryName = metadata.rpc[PoiType[poiType]].n;
            this.isOn = ko.observable(true);
            this.type = poiType;

            this.categoryFilter = new MultiValueFilterViewModel({ n: "Categories", id: "categories" }, this);
            this.propertyEnablementLookup = {};
            this.propertyList = [];
            this._pois = [];
            this.filteredCount = ko.observable<number>(0);
            this._maxDistanceFromJunction = 3;
            this._filter = filter;

            this.isOn.subscribe((newValue) => this.updatePoisVisibility());
        }

        public updatePoisVisibility(maxDistanceFromJunction?: number, notifyParentFilter: boolean = true): void {
            this._maxDistanceFromJunction = maxDistanceFromJunction || this._maxDistanceFromJunction;

            $.each(this._pois, (i, poi) => {

                var v = this.isOn();

                if (v) {
                    if (poi.dfj > maxDistanceFromJunction) {
                        v = false;
                    } else if (!this.categoryFilter.isOn(poi.p.c)) {
                        v = false;
                    } else {
                        $.each(this.propertyList, (i2, prop) => {
                            if (!prop.isOn(<number[]>poi.p.pp[prop.id])) {
                                v = false;
                            }
                        });
                    }
                }

                poi.v = v;
            });

            if (notifyParentFilter) {
                this._filter.onFilterUpdated();
            }
        }

        public initWithPoi(poiOnJuntion: IPoiOnJunction): void {
            this._pois.push(poiOnJuntion);

            var poi = poiOnJuntion.p;
            var categoryMetadata = this._metadata.rpc[PoiType[this.type]];
            if (categoryMetadata.scf) {
                var categoryValues = poi.c;
                for (var i = 0; i < categoryValues.length; i++) {
                    var category = this._metadata.c[categoryValues[i]];
                    if (category.id !== categoryMetadata.c) {
                        var valueMetadata: IPoiPropertyValueMetadata = { id: category.id, n: category.n };
                        var categoryValue = this.categoryFilter.addValue(valueMetadata);
                        categoryValue.tempCount++;
                    }
                }
            }


            // add property
            for (var prop in poi.pp) {
                // is it a property described in metadata?
                if (this._metadata.ppm[prop]) {
                    if (!this.propertyEnablementLookup[prop]) {
                        var propertyFilterViewModel = new MultiValueFilterViewModel(this._metadata.ppm[prop], this);
                        this.propertyEnablementLookup[prop] = propertyFilterViewModel;
                        this.propertyList.push(propertyFilterViewModel);
                    }
                    $.each(poi.pp[prop], (i, propertyValue) => {
                        var valueViewModel = this.propertyEnablementLookup[prop].addValue(this._metadata.ppm[prop].v[propertyValue]);
                        valueViewModel.tempCount++;
                    });
                }
            }
        }

        public sortValuesByOccurrence(): void {
            this.categoryFilter.sortByOccurrence();
            $.each(this.propertyList, (i, item) => item.sortByOccurrence());
        }

      

        public categoryName: string;
        public type: PoiType;
        public filteredCount: KnockoutObservable<number>;
        public isOn: KnockoutObservable<boolean>;
        public categoryFilter: MultiValueFilterViewModel;
        public propertyEnablementLookup: { [id: string]: MultiValueFilterViewModel };
        public propertyList: MultiValueFilterViewModel[];

        public getCategoriesEnablement(): { [id: number]: boolean } {
            return this.categoryFilter.getValuesEnablement();
        }

        public setCategoriesEnablement(enablement: { [id: number]: boolean }): void {
            this.categoryFilter.setValuesEnablement(enablement);
        }

        public getPropertiesEnablement(): { [id: string]: { [id: number]: boolean } } {
            var propertiesEnablement: { [id: string]: { [id: number]: boolean } } = {};
            $.each(this.propertyList, (i, item) => propertiesEnablement[item.id] = item.getValuesEnablement());
            return propertiesEnablement;
        }

        public setPropertiesEnablement(enablement: { [id: string]: { [id: number]: boolean } }): void {
            $.each(this.propertyList, (i, item) => item.setValuesEnablement(enablement[item.id]));
        }

        public resetTempCount(): void {
            this._tempCount = 0;
            this.categoryFilter.resetTempCount();
            $.each(this.propertyList, (i, item) => item.resetTempCount());
        }

        public applyTempCount(): void {
            this.filteredCount(this._tempCount);
            this.categoryFilter.applyTempCount();
            $.each(this.propertyList, (i, item) => item.applyTempCount());
        }

        public incrementTempCountForPoi(poi: IPoi) {
            this._tempCount++;
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
        private _filter: PoiTypeFilterViewModel;

        constructor(p: IPoiPropertyMetadata, filter: PoiTypeFilterViewModel) {
            this.valueEnablementLookup = {};
            this.valueList = [];
            this.name = p.n;
            this.id = p.id;
            this._filter = filter;
        }

        public addValue(pv: IPoiPropertyValueMetadata): ValueFilterViewModel {
            if (!this.valueEnablementLookup[pv.id]) {
                var valueFilterViewModel = new ValueFilterViewModel(pv.id, pv.n, this, this._filter);
                this.valueEnablementLookup[pv.id] = valueFilterViewModel;
                this.valueList.push(valueFilterViewModel);
            }

            return this.valueEnablementLookup[pv.id];
        }

        public sortByOccurrence(): void {
            this.valueList.sort((a, b) => b.tempCount - a.tempCount);
        }

        public id: string;
        public name: string;
        public allValuesSelected: KnockoutObservable<boolean> = ko.observable(false);
        public valueEnablementLookup: { [id: number]: ValueFilterViewModel };
        public valueList: ValueFilterViewModel[];

        public isOn(values: number[]): boolean {
            var on: boolean = false;

            $.each(values, (i, val) => {
                if (this.valueEnablementLookup[val].isOn()) {
                    on = true;
                }
            });

            return on;
        }

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

        private _filter: PoiTypeFilterViewModel;

        constructor(id: number, name: string, parentCategory: MultiValueFilterViewModel, filterViewModel: PoiTypeFilterViewModel) {
            this.parentCategory = parentCategory;
            this.id = id;
            this.isOn = ko.observable(true);
            this.count = ko.observable(0);
            this.tempCount = 0;
            this.name = name;
            this._filter = filterViewModel;

            this.isOn.subscribe((newValue) => {
                this._filter.updatePoisVisibility();
            })
        }

        public parentCategory: MultiValueFilterViewModel;
        public id: number;
        public isOn: KnockoutObservable<boolean>;
        public count: KnockoutObservable<number>;
        public tempCount: number;
        public name: string;
    }
}