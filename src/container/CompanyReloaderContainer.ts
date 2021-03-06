/**
 * @author Dzmitry Misiuk
 */
import {connect} from "react-redux";
import {fetchCompanies} from "../actions/actions";
import * as Immutable from "immutable";
import {Dispatch} from "redux";
import {CompanyReloader} from "../components/CompanyReloader";


const mapStateToProps = (state: Immutable.Map<string, any>) => {
    return {}
};

const mapDispatchToProps = (dispatch: Dispatch<Immutable.Map<string, any>>) => {
    return {
        onReload: () => {
            dispatch(fetchCompanies())
        }
    }
};

const CompanyReloaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReloader);

export default CompanyReloaderContainer
