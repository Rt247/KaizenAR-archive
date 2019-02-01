import { connect } from "react-redux";
import {setUserId} from "../actions/mainActions";
import LoginWebView from "../LoginWebView";

const mapStateToProps = state => {
  return {
    url: state.mainReducer.url,
    urlSet: state.mainReducer.urlSet,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
    setUserId: (userId, response) => dispatch(setUserId(userId, response)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWebView);