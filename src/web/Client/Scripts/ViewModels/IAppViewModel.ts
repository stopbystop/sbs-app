/// <reference path="../tsdef/jquery.d.ts"/>
/// <reference path="../tsdef/knockout-3.3.d.ts"/>
/// <reference path="../stopbystop-interfaces.ts"/>

/// <reference path="FilterViewModel.ts"/>
/// <reference path="RouteStopViewModel.ts"/>
/// <reference path="RoutePlanViewMOdel.ts"/>

"use strict";
module StopByStop {
    export interface IAppViewModel {
        filter: FilterViewModel;
        routePlan: RoutePlanViewModel;
    }
}