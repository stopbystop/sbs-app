﻿/// <reference path="../tsdef/jquery.d.ts"/>
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
            this.rootCategory = metadata.rpc[PoiType[poiType]];
            this.categoryName = this.rootCategory.n;
            this.typeName = PoiType[poiType].toLowerCase();
            this.isOn = ko.observable(true);
            this.type = poiType;

            this.categoryFilter = new MultiValueFilterViewModel({ n: "Categories", id: "categories" }, this);
            this.propertyEnablementLookup = {};
            this.propertyList = [];
            this._pois = [];
            this.filteredCount = ko.observable<number>(0);
            this.filteredCountWithFeatures = ko.observable<number>(0);

            this._maxDistanceFromJunction = 3;
            this._filter = filter;

            this.isOn.subscribe((newValue) => this.updatePoisVisibility());
        }

        public updatePoisVisibility(maxDistanceFromJunction?: number, notifyParentFilter: boolean = true): void {
            this._maxDistanceFromJunction = maxDistanceFromJunction || this._maxDistanceFromJunction;

            var filteredWithFeatures = 0;
            $.each(this._pois, (i, poi) => {

                var v = this.isOn();

                if (v) {
                    if (poi.dfj > this._maxDistanceFromJunction) {
                        v = false;
                    } else if (this.rootCategory.scf && !this.categoryFilter.isOn(poi.p.c)) {
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
                if (v) {
                    filteredWithFeatures++;
                }
            });

            this.filteredCountWithFeatures(filteredWithFeatures);

            if (notifyParentFilter) {
                this._filter.onFilterUpdated();
            }
        }

        public initWithPoi(poiOnJuntion: IPoiOnJunction): void {
            this._pois.push(poiOnJuntion);

            var poi = poiOnJuntion.p;

            if (this.rootCategory.scf) {
                var categoryValues = poi.c;
                for (var i = 0; i < categoryValues.length; i++) {
                    var category = this._metadata.c[categoryValues[i]];
                    var categoryName = (category.id === this.rootCategory.c) ? "All other" : category.n;

                    var valueMetadata: IPoiPropertyValueMetadata = { id: category.id, n: categoryName };
                    var categoryValue = this.categoryFilter.addValue(valueMetadata);
                    categoryValue.tempCount++;

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
            $.each(this.propertyList, (i, item) => { item.sortByOccurrence(); });
        }


        public typeName: string;
        public rootCategory: IRootPoiCategory;
        public categoryName: string;
        public type: PoiType;
        public filteredCount: KnockoutObservable<number>;
        public filteredCountWithFeatures: KnockoutObservable<number>;
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
            $.each(this.propertyList, (i, item) => { propertiesEnablement[item.id] = item.getValuesEnablement(); });
            return propertiesEnablement;
        }

        public setPropertiesEnablement(enablement: { [id: string]: { [id: number]: boolean } }): void {
            $.each(this.propertyList, (i, item) => { item.setValuesEnablement(enablement[item.id]); });
        }

        public resetTempCount(): void {
            this._tempCount = 0;
            this.categoryFilter.resetTempCount();
            $.each(this.propertyList, (i, item) => { item.resetTempCount(); });
        }

        public applyTempCount(): void {
            this.filteredCount(this._tempCount);
            this.categoryFilter.applyTempCount();
            $.each(this.propertyList, (i, item) => { item.applyTempCount(); });
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
        

        constructor(p: IPoiPropertyMetadata, filter: PoiTypeFilterViewModel) {
            this.valueEnablementLookup = {};
            this.valueList = [];
            this.name = p.n;
            this.id = p.id;
            this.filter = filter;
        }

        public addValue(pv: IPoiPropertyValueMetadata): ValueFilterViewModel {
            if (!this.valueEnablementLookup[pv.id]) {
                var valueFilterViewModel = new ValueFilterViewModel(pv.id, pv.n, this, this.filter);
                this.valueEnablementLookup[pv.id] = valueFilterViewModel;
                this.valueList.push(valueFilterViewModel);
            }

            return this.valueEnablementLookup[pv.id];
        }

        public sortByOccurrence(): void {
            this.valueList.sort((a, b) => b.tempCount - a.tempCount);
        }

        public filter: PoiTypeFilterViewModel;
        public id: string;
        public name: string;
        public isCollapsed: KnockoutObservable<boolean> = ko.observable(true);
        public valueEnablementLookup: { [id: number]: ValueFilterViewModel };
        public valueList: ValueFilterViewModel[];

        public expand(): void {
            this.isCollapsed(false);
        }

        public collapse(): void {
            this.isCollapsed(true);
        }

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
            $.each(this.valueList, (i, item) => {
                valuesEnablement[item.id] = item.isOn();
            });
            return valuesEnablement;
        }

        public setValuesEnablement(enablement: { [id: number]: boolean }): void {
            $.each(this.valueList, (i, item) => {
                item.isOn(enablement[item.id]);
            });
        }

        public selectAll(): void {
            
            $.each(this.valueList, (i, item) => {
                item.processingBulkUpdate = true;
                try {
                    item.isOn(true);
                }
                finally {
                    item.processingBulkUpdate = false;
                }
            });

            this.filter.updatePoisVisibility();
        }

        public unselectAll(): void {

            $.each(this.valueList, (i, item) => {
                item.processingBulkUpdate = true;
                try {
                    item.isOn(false);
                }
                finally {
                    item.processingBulkUpdate = false;
                }
            });

            this.filter.updatePoisVisibility();
        }

        public resetTempCount(): void {
            $.each(this.valueList, (i, item) => { item.tempCount = 0; });
        }

        public applyTempCount(): void {
            $.each(this.valueList, (i, item) => { item.count(item.tempCount); });
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
            this.processingBulkUpdate = false;

            this.isOn.subscribe((newValue) => {
                if (!this.processingBulkUpdate) {
                    this._filter.updatePoisVisibility();
                }
            })
        }

        public parentCategory: MultiValueFilterViewModel;
        public id: number;
        public isOn: KnockoutObservable<boolean>;
        public count: KnockoutObservable<number>;
        public tempCount: number;
        public name: string;
        public processingBulkUpdate: boolean;
    }
}