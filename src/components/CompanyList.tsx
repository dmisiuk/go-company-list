import * as React from "react";
import * as Immutable from 'immutable'
import {Company, CompanyProps} from "./Company";
import {Table} from 'reactstrap';


export interface CompanyListProps {
    companies: Immutable.List<CompanyProps>;
}

export class CompanyList extends React.Component<CompanyListProps, {}> {
    render() {
        const {companies} = this.props;
        return companies.isEmpty() ?
            <p>Company list is empty </p>
            :
            <Table hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Client count</th>
                </tr>
                </thead>
                <tbody>
                {companies.map(company =>
                    <Company Id={company.Id} Name={company.Name} ClientCount={company.ClientCount}/>
                )}
                </tbody>
            </Table>
    }
}
