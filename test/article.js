import chai from "chai";
import chaihttp from "chai-http";
import server from "../index.js";

//Assertion Style
chai.should();
chai.use(chaihttp);

describe("Article APIs", () => {
  //Test the Get Route
  describe("GET /getAllArticles", () => {
    it("It should get all articles", (done) => {
      chai
        .request(server)
        .get("/getAllArticles")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });

  //   // GET by {id} Test

  describe("GET /getArticleById/:id", () => {
    it("It Should return an article with specified id", (done) => {
      const id = "6250726fd94f2cc1b868de19";
      chai
        .request(server)
        .get("/getArticleById/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          // response.body.should.have.property("data");
          done()
        });
    });
  });

  // // Test POST route
describe("POST /createArticle", () => {
  it("It should create new article", (done) => {
    const article = {
      Picture: "test.jpg",
      Title: "Testing Title",
      Content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus beatae odit neque repellendus doloribus quaerat quidem esse incidunt? Veritatis qui exercitationem quisquam libero fugiat, omnis cum culpa accusantium labore ipsa!",
    };

    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    chai
      .request(server)
      .post("/createArticle")
      .send(article)
      .set({ Authorization: `${token}` })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.a("object");
        done()
      });
  });
});

// //PATCH Routes

describe("PATCH /comment/:id", () => {
  it("It should comment on an article with specified id", (done) => {
    let id = "6268f0c78d2dca6911ab4ed2";
    let comment={
     content : "test comment added!!",
     userid : "62629d15ae1d2ef1f46a417a"
    }
    const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    chai
      .request(server)
      .patch("/comment/" + id)
      .send(comment)
      .set({ Authorization: `${token}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a("object");
        done()
      });
  });
});

// //DELETE route

describe("DELETE /deleteArticle/:id", () => {
  it("I should delete an article with specified id", (done) => {
    const id = "62684de6261dc34d4036d513";
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    chai
      .request(server)
      .delete("/deleteArticle/" + id)
      .set({ Authorization: `${token}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a("object");
        done()
      });
  });
});

});

