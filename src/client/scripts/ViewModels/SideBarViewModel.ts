/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="../Telemetry.ts"/>

/// <reference path="LocationViewModel.ts"/>
/// <reference path="RouteSegmentViewModel.ts" />
/// <reference path="FilterViewModel.ts" />
/// <reference path="RoutePlanViewModel.ts" />


"use strict";

module StopByStop {
    export class SideBarStopViewModel {
        public stop: RouteStopViewModel;
        public top: KnockoutObservable<string>;
        public left: KnockoutObservable<string>;
        public poiTypeClass: string;
        public routePlan: RoutePlanViewModel;

        constructor(stop: RouteStopViewModel, routePlan: RoutePlanViewModel) {
            this.stop = stop;
            this.routePlan = routePlan;
            this.poiTypeClass = stop.stopPlace.type === PoiType.Food ? "food" : "gas";
            this.top = ko.observable("");
            this.left = ko.observable("");
        }

        public click(): void {
            this.routePlan.showStopSettings(this.stop);
        }
    }

    export class SideBarViewModel {
        private _headerHeight: number = 0;
        private _footerHeight: number = 0;
        private _thumbHeight: number = 0;
        private _scrollProcessingScheduled: boolean = false;
        private _thumbPageY: number = null;
        private _thumbTopAtDragStart = 0;
        private _self: SideBarViewModel;
        private _routePlanViewModel: RoutePlanViewModel;
        private _portionOfRouteScrolled: number;
        private _routeViewModel: RouteViewModel;
        private _routeContentSelector = ".route-page .ui-content";

        private _sideBarInit = Utils.runOnce(() => {
            $("#sidebar-thumb").unbind();
            $(this._routeContentSelector).unbind();

            $("#sidebar-thumb").bind("touchstart mousedown", (e) => {
                this.onTouchStart(e);
            });

            $("#sidebar-thumb").bind("touchend mouseup", (e) => {
                this.onTouchEnd(e);
            });

            $(this._routeContentSelector).bind("mousemove", (e) => {
                this.onTouchMove(e, e.pageY);
            });

            $(this._routeContentSelector).bind("touchmove", (e) => {
                this.onTouchMove(e, e.originalEvent["touches"][0].pageY);
            });


            if (AppState.current.app === SBSApp.Web) {
                this._headerHeight = $(".ui-header").outerHeight();
                this._footerHeight = $(".ui-footer").outerHeight();
            } else {
                // we have multiple copies of header and footer on SPA app
                this._headerHeight = $("." + AppState.current.pageInfo.pageName + " .ui-header").outerHeight();
                this._footerHeight = $("." + AppState.current.pageInfo.pageName + " .ui-footer").outerHeight();
            }

            this.sideBarHeight($(window).height());
            this.sideBarInnerHeight($(window).height());
            this.sideBarInnerTop(50);
        });

        private _sideBarFirstScrollInit = Utils.runOnce(this.sideBarFirstScrollInit.bind(this));
        private static _recalcOnWindowResize;

        public sideBarHeight: KnockoutObservable<number> = ko.observable(0);
        public sideBarInnerHeight: KnockoutObservable<number> = ko.observable(0);
        public sideBarInnerTop: KnockoutObservable<number> = ko.observable(0);
        public sideBarPosition: KnockoutObservable<string> = ko.observable("absolute");
        public sideBarTop: KnockoutObservable<string> = ko.observable("40px");
        public sideBarBottom: KnockoutObservable<string> = ko.observable("");
        public sideBarThumbTop: KnockoutObservable<string> = ko.observable("0px");
        public isDraggingThumb: KnockoutObservable<boolean> = ko.observable(false);
        public stops: KnockoutObservableArray<SideBarStopViewModel>;



        constructor(routePlan: RoutePlanViewModel, routeViewModel: RouteViewModel, initSettings: IAppState) {
            this.stops = ko.observableArray<SideBarStopViewModel>([]);
            this._routePlanViewModel = routePlan;
            this._routeViewModel = routeViewModel;
          

            $(document).scroll(() => {

                if (!this._scrollProcessingScheduled) {
                    window.setTimeout(() => {
                        this.onScroll();
                        this._scrollProcessingScheduled = false;
                    }, 20);
                    this._scrollProcessingScheduled = true;
                }

            });

            // in web app, run postInit, right away
            // in Cordova app it will be called in postRender
            if (initSettings.app === SBSApp.Web) {
                this.postInit();
            }
        }

        public postInit() {
            this._sideBarInit();
        }

        private onTouchStart(eventObject: JQueryMouseEventObject) {
            Telemetry.trackEvent(TelemetryEvent.SideBarThumbTouch);
            this.isDraggingThumb(true);
            this._thumbTopAtDragStart = parseInt(this.sideBarThumbTop());;
            eventObject.preventDefault();
        };

        private onTouchEnd(eventObject: JQueryMouseEventObject): void {
            if (this.isDraggingThumb()) {
                this._thumbPageY = null;
                this.isDraggingThumb(false);
                var thumbTop = parseInt(this.sideBarThumbTop());
                var pixelsScrolled = thumbTop - this._thumbTopAtDragStart;
                var routePixelsScrolled = ($(".route").innerHeight() / (this.sideBarInnerHeight() - this._thumbHeight)) * pixelsScrolled;

                window.scrollBy(0, routePixelsScrolled);
                eventObject.preventDefault();
            }
        };

        private onTouchMove(e: JQueryMouseEventObject, pageY: number): void {
            if (this.isDraggingThumb()) {
                if (this._thumbPageY) {
                    var oldThumbTop = parseInt(this.sideBarThumbTop());
                    var newThumbTop = oldThumbTop + (pageY - this._thumbPageY);
                    newThumbTop = Math.max(0, newThumbTop);
                    newThumbTop = Math.min(this.sideBarInnerHeight() - this._thumbHeight, newThumbTop);

                    this.sideBarThumbTop(newThumbTop.toString() + "px");

                }
                this._thumbPageY = pageY;
                e.preventDefault();

            }
        }

        private onScroll(): void {
            this._sideBarFirstScrollInit();
            var documentScrollTop = $(document).scrollTop();
            var routeOffsetTop = $(this._routeContentSelector).offset().top;

            if (documentScrollTop > routeOffsetTop) {
                this.sideBarPosition("fixed");

                this.sideBarTop("");
                this.sideBarBottom((this._footerHeight + 1).toString() + "px");

                this._portionOfRouteScrolled = Math.min(1.0, (documentScrollTop - routeOffsetTop) /
                    ($(".route").innerHeight() - $(window).height() - this._footerHeight));

                this.recalcThumbPosition();

            } else {
                this.sideBarPosition("absolute");
                this.sideBarTop("40px");
                this.sideBarBottom("");
                this.sideBarThumbTop("0px");
            }
        }

        private recalcThumbPosition(): void {
            this.sideBarThumbTop(((this.sideBarInnerHeight() - this._thumbHeight) * this._portionOfRouteScrolled).toString() + "px");
        }

        private sideBarFirstScrollInit(): void {
            Telemetry.trackEvent(TelemetryEvent.RoutePageScroll);
            SideBarViewModel.recalculateSideBarPosition(this);

            // check if there's already a resize handle attached from the previous instance of SideBarViewModel
            // if so, detach it
            if (SideBarViewModel._recalcOnWindowResize) {
                $(window).off("resize", SideBarViewModel._recalcOnWindowResize);
            }

            SideBarViewModel._recalcOnWindowResize = SideBarViewModel.recalculateSideBarPosition.bind(this);
            $(window).on("resize", SideBarViewModel._recalcOnWindowResize);



            this._routePlanViewModel.stops.subscribe(() => this.updateStopsOnSidebar());
            this._routeViewModel.roadLineHeight.subscribe(() => this.updateStopsOnSidebar());
        }



        private updateStopsOnSidebar(): void {
            this.stops.removeAll();

            var sideBarStopItems = $.map(this._routePlanViewModel.stops(),
                (elementOfArray: RouteStopViewModel, indexInArray: number) => new SideBarStopViewModel(elementOfArray, this._routePlanViewModel));

            if (sideBarStopItems.length > 0 && Utils.hasAnyOwnProperties(this._routeViewModel.routeJunctionElementLookup)) {
                // sort by distance to exit from route start. This is so that we can render exits belonging to the same exit
                // next to each other
                sideBarStopItems.sort((a, b) => a.stop.stopPlace.dtefrs - b.stop.stopPlace.dtefrs);

                var currentExitId = "";
                var currentIndexOnThisExit = 0;

                for (var i = 0; i < sideBarStopItems.length; i++) {
                    var sideBarStopViewModel = sideBarStopItems[i];
                    var poiExitId = sideBarStopViewModel.stop.stopPlace.exitId;

                    if (!this._routeViewModel.routeJunctionElementLookup[poiExitId]) {
                        continue;
                    }

                    if (poiExitId === currentExitId) {
                        currentIndexOnThisExit++;
                    }
                    else {
                        currentIndexOnThisExit = 0;
                        currentExitId = poiExitId;
                    }

                    /*
                    routeDistance    sideBarInnerHeight
                    -------------- = ---------------------  =>
                    distanceToExit          x
                          sideBarInnerHeight*distanceToExit
                    x = --------------------------------------------
                          routeDistance
                    */


                    /* available height is slightly smaller because we don't want POI to overlap with ETA time */
                    /* this is to address Bug 126: Sidebar - location of chosen POIs on the sidebar */
                    var sideBarAvailableHeight = this.sideBarInnerHeight() - 32;

                    var distanceToExitInPixels =
                        (sideBarAvailableHeight * this._routeViewModel.routeJunctionElementLookup[poiExitId].top * 1.15 /
                            this._routeViewModel.roadLineHeight());

                    sideBarStopViewModel.top((distanceToExitInPixels).toString() + "px");



                    sideBarStopViewModel.left((-28 + currentIndexOnThisExit * 8).toString() + "px"); /* 28 is another magic constant */
                    this.stops.push(sideBarStopViewModel);
                }


            }
            Telemetry.logToConsole(sideBarStopItems.length.toString() + " stops on sidebar updated");
        }

        private static recalculateSideBarPosition(sbvm: SideBarViewModel): void {
            sbvm._thumbHeight = $("#sidebar-thumb").outerHeight();

            var sidebarTopInfoHeight = $(".sidebar-top").outerHeight();
            var sidebarBottomInfoHeight = $(".sidebar-bottom").outerHeight();

            var windowHeight = window.innerHeight ? window.innerHeight : $(window).height();;
            var sideBarHeightPixels = windowHeight - sbvm._headerHeight - sbvm._footerHeight;
            var sideBarInnerHeightPixels = sideBarHeightPixels - sidebarBottomInfoHeight - sidebarTopInfoHeight;

            sbvm.sideBarHeight(sideBarHeightPixels);
            sbvm.sideBarInnerHeight(sideBarInnerHeightPixels);
            sbvm.sideBarInnerTop(sidebarTopInfoHeight);
            sbvm.recalcThumbPosition();
            sbvm.updateStopsOnSidebar();
        }
    }
}