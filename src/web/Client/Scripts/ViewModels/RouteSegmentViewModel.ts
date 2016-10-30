/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="../Utils.ts"/>

"use strict";
module StopByStop {
    export class RouteSegmentViewModel {
        private static SEGMENT_INITIAL_SPACE = 7;
        private static SPACE_FOR_JUNCTION = 8;

        private _obj: IRouteSegment;
        private _app: IAppViewModel;

        constructor(obj: IRouteSegment, routeStartTime: Date, app: IAppViewModel) {
            this._obj = obj;
            this._app = app;

            this.highwayNameText = ko.observable("");

            if (this._obj.r) {
                this.highwayNameText(this._obj.r);
                if (this._obj.hn && this._obj.hn !== this._obj.r) {
                    this.highwayNameText(this._obj.r + " - " + this._obj.hn);
                }
            }
            else {
                if (this._obj.hn) {
                    this.highwayNameText(this._obj.hn);
                } else {
                    /* this was setting it to "unnamed highway" before */
                    this.highwayNameText("");
                }
            }

            this.start = ko.observable(new LocationViewModel(this._obj.s));
            this.end = ko.observable(new LocationViewModel(this._obj.e));
            this.distance = ko.observable(this._obj.d);
            this.routeJunctions = [];

            if (this._obj.j) {
                for (var i = 0; i < this._obj.j.length; i++) {
                    var routeJunctionViewModel = new RouteJunctionViewModel(this._obj.j[i], routeStartTime, this._app);
                    this._app.routePlan.junctionMap[routeJunctionViewModel.junction.osmid.toString()] = routeJunctionViewModel;
                    this.routeJunctions.push(routeJunctionViewModel);
                }
            }

            this.routeVisibleJunctions = ko.observableArray([]);
            this.portionCompleted = ko.observable(this._obj.pc);
            this.startIndex = ko.observable(this._obj.si);
            this.endIndex = ko.observable(this._obj.ei);


            this.height = ko.computed(() => {
                return (this.routeVisibleJunctions().length *
                    RouteSegmentViewModel.SPACE_FOR_JUNCTION +
                    RouteSegmentViewModel.SEGMENT_INITIAL_SPACE).toString() + "em";
            });

            this.distanceText = ko.computed(() => {
                return Utils.getMileString(this.distance());
            });

            this.maneuver = this._obj.m;
            this.instructions = this._obj.i || "";
            this.instructionsTip = this.instructions.replace(/(<([^>]+)>)/ig, "");
            

            this.layoutJunctions();
        }



        public highwayName: KnockoutObservable<string>;
        public ref: KnockoutObservable<string>;
        public start: KnockoutObservable<LocationViewModel>;
        public end: KnockoutObservable<LocationViewModel>;
        public distance: KnockoutObservable<number>;
        public routeJunctions: RouteJunctionViewModel[];
        public routeVisibleJunctions: KnockoutObservableArray<RouteJunctionViewModel>;
        public portionCompleted: KnockoutObservable<number>;
        public startIndex: KnockoutObservable<number>;
        public endIndex: KnockoutObservable<number>;
        public height: KnockoutComputed<string>;
        public distanceText: KnockoutComputed<string>;
        public highwayNameText: KnockoutObservable<string>;
        public maneuver: string;
        public instructions: string;
        public instructionsTip: string;

        public applyFilter(filter: FilterViewModel): void {
            this.layoutJunctions(filter);
        }

        private layoutJunctions(filter: FilterViewModel = null): void {
            this.routeVisibleJunctions.removeAll();
            var visibleJunctionIndex = 0;
            for (var i = 0; i < this.routeJunctions.length; i++) {
                var junction = this.routeJunctions[i];

                if (filter) {
                    junction.applyFilter(filter);
                }

                if (junction.visible()) {
                    this.routeVisibleJunctions.push(junction);
                    junction.top((RouteSegmentViewModel.SEGMENT_INITIAL_SPACE + visibleJunctionIndex
                        * RouteSegmentViewModel.SPACE_FOR_JUNCTION).toString() + "em");
                    visibleJunctionIndex++;
                }
            }
        }
    }
}