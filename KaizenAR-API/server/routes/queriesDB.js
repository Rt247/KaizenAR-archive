const express = require("express");
const router = express.Router();

const db = require("../models/queriesDB");

router.get("/version", db.testVersion);
router.get("/getBoardMapping/:boardPin", db.getBoardMapping);
router.get("/getUserBoards/:userId", db.getUserBoards);
router.get("/getUserIdMapping/:userName/:userPassword", db.getUserIdMapping);
router.get("/getKaizenImprovements/:boardId", db.getKaizenImprovements);
router.get("/postKaizenImprovements/:boardId/:boardName/:status/:improvData", db.postKaizenImprovements);

module.exports = router;
