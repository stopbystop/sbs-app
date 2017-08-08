namespace Yojowa.StopByStop
{
    public class RouteOptions
    {
        /// <summary>
        /// When set to true only exits with non-empty ExitTo, ExitToLeft, ExitToRight are included
        /// </summary>
        public bool ExcludeJunctionsWithoutExitInfo { get; set; }

        public bool OldTableNames { get; set; }

        public RouteOptions()
        {
        }

        public RouteOptions(bool ExcludeJunctionsWithoutExitInfo)
        {
            this.ExcludeJunctionsWithoutExitInfo = ExcludeJunctionsWithoutExitInfo;
        }

    }
}