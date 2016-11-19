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
        static yIncrement: number = -100; 

        /*
        The functionality below pulls the image url based on lat long
        And populates the images inside a div
        If an image is not available, it is shown as a blank div
        */
        public static addImagesDynamically(prevPlace,currentLocationString) {

            // temporary, as server-side functionality is not ready yet
            
            /*
            if (StopByStop.AppState.current.app !== StopByStop.SBSApp.Web) {
                var prevPlace = $('#Images').data('prevPlace');                
                var place = $('#from').data('place');
                if (place === null) {
                    return true;
                }
                if (prevPlace && prevPlace.n === place.n) {
                    // Dont proceed further as the same place is being selected
                    return true;
                }
                // Continue with the processing if the previous place doesnt match with the current returned place
                $('#Images').data('prevPlace',place);
                //Remove any div contents from the previous population before adding new divs
                $("#Images").empty();
                var placesNearbyUrl = "";
                //If the place returned is the current location, the processing should be different, 
                //should be picked up from place.i
                if (place.n === currentLocationString) {
                    var modifiedCurrentLocation = place.i.replace(",", "/");
                    placesNearbyUrl = AppState.current.urls.PlacesNearbyUrl + modifiedCurrentLocation;
                }
                else {
                    placesNearbyUrl = AppState.current.urls.PlacesNearbyUrl + place.l.a + '/' + place.l.o;
                }
                $.ajax({
                    url: placesNearbyUrl,
                    dataType: 'json',
                    method: 'GET',
                    success: function (result) {
                        var imageDiv = $("#Images"), myDivs = [], divIndex = 0, numOfDivs = result.length;
                        if (numOfDivs > 10 && window.screen.width > 480) {
                            numOfDivs = 10; //Restrict results to 10 for a desktop screen
                        }
                        if (numOfDivs > 6 && window.screen.width < 480) {
                            numOfDivs = 6; //Restrict results to 6 for a mobile screen
                        }
                        for (divIndex; divIndex < numOfDivs; divIndex += 1) {
                            var divId = "appendedImagediv" + divIndex;
                            var imageId = "appendedImageId" + divIndex;
                            myDivs.push(InitHome.createDiv(divIndex, result[divIndex]));
                            $(myDivs[divIndex]).data('place', result[divIndex]);
                            $("#Images").append(myDivs[divIndex]);
                            $(myDivs[divIndex]).on('click', function () {

                                $("#to").val($(this).data('place').n);
                                var placeData = { n: $(this).data('place').n, i: $(this).data('place').i };
                                $("#to").data('place', placeData);
                                $("#view_trip").removeClass("ui-disabled");

                            });
                            
                            var imgurl=StopByStop.AppState.current.urls.CityImagesUrl + result[divIndex].i + '.jpg';
                            $('#appendedImagediv' + divIndex).css('background-image','url(' + imgurl + ')');                            
                            
                        }
                        
                        InitHome.moveImageInBackground();
                    }
                });
            }
            */
        }
        
        public static moveImageInBackground(){
            InitHome.yIncrement=InitHome.yIncrement+1;
            var divIndexCount=0;
            var requestID = null;
            for(divIndexCount=0;divIndexCount<10;divIndexCount++){
                var appendedImagediv = $('#appendedImagediv'+divIndexCount);
                if(appendedImagediv){
                    $(appendedImagediv).css('background-position','0px ' + InitHome.yIncrement + 'px');
                }
            }
            requestID=requestAnimationFrame(InitHome.moveImageInBackground);
            if(InitHome.yIncrement>=0)
            {
                cancelAnimationFrame(requestID); 
                InitHome.yIncrement=-100;
            }
            
        }        

        public static createDiv(divIndex,data) {
            var imageDiv = document.createElement("div");
            imageDiv.id = 'appendedImagediv' + divIndex;
            imageDiv.className = "imageholder";
            var innerDiv = document.createElement("div");
            innerDiv.id = 'appendedInnerdiv' + divIndex;
            innerDiv.className = "childdiv";
            innerDiv.innerHTML = data.n;
            imageDiv.appendChild(innerDiv);
            innerDiv.onclick = function () {
                $("#to").val($(this).parent('div').data('place').n);
                var placeData = { n: $(this).parent('div').data('place').n, i: $(this).parent('div').data('place').i };
                $("#to").data('place', placeData);
                $("#view_trip").removeClass("ui-disabled");
            };
            return imageDiv;
        }
        
        public static wireup() {
            var currentLocationString = "Current location";
            var fromCityListData = null;
            var prevPlace = null;
            
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
                                
                                if($("#from").data('place'))
                                {
                                    InitHome.addImagesDynamically(prevPlace,currentLocationString);
                                }

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
                            fromCityListData = data;
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
                    
                    InitHome.addImagesDynamically(prevPlace,currentLocationString);
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