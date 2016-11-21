var StopByStop;
(function (StopByStop) {
    var AppState = (function () {
        function AppState() {
        }
        AppState.current = {
            baseDataUrl: null,
            baseImageUrl: null,
            app: null
        };
        return AppState;
    }());
    StopByStop.AppState = AppState;
})(StopByStop || (StopByStop = {}));
