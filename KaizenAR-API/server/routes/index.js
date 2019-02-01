const express = require('express');
var router = express.Router();

//Return a simple hello world without complicated database or api call
router.get('/', function(req, res, next) {
  res.send("index Hello");
});

module.exports = router;