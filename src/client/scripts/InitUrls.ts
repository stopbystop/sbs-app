/// <reference path="stopbystop-interfaces.ts"/>

module StopByStop {
    export class InitUrls implements IInitUrls {
        constructor(baseUrl: string, baseImageUrl:string) {
            if (typeof baseUrl !== "string") {
                baseUrl = "/";
            } else if (!/\/$/.test(baseUrl)) {
                baseUrl += "/";
            }

            this.MapExitIconUrl = baseImageUrl + "exit_map.png";
            this.MapFoodIconUrl = baseImageUrl + "food_map2.png";
            this.MapGasIconUrl = baseImageUrl + "gas_map.png";
            this.BaseUrl = baseUrl;
            this.RouteUrl = baseUrl + "route/";
            this.PlacesUrl = baseUrl + "place/";
            this.RouteDataUrl = baseUrl + "routedata/";
            this.PoiUrl = baseUrl + "poi/";
            this.PlacesNearbyUrl = baseUrl + "placesnearby/";            
            this.CityImagesUrl = baseUrl + "client/content/city_images/";            
        }

        public BaseUrl: string;
        public RouteUrl: string;
        public RouteDataUrl: string;
        public PlacesUrl: string;
        public PoiUrl: string;
        public MapExitIconUrl: string;
        public MapFoodIconUrl: string;
        public MapGasIconUrl: string;
        public PlacesNearbyUrl: string;
        public CityImagesUrl: string;
    }
}