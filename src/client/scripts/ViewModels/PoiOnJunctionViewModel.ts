/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="ReviewGroupViewModel.ts"/>
/// <reference path="PoiViewModel.ts"/>
/// <reference path="../Utils.ts"/>

"use strict";
module StopByStop {
    export class PoiOnJunctionViewModel {
        private _app: IAppViewModel;
        private _navLocation: ISBSNavigationLocation;

        constructor(obj: IPoiOnJunction, exit: IRouteJunction, app: IAppViewModel) {
            this.obj = obj;
            this._app = app;
            this.dfe = this.obj.dfj;
            this.dtefrs = exit.dfrs;
            this.exitId = exit.j.oid.toString();
           
            this.poi = new PoiViewModel(this.obj.p, app);
            this.distanceFromJunctionText = Utils.getMileString(this.dfe) + " miles from exit"; 

            this._navLocation = {
                page: SBSPage.poi,
                routeId: AppState.current.navigationLocation.routeId,
                exitId: this.exitId,
                poiId: this.poi.id,
                poiPath: this.poi.id + "-" + this.poi.urlName
            };

        }

        
        public obj: IPoiOnJunction;
        public exitId: string;
        public dfe: number;
        public dtefrs: number;
        public poi: PoiViewModel;
        public distanceFromJunctionText: string;

        public navigateToPoiPageClick(): void {
            this._app.selectedPoi(this.poi);
            Utils.spaPageNavigate(this._navLocation);
        }
    }
}   