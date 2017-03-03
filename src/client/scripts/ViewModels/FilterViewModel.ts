/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="PoiCategoryViewModel.ts"/>
/// <reference path="PoiTypeFilterViewModel.ts"/>

"use strict";

module StopByStop {

    export class FilterViewModel {
        private routeJunctions: IRouteJunction[];

        public routeId: string;
        public typeFiltersList: PoiTypeFilterViewModel[];
        public typeFiltersLookup: {[id:number]: PoiTypeFilterViewModel};


        // this setting is necessary because for Exit page we are not preserving showRestaurants and showGasStations to storage, while for route page we are
        public preserveShowAllSettings: boolean;

        constructor(routeId: string, rjs: IRouteJunction[], metadata: IMetadata, preserveShowAllSettings: boolean = true) {
            this.routeId = routeId;
            this.routeJunctions = rjs;
            this.preserveShowAllSettings = preserveShowAllSettings;

            this.typeFiltersList = [];
            this.typeFiltersLookup = {};

            this.maxDistanceFromJunction = ko.observable("3");
            this.maxDistanceFromJunctionIs1 = ko.observable(false);
            this.maxDistanceFromJunctionIs2 = ko.observable(false);
            this.maxDistanceFromJunctionIs3 = ko.observable(true);
            this.maxDistanceFromJunctionIs4 = ko.observable(false);
            this.maxDistanceFromJunctionIs5 = ko.observable(false);

            var mdarr = [
                [this.maxDistanceFromJunctionIs1, "1"],
                [this.maxDistanceFromJunctionIs2, "2"],
                [this.maxDistanceFromJunctionIs3, "3"],
                [this.maxDistanceFromJunctionIs4, "4"],
                [this.maxDistanceFromJunctionIs5, "5"]
            ];

            for (var i = 0; i < mdarr.length; i++) {

                var selectedmdpair = mdarr[i];

                (<KnockoutObservable<boolean>>selectedmdpair[0]).subscribe((function (newValue) {
                    var pair = arguments[0];
                    var val = arguments[1];
                    if (val) {
                        this.maxDistanceFromJunction(<string>pair[1]);
                        for (var j = 0; j < mdarr.length; j++) {
                            if (mdarr[j][1] !== pair[1]) {
                                (<KnockoutObservable<boolean>>mdarr[j][0])(false);
                            }
                        }
                    }
                }).bind(this, selectedmdpair));
            }

            this.populate(metadata);
            this.updateCounts();
            this.maxDistanceFromJunction.subscribe((newValue) => this.updateCounts());
        }

        public maxDistanceFromJunction: KnockoutObservable<string>;

        public maxDistanceFromJunctionIs1: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs2: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs3: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs4: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs5: KnockoutObservable<boolean>;

        public copyEnablement(filter: FilterViewModel) {
            for (var i = 0; i < filter.typeFiltersList.length; i++) {
                var categoriesEnablement = filter.typeFiltersList[i].getCategoriesEnablement();
                var propertyEnablement = filter.typeFiltersList[i].getPropertiesEnablement();

                this.typeFiltersLookup[filter.typeFiltersList[i].type].setCategoriesEnablement(categoriesEnablement);
                this.typeFiltersLookup[filter.typeFiltersList[i].type].setPropertiesEnablement(propertyEnablement);
            }
        }

        private populate(metadata: IMetadata): void {
            $.each(this.typeFiltersList, (i, item) => item.resetTempCount());
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var rj = this.routeJunctions[i];
                for (var j = 0; j < rj.j.p.length; j++) {
                    var poiOnJunction = rj.j.p[j];

                    var poi = poiOnJunction.p;
                    if (!this.typeFiltersLookup[poi.pt]) {
                        var typeFilterViewModel = new PoiTypeFilterViewModel(poi.pt, metadata);
                        this.typeFiltersList.push(typeFilterViewModel);
                        this.typeFiltersLookup[poi.pt] = typeFilterViewModel;
                    }

                    this.typeFiltersLookup[poi.pt].addPropertiesFromPoi(poi);

                }
            }
        }



        private updateCounts():void {
            var distance = parseInt(this.maxDistanceFromJunction());
            $.each(this.typeFiltersList, (i, item) => item.resetTempCount());
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var rj = this.routeJunctions[i];
                for (var j = 0; j < rj.j.p.length; j++) {
                    var poiOnJunction = rj.j.p[j];
                    if (poiOnJunction.dfj <= distance) {
                        var poi = poiOnJunction.p;
                        this.typeFiltersLookup[poi.pt].incrementTempCountForPoi(poi);
                    }
                }
            }
        };
    }
}