import * as React from "react";
import CompanyListContainer from "../container/CompanyListContainer";
import CompanyReloaderContainer from "../container/CompanyReloaderContainer";

export interface AppProps {
}

export class App extends React.Component<AppProps, {}> {
    render() {
        return <div>
            <CompanyReloaderContainer/>
            <CompanyListContainer/>
        </div>
    }
}
