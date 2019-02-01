const pgp = require("pg-promise")({
  //Initialisation Options
});

/* TODO: DATABASE CONNECTION INFORMATION */
const cn = {
  host: "host",
  port: "port numver",
  database: "database name ",
  user: "database user name",
  password: "Database password",
  ssl: true
};

var db = pgp(cn);


function testVersionQuery(req, res, next) {
  console.log("QUERY VERSION");
  db.any("select version()")
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getBoardMappingQuery(req, res, next) {

  let boardPin = req.params["boardPin"];
  const query = `SELECT "BOARD_ID" FROM public."BOARD_MAPPING" WHERE "BOARD_PIN" = ${boardPin};`;
  db.any(query)
    .then(data => {
      res.send(data[0].BOARD_ID);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserBoardsQuery(req, res, next) {
  let userId = req.params["userId"];

  const query = `SELECT board_id, "boardName" FROM public."USER_BOARDS" WHERE "user_id" = '${userId}';`;
  db.any(query)
    .then(data => {
      const boardIds = [];
      for (var i = 0; i < data.length; i++) {
        boardIds.push({
          boardId: data[i].board_id,
          boardName: data[i].boardName
        });
      }
      res.send(boardIds);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserIdMappingQuery(req, res, next) {
  let userName = req.params["userName"];
  let userPassword = req.params["userPassword"];

  //SELECT user_id FROM public."USER_ID_LOGIN" WHERE user_name = '${userName}';
  const query = `SELECT user_id FROM public."USER_ID_LOGIN" WHERE user_name = '${userName}';`;
  db.any(query)
    .then(data => {
      res.send(data[0].user_id);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getKaizenImprovementsQuery(req, res, next) {

  let boardId = req.params["boardId"];
  const query = `SELECT id, board_id, improvement, status, board_name	FROM public."KAIZEN_IMPROVEMENTS";`;

  db.any(query)
    .then(data => {
      const sections = [];
      for (var i = 0; i < data.length; i++) {
        var dataConcat = `${data[i].improvement}: ${data[i].status}`;
        let index = sections.findIndex(obj => (obj.title === data[i].board_name));

        if (index !== -1) {
          sections[index].data.push(dataConcat);
        } else {
          sections.push({
            title: data[i].board_name,
            data: [dataConcat],
          });
        }

      }
      res.send(sections);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function postKaizenImprovementsQuery(req, res, next) {

  let boardId = req.params["boardId"];
  let boardName = req.params["boardName"];
  let status = req.params["status"];
  let improvData = req.params["improvData"];
  const query = `INSERT INTO public."KAIZEN_IMPROVEMENTS"(board_id, improvement, status, board_name)	VALUES ('${boardId}', '${improvData}', '${status}', '${boardName}');`;
  db.any(query)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

module.exports = {
  testVersion: testVersionQuery,
  getBoardMapping: getBoardMappingQuery,
  getUserBoards: getUserBoardsQuery,
  getUserIdMapping: getUserIdMappingQuery,
  getKaizenImprovements: getKaizenImprovementsQuery,
  postKaizenImprovements: postKaizenImprovementsQuery,
};