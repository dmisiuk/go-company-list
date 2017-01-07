import {INCREMENT, DECREMENT} from "./action_types";
/**
 * @author Dzmitry Misiuk
 */

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

