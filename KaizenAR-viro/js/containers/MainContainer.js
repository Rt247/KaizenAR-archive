import { connect } from "react-redux";
import App from "../../App";

const mapStateToProps = state => {
  return {
    //prop: state.mainReducer.paramter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);