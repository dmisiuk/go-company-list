import * as React from "react";
import * as Immutable from 'immutable'
import {Company, CompanyProps} from "./Company";

export interface CompanyListProps {
    companies: Immutable.List<CompanyProps>;
}

export class CompanyList extends React.Component<CompanyListProps, {}> {
    render() {
        const {companies} = this.props;
        return companies.isEmpty()?
            <p>Company list is empty </p>
            :
            <ul>
            {companies.map(company =>
             <Company id={company.id} name={company.name} clientCount={company.clientCount}/>
            )}
        </ul>
    }
}
