/// <reference path="../../../src/client/scripts/tsdef/qunit.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/jquery.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/knockout-3.3.d.ts"/>
/// <reference path="../../../src/client/scripts/tsdef/google.maps.d.ts"/>

/// <reference path="../../../src/client/scripts/stopbystop-interfaces.ts"/>
/// <reference path="../../../src/client/scripts/Utils.ts"/>

"use strict";
module StopByStop {

QUnit.begin(()=>
{
    AppState.current.pageInfo = {
                        pageName: "TestPageName",
                        telemetryPageName: "TestPageName"
                    };
});

QUnit.test("Utils: ParseUrlForNavigationLocation test", (assert) => {
  assert.equal(Utils.parseUrlForNavigationLocation("https://hostname.com/page#route").page, SBSPage.route);
  assert.equal(Utils.parseUrlForNavigationLocation("https://hostname.com/page#exit").page, SBSPage.exit);
  assert.equal(Utils.parseUrlForNavigationLocation("https://hostname.com/page").page, SBSPage.home);

  assert.equal(Utils.parseUrlForNavigationLocation("https://hostname.com/page#route&routeId=route1").routeId, "route1");
  assert.equal(Utils.parseUrlForNavigationLocation("https://hostname.com/page#exit&routeId=route1&exitId=exit1").exitId, "exit1");
  assert.equal(Utils.parseUrlForNavigationLocation("https://hostname.com/page#exit&routeId=route1&exitId=exit1&poiType=gas").poiType, PoiType.Gas);
});

}