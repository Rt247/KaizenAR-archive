const request = require("supertest");
const app = require("../index.js");

describe("404 test",function(){
  it("should return 404 Error",function(done){
    request(app).get("/madeUpStory")
    .expect(404, done) // THis is HTTP response
  });
});

describe("Get Board Name", function() {
  it("Respond with Board name", function(done) {
    request(app).get("/trello/getBoardName/123456")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET Board", function() {
  it("Respond with Board", function(done) {
    request(app).get("/trello/getBoard/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET Board by ID", function() {
  it("Respond with Board", function(done) {
    request(app).get("/trello/getBoard/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET List IDs", function() {
  it("Respond with List of List IDs", function(done) {
    request(app).get("/trello/getListIds/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET List by ID", function() {
  it("Respond with List", function(done) {
    request(app).get("/trello/getList/5bbb7e4a5f79c117868a158f")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET List Name", function() {
  it("Respond with List Name", function(done) {
    request(app).get("/trello/getListName/5bbb7e4a5f79c117868a158f")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET Card History", function() {
  it("Respond with Card History", function(done) {
    request(app).get("/trello/getCardHistory/5bd2227d2017153d69c311d6")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("GET Card Members", function() {
  it("Respond with List of Card Members", function(done) {
    request(app).get("/trello/getCardMembers/5bd2227d2017153d69c311d6")
    .set('Accept', 'application/json')
    .expect(200)
    done();
  });
});

describe("GET Card Checklist", function() {
  it("Respond with Card Checklist", function(done) {
    request(app).get("/trello/getCardChecklists/5bd2227d2017153d69c311d6")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("CardComments", function() {
  it("Get, Respond with CardComments", function(done) {
    request(app).get("/trello/getCardComment/5bd2227d2017153d69c311d6")
    .set('Accept', 'application/json')
    .expect(200, done)
  });

  // Post Card Comments
    it("respond with 200 ok", function (done) {
        request(app).get("/trello/postCardComment/5bd2227d2017153d69c311d6/Test")
        .set('Accept', 'application/json')
        .expect(200, done)
    });
});

describe("GET Overdue Cards", function() {
  it("Respond with List of Overdue Cards", function(done) {
    request(app).get("/trello/getOverdueCards/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});


describe("Board Labels GET", function() {
  it("Respond with Board Labels", function(done) {
    request(app).get("/trello/getLabels/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("Kaizen Improvements GET", function() {
  it("Respond with Kaizen Improvements", function(done) {
    request(app).get("/queriesDB/getKaizenImprovements/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("Performance Graph GET", function() {
  it("Respond with Performance Graph", function(done) {
    request(app).get("/trello/getPerformanceGraph/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200)
    done();
  });
});

describe("Timeline Graph GET", function() {
  it("Respond with Timeline Graph", function(done) {
    request(app).get("/trello/getTimelineGraph/5bd2227d2017153d69c311d6")
    .set('Accept', 'application/json')
    .expect(200)
    done();
  });
});

describe("Column Count Graph GET", function() {
  it("Respond with Column Count Graph", function(done) {
    request(app).get("/trello/getBoardItemsGraph/SkS6g4qa")
    .set('Accept', 'application/json')
    .expect(200)
    done();
  });
});

describe("Filtered List GET", function() {
  it("Respond with Filtered List", function(done) {
    request(app).get("/trello/getFilteredList/SkS6g4qa/5bbb7e409c16fb124af1f73c/5bbb7e48bb0b626c65e5d1dc")
    .set('Accept', 'application/json')
    .expect(200, done)
  });
});

describe("Filtered List Map GET", function() {
  it("Respond with Filtered List Map", function(done) {
    request(app).get("/trello/getFilteredListMap/SkS6g4qa/5bbb7e409c16fb124af1f73c/")
    .set('Accept', 'application/json')
    .expect(200)
    done();
  });
});

describe("Filtered Card Map GET", function() {
  it("Respond with Filtered Card Map", function(done) {
    request(app).get("/trello/getFilteredCardMap/5bbb7e48bb0b626c65e5d1dc/5bbb7e409c16fb124af1f73c/")
    .set('Accept', 'application/json')
    .expect(200)
    done();
  });
});




