/**
 * @author Dzmitry Misiuk
 */

import {connect} from 'react-redux';
import {incrementAction, decrementAction} from "../actions/actions";
import {Counter} from "../components/Counter";
import * as Immutable from "immutable";
import {Dispatch} from "redux";


const mapStateToProps = (state: Immutable.Map<string, any>) => {
    return {
        version: state.get("counter"),
        compiler: "TypeScript",
        framework: "React/Redux/Immutable.js"
    }
};

const mapDispatchToProps = (dispatch: Dispatch<Immutable.Map<string, any>>) => {
    return {
        onIncrement: () => {
            dispatch(incrementAction())
        },
        onDecrement: () => {
            dispatch(decrementAction())
        }
    }
};

const CounterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default CounterContainer
