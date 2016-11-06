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
    StopByStop.Utils.pageInfo = {
                        pageName: "TestPageName",
                        telemetryPageName: "TestPageName"
                    };
});

QUnit.test("Utils: ParseUrlForNavigationLocation test", (assert) => {
   
});

}