import * as React from "react";
import CounterContainer from "../container/CounterContainer";
import CompanyListContainer from "../container/CompanyListContainer";

export interface AppProps {
}

export class App extends React.Component<AppProps, {}> {
    render() {
        return <div>
            <CompanyListContainer/>
            <CounterContainer/>
        </div>
    }
}
