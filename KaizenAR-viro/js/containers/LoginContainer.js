import { connect } from "react-redux";
import LoginScreen from "../LoginScreen";
import {setFirstLoad, setURL} from "../actions/mainActions";

const mapStateToProps = state => {
  return {
    userId: state.mainReducer.currentMemberID,
    userName: state.mainReducer.currentMemberName,
    firstLoad: state.mainReducer.firstLoad
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setURL: (url) => dispatch(setURL(url)),
    setFirstLoad: () => dispatch(setFirstLoad())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);