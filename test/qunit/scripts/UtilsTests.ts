/// <reference path="../../../src/client/scripts/tsdef/qunit.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/sinon.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/jquery.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/knockout-3.3.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/google.maps.d.ts"/>

/// <reference path="../../../src/client/scripts/stopbystop-interfaces.ts"/>
/// <reference path="../../../src/client/scripts/AppState.ts"/>
/// <reference path="../../../src/client/scripts/Utils.ts"/>

"use strict";
module StopByStop {

    QUnit.begin(() => {
        AppState.current.pageInfo = {
            pageName: "TestPageName",
            telemetryPageName: "TestPageName"
        };
    });

    QUnit.test("Utils: ParseUrlForNavigationLocation test", (assert) => {
        updateAndVerifyNavigationLocation(assert, "#route", { page: SBSPage.home }, { page: SBSPage.route });
        updateAndVerifyNavigationLocation(assert, "#route&routeId=route1", { page: SBSPage.home }, { page: SBSPage.route, routeId: "route1", poiType: undefined });
        updateAndVerifyNavigationLocation(assert, "https://hostname.com/page", { page: SBSPage.route, routeId: "route1" }, { page: SBSPage.home, routeId: "route1" });
        updateAndVerifyNavigationLocation(assert, "#exit&routeId=route1&exitId=exit1&poiType=gasstations", { page: SBSPage.home }, { page: SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations });
        updateAndVerifyNavigationLocation(assert, "#exit&routeId=route1&exitId=exit1&poiType=factory", { page: SBSPage.home }, { page: SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: PoiType.all });
    });

    QUnit.test("Utils: GetHashFromNavigationLocation test", (assert) => {
        assert.equal(Utils.getHashFromNavigationLocation({ page: SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "#exit&routeid=route1&exitid=exit1&poitype=gasstations");
        assert.equal(Utils.getHashFromNavigationLocation({ page: SBSPage.route, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "#route&routeid=route1");
    });


    QUnit.test("Utils: GetShareUrl test", (assert) => {
        assert.equal(Utils.getShareUrl("https://www.host.com", { page: SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "https://www.host.com/route/route1/exit/osm-exit1/gasstations");
        assert.equal(Utils.getShareUrl("https://www.host.com/", { page: SBSPage.exit, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "https://www.host.com/route/route1/exit/osm-exit1/gasstations");
        assert.equal(Utils.getShareUrl("https://www.host.com", { page: SBSPage.about, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "https://www.host.com/");
        assert.equal(Utils.getShareUrl("https://www.host.com", { page: SBSPage.home, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "https://www.host.com/");
        assert.equal(Utils.getShareUrl("https://www.host.com", { page: SBSPage.route, routeId: "route1", exitId: "exit1", poiType: PoiType.gasstations }), "https://www.host.com/route/route1");
    });


    QUnit.test("Utils: GetRouteTitleFromRouteId test", (assert) => {
        assert.equal(Utils.getRouteTitleFromRouteId("47.68950,-122.03859-to-new-york-city-ny-united-states"), "from your location to New York City, NY");
        assert.equal(Utils.getRouteTitleFromRouteId("tacoma-wa-united-states-to-new-york-city-ny-united-states"), "from Tacoma, WA to New York City, NY");
        assert.equal(Utils.getRouteTitleFromRouteId(""), "");
        assert.equal(Utils.getRouteTitleFromRouteId("10-to-10"), "");
    });

    QUnit.test("Utils: runOnce test", (assert) => {
        var callback = sinon.spy();
        var proxy = Utils.runOnce(callback);
        proxy();
        proxy();
        assert.equal(callback.callCount, 1);

    });

    QUnit.test("Utils: getNavigationUrlFromCurrentLocation test", (assert) => {
        var navLocationStub = sinon.stub(navigator.geolocation, "getCurrentPosition");
        var fakeSuccessGetCurrentPosition = (successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): void => {
            successCallback(<Position>{
                coords: <Coordinates>{
                    latitude: 1.0,
                    longitude: 1.0
                }
            });
        };
        var navLocationStub = sinon.stub(navigator.geolocation, "getCurrentPosition").callsFake(fakeSuccessGetCurrentPosition);
    });

            
            
        .
});

function updateAndVerifyNavigationLocation(assert: QUnitAssert, hash: string, inputLocation: ISBSNavigationLocation, expectedLocation: ISBSNavigationLocation): void {
    Utils.updateNavigationLocation(hash, inputLocation);
    assert.deepEqual(inputLocation, expectedLocation);
}

}

