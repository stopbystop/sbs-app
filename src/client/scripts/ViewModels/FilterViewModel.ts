/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="PoiCategoryViewModel.ts"/>

"use strict";
module StopByStop {
    export interface ICategoryEnablement {
        category: PoiCategoryViewModel;
        count: KnockoutObservable<number>;
        visible: KnockoutObservable<boolean>;
        tempCount: number;
    };

    class FilterCacheManager {
        private itemKey: string = "sbsfilters";
        private storage: Storage = sessionStorage;
        private data: { d: string; g: boolean; r: boolean; drc: string[]; } = {
            d: "3", g: true, r: true, drc: []
        };

        constructor(filterViewModel: FilterViewModel) {
            this.itemKey = this.itemKey + filterViewModel.routeId;

            var dataString = this.storage.getItem(this.itemKey);
            if (dataString) {
                try {
                    this.data = JSON.parse(dataString);
                }
                catch (ex) {
                    Telemetry.trackError(new Error(ex.toString()));
                }
            }

            filterViewModel.maxDistanceFromJunction(this.data.d);
            var mdarr = [
                [filterViewModel.maxDistanceFromJunctionIs1, "1"],
                [filterViewModel.maxDistanceFromJunctionIs2, "2"],
                [filterViewModel.maxDistanceFromJunctionIs3, "3"],
                [filterViewModel.maxDistanceFromJunctionIs4, "4"],
                [filterViewModel.maxDistanceFromJunctionIs5, "5"]
            ];

            for (var i = 0; i < mdarr.length; i++) {
                (<KnockoutObservable<boolean>>mdarr[i][0])(mdarr[i][1] === this.data.d);
            }


            filterViewModel.maxDistanceFromJunction.subscribe((newValue: string) => {
                this.data.d = newValue;
                this.saveData();


                Telemetry.trackEvent(TelemetryEvent.FilterMaxDistanceFromJunctionChanged);
            });

            filterViewModel.showGasStations(this.data.g);
            filterViewModel.showRestaurants(this.data.r);

            if (filterViewModel.preserveShowAllSettings) {
                filterViewModel.showGasStations.subscribe((newValue: boolean) => {
                    this.data.g = newValue;
                    this.saveData();
                    if (AppState.current.pageInfo.pageName !== StopByStop.PAGENAME_POIGroup) {
                        Telemetry.trackEvent(TelemetryEvent.FilterShowGasStationsChanged, [{ k: TelemetryProperty.FilterVisibility, v: newValue.toString() }]);
                    }
                });


                filterViewModel.showRestaurants.subscribe((newValue: boolean) => {
                    this.data.r = newValue;
                    this.saveData();

                    if (AppState.current.pageInfo.pageName !== StopByStop.PAGENAME_POIGroup) {
                        Telemetry.trackEvent(TelemetryEvent.FilterShowRestaurantsChanged, [{ k: TelemetryProperty.FilterVisibility, v: newValue.toString() }]);
                    }
                });
            }

            $.each(filterViewModel.foodCategoriesEnablement(), (indexInArray: number, valueOfElement: ICategoryEnablement) => {
                var category = valueOfElement;
                if (this.data.drc.indexOf(valueOfElement.category.sbsid) > -1) {
                    category.visible(false);
                }

                category.visible.subscribe((newValue: boolean) => {
                    var catId = category.category.sbsid;
                    var i = this.data.drc.indexOf(catId);
                    if (newValue) {
                        if (i > -1) {
                            this.data.drc.splice(i, 1);
                            this.saveData();
                        }
                    } else {
                        if (i < 0) {
                            this.data.drc.push(catId);
                            this.saveData();
                        }
                    }
                });
            });
        }

        private saveData(): void {
            this.storage.setItem(this.itemKey, JSON.stringify(this.data));
        }
    }

    export class FilterViewModel {
        private allCategories: { [id: string]: PoiCategoryViewModel } = {};
        private filterCacheManager: FilterCacheManager;
        private routeJunctions: IRouteJunction[];

        public routeId: string;


        public foodCategoriesEnablementLookup: { [id: string]: ICategoryEnablement } = {};

        // this setting is necessary because for Exit page we are not preserving showRestaurants and showGasStations to storage, while for route page we are
        public preserveShowAllSettings: boolean;

        constructor(routeId: string, rjs: IRouteJunction[], foodPoiCategoryOccurrences: IPoiCategoryOccurrence[], topLevelFoodCategories: string[], preserveShowAllSettings: boolean = true) {
            this.routeId = routeId;
            this.routeJunctions = rjs;
            this.preserveShowAllSettings = preserveShowAllSettings;

            this.showGasStations = ko.observable(true);
            this.showRestaurants = ko.observable(true);


            this.foodCategoriesEnablement = ko.observableArray([]);
            

            foodPoiCategoryOccurrences.sort((a, b) => b.c - a.c);
            for (var i = 0; i < foodPoiCategoryOccurrences.length; i++) {
                var categoryOccurrence = foodPoiCategoryOccurrences[i];
                var categoryViewModel = new PoiCategoryViewModel(categoryOccurrence.cat);
                this.allCategories[categoryViewModel.sbsid] = categoryViewModel;

                // if this category is in the list of top level categories, put it in the list of filters popup
                if (topLevelFoodCategories.indexOf(categoryViewModel.sbsid) > -1) {
                    var categoryEnablement = this.createCategoryEnablement(categoryOccurrence);
                    this.foodCategoriesEnablement.push(categoryEnablement);
                    this.foodCategoriesEnablementLookup[categoryEnablement.category.sbsid] = categoryEnablement;
                }
            }



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

            this.filteredFoodCount = ko.observable(1);
            this.filteredGasStationCount = ko.observable(1);

            // load filters for cache for Web App
            // TBD SPA
            if (AppState.current.app === SBSApp.Web) {
                this.filterCacheManager = new FilterCacheManager(this);
            }


            var self = this;

            this.selectAllFoodCategories = () => {               
                $.each(this.foodCategoriesEnablement(), (i, item) => item.visible(true));
                this.allRestaurantCategoriesSelected(true);
            };

            this.unselectAllFoodCategories = () => {
                $.each(this.foodCategoriesEnablement(), (i, item) => item.visible(false));
                this.allRestaurantCategoriesSelected(false);
            };

            this.updateFilteredCounts();
            this.maxDistanceFromJunction.subscribe((newValue) => this.updateFilteredCounts());
        }


        public showGasStations: KnockoutObservable<boolean>;
        public showRestaurants: KnockoutObservable<boolean>;
        public foodCategoriesEnablement: KnockoutObservableArray<ICategoryEnablement>;
        public maxDistanceFromJunction: KnockoutObservable<string>;

        public maxDistanceFromJunctionIs1: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs2: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs3: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs4: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs5: KnockoutObservable<boolean>;
        public filteredGasStationCount: KnockoutObservable<number>;
        public filteredFoodCount: KnockoutObservable<number>;

        public allRestaurantCategoriesSelected: KnockoutObservable<boolean> = ko.observable(false);

        public selectAllFoodCategories(): void { }
        public unselectAllFoodCategories(): void { }

        public getCategoryName(sbsid: string): string {
            if (this.allCategories[sbsid]) {
                return this.allCategories[sbsid].name;
            }

            return "";
        };

        public isFoodCategoryVisible(sbsid: string): boolean {
            if (this.foodCategoriesEnablementLookup[sbsid]) {
                return this.foodCategoriesEnablementLookup[sbsid].visible();
            }

            if (this.allCategories[sbsid] && this.allCategories[sbsid].parentIDs.length > 0) {
                for (var i = 0; i < this.allCategories[sbsid].parentIDs.length; i++) {
                    var isParentVisible = this.isFoodCategoryVisible(this.allCategories[sbsid].parentIDs[i]);
                    if (isParentVisible) {
                        return true;
                    }
                }
                // this category has parents and all of them are hidden
                return false;
            }
            else {
                // this category is not in allCategories list or it has no parents (top level category)
                // if we reached top level category it means we haven't accounted for it in our filtering
                return true;
            }
        }

        private updateFilteredCounts() {
            var fCount: number = 0;
            var gsCount: number = 0;
            var distance = parseInt(this.maxDistanceFromJunction());

            $.each(this.foodCategoriesEnablement(), (i, item) => item.tempCount = 0);

            for (var i = 0; i < this.routeJunctions.length; i++) {
                var rj = this.routeJunctions[i];
                for (var j = 0; j < rj.j.p.length; j++) {
                    var poiOnJunction = rj.j.p[j];
                    if (poiOnJunction.dfj <= distance) {
                        if (poiOnJunction.p.pt === PoiType.Food) {
                            fCount++;
                            $.each(poiOnJunction.p.c, (i, categoryId) => {
                                if (this.foodCategoriesEnablementLookup[categoryId]) {
                                    this.foodCategoriesEnablementLookup[categoryId].tempCount++;
                                }
                            });


                        } else if (poiOnJunction.p.pt === PoiType.Gas) {
                            gsCount++;
                        }
                    }
                }
            }

            $.each(this.foodCategoriesEnablement(), (i, item) => {
                
                item.count(item.tempCount);
            });

            this.foodCategoriesEnablement.sort((a, b) => b.count() - a.count());

            this.filteredFoodCount(fCount);
            this.filteredGasStationCount(gsCount);

        };

        private createCategoryEnablement(categoryOccurrence: IPoiCategoryOccurrence): ICategoryEnablement {
            var categoryEnablement: ICategoryEnablement =
                {
                    category: new PoiCategoryViewModel(categoryOccurrence.cat),
                    count: ko.observable(categoryOccurrence.c),
                    tempCount:0,
                    visible: ko.observable(true)
                };
            return categoryEnablement;
        };
    }
}