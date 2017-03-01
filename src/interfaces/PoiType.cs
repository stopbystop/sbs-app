namespace Yojowa.StopByStop
{
    using System;

    [Flags]
    public enum PoiType
    {
        General = 0,
        Gas = 1,
        Food = 2,
    }

    //TODO: remove PoiType and replace PoiType2 with PoiType once this set of changes is done
    public enum PoiType2
    {
        Restaurants,
        GasStations,
        Hotels,
        Sights
    }
}