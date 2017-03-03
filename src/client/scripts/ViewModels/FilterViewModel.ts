/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/jquerymobile.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>
/// <reference path="PoiCategoryViewModel.ts"/>
/// <reference path="PoiTypeFilterViewModel.ts"/>

"use strict";
module StopByStop {
    export interface ICategoryEnablement {
        category: PoiCategoryViewModel;
        count: KnockoutObservable<number>;
        visible: KnockoutObservable<boolean>;
        tempCount: number;
    };

    export class FilterViewModel {
        private routeJunctions: IRouteJunction[];
        public routeId: string;
        public typeFilters: PoiTypeFilterViewModel[];


        // this setting is necessary because for Exit page we are not preserving showRestaurants and showGasStations to storage, while for route page we are
        public preserveShowAllSettings: boolean;

        constructor(routeId: string, rjs: IRouteJunction[], preserveShowAllSettings: boolean = true) {
            this.routeId = routeId;
            this.routeJunctions = rjs;
            this.preserveShowAllSettings = preserveShowAllSettings;
            this.categoriesEnablement = ko.observableArray([]);

            //go through all pois to decide what to include in filters



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

            this.update();
            this.maxDistanceFromJunction.subscribe((newValue) => this.update());
        }


        public showGasStations: KnockoutObservable<boolean>;
        public showRestaurants: KnockoutObservable<boolean>;
        public categoriesEnablement: KnockoutObservableArray<ICategoryEnablement>;
        public maxDistanceFromJunction: KnockoutObservable<string>;

        public maxDistanceFromJunctionIs1: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs2: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs3: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs4: KnockoutObservable<boolean>;
        public maxDistanceFromJunctionIs5: KnockoutObservable<boolean>;

        private update() {

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
                    tempCount: 0,
                    visible: ko.observable(true)
                };
            return categoryEnablement;
        };
    }
}