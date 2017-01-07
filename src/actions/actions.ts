import {
    INCREMENT, DECREMENT, ADD_COMPANY, RELOAD_COMPANY_LIST, REQUEST_COMPANIES,
    RECEIVE_COMPANIES
} from "./action_types";
import {CompanyProps} from "../components/Company";
import {Map, List} from 'immutable';
import 'isomorphic-fetch';

export interface Action<T> {
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}

export function incrementAction(): Action<number> {
    return {type: INCREMENT, payload: 1}
}

export function decrementAction(): Action<number> {
    return {type: DECREMENT, payload: 1}
}

export function addCompanyAction(company: CompanyProps): Action<CompanyProps> {
    return {type: ADD_COMPANY, payload: company}
}

function requestCompanies(): Action<any> {
    return {
        type: REQUEST_COMPANIES,
        payload: null
    }
}

function receiveCompanies(json: any): Action<List<any>> {
    return {
        type: RECEIVE_COMPANIES,
        payload: List(json)
    }
}

export function fetchCompanies() {
    return (dispatch: any) => {
        dispatch(requestCompanies());
        var any = fetch("http://localhost:8888/companies/json");
        return any
            .then(response => response.json())
            .then(json => dispatch(receiveCompanies(json)))
    }
}
