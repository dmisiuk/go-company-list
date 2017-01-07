import * as React from "react";
import * as ReactDOM from "react-dom";
import {Store, createStore} from "redux";
import {countReducer} from "./reducers/reducers";
import * as Immutable from "immutable";
import {Provider} from "react-redux";
import {App} from "./components/App";
import {addCompanyAction} from "./actions/actions";

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
const store: Store<Immutable.Map<string, any>> = devtools(createStore)(countReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("example")
);

