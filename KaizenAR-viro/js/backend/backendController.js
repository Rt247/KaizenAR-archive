/* TODO: INSERT BACKEND API URL */
const url = "API SERVER URL";
let boardId = "default board id";

export function setBoardID(newBoardID) {
  boardId = newBoardID;
}


export function loginTrello() {
  return fetch(`${url}/login/`)
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
}

export function getLabels() {
  //console.log("getLabels");
  return fetch(`${url}/trello/getLabels/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getCardComments(cardId) {
  //console.log("getBoardName");
  return fetch(`${url}/trello/getCardComment/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function postCardComment(cardId, commentData) {
  //console.log("getBoardName");
  return fetch(`${url}/trello/postCardComment/${cardId}/${commentData}`)
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
}

export function getKaizenImprovements(localBoardId) {
  //console.log("getBoardName");
  return fetch(`${url}/queriesDB/getKaizenImprovements/${localBoardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function postKaizenImprovements(localBoardId, boardName, improvementData) {
  //console.log("getBoardName");
  //postKaizenImprovements(this.props.boardId, this.props.boardName, improvementData)
  const status = "Testing";
  return fetch(`${url}/queriesDB/postKaizenImprovements/${localBoardId}/${boardName}/${status}/${improvementData}`)
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardName(boardIdParam) {
  //console.log("getBoardName");
  return fetch(`${url}/trello/getBoardName/${boardIdParam}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getUserName(userId) {
  return fetch(`${url}/trello/getUserName/${userId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
export function getBoardId(userId) {
  //console.log("getBoardName");
  return fetch(`${url}/trello/getUserBoards/${userId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getUserIdMapping(userName, userPassword) {
  //console.log("getBoardName");
  return fetch(`${url}/queriesDB/getUserIdMapping/${userName}/${userPassword}`)
    .then((response) => response.text())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoard() {
  //console.log("getBoard");
  return fetch(`${url}/trello/getBoard/SkS6g4qa`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardById(boardId) {
  //console.log("getBoardById: " + boardId);
  return fetch(`${url}/trello/getBoard/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListIds() {
  //console.log("getListIds");
  return fetch(`${url}/trello/getListIds/${boardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getList(listId) {
  //console.log("getList");
  return fetch(`${url}/trello/getList/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getListName(listId) {
  //console.log("getListName");
  return fetch(`${url}/trello/getListName/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}


export function getFilteredList(labelId, listId) {
  //console.log("getFilteredList");
  return fetch(`${url}/trello/getFilteredList/${boardId}/${labelId}/${listId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getFilteredListMap(localBoardId, labelId) {
  //console.log("getFilteredListMap: " + localBoardId);
  return fetch(`${url}/trello/getFilteredListMap/${localBoardId}/${labelId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getFilteredCardMap(listId, labelId) {
  console.log("getFilteredCardMap: " + listId + " labelID: " + labelId);
  return fetch(`${url}/trello/getFilteredCardMap/${listId}/${labelId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getCardHistory(cardId) {
  //console.log("getCardHistory: " + cardId);
  return fetch(`${url}/trello/getCardHistory/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getPerformanceGraph(localBoardId) {
  //console.log("getPerformanceGraph");
  return fetch(`${url}/trello/getPerformanceGraph/${localBoardId}`)
    .then((response) => response.text())
    .then((response) => `${url}/${response}`)
    .catch((error) => {
      console.error(error);
    });
}

export function getTimeLineGraph(cardId) {
  //console.log("getTimeLineGraph");
  return fetch(`${url}/trello/getTimelineGraph/${cardId}`)
    .then((response) => response.text())
    .then((response) => `${url}/${response}`)
    .catch((error) => {
      console.error(error);
    });
}

//"http://ec2-35-177-195-223.eu-west-2.compute.amazonaws.com:8080/trello/getBoardItemsGraph/SkS6g4qa";
export function getColumnCountGraph(localBoardId) {
  //console.log("getTimeLineGraph");
  return fetch(`${url}/trello/getBoardItemsGraph/${localBoardId}`)
    .then((response) => response.text())
    .then((response) => `${url}/${response}`)
    .catch((error) => {
      console.error(error);
    });
}


//http://ec2-35-177-195-223.eu-west-2.compute.amazonaws.com:8080/trello/getOverdueCards/SkS6g4qa
export function getOverdueTicketCard(localBoardId) {
  //console.log("getBoardIdMapping");
  return fetch(`${url}/trello/getOverdueCards/${localBoardId}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getBoardIdMapping(boardPin) {
  //console.log("getBoardIdMapping");
  return fetch(`${url}/queriesDB/getBoardMapping/${boardPin}`)
    .then((response) => response.text())
    .catch((error) => {
      console.error(error);
    });
}

export function getCardMembers(cardId) {
  //console.log("getCardMembers");
  return fetch(`${url}/trello/getCardMembers/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getCardDueDate(cardId) {
  //console.log("getCardMembers");
  return fetch(`${url}/trello/getCardDueDate/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function getCheckLists(cardId) {
  //console.log("getCheckLists");
  return fetch(`${url}/trello/getCardChecklists/${cardId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
