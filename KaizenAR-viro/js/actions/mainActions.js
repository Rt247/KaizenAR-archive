export function checkTestAction(checkTest){
  return {
    type: "CHECK_TEST",
    checkTest
  };
}

export function setBoardId(boardId){
  return {
    type: "SET_BOARD_ID",
    boardId
  };
}

export function setUserId(userId, userName){
  return {
    type: "SET_USER_ID",
    userId,
    userName
  };
}
export function setFirstLoad(){
  return {
    type: "SET_FIRST_LOAD",
  };
}

export function setURL(url){
  return {
    type: "SET_URL",
    url
  };
}

export function setBoardName(boardName){
  return {
    type: "SET_BOARD_NAME",
    boardName
  };
}

export function setCardId(cardId){
  return {
    type: "SET_CARD_ID",
    cardId
  };
}

export function unsetCardId(){
  return {
    type: "UNSET_CARD_ID",
  };
}
export function setBoardMetric(){
  return {
    type: "SET_BOARD_METRIC",
  };
}

export function setOverDueFlag(flag){
  return {
    type: "SET_OVERDUE_FLAG",
    flag
  };
}

export function unsetBoardMetric(){
  return {
    type: "UNSET_BOARD_METRIC",
  };
}

export function setMenuViewName(menuTitle){
  return {
    type: "SET_MENU_TITLE",
    menuTitle
  };
}

export function setListID(listID){
  return {
    type: "SET_LIST_ID",
    listID,
  };
}

export function setGraphType(graphType){
  return {
    type: "SET_GRAPH_TYPE",
    graphType,
  };
}

export function setMenuOption(option){
  return {
    type: "SET_MENU_OPTION",
    option
  };
}

export function setLabelID(labelID){
  return {
    type: "SET_LABEL_ID",
    labelID
  };
}

export function setLabelName(labelName){
  return {
    type: "SET_LABEL_NAME",
    labelName
  };
}