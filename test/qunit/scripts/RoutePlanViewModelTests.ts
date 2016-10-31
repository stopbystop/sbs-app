/// <reference path="../../../src/web/Client/Scripts/tsdef/qunit.d.ts"/>
/// <reference path="../../../src/web/Client/Scripts/tsdef/jquery.d.ts"/>
/// <reference path="../../../src/web/Client/Scripts/tsdef/knockout-3.3.d.ts"/>
/// <reference path="../../../src/web/Client/Scripts/tsdef/google.maps.d.ts"/>

/// <reference path="../../../src/web/Client/Scripts/stopbystop-interfaces.ts"/>
/// <reference path="../../../src/web/Client/Scripts/ViewModels/IStopPlace.ts"/>

"use strict";
module StopByStop {
    export class TestStorage implements Storage {
        public _obj: any = {};
        public length: number = 0;

        public clear(): void {
            this._obj = {};
        }
        public getItem(key: string): any {
            return this._obj[key];
        }

        public key(index: number): string {
            throw "not implemented";
        }

        public removeItem(key: string): void {
            delete this._obj[key];
        }

        public setItem(key: string, data: string): void {
            this._obj[key] = data;
        }

        [key: string]: any;

        [index: number]: string;

        public getData(key: string): string {
            return this._obj[key];
        }

    }
};

QUnit.test("RoutePlanViewModel: constructor test", (assert) => {
    var myStorage = new StopByStop.TestStorage();
    var routePlanViewModel = new StopByStop.RoutePlanViewModel("testrouteid", 1000, null, myStorage);
    assert.equal(myStorage.getData(StopByStop.ROUTE_PLAN_STORAGE_KEY), "{\"testrouteid\":{\"stops\":{}}}");
});

QUnit.test("RoutePlanViewModel: add stop test", (assert) => {
    var myStorage = new StopByStop.TestStorage();
    var routePlanViewModel = new StopByStop.RoutePlanViewModel("testrouteid", 1000, null, myStorage);
    assert.equal(routePlanViewModel.stops().length, 0);
    var poiOnJunctionViewModel: StopByStop.IStopPlace = {
        id: "id1",
        name: "name",
        dfe: 1,
        dtefrs: 100,
        duration: 5,
        exitId: "exitid",
        lat: 42,
        lon: -170,
        type: StopByStop.PoiType.Food
    };
    var routeStopViewModel = routePlanViewModel.getOrCreateStop(poiOnJunctionViewModel);
    assert.ok(routeStopViewModel);
    assert.equal(routePlanViewModel.stops().length, 1);
    assert.equal(routePlanViewModel.stops()[0].stopDuration(), 5);
    assert.equal(myStorage.getData(StopByStop.ROUTE_PLAN_STORAGE_KEY),
        "{\"testrouteid\":{\"stops\":{\"id1\":{\"id\":\"id1\",\"name\":\"name\",\"dfe\":1,\"dtefrs\":100,\"duration\":5,\"exitId\":\"exitid\",\"lat\":42,\"lon\":-170}}}}");
});

QUnit.test("RoutePlanViewModel: change stop duration time test", (assert) => {
    var myStorage = new StopByStop.TestStorage();
    var routePlanViewModel = new StopByStop.RoutePlanViewModel("testrouteid", 1000, null, myStorage);
    var poiOnJunctionViewModel: StopByStop.IStopPlace = {
        id: "id1",
        name: "name",
        dfe: 1,
        dtefrs: 100,
        duration: 5,
        exitId: "exitid",
        lat: 42,
        lon: -170,
        type: StopByStop.PoiType.Food
    };
    var routeStopViewModel = routePlanViewModel.getOrCreateStop(poiOnJunctionViewModel);

    routeStopViewModel.add5MinutesToDuration();
    assert.equal(routePlanViewModel.stops()[0].stopDurationHours(), "00");
    assert.equal(routePlanViewModel.stops()[0].stopDurationMinutes(), "10");
    assert.equal(myStorage.getData(StopByStop.ROUTE_PLAN_STORAGE_KEY),
        "{\"testrouteid\":{\"stops\":{\"id1\":{\"id\":\"id1\",\"name\":\"name\",\"dfe\":1,\"dtefrs\":100,\"duration\":10,\"exitId\":\"exitid\",\"lat\":42,\"lon\":-170}}}}");

    routeStopViewModel.subtract5MinutesFromDuration();
    assert.equal(routePlanViewModel.stops()[0].stopDurationHours(), "00");
    assert.equal(routePlanViewModel.stops()[0].stopDurationMinutes(), "05");
    assert.equal(myStorage.getData(StopByStop.ROUTE_PLAN_STORAGE_KEY),
        "{\"testrouteid\":{\"stops\":{\"id1\":{\"id\":\"id1\",\"name\":\"name\",\"dfe\":1,\"dtefrs\":100,\"duration\":5,\"exitId\":\"exitid\",\"lat\":42,\"lon\":-170}}}}");
});

QUnit.test("RoutePlanViewModel: remove stop test", (assert) => {
    var myStorage = new StopByStop.TestStorage();
    var routePlanViewModel = new StopByStop.RoutePlanViewModel("testrouteid", 1000, null, myStorage);
    var poiOnJunctionViewModel: StopByStop.IStopPlace = {
        id: "id1",
        name: "name",
        dfe: 1,
        dtefrs: 100,
        duration: 5,
        exitId: "exitid",
        lat: 42,
        lon: -170,
        type: StopByStop.PoiType.Food
    };
    var routeStopViewModel = routePlanViewModel.getOrCreateStop(poiOnJunctionViewModel);
    assert.equal(routePlanViewModel.stops().length, 1);

    routePlanViewModel.removeStop(routeStopViewModel);
    assert.equal(routePlanViewModel.stops().length, 0);
});

QUnit.test("RoutePlanViewModel: restore stop data from storage test", (assert) => {
    var myStorage = new StopByStop.TestStorage();
    var routePlanViewModel = new StopByStop.RoutePlanViewModel("testrouteid", 1000, null, myStorage);
    var poiOnJunctionViewModel: StopByStop.IStopPlace = {
        id: "id1",
        name: "name",
        dfe: 1,
        dtefrs: 100,
        duration: 5,
        exitId: "exitid",
        lat: 42,
        lon: -170,
        type: StopByStop.PoiType.Food
    };
    var routeStopViewModel = routePlanViewModel.getOrCreateStop(poiOnJunctionViewModel);
   
    routePlanViewModel = new StopByStop.RoutePlanViewModel("testrouteid", 1000, null, myStorage);
    assert.equal(routePlanViewModel.stops().length, 1);
    assert.equal(myStorage.getData(StopByStop.ROUTE_PLAN_STORAGE_KEY),
        "{\"testrouteid\":{\"stops\":{\"id1\":{\"id\":\"id1\",\"name\":\"name\",\"dfe\":1,\"dtefrs\":100,\"duration\":5,\"exitId\":\"exitid\",\"lat\":42,\"lon\":-170}}}}");
});