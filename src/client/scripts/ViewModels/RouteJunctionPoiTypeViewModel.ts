﻿/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../AppState.ts"/>

"use strict";
module StopByStop {
    export class RouteJunctionPoiTypeViewModel {
        private _rpc: IRootPoiCategory;
        private _junctionViewModel:JunctionViewModel;

        constructor(rootPoiCategory: IRootPoiCategory, junctionViewModel: JunctionViewModel, app: IAppViewModel) {
            this._rpc = rootPoiCategory;
            this.visiblePois = ko.observableArray([]);
            this.closestPoiDistance = ko.observable("");
            this.poiCountString = ko.observable("");
            this._junctionViewModel = junctionViewModel;
            this.poiTypeString = PoiType[rootPoiCategory.t].toLowerCase();
            this.url = Utils.getShareUrl(
                AppState.current.basePortalUrl,
                {
                    page: SBSPage.exit,
                    routeId: app.routeId,
                    exitId: this._junctionViewModel.osmid.toString(),
                    poiType: this._rpc.t
                });

            this.poiCountStringWithLabel = ko.computed(()=>
            {
                return this.poiCountString()+ " " + this._rpc.n + "(s)";
            });
        }

        public url: string;
        public poiTypeString: string;
        public visiblePois: KnockoutObservableArray<PoiOnJunctionViewModel>;
        public closestPoiDistance: KnockoutObservable<string>;
        public poiCountString: KnockoutObservable<string>;
        public poiCountStringWithLabel: KnockoutObservable<string>;

        public update(): void {

            this.visiblePois.sort((a,b)=>a.dfe-b.dfe);
            this.closestPoiDistance(this.visiblePois().length > 0 ? Utils.getMileString(this.visiblePois()[0].dfe) : "");          
            this.poiCountString(this.visiblePois().length > 9 ? "9+" : this.visiblePois().length.toString());
        }

        public navigateToExitPage(): void {
            Utils.spaPageNavigate(
                {
                    page: SBSPage.exit,
                    routeId: AppState.current.navigationLocation.routeId,
                    exitId: this._junctionViewModel.osmid.toString(),
                    poiType: this._rpc.t
                });
        }
    }
}