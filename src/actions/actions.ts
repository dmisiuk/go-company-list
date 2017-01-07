import {INCREMENT, DECREMENT, ADD_COMPANY, RELOAD_COMPANY_LIST} from "./action_types";
import {CompanyProps} from "../components/Company";

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

export function companyReloadAction(): Action<any> {
    return {type: RELOAD_COMPANY_LIST, payload: null}
}
