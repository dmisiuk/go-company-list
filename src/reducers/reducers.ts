import {Action} from "../actions/actions";
import {
    INCREMENT, DECREMENT, ADD_COMPANY, RELOAD_COMPANY_LIST, RECEIVE_COMPANIES,
    REQUEST_COMPANIES
} from "../actions/action_types"
import * as Immutable from "immutable";
import {CompanyProps} from "../components/Company";

let initialState = Immutable.Map(
    {
        counter: 0,
        initial: 0,
        companies: Immutable.List<CompanyProps>([])
    });

export function rootReducer(state: Immutable.Map<string, any> = initialState, action: Action<any>) {
    switch (action.type) {
        case INCREMENT:
            return state.update("counter", n => n + action.payload);
        case DECREMENT:
            return state.update("counter", n => n - action.payload);
        case ADD_COMPANY:
            return state.update("companies", l => l.push(action.payload));
        case RECEIVE_COMPANIES:
            return state.set("companies", action.payload);
        case REQUEST_COMPANIES:
            return state;
        default:
            return state
    }
}
