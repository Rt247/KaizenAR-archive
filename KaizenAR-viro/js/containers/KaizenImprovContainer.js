import KaizenImprovement from "../KaizenImprovement";
import { connect } from "react-redux";
import {} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    boardId: state.mainReducer.boardId,
    boardName: state.mainReducer.boardName,
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
)(KaizenImprovement);