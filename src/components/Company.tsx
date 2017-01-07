import * as React from "react";

export interface CompanyProps {
    id: string;
    name: string;
    clientCount: number;
}

export class Company extends React.Component<CompanyProps, {}> {
    render() {
        const {id, name, clientCount} = this.props;
        return <div>
            <h2>{id} - {name} - {clientCount}</h2>
        </div>;
    }
}
