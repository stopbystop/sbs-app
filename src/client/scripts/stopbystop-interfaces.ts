/// <reference path="tsdef/jquery.d.ts"/>

"use strict";

module StopByStop {

    export enum SBSApp {
        Web = 0,
        SPA = 1
    }

    export interface IInitUrls {
        BaseUrl: string;
        RouteUrl: string;
        RouteDataUrl: string;
        PlacesUrl: string;
        PoiUrl: string;
        MapExitIconUrl: string;
        MapFoodIconUrl: string;
        MapGasIconUrl: string;
        PlacesNearbyUrl: string;
        CityImagesUrl: string;
    }

    export interface IAppState {
        baseDataUrl: string;
        baseImageUrl: string;
        app: SBSApp;
        urls?: IInitUrls;
        pageInfo?: IPageInfo;
        navigationLocation?: ISBSNavigationLocation;
        knownHashChangeInProgress?: boolean;
    }

    export interface ILocation {
        /** latitude */
        a: number;
        /** longitude */
        o: number;
        /** place description */
        pd?: string;
    };

    export interface IRouteSegment {
        /** highway name */
        hn: string;
        /* ref */
        r: string;
        /** start */
        s: ILocation;
        /** end */
        e: ILocation;
        /** distance */
        d: number;
        /** portion completed */
        pc: number;
        /** start index */
        si: number;
        /** end index */
        ei: number;
        /** maneuver */
        m: string;
        /** instructions */
        i: string;
        /** junction */
        j: IRouteJunction[];
    }

    export interface IReviewGroup {
        /** name */
        n: string;
        /** icon */
        i: string;
        /** review count */
        rc: number;
        /** review page url */
        u: string;
        /** rating image url */
        riu: string;
        /** rating */
        r: number;
    }

    export interface IPoiImage {
        /** image url */
        u: string;
    }


    export interface IPoi {
        /** sbsid */
        id: string;
        /** poi category ids */
        c: string[];
        /** poi type */
        pt: PoiType;
        /** name */
        n: string;
        /** description */
        d: string;
        /** poi location */
        l: ILocation;
        /** poi images */
        i: IPoiImage[];
        /** reviews */
        rg: IReviewGroup[];
    }

    export interface IPoiCategory {
        /** sbsid */
        id: string;
        /** type */
        t: string;
        /** yid */
        yid: string;
        /** parent IDs */
        p: string[];
        /** name */
        n: string;
    }

    export interface IPoiCategoryOccurrence {
        /** category */
        cat: IPoiCategory;
        /** count of occurrences */
        c: number;
    }

    export interface IPoiOnJunction {
        /** sbsid */
        id: string;
        /** distance from junction */
        dfj: number;
        /** poi */
        p: IPoi;

    }

    export interface IJunction {
        /** name */
        n: string;
        /** index */
        i: number;
        /** osmid */
        oid: number;
        /** highway name */
        hn: string;
        /** ref */
        r: string;
        /** location */
        l: ILocation;
        /** exit to */
        et: string;
        /** exit to left */
        etl: string;
        /** exit to right */
        etr: string;
        /** pois */
        p: IPoiOnJunction[];
        /** food poi categories */
        fcat: IPoiCategoryOccurrence[];
        /** top level food categories */
        tfcat: string[];

    }

    export interface IRouteJunction {
        /** distance from route start */
        dfrs: number;
        /** time from rout start */
        tfrs: number;
        /** junction */
        j: IJunction;
    }

    export enum PoiType {
        General = 0,
        Gas = 1,
        Food = 2
    }

    export interface IRoute {
        /** from location */
        fl: ILocation;
        /** to location */
        tl: ILocation;
        /** current location */
        cl: ILocation;
        /** route id */
        rid: string;
        /** distance */
        d: number;
        /** time */
        t: number;
        /** route segments */
        s: IRouteSegment[];
        /** food poi categories */
        fcat: IPoiCategoryOccurrence[];
        /** top level food poi categories */
        tfcat: string[];
    }

    export enum SBSPage {
        home = 0,
        route = 1,
        exit = 2,
        about = 3
    }

    export interface IPageInfo {
        /** page name **/
        pageName: string;
        /** telemetry page name **/
        telemetryPageName: string;
    }

    export interface ISBSNavigationLocation {
        /** page **/
        page: SBSPage,
        /** route id **/
        routeId?: string;
        /** exit id **/
        exitId?: string;
        /** POI type **/
        poiType?: PoiType;
    }
}