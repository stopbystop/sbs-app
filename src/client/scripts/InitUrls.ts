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

            this.PlacesDataUrlV2 = baseUrl + "placev2/";
            this.RouteDataUrlV2 = baseUrl + "routedatav2/";
            this.PoiDataUrlV2 = baseUrl + "poiv2/";
            this.PlacesNearbyDataUrlV2 = baseUrl + "placesnearbyv2/";

            this.CityImagesUrl = "https://az804061.vo.msecnd.net/client/content/city_images/";
        }

        public BaseUrl: string;
        public BaseImageUrl: string;

        public RouteDataUrlV2: string;
        public PlacesDataUrlV2: string;
        public PoiDataUrlV2: string;
        public PlacesNearbyDataUrlV2: string;
        public CityImagesUrl: string;
    }
}