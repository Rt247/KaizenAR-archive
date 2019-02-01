let request = require('request');
/* TODO: PLOTLY API DETAILS */
let plotly = require('plotly')("username", "user password");
var fs = require('fs');
var path = require('path');


/* TODO: INSERT TRELLO API KEY AND TOKEN */
function trelloGet(call) {
  return {
    method: 'GET',
    url: 'https://api.trello.com/1/' + call,
    qs: {
      key: 'Trello key',
      token: 'Trello Token'
    }
  };
}

/* TODO: INSERT TRELLO API KEY AND TOKEN */
function trelloPost(call) {
  return {
    method: 'POST',
    url: 'https://api.trello.com/1/' + call,
    qs: {
      key: 'Trello Key',
      token: 'Trello Token'
    }
  };
}


function trelloPostComments(req, res, next) {
  const options = trelloPost('cards/' + req.params["cardId"] + '/actions/comments?text=' + req.params["commentData"]);

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.sendStatus(response.statusCode);
  });
}

function trelloGetComments(req, res, next) {
  const options = trelloGet('cards/' + req.params["cardId"] + '/actions');

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const commentArray = [];
    const raw = JSON.parse(body);
    for (var i = 0; i < raw.length; i++) {
      if(raw[i].type === "commentCard"){
        commentArray.push({
          cardId: raw[i].id,
          userId: raw[i].idMemberCreator,
          userName: raw[i].memberCreator.username,
          date: raw[i].date,
          comment: raw[i].data.text
        });
      }
    }
    res.send(commentArray);
  });
}

//Actual function that handles the api call to trello to get cards in this example mapped in modules.export
function trelloGetCards(req, res, next) {
  const options = trelloGet('boards/' + req.params["boardId"] + '/cards');

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const arrayName = [];
    for (var i = 0; i < 3; i++) {
      arrayName.push(JSON.parse(body)[i].name);
    }
    res.send(arrayName);
  });
}

function trelloGetBoardName(req, res, next) {
  var params;
  if (req.params["boardId"] == "123456"){
    params = "SkS6g4qa";
  } else {
    params = req.params["boardId"]
  }
  const options = trelloGet('boards/' + params + '/name');
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
}

function trelloGetBoard(req, res, next) {
  const options = trelloGet('boards/' + req.params["boardId"] + '/lists?cards=all&card_fields=name,desc,labels');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const lists = [];
    const raw = JSON.parse(body);
    for (var i = 0; i < raw.length; i++) {
      lists.push({
        name: raw[i].name,
        cards: raw[i].cards
      });
    }
    res.send(lists);
  });
}


function trelloGetListIds(req, res, next) {
  const options = trelloGet('boards/' + req.params["boardId"] + '/lists?cards=open&card_fields=name&filter=open&fields=name');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const listsIds = [];
    const raw = JSON.parse(body);
    for (var i = 0; i < raw.length; i++) {
      listsIds.push(raw[i].id);
    }
    res.send(listsIds);
  });
}

function trelloGetListName(req, res, next) {
  const options = trelloGet('lists/' + req.params["listId"]);
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const raw = JSON.parse(body);
    const obj = {};
    obj["name"] = raw.name;
    res.send(obj);
  });
}

function trelloGetLabels(req, res, next) {
  const inputParams = req.params;
  const limitResults = 300;
  const options = trelloGet('boards/' + inputParams["boardId"] + '/labels?limit=' + limitResults + '&fields=name,color');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const labels = [];
    const raw = JSON.parse(body);
    for (var i = 0; i < raw.length; i++) {
      labels.push({
        id: raw[i].id,
        name: raw[i].name,
        color: raw[i].color
      });
    }
    res.send(labels);
  });
}

function trelloGetLabelNCMap(req, res, next) {
  const inputParams = req.params;
  const limitResults = 300;
  const options = trelloGet('boards/' + inputParams["boardId"] + '/labels?limit=' + limitResults + '&fields=name,color');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const mapping = {};
    const raw = JSON.parse(body);
    for (var i = 0; i < raw.length; i++) {
      if (raw[i].name !== "") {
        mapping[raw[i].color] = raw[i].name;
      }
    }
    res.send(mapping);
  });
}

function trelloGetFilterBoard(req, res, next) {
  const options = trelloGet('boards/' + req.params["boardId"] + '/lists?cards=all&card_fields=name,desc,labels');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const lists = [];
    const raw = JSON.parse(body);

    for (var i = 0; i < raw.length; i++) {
      const filteredList = raw[i].cards.filter(({
                                                  labels
                                                }) => labels.some((labelElem) => labelElem.id === req.params["labelId"]));
      lists.push({
        name: raw[i].name,
        cards: filteredList
      });
    }
    res.send(lists);
  });
}

function trelloGetList(req, res, next) {
  const inputParams = req.params;
  const options = trelloGet('lists/' + inputParams['listId'] + '/cards?fields=name,desc,labels,id');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const cards = [];
    const raw = JSON.parse(body);
    for (var i = 0; i < raw.length; i++) {
      cards.push({
        name: raw[i].name,
        desc: raw[i].desc,
        id: raw[i].id,
        labels: raw[i].labels
      });
    }
    res.send(cards);
  });
}

//:boardId/:labelId/:listId'
function trelloGetFilterList(req, res, next) {

  if(req.params["labelId"] === "none"){
    const inputParams = req.params;
    const options = trelloGet('lists/' + inputParams['listId'] + '/cards?fields=name,desc,labels,id');
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const cards = [];
      const raw = JSON.parse(body);
      for (var i = 0; i < raw.length; i++) {
        cards.push({
          name: raw[i].name,
          desc: raw[i].desc,
          id: raw[i].id,
          labels: raw[i].labels
        });
      }
      res.send(cards);
    });
  } else {
    const options = trelloGet('boards/' + req.params["boardId"] + '/lists?cards=all&card_fields=name,desc,labels');

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const cards = [];
      const raw = JSON.parse(body);

      for (var i = 0; i < raw.length; i++) {
        const filteredList = raw[i].cards.filter(({
                                                    labels
                                                  }) => labels.some((labelElem) => labelElem.id === req.params["labelId"]));

        if (req.params["listId"] === raw[i].id) {
          res.send(filteredList);
        }
      }

    });
  }
}

//:boardId/:labelId'
function trelloGetFilterListMap(req, res, next) {

  if(req.params["labelId"] === "none"){
    const inputParams = req.params;
    const options = trelloGet('boards/' + inputParams['boardId'] + '/lists/open');
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const listMap = [];
      const raw = JSON.parse(body);
      for (var i = 0; i < raw.length; i++) {
        listMap.push({
          listName: raw[i].name,
          listId: raw[i].id,
        });
      }
      res.send(listMap);
    });
  } else {
    const options = trelloGet('boards/' + req.params["boardId"] + '/lists?cards=all&card_fields=name,desc,labels');

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const cards = [];
      const raw = JSON.parse(body);

      for (var i = 0; i < raw.length; i++) {
        const filteredList = raw[i].cards.filter(({
                                                    labels
                                                  }) => labels.some((labelElem) => labelElem.id === req.params["labelId"]));

        if (req.params["listId"] === raw[i].id) {
          res.send(filteredList);
        }
      }

    });
  }
}

function trelloGetOverdueCards(req, res, next){

  // Grab all cards where due date is over current date
  // and dueComplete is false

  const options = trelloGet('boards/' + req.params["boardId"] + '/cards');

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const cardMap = [];
    const rawActions = JSON.parse(body);
    for (var i = 0; i < rawActions.length; i++) {
      //  if (!(rawActions[i].due === "null")) {
      var dateOut = Date.parse(rawActions[i]["due"]);
      var dateNow = new Date().toDateString();
      if (dateOut < Date.parse(dateNow)) {

        if (!rawActions[i]["dueComplete"]) {
          cardMap.push({
            cardName: rawActions[i].name,
            cardId: rawActions[i].id,
            dueDate: rawActions[i].due,
          });
        }
      }

    }
    res.send(cardMap);
  });
}

function trelloGetUserBoards(req, res, next) {
  const options = trelloGet('members/' + req.params["userId"] + '/boards?filter=starred&fields=all&lists=none&memberships=active&organization=false');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const raw = JSON.parse(body);
    const boardIds = [];
    for (var i = 0; i < raw.length; i++) {
      boardIds.push({
        boardId: raw[i].id,
        boardName: raw[i].name
      });
    }
    res.send(boardIds);
  });
}

function trelloGetUserName(req, res, next) {
  const options = trelloGet('members/' + req.params["userId"] + '/fullName');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const raw = JSON.parse(body);
    res.send(raw);
  });
}


//:boardId/:labelId'
function trelloGetFilterCardMap(req, res, next) {

  if(req.params["labelId"] === "none"){
    const inputParams = req.params;
    const options = trelloGet('lists/' + inputParams['listId'] + '/cards?fields=id,name');
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const cardMap = [];
      const raw = JSON.parse(body);
      for (var i = 0; i < raw.length; i++) {
        cardMap.push({
          cardName: raw[i].name,
          cardId: raw[i].id,
        });
      }
      res.send(cardMap);
    });
  } else {
    const inputParams = req.params;
    const options = trelloGet('lists/' + inputParams['listId'] + '/cards?fields=id,name,labels');
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const cardMap = [];
      const raw = JSON.parse(body);
      for (var i = 0; i < raw.length; i++) {
        for(var j = 0; j < raw[i].labels.length; j++){
          if(raw[i].labels[j].id === inputParams['labelId']){
            cardMap.push({
              cardName: raw[i].name,
              cardId: raw[i].id,
            });
          }
        }
      }
      res.send(cardMap);
    });

  }
}

function trelloGetCardHistory(req, res, next) {
  const options = trelloGet('cards/' + req.params["cardId"] + '/actions?filter=all');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const actions = [];
    const raw = JSON.parse(body);
    // first action will always be createCard
    const firstAction = raw.pop();
    actions.push({
      column: firstAction.data.list.name,
      date: firstAction.date
    });

    // actions are given in order from newest to oldest, so traverse in reverse order
    for (var i = raw.length - 1; i >= 0; i--) {
      // only update with actions that involve the moving of a card
      if ("listAfter" in raw[i].data) {
        actions.push({
          column: raw[i].data.listAfter.name,
          date: raw[i].date
        });
      }
    }
    res.send(actions);
  });
}

function trelloGetCardMembers(req, res, next) {
  const options = trelloGet('cards/' + req.params["cardId"] + '/members');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const raw = JSON.parse(body);
    console.log(raw);
    res.send(raw);
  });
}

function trelloGetCardDueDate(req, res, next) {
  const options = trelloGet('cards/' + req.params["cardId"] + '/due');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const raw = JSON.parse(body);
    console.log(raw);
    res.send(raw);
  });
}

function trelloGetCardChecklists(req, res, next) {
  const options = trelloGet('cards/' + req.params["cardId"] + '/checklists');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const raw = JSON.parse(body);
    console.log(raw);
    res.send(raw);
  });
}

function trelloGetBoardItemsGraph(req, res, next) {
  // Get all actions of the board
  const options = trelloGet('boards/' + req.params["boardId"] + '/lists?cards=all&card_fields=all&filter=open&fields=all');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var lists = [];
    var num_cards = [];
    const rawLists = JSON.parse(body);
    for (var i = 0; i < rawLists.length; i++) {
      lists.push(rawLists[i]['name']);
      num_cards.push(rawLists[i]['cards'].length)
    }
    console.log(lists);
    console.log(num_cards);

    var trace1 = [{
      y: num_cards,
      x: lists,
      type: "bar"
    }];

    var layout = {
      title: "Number of cards in each list",
      xaxis: {
        title: "Lists",
        titlefont: {
          family: "Arial, sans-serif",
          size: 18,
          color: "black"
        },
        exponentformat: "e",
        showexponent: "All"
      },
      yaxis: {
        title: "Number of cards",
        titlefont: {
          family: "Arial, sans-serif",
          size: 18,
          color: "black"
        },
        // showticklabels: true,
        // tickfont: {
        //   family: "Old Standard TT, serif",
        //   size: 14,
        //   color: "black"
        // },
        exponentformat: "e",
        showexponent: "All"
      }
    };

    var figure = {
      layout: layout,
      'data': trace1
    };

    var imgOpts = {
      format: 'png',
      width: 1000,
      height: 500
    };

    // Get the image of plotted graph from plotly
    plotly.getImage(figure, imgOpts, function (error, imageStream) {
      if (error) return console.log(error);
      // Set a filename with random number
      var filename = "boardplot" + Math.floor(Math.random() * 90000) + 10000 + ".png";
      var fileStream = fs.createWriteStream(filename);
      imageStream.on('end', function () {
        // When pipe finishes, send the file
        res.send(filename);
      }).pipe(fileStream);
    });
  });


}

function trelloGetPerformanceGraph(req, res, next) {
  // Get all actions of the board
  const options = trelloGet('boards/' + req.params["boardId"] + '/actions/');
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var dates = [];
    var first_day = "";
    const rawActions = JSON.parse(body);
    for (var i = 0; i < rawActions.length; i++) {
      // Get all actions that a card is move to Done
      if (first_day = "" || rawActions[i]["date"].localeCompare(first_day, "en-US")) {
        first_day = rawActions[i]["date"];
      }
      if ("listAfter" in rawActions[i]["data"]) {
        if (rawActions[i]["data"]["listAfter"]["name"] === "Done") {
          // Store the date a card is move to Done in a list
          dates.push(rawActions[i]["date"].slice(0, 10));
        }
      }
    }
    dates.sort(function (a, b) {
      // Sort the dates
      return a.localeCompare(b, "en-US");
    });

    var x = [];
    var y = [];
    var prev = first_day.slice(0, 10);
    var pushed = false;

    // Push starting date to x and 0 (no card completed) to y.
    x.push(first_day.slice(0, 10));
    y.push(0);

    for (var i = 0; i < dates.length; i++) {
      // Put the date in x and cumulative frequency to y.
      if (dates[i] !== prev) {
        x.push(dates[i]);
        if (!pushed) {
          y.push(1);
        } else {
          y.push(y[y.length - 1] + 1);
        }
        pushed = true;
      } else {
        y[y.length - 1]++;
      }
      prev = dates[i];
    }

    // Datas for plotly
    var trace1 = [{
      x: x,
      y: y,
      type: "scatter"
    }];

    var layout = {
      title: "Number of cards that is move to Done on or before the date",
      xaxis: {
        title: "Date",
        titlefont: {
          family: "Arial, sans-serif",
          size: 18,
          color: "black"
        },
        // showticklabels: true,
        // tickfont: {
        //   family: "Old Standard TT, serif",
        //   size: 14,
        //   color: "black"
        // },
        exponentformat: "e",
        showexponent: "All"
      },
      yaxis: {
        title: "Number of cards",
        titlefont: {
          family: "Arial, sans-serif",
          size: 18,
          color: "black"
        },
        exponentformat: "e",
        showexponent: "All"
      }
    };

    var figure = {
      layout: layout,
      'data': trace1
    };

    var imgOpts = {
      format: 'png',
      width: 1000,
      height: 500
    };

    // Get the image of plotted graph from plotly
    plotly.getImage(figure, imgOpts, function (error, imageStream) {
      if (error) return console.log(error);
      // Set a filename with random number
      var filename = "plot" + Math.floor(Math.random() * 90000) + 10000 + ".png";
      var fileStream = fs.createWriteStream(filename);
      imageStream.on('end', function () {
        // When pipe finishes, send the file
        res.send(filename);
      }).pipe(fileStream);
    });
  });
}

function trelloGetTimelineGraph(req, res, next) {
  // Get all actions of the card
  const options = trelloGet('cards/' + req.params["cardId"] + '/actions?filter=updateCard,createCard&limits=100/');
  request(options, function (error, response, body) {

    var dates = []
    var listsOutDates = []
    var curList = ""
    var curDate = ""
    var today = (new Date()).toLocaleDateString();
    console.log(body);
    const rawActions = JSON.parse(body);
    for (var i = 0; i < rawActions.length; i++) {
      if (rawActions[i]["type"] === "createCard") {
        // Store the date of the card created
        var date = rawActions[i]["date"].slice(0, 19);
        console.log("Date: " + new Date(date).toISOString());
        if (!dates.includes(dateOut)) {
          dates.push(date);
        }

        var listName = rawActions[i]["data"]["list"]["name"];
        var match2 = listsOutDates.filter(i => i["name"] == listName);
        if (match2.length == 0) {
          // If the card haven't been pushed to the list before
          listsOutDates.push({"name": listName, "dates":[]});
        }
        if (curDate == "") {
          curList = listName;
          curDate = rawActions[i]["date"];
        }
      } else if (rawActions[i]["type"] === "updateCard" && rawActions[i]["data"].hasOwnProperty("listBefore")) {
        var listOutName = rawActions[i]["data"]["listBefore"]["name"];
        var dateOut = rawActions[i]["date"].slice(0, 19);
        if (!dates.includes(dateOut)) {
          dates.push(dateOut);
        }
        var match = listsOutDates.filter(i => i["name"] == listOutName);
        if (match.length == 0) {
          // If the card haven't been pushed to the list before
          listsOutDates.push({"name": listOutName, "dates":[dateOut]});
        } else {
          for (var m = 0; m < listsOutDates.length; m++) {
            if (listsOutDates[m]["name"] == listOutName) {
              listsOutDates[m]["dates"].push(dateOut);
            }
          }
        }

        var listInName = rawActions[i]["data"]["listAfter"]["name"];
        if (curDate == "") {
          curList = listInName;
          curDate = rawActions[i]["date"];
        }
      }
    }

    dates.sort(function (a, b) {
      // Sort the dates
      return a.localeCompare(b, "en-US");
    });

    var data = [];

    var maxDay = 0;

    for (var d = 1; d < dates.length; d++) {

      var x1 = [];
      var y1 = [];
      var x2 = [];
      var y2 = [];

      for (var i = 0; i < listsOutDates.length; i++) {
        var dateIn = new Date(dates[d-1]);
        var dateOut = new Date(dates[d]);
        var timeDiff = Math.abs(dateOut.getTime() - dateIn.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (listsOutDates[i]["dates"].includes(dates[d])) {
          maxDay += diffDays;
          x1.push(diffDays);
          x2.push(0);
        } else {
          x1.push(0);
          x2.push(diffDays);
        }
        y1.push(listsOutDates[i]["name"]);
        y2.push(listsOutDates[i]["name"]);

      }

      console.log("x1: " + x1);
      console.log("x2: " + x2);
      console.log("y1: " + y1);
      console.log("y2: " + y2);

      var trace1 = {
        x: x1,
        y: y1,
        type: "bar",
        marker: {color: "rgb(55, 83, 109)"},
        orientation: 'h'
      }

      var trace2 = {
        x: x2,
        y: y2,
        type: "bar",
        marker: {color: "rgb(255, 255, 255)"},
        orientation: 'h'
      }

      data.push(trace1);
      data.push(trace2);

      console.log(dates[d]);
    }

    var xLast = [];
    var yLast = [];

    var match = listsOutDates.filter(i => i["name"] == curList);
    var xLast2 = [];
    var yLast2 = [];
    if (match.length == 0) {
      xLast2.push(maxDay);
      yLast2.push(curList);
      var traceLast2 = {
        x: xLast2,
        y: yLast2,
        type: "bar",
        marker: {color: "rgb(255, 255, 255)"},
        orientation: 'h'
      }

      data.push(traceLast2);
    }

    var dateIn = new Date(curDate);
    var dateOut = new Date();
    var timeDiff = Math.abs(dateOut.getTime() - dateIn.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    xLast.push(diffDays);
    yLast.push(curList);

    var traceLast = {
      x: xLast,
      y: yLast,
      type: "bar",
      marker: {color: "rgb(55, 83, 109)"},
      orientation: 'h'
    }

    data.push(traceLast);

    console.log("Today: " + dateOut.toLocaleDateString() + " " + diffDays);
    console.log("cur: " + curDate + " " + curList);

    console.log(dates);
    console.log(listsOutDates);

    var layout = {
      title: "Number of days <br> the chosen card stays in a list",
      automargin: true,
      titlefont: {
        family: "Arial, sans-serif",
        size: 50,
        color: "black"
      },
      xaxis: {
        automargin: true,
        title: "number of days",
        titlefont: {
          family: "Arial, sans-serif",
          size: 50,
          color: "black"
        },
        showticklabels: true,
        tickfont: {
          family: "Old Standard TT, serif",
          size: 30,
          color: "black"
        },
        exponentformat: "e",
        showexponent: "All"
      },
      yaxis: {
        automargin: true,
        title: "lists",
        titlefont: {
          family: "Arial, sans-serif",
          size: 50,
          color: "black"
        },
        side:'left',
        showticklabels: true,
        tickfont: {
          family: "Old Standard TT, serif",
          size: 30,
          color: "black"
        },
        exponentformat: "e",
        showexponent: "All"
      },
      barmode: "stack"
    };

    var figure = {
      layout: layout,
      'data': data
    };

    var imgOpts = {
      format: 'png',
      width: 1000,
      height: 1500
    };

    // Get the image of plotted graph from plotly
    plotly.getImage(figure, imgOpts, function (error, imageStream) {
      if (error) return console.log(error);
      // Set a filename with random number
      var filename = "cardplot" + Math.floor(Math.random() * 90000) + 10000 + ".png";
      var fileStream = fs.createWriteStream(filename);
      imageStream.on('end', function () {
        // When pipe finishes, send the file
        res.send(filename);
      }).pipe(fileStream);
    });
  });
}



//Represents mapping between query function in routes folder files to functions in this file
module.exports = {
  trelloQueryGetCards: trelloGetCards,
  trelloQueryGetComments: trelloGetComments,
  trelloQueryGetBoardName: trelloGetBoardName,
  trelloQueryGetBoard: trelloGetBoard,
  trelloQueryGetList: trelloGetList,
  trelloQueryGetListIds: trelloGetListIds,
  trelloQueryGetListName: trelloGetListName,
  trelloQueryGetLabels: trelloGetLabels,
  trelloQueryGetLabelNCMap: trelloGetLabelNCMap,
  trelloQueryFilteredBoard: trelloGetFilterBoard,
  trelloQueryFilteredList: trelloGetFilterList,
  trelloQueryFilteredListMap: trelloGetFilterListMap,
  trelloQueryFilteredCardMap: trelloGetFilterCardMap,
  trelloQueryGetCardHistory: trelloGetCardHistory,
  trelloGetBoardItemsGraph: trelloGetBoardItemsGraph,
  trelloGetPerformanceGraph: trelloGetPerformanceGraph,
  trelloGetTimelineGraph: trelloGetTimelineGraph,
  trelloGetCardMembers: trelloGetCardMembers,
  trelloGetCardDueDate: trelloGetCardDueDate,
  trelloGetCardChecklists: trelloGetCardChecklists,
  trelloGetOverdueCards: trelloGetOverdueCards,
  trelloGetUserBoards: trelloGetUserBoards,
  trelloGetUserName: trelloGetUserName,
  trelloQueryPostComments: trelloPostComments,
};
