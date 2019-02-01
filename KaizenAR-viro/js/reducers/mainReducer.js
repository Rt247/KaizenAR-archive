const mainReducer = (state = {
  test: "test",
  labelID: "none",
  labelName: "",
  labelSet: false,
  boardId: "",
  boardName: "",
  titlePicked: false,
  listID: "",
  listSet: false,
  cardId: "None",
  menuTitle: "",
  cardChosen: false,
  boardMetricChosen: false,
  option: "Main Menu",
  url: "",
  urlSet: false,
  overDueFlag: false,
  currentMemberID: "none",
  currentMemberName: "none",
  firstLoad: true,
}, action) => {
  switch (action.type) {
    case "CHECK_TEST":
      return { ...state, test: "Checked test", testCheck: action.checkTest};
    case "SET_BOARD_ID":
      return { ...state, boardId: action.boardId};
    case "SET_USER_ID":
      return { ...state, currentMemberID: action.userId, currentMemberName: action.userName};
    case "SET_URL":
      return { ...state, url: action.url, urlSet: true};
    case "SET_BOARD_NAME":
      return { ...state, boardName: action.boardName};
    case "UNSET_CARD_ID":
      return { ...state, cardChosen: false};
    case "SET_FIRST_LOAD":
      return { ...state, firstLoad: false};
    case "SET_CARD_ID":
      return { ...state, cardId: action.cardId, cardChosen: true};
    case "SET_GRAPH_TYPE":
      return { ...state, graphType: action.graphType};
    case "UNSET_BOARD_METRIC":
      return { ...state, boardMetricChosen: false};
    case "SET_OVERDUE_FLAG":
      return { ...state, overDueFlag: action.flag};
    case "SET_BOARD_METRIC":
      return { ...state, boardMetricChosen: true};
    case "SET_MENU_TITLE":
      return { ...state, menuTitle: action.menuTitle, titlePicked: true};
    case "SET_LIST_ID":
      return { ...state, listID: action.listID, listSet: true};
    case "SET_LABEL_ID":
      return { ...state, labelID: action.labelID, labelSet: true};
    case "SET_LABEL_NAME":
      return { ...state, labelName: action.labelName, labelSet: true};
    case "SET_MENU_OPTION":
      return { ...state, option: action.option};
    default:
      return state;
  }
};

export default mainReducer;
