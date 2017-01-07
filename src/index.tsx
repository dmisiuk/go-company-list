import * as React from "react";
import * as ReactDOM from "react-dom";
import {Store, createStore} from "redux";
import {count} from "./reducers/reducers";
import * as Immutable from "immutable";
import CounterContainer from "./container/CounterContainer";
import {Provider} from "react-redux";

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
const store: Store<Immutable.Map<string, any>> = devtools(createStore)(count);

ReactDOM.render(
    <Provider store={store}>
        <CounterContainer/>
    </Provider>,
    document.getElementById("example")
);
