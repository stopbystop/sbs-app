namespace Yojowa.StopByStop
{
    using System;

    //TODO: remove PoiType and replace PoiType2 with PoiType once this set of changes is done

    [Flags]
    public enum PoiType2
    {
        restaurants = 1,
        gasstations = 2,
        hotels = 4,
        sights = 8,
        all = restaurants | gasstations | hotels | sights
    }
}