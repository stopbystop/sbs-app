/// <reference path="tsdef/jquery.d.ts"/>
/// <reference path="tsdef/knockout-3.3.d.ts"/>
/// <reference path="tsdef/ai.d.ts"/>

module StopByStop {
    export enum TelemetryEvent {
        Add5MinToStop,
        AddStopToRoute,
        CityDropdownClick,
        FilterButtonClick,
        FilterButtonInlineExitPageClick,
        FilterMaxDistanceFromJunctionChanged,
        FilterShowGasStationsChanged,
        FilterShowRestaurantsChanged,
        LocationIN,
        LocationOUT,
        LocationOUTPopupDisplayed,
        NonBounce,
        POIGroupPageScroll,
        POIGroupSwitchList,
        POIGroupSwitchMap,
        POIPageAddToRouteClick,
        POIPageNavigateClick,
        POIPageNavigateBeforeDirect,
        Remove5MinFromStop,
        RemoveStopFromRoute,
        RoutePageScroll,
        RoutePlanNavigateClick,
        RoutePlanNavigateBeforeDirect,
        ShowStopSettingsPopup,
        SideBarThumbTouch,
        SocialButtonClick,
        StopPopupNavigateClick,
        StopPopupNavigateBeforeDirect,
        TelLinkClick,
        ViewTripButtonClick,
        YelpLinkClick,
    }

    export enum TelemetryProperty {
        FilterVisibility,
        LoadStopsFromCache,
        PageName,
        StopCount,
        NavigationUrl
    }

    export enum TelemetryMeasurement {
    }

    export class Telemetry {
        public static _appInsights: Microsoft.ApplicationInsights.IAppInsights = window["appInsights"];

        public static trackPageView(
            pageName: string,
            url: string,
            duration?: number,
            telemetryProperties: [{ k: TelemetryProperty, v: string }] = null,
            telemetryMeasurements: [{ k: TelemetryMeasurement, v: number }] = null,
            flush: boolean = false
        ): void {

            try {
                var aiProps = Telemetry.getAIProperties(telemetryProperties);
                var aiMeasurements = Telemetry.getAIMeasurements(telemetryMeasurements);
                Telemetry._appInsights.trackPageView(pageName, url, aiProps, aiMeasurements, duration);

                if (flush) {
                    Telemetry._appInsights.flush();
                }
            }
            catch (ex) {
                Telemetry.logFatal(ex);
            }
        }

        public static trackEvent(
            telemetryEvent: TelemetryEvent,
            telemetryProperties: [{ k: TelemetryProperty, v: string }] = null,
            telemetryMeasurements: [{ k: TelemetryMeasurement, v: number }] = null,
            flush: boolean = false
        ): void {

            try {
                var aiProps = Telemetry.getAIProperties(telemetryProperties);
                var aiMeasurements = Telemetry.getAIMeasurements(telemetryMeasurements);
                Telemetry._appInsights.trackEvent(TelemetryEvent[telemetryEvent], aiProps, aiMeasurements);

                if (flush) {
                    Telemetry._appInsights.flush();
                }
            }
            catch (ex) {
                Telemetry.logFatal(ex);
            }
        }

        public static trackError(
            error: Error,
            telemetryProperties: [{ k: TelemetryProperty, v: string }] = null,
            telemetryMeasurements: [{ k: TelemetryMeasurement, v: number }] = null,
            flush: boolean = false
        ): void {
            try {
                var aiProps = Telemetry.getAIProperties(telemetryProperties);
                var aiMeasurements = Telemetry.getAIMeasurements(telemetryMeasurements);
                Telemetry.logFatal(error);
                Telemetry._appInsights.trackException(error, "", aiProps, aiMeasurements);
                if (flush) {
                    Telemetry._appInsights.flush();
                }
            }
            catch (ex) {
                Telemetry.logFatal(ex);
            }
        }

        public static logToConsole(message: string) {
            if (window.console) {
                window.console.log(message);
            }
        }

        private static getAIProperties(telemetryProperties: [{ k: TelemetryProperty, v: string }]): { [name: string]: string; } {
            var aiProps: { [name: string]: string; } = {
            };
            aiProps[TelemetryProperty[TelemetryProperty.PageName]] = AppState.current.pageInfo.telemetryPageName;
            if (telemetryProperties) {
                $.each(telemetryProperties, (i, v) => { aiProps[TelemetryProperty[v.k]] = v.v; });
            }
            return aiProps;
        }

        private static getAIMeasurements(telemetryMeasurements: [{ k: TelemetryMeasurement, v: number }]): { [name: string]: number; } {
            var aiMeasurements: { [name: string]: number; } = {};
            if (telemetryMeasurements) {
                $.each(telemetryMeasurements, (i, v) => { aiMeasurements[TelemetryMeasurement[v.k]] = v.v; });
            }
            return aiMeasurements;
        }

        private static logFatal(message: any) {
            Telemetry.logErrorToConsole("ERROR-TO-TELEMETRY:" + message);
        }

       
        private static logErrorToConsole(err: any) {
            if (window.console && window.console.error) {
                if (err.message) {
                    window.console.error(err.message);
                } else {
                    window.console.error(err);
                }
            }
        }
    }
}