import { connect } from "react-redux";
import CommentModal from "../CommentModal.js";
import {} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    cardId: state.mainReducer.cardId,
    cardChosen: state.mainReducer.cardChosen,
    currentMemberID: state.mainReducer.currentMemberID,
    currentMemberName: state.mainReducer.currentMemberName,
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
)(CommentModal);

