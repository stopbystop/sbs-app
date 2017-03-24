/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>
/// <reference path="JunctionViewModel.ts"/>
/// <reference path="FilterViewModel.ts"/>
/// <reference path="RouteJunctionPoiTypeViewModel.ts"/>
/// <reference path="../Utils.ts"/>
/// <reference path="../AppState.ts"/>

"use strict";
module StopByStop {
    export class RouteJunctionViewModel {

        private _obj: IRouteJunction;
        private _poiTypeViewModelLookup: { [id: number]: RouteJunctionPoiTypeViewModel };

        constructor(obj: IRouteJunction, routeStartTime: Date, app: IAppViewModel) {
            this._obj = this.routeJunction = obj;
            this.distanceFromRouteStartText = ko.observable(Utils.getMileString(this._obj.dfrs));
            this.junction = new JunctionViewModel(this._obj, app);
            this.visible = ko.observable(true);
            this.top = ko.observable("");
            this.stops = ko.observableArray<RouteStopViewModel>();
            this.poiTypeViewModels = ko.observableArray<RouteJunctionPoiTypeViewModel>();
            this._poiTypeViewModelLookup = {};


            this.etaWithoutStops = new Date(routeStartTime.getTime() + this._obj.tfrs * 1000);
            this.eta = ko.observable(this.etaWithoutStops);
            this.hasStops = ko.computed(() => this.stops().length > 0);

            if ((<AppViewModel>app).title && (<AppViewModel>app).title()) {
                var routeTitle = (<AppViewModel>app).title();
                routeTitle = (routeTitle.substr(0, 1).toLowerCase() + routeTitle.substr(1));
                this.title = this.junction.name + " on the way from " + routeTitle;
            }

            var rootPoiCategories = AppState.current.metadata.rpc;
            for (var rpcId in rootPoiCategories) {
                var rpc = rootPoiCategories[rpcId];
                var vm = new RouteJunctionPoiTypeViewModel(rpc, this.junction, app);
                this.poiTypeViewModels.push(vm);
                this._poiTypeViewModelLookup[rpc.t] = vm;
            }

            this.description = ko.computed(() => {
                var d = this.junction.name + ". ";
                $.each(this.poiTypeViewModels(), (i, item) => {
                    d += " " + item.poiCountStringWithLabel();
                });
                d += " within 5 mile travel distance";
                return d;
            });

            this.etaString = ko.computed(() => {
                var s = Utils.getTimeString(this.eta());
                if (this.hasStops()) {
                    s = Utils.getTimeString(this.eta()) + "-" + Utils.getTimeString(this.etd());
                }
                return s;
            });

            this.etd = ko.computed(() => {
                var totalDetourTime = 0;
                for (var i = 0; i < this.stops().length; i++) {
                    totalDetourTime += this.stops()[i].detourDuration();
                }
                return new Date(this.eta().getTime() + totalDetourTime * 1000);
            });
            
            this.url = Utils.getShareUrl(
                AppState.current.basePortalUrl,
                {
                    page: SBSPage.exit,
                    routeId: app.routeId,
                    exitId: this.routeJunction.j.oid.toString()
                });
        }

        public poiTypeViewModels: KnockoutObservableArray<RouteJunctionPoiTypeViewModel>;
        public routeJunction: IRouteJunction;
        public distanceFromRouteStartText: KnockoutObservable<string>;
        public junction: JunctionViewModel;
        public visible: KnockoutObservable<boolean>;
        public top: KnockoutObservable<string>;
        public title: string;
        public url: string;
        public stops: KnockoutObservableArray<RouteStopViewModel>;

        public etaWithoutStops: Date;
        public eta: KnockoutObservable<Date>;
        public etaString: KnockoutComputed<string>;
        public etd: KnockoutComputed<Date>;
        public hasStops: KnockoutComputed<boolean>;
        public description: KnockoutComputed<string>;

        public onPoiVisibilityUpdated(): boolean {
            $.each(this.poiTypeViewModels(), (i, item) => { item.visiblePois.removeAll(); });
            var junctionVisibilityChanged = false;
            var visible = false;
            for (var i = 0; i < this.junction.pois().length; i++) {
                var poi = this.junction.pois()[i];
                if (poi.obj.v === undefined || poi.obj.v === true) {
                    this._poiTypeViewModelLookup[poi.type].visiblePois.push(poi);
                    visible = true;
                }
            }

            $.each(this.poiTypeViewModels(), (i, item) => { item.update(); });
            junctionVisibilityChanged =  this.visible() !== visible;
            this.visible(visible);
            return junctionVisibilityChanged;
        }

        public navigateToExitPage(): void {
            Utils.spaPageNavigate(
                {
                    page: SBSPage.exit,
                    routeId: AppState.current.navigationLocation.routeId,
                    exitId: this.junction.osmid.toString()
                });
        }
    }
}