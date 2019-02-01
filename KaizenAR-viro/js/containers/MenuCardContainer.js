import { connect } from "react-redux";
import ARTrelloCard from "../ARTrelloCard";
import {setCardId, setMenuOption, setMenuViewName, unsetBoardMetric, unsetCardId} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    listID: ownProps.listID,
    disArr: ownProps.disArr,
    listSet: ownProps.listSet,
    labelID: state.mainReducer.labelID,
    boardId: state.mainReducer.boardId,
    overDueFlag: state.mainReducer.overDueFlag,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle)),
    setMenuOption: (option) => dispatch(setMenuOption(option)),
    unsetCardId: () => dispatch(unsetCardId()),
    unsetBoardMetric: () => dispatch(unsetBoardMetric()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ARTrelloCard);