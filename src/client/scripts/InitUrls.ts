/// <reference path="stopbystop-interfaces.ts"/>

module StopByStop {
    export class InitUrls implements IInitUrls {
        constructor(baseUrl: string, baseImageUrl: string) {
            if (typeof baseUrl !== "string") {
                baseUrl = "/";
            } else if (!/\/$/.test(baseUrl)) {
                baseUrl += "/";
            }

            this.BaseImageUrl = baseImageUrl;
            this.BaseUrl = baseUrl;
            this.RouteUrl = baseUrl + "route/";

            this.PlacesUrl = baseUrl + "place/";
            this.RouteDataUrl = baseUrl + "routedata/";
            this.PoiUrl = baseUrl + "poi/";
            this.PlacesNearbyUrl = baseUrl + "placesnearby/";

            this.PlacesUrlV2 = baseUrl + "placev2/";
            this.RouteDataUrlV2 = baseUrl + "routedatav2/";
            this.PoiUrlV2 = baseUrl + "poiv2/";
            this.PlacesNearbyUrlV2 = baseUrl + "placesnearbyv2/";

            this.CityImagesUrl = "https://az804061.vo.msecnd.net/client/content/city_images/";
        }

        public BaseUrl: string;
        public BaseImageUrl: string;
        public RouteUrl: string;

        public RouteDataUrl: string;
        public PlacesUrl: string;
        public PoiUrl: string;
        public PlacesNearbyUrl: string;

        public RouteDataUrlV2: string;
        public PlacesUrlV2: string;
        public PoiUrlV2: string;
        public PlacesNearbyUrlV2: string;
        public CityImagesUrl: string;
    }
}