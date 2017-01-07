import * as React from "react";

export interface CompanyProps {
    Id: string;
    Name: string;
    ClientCount: number;
}

export class Company extends React.Component<CompanyProps, {}> {
    render() {
        const {Id, Name, ClientCount} = this.props;
        return <div>
            <h2>{Id} - {Name} - {ClientCount}</h2>
        </div>;
    }
}
