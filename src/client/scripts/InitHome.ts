/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/jquerymobile.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="AppState.ts" />
/// <reference path="Telemetry.ts"/>
/// <reference path="Utils.ts"/>
/// <reference path="stopbystop-interfaces.ts"/>
/// <reference path="InitUrls.ts"/>

module StopByStop {

    export class InitHome {
        public static wireup() {
            var currentLocationString = "Current location";
            // populate from with 'current location'
            var currentLocationData = null;
            var setCurrentLocation = function () {
                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position: Position) => {
                            var srcLat = position.coords.latitude;
                            var srcLon = position.coords.longitude;

                            if (srcLat > S_LAT_BOUNDARY && srcLat < N_LAT_BOUNDARY && srcLon > W_LON_BOUNDARY && srcLon < E_LON_BOUNDARY) {
                                currentLocationData = { n: currentLocationString, i: srcLat.toFixed(5) + "," + srcLon.toFixed(5) };

                                $("#from").val(currentLocationString);
                                $("#from").data({ place: currentLocationData });

                                Telemetry.trackEvent(TelemetryEvent.LocationIN);
                            }
                            else {
                                Telemetry.trackEvent(TelemetryEvent.LocationOUT);
                            }
                        },
                        (positionError: PositionError) => {
                            var positionErrorReason = "UNAVAILABLE";
                            switch (positionError.code) {
                                case positionError.PERMISSION_DENIED:
                                    positionErrorReason = "PERMISSION_DENIED";
                                    break;
                                case positionError.POSITION_UNAVAILABLE:
                                    positionErrorReason = "POSITION_UNAVAILABLE";
                                    break;
                                case positionError.TIMEOUT:
                                    positionErrorReason = "TIMEOUT";
                                    break;
                            }

                            Telemetry.trackError(new Error("getCurrentPositionErrorHomePage-" + positionErrorReason));
                        },
                        {
                            maximumAge: 60000,
                            timeout: 5000,
                            enableHighAccuracy: true,
                        }
                    );
                }
            };
            setCurrentLocation();

            $(".input-wrapper input").on("keyup", function (e, data) {
                var $wrapper = $(this).closest('.input-wrapper');
                var that = this;
                var $ul = $wrapper.find('ul'),
                    $input = $(this),
                    value = $input.val();
               
                if (value) {
                   
                    $wrapper.append("<div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div>");
                  


                    $.ajax({
                        url: AppState.current.urls.PlacesUrl + value,
                        dataType: 'json',
                        method: 'GET',
                        success: function (data) {
                            $wrapper.find('.ui-loader').remove();
                           
                            $ul.empty();
                            var otherDropDown = $(that).attr('id') === 'from' ? $('#to') : $('#from');
                            var otherDropDownSelectedID = null;
                            if (otherDropDown.data('place')) {
                                otherDropDownSelectedID = otherDropDown.data('place').i;
                            }

                            if ($(that).attr('id') === 'from' && currentLocationData) {
                                var $li = $('<li data-icon="false"><a href="#">' + currentLocationString + '</a></li>');
                                $li.data('place', currentLocationData);
                                $ul.append($li);
                            }

                            for (var i = 0; i < data.length; i++) {
                                if (data[i].i !== otherDropDownSelectedID) {
                                    var $li = $('<li data-icon="false"><a href="#">' + data[i].n + '</a></li>');
                                    $li.data('place', data[i]);
                                    $ul.append($li);
                                }
                            }
                            $ul.listview("refresh");
                            $ul.trigger("updatelayout");
                        }
                    });
                }
            });

            $(".autocomplete").on('click', 'li', function (event) {

                var $input = $(this).closest('div').find('input');
                var place = $(this).data('place');
                if (place) {
                    $input.val(place.n).data('place', place);
                    $(this).closest('ul').empty();

                    if ($("#from").data('place') && $("#to").data('place')) {
                        $("#view_trip").removeClass("ui-disabled");
                    }
                }

                Telemetry.trackEvent(TelemetryEvent.CityDropdownClick);
            });

            $('.input-wrapper input').on('focus', function (event) {

                var that = $(this);
                window.setTimeout(function () {
                    that.select();
                }, 100);

                var $wrapper = $(this).closest('.input-wrapper');
                $wrapper.find('ul').show();
                $wrapper.find('.input-tip').hide();
            });

            $('.view-trip').on('click', function (event) {
                Telemetry.trackEvent(TelemetryEvent.ViewTripButtonClick, null, null, true);


                var $from = $('#from');
                var $to = $('#to');
                var startlocation = $from.data('place');
                var endlocation = $to.data('place');
                if (startlocation != undefined && endlocation != undefined) {
                    if (AppState.current.app === SBSApp.Web) {
                        var url = AppState.current.urls.RouteUrl + startlocation.i + '-to-' + endlocation.i;

                        $("#view_trip").addClass("ui-disabled");

                        /* navigate without using AJAX navigation */
                        window.location.assign(url);
                    } else {
                        Utils.spaPageNavigate(SBSPage.route, startlocation.i + '-to-' + endlocation.i);
                    }
                }
            });

            if ($("#from").data('place') && $("#to").data('place')) {
                $("#view_trip").removeClass("ui-disabled");
            }
        }
    }
}
