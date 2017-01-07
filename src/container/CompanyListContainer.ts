/**
 * @author Dzmitry Misiuk
 */

import {connect} from 'react-redux';
import {incrementAction, decrementAction} from "../actions/actions";
import {Counter} from "../components/Counter";
import * as Immutable from "immutable";
import {Dispatch} from "redux";
import {CompanyList} from "../components/CompanyList";


const mapStateToProps = (state: Immutable.Map<string, any>) => {
    return {
        companies: state.get("companies"),
    }
};

const mapDispatchToProps = (dispatch: Dispatch<Immutable.Map<string, any>>) => {
    return {
    }
};

const CompanyListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyList);

export default CompanyListContainer
