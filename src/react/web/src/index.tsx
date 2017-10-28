import * as React from "react";
import * as ReactDOM from "react-dom";

import { Main } from "./components/Main";
import * as injectTapEventPlugin from "react-tap-event-plugin";


injectTapEventPlugin();
ReactDOM.render(
    <Main compiler="TypeScript" framework="React" />,
    document.getElementById("app")
);