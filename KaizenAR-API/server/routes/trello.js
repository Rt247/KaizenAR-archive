const express = require('express');
const router = express.Router();

//Link to the trelloController functions in the controller folder
const trelloController = require('../controller/trelloController');

/* Route trello queries to be handled by the controller */
/* Here use router.(type of request e.g. get post)
   then the ('/sub route uri ',
   then the  trelloController.(the name of the function in controller mapped in modules.export
                               in controller trello file at bottom)) */

router.get('/getCards', trelloController.trelloQueryGetCards);

router.get('/getCardComment/:cardId', trelloController.trelloQueryGetComments);

router.get('/postCardComment/:cardId/:commentData', trelloController.trelloQueryPostComments);

router.get('/getBoardName/:boardId', trelloController.trelloQueryGetBoardName);

router.get('/getBoard/:boardId', trelloController.trelloQueryGetBoard);

router.get('/getList/:listId', trelloController.trelloQueryGetList);

router.get('/getListIds/:boardId', trelloController.trelloQueryGetListIds);

router.get('/getListName/:listId', trelloController.trelloQueryGetListName);

router.get('/getUserBoards/:userId', trelloController.trelloGetUserBoards);

router.get('/getUserName/:userId', trelloController.trelloGetUserName);



//LABEL SELECTION QUERIES

router.get('/getLabels/:boardId', trelloController.trelloQueryGetLabels);

router.get('/getLabelNCMap/:boardId', trelloController.trelloQueryGetLabelNCMap);

router.get('/getFilteredBoard/:boardId/:labelId', trelloController.trelloQueryFilteredBoard);

router.get('/getFilteredList/:boardId/:labelId/:listId', trelloController.trelloQueryFilteredList);

router.get('/getFilteredListMap/:boardId/:labelId', trelloController.trelloQueryFilteredListMap);

router.get('/getFilteredCardMap/:listId/:labelId', trelloController.trelloQueryFilteredCardMap);

router.get('/getCardHistory/:cardId', trelloController.trelloQueryGetCardHistory);

router.get('/getBoardItemsGraph/:boardId', trelloController.trelloGetBoardItemsGraph);

router.get('/getPerformanceGraph/:boardId', trelloController.trelloGetPerformanceGraph);

router.get('/getTimelineGraph/:cardId', trelloController.trelloGetTimelineGraph);

router.get('/getCardMembers/:cardId', trelloController.trelloGetCardMembers);

router.get('/getCardDueDate/:cardId', trelloController.trelloGetCardDueDate);

router.get('/getCardChecklists/:cardId', trelloController.trelloGetCardChecklists);

router.get('/getOverdueCards/:boardId', trelloController.trelloGetOverdueCards);


module.exports = router;
