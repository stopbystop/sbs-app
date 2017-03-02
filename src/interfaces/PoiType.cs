namespace Yojowa.StopByStop
{
    using System;

    //TODO: remove PoiType and replace PoiType2 with PoiType once this set of changes is done

    [Flags]
    public enum PoiType2
    {
        Restaurants = 1,
        GasStations = 2,
        Hotels = 4,
        Sights = 8,
        All = Restaurants | GasStations | Hotels | Sights
    }
}