namespace Yojowa.StopByStop
{
    public enum POIFlight
    {
        Legacy,
        Modern
    }

    public interface IFlightManager
    {
        T GetFlightValue<T>() where T : struct;
    }
}
