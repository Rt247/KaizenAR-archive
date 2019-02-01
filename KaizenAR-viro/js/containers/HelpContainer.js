import { connect } from "react-redux";
import HelpView from "../HelpView.js";
import {} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    //cardId: state.mainReducer.cardId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //setCardId: (cardId) => dispatch(setCardId(cardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpView);

