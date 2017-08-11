/// <reference path="tsdef/jquery.d.ts"/>

"use strict";

module StopByStop {
    export interface IInitUrls {
        BaseUrl: string;
        BaseImageUrl: string;

        RouteDataUrlV2: string;
        PlacesDataUrlV2: string;
        PoiDataUrlV2: string;
        PlacesNearbyDataUrlV2: string;

        //image urls
        CityImagesUrl: string;
    }

    export interface IAppState {
        basePortalUrl: string;
        baseDataUrl: string;
        baseImageUrl: string;
        windowOpenTarget: string;
        urls?: IInitUrls;
        pageInfo?: IPageInfo;
        navigationLocation?: ISBSNavigationLocation;
        knownHashChangeInProgress?: boolean;
        historyDisabled?: boolean;
        metadata: IMetadata;
    }

    export interface IWebInitData {
        /** page */
        p: SBSPage;
        /** route id */
        rid: string;
        /** route */
        r: IRoute;
        /** exit id */
        exd: string;
        /** poi type */
        pt: PoiType;
        /** base data url */
        durl: string;
        /** base image url */
        iurl: string;
        /** base portal url */
        purl: string;
        /** metadata */
        m: IMetadata;

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
        /** id */
        id: string;
        /** name */
        n: string;
        /** image url */
        iu: string;
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

    export interface IPoi {
        /** sbsid */
        id: string;
        /** poi category ids */
        c: number[];
        /** poi type */
        t: PoiType;
        /** name */
        n: string;
        /** description */
        d: string;
        /** poi location */
        l: ILocation;
        /** phone number */
        p: string;
        /** url name */
        un: string;
        /** open hours */
        oh: number[];
        /** primary properties */
        pp: { [id: string]: any }
        /** secondary properties */
        sp: { [id: string]: any }
    }

    export interface IPoiCategory {
        /** sbsid */
        id: number;
        /** name */
        n: string;
        /** poi type */
        pt: PoiType;
    }

    export interface IPoiCategoryOccurrence {
        /** category */
        cat: IPoiCategory;
        /** count of occurrences */
        c: number;
    }

    export interface IPoiOnJunction {
        /** distance from junction */
        dfj: number;
        /** poi */
        p: IPoi;
        /** visibility flag */
        v: boolean;

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
    }

    export interface IRouteJunction {
        /** distance from route start */
        dfrs: number;
        /** time from route start */
        tfrs: number;
        /** junction */
        j: IJunction;
    }

    export enum PoiType {
        restaurants = 1,
        gasstations = 2,
        hotels = 4,
        sights = 8,
        all = restaurants | gasstations | hotels | sights
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
        /** metadata */
        m: IMetadata;
    }

    export enum SBSPage {
        home = 0,
        route = 1,
        exit = 2,
        poi = 3,
        about = 4
    }

    export interface IPageInfo {
        /** page name */
        pageName: string;
        /** telemetry page name */
        telemetryPageName: string;
    }

    export interface ISBSNavigationLocation {
        /** page */
        page: SBSPage,
        /** route id */
        routeId?: string;
        /** exit id */
        exitId?: string;
        /** POI type */
        poiType?: PoiType;
        /** POI id */
        poiId?: string;
        /** POI path */
        poiPath?: string;
    }

    export interface IPoiPropertyMetadata {
        id?: string;
        /** name */
        n: string;
        /** values by id */
        v?: { [id: number]: IPoiPropertyValueMetadata };
        /** is primary property */
        fp?: boolean;
    }

    export interface IPoiPropertyValueMetadata {
        /** id */
        id: number;
        /** name */
        n: string;
    }

    export interface IRootPoiCategory {
        /** poi type */
        t: PoiType;

        /** category id */
        c: number;

        /** show subcategories in filters */
        scf: boolean;

        /** name */
        n: string;

        /** property metadata */
        p: IPoiPropertyMetadata[];
    }

        export interface IMetadata {
        /** category metadata */
        c: { [id: number]: IPoiCategory };
        /** root categories by type id */
        rpc: { [id: number]: IRootPoiCategory };
        /** all properties by id */
        ppm: { [id: string]: IPoiPropertyMetadata };
    }

    export enum PoiIconFormat {
        Light = 1,
        Dark = 2,
        Map = 4
    }

}