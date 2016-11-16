/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

/// <reference path="LocationViewModel.ts"/>
/// <reference path="RouteSegmentViewModel.ts" />
/// <reference path="FilterViewModel.ts" />
/// <reference path="SideBarViewModel.ts" />

"use strict";
module StopByStop {
    export class RouteViewModel {
        private _route: IRoute;
        private _app: IAppViewModel;
        private _routeStartTime: Date;
        private _stopDurationSubscriptions: KnockoutSubscription[] = [];
        private _routeInitializationComplete: () => void;
        private _filter: FilterViewModel;
        private _junctionElementCount: number = 0;
        private _subscribedForBoundElement: boolean = false;

        public routeJunctionElementLookup: { [id: string]: { top: number } } = {};
        public roadLineHeight: KnockoutObservable<number> = ko.observable(0);


        constructor(route: IRoute, app: IAppViewModel, filter: FilterViewModel, initSettings: IAppState, routeInitializationComplete: () => void) {
            this._route = this.route = route;
            this._app = app;
            this._routeInitializationComplete = routeInitializationComplete;
            this._filter = filter;


            this.sideBar = new SideBarViewModel(app.routePlan, this, initSettings);
            this.fromLocation = new LocationViewModel(this._route.fl);
            this.toLocation = new LocationViewModel(this._route.tl);


            this.currentLocation = ko.observable(new LocationViewModel(this._route.cl));
            this._routeStartTime = new Date();

            this.startTimeString = ko.observable(Utils.getTimeString(this._routeStartTime));
            this.etaString = ko.observable(Utils.getTimeString(this._routeStartTime, this._route.t * 1000));
            this.routeId = this._route.rid;
            this.distance = this._route.d;

            if (this.fromLocation.placeDescription.indexOf("Start location (") === 0) {
                this.fromLocation.placeDescription = "Your location";
            }

            this.title = this.fromLocation.placeDescription + " to " + this.toLocation.placeDescription;

            var exitCount = 0;
            $.each(route.s, (i, v: IRouteSegment) => exitCount += v.j.length);

            this.description =
                "Traveling by car from "
                + this.fromLocation.placeDescription.toString()
                + " to "
                + this.toLocation.placeDescription.toString()
                + " and looking for best place to stop for food or gas? This route is "
                + this.distance.toString()
                + " miles and has "
                + exitCount.toString()
                + " exits.Check this out. ";

            this.shortDescription = "Distance " + this.distance.toString() + ". " + exitCount.toString() + " exits";

            this.routeSegments = ko.observableArray([]);

            this.createSegmentFirstTime(0);

            this.boundElement = ko.observable(null);


            this.boundElement.subscribe((newElement: Element) => {
                if (newElement && !this._subscribedForBoundElement) {
                    this._subscribedForBoundElement = true;

                    this.recalcRoadLine(newElement);

                    Utils.observeDOM(newElement, () => {
                        this.recalcRoadLine(newElement);
                    });
                }
            });
        }

       

        public recalcRoadLine(roadLineElement: Element): void {
           

            var junctionElements = $(roadLineElement).find(".junction-wrapper");
            var junctionCount = junctionElements.length;
            var lastJunctionTop = "";
            var newRoadLineHeight = $(this.boundElement()).height();


            // recalculate positions if roadline height changes or if junction count changes
            // no point recalculating if roadLineHeight is 0
            if (newRoadLineHeight !== 0 && (junctionCount !== this._junctionElementCount || this.roadLineHeight() !== newRoadLineHeight)) {
                this.roadLineHeight(newRoadLineHeight);     
                this._junctionElementCount = junctionCount;

                this.routeJunctionElementLookup = {};
                
                junctionElements.each((index: number, elem: Element) => {
                    lastJunctionTop = $(roadLineElement).offset().top.toString();
                    this.routeJunctionElementLookup[elem.getAttribute("osmid")] = { top: $(elem).offset().top - $(roadLineElement).offset().top };
                });

                // Telemetry.logToConsole("recaldRoadLine: " + this.roadLineHeight() + ". last junction top: " + lastJunctionTop);
            }        
        }



        public route: IRoute;
        public fromLocation: LocationViewModel;
        public toLocation: LocationViewModel;
        public currentLocation: KnockoutObservable<LocationViewModel>;
        public routeSegments: KnockoutObservableArray<RouteSegmentViewModel>;
        public routeId: string;
        public title: string;
        public description: string;
        public shortDescription: string;
        public distance: number;
        public etaString: KnockoutObservable<string>;
        public startTimeString: KnockoutObservable<string>;

        public sideBar: SideBarViewModel;
        public routeHeightPx: KnockoutObservable<number> = ko.observable(0);
        public boundElement: KnockoutObservable<Element> = ko.observable(null);

        public applyFilter(filter: FilterViewModel): void {
            $.each(this.routeSegments(), (indexInArray: number, valueOfElement: RouteSegmentViewModel) => valueOfElement.applyFilter(filter));
        }

        private createSegmentFirstTime(segmentIndex: number) {

            var segmentViewModel = new RouteSegmentViewModel(this._route.s[segmentIndex], this._routeStartTime, this._app);
            segmentViewModel.applyFilter(this._filter);
            this.routeSegments.push(segmentViewModel);


            segmentIndex++;

            if (this._route.s.length > segmentIndex) {
                window.setTimeout(() => this.createSegmentFirstTime(segmentIndex), 100);
            }
            else {
                this._routeInitializationComplete();
                this.initializeEtaTimes();
            }
        }

        private initializeEtaTimes(): void {
            this.updateEtaTimes();
            this.updateStopDurationChangeSubscriptions();

            this._app.routePlan.stops.subscribe(() => {
                this.updateEtaTimes();
                this.updateStopDurationChangeSubscriptions();

            });
        }



        private updateStopDurationChangeSubscriptions(): void {
            $.each(this._stopDurationSubscriptions, (i, s: KnockoutSubscription) => {
                s.dispose();
            });

            $.each(this._app.routePlan.stops(), (i, stop: RouteStopViewModel) => {
                this._stopDurationSubscriptions.push(stop.stopDuration.subscribe(() => this.updateEtaTimes()));
            });
        }

        private updateEtaTimes(): void {
            var t = this._routeStartTime;
            var totalDelaysSoFarInMs = 0;
            for (var i = 0; i < this.routeSegments().length; i++) {
                for (var k = 0; k < this.routeSegments()[i].routeJunctions.length; k++) {
                    var routeJunction = this.routeSegments()[i].routeJunctions[k];
                    routeJunction.eta(new Date(routeJunction.etaWithoutStops.getTime() + totalDelaysSoFarInMs));
                    var delaysForThisJunctionMs = 0;

                    for (var l = 0; l < routeJunction.stops().length; l++) {
                        var stop = routeJunction.stops()[l];
                        delaysForThisJunctionMs += (stop.detourDuration() * 1000);
                        stop.exitEta(routeJunction.eta());
                    }

                    totalDelaysSoFarInMs += delaysForThisJunctionMs;
                }
            }

            this.etaString(Utils.getTimeString(this._routeStartTime, this._route.t * 1000 + totalDelaysSoFarInMs));
        }
    }
}