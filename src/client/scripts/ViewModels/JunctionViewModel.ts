/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="LocationViewModel.ts"/>
/// <reference path="PoiOnJunctionViewModel.ts"/>

"use strict";
module StopByStop {
    export class JunctionViewModel {
        private _obj: IJunction;
        private _app: IAppViewModel;

        constructor(robj: IRouteJunction, app: IAppViewModel) {
            this._obj = robj.j;
            this._app = app;

            this.name = this._obj.n;
            this.index = this._obj.i;
            this.osmid = this._obj.oid;
            this.highwayName = this._obj.hn;
            this.ref = this._obj.r;
            this.location = new LocationViewModel(this._obj.l);
            this.exitTo = this._obj.et;
            this.exitToLeft = this._obj.etl;
            this.exitToRight = this._obj.etr;

            if (this._obj.p) {
                this.pois = ko.observableArray<PoiOnJunctionViewModel>();

                for (var i = 0; i < this._obj.p.length; i++) {
                    var poiOnJunctionViewModel = new PoiOnJunctionViewModel(this._obj.p[i], robj, this._app);
                    this.pois.push(poiOnJunctionViewModel);
                    //if (poiOnJunctionViewModel.poi.telPhoneString) {
                    //var normalizedPhoneNumberString = JunctionViewModel.normalizePhoneNumber(poiOnJunctionViewModel.poi.telPhoneString);
                    this.poiLookup[this._obj.p[i].id] = poiOnJunctionViewModel;
                    //}
                }
            }

            this.pois.sort((l, r) => l.dfe - r.dfe);

            
        }

        public name: string;
        public index: number;
        public osmid: number;
        public highwayName: string;
        public ref: string;
        public location: LocationViewModel;
        public exitTo: string;
        public exitToLeft: string;
        public exitToRight: string;
        public pois: KnockoutObservableArray<PoiOnJunctionViewModel>;
        public exitName: KnockoutComputed<string>;
        public poiLookup: { [id: string]: PoiOnJunctionViewModel } = {};
        public completeYDataLoad() {
            for (var i = 0; i < this._obj.p.length; i++) {
                this.poiLookup[this._obj.p[i].id].poi.updateYInfo(null);
            }
        }

        private static normalizePhoneNumber(phoneNumberString) {
            phoneNumberString = phoneNumberString.replace(/[^0-9]/g, "");
            phoneNumberString = phoneNumberString.substr(phoneNumberString.length - 10);
            return phoneNumberString;
        }
    }
}