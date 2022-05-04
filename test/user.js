import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";

chai.should();
chai.use(chaiHttp);

describe("Test User APIs", () => {
  describe("POST /signup", () => {
    const user = {
      Name: "mwiza lorraine",
      Email: "mwiza@yahoo.com",
      Password: "mwiza123",
    };

    it("It should create a new user", (done) => {
      chai
        .request(server)
        .post("/signup")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done()
        });
    });
  });

  describe("POST /loginAsAdmin", () => {
    let user = {
      Email: "acele@gmail.com",
      Password: "acelelkjh",
    }
    it("It should login admin only!",  (done) => {
      chai
        .request(server)
        .post("/loginAsAdmin")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object')
          done()
        });
    });
  });

  describe("POST /loginAsUser", () => {
    let user = {
      Email: "acele@gmail.com",
      Password: "acelelkjh",
    };

    it("It should login any exsting user", (done) => {
      chai
        .request(server)
        .post("/loginAsUser")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object')
          done()
        });
    });
  });

  describe("GET /getAllUsers", () => {
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    it("It should return all users",(done) => {
      chai
        .request(server)
        .get("/getAllUsers")
        .set({ Authorization: `${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done()
        });
    });
  });

  describe("GET /getUserById/:id", () => {
    let id = "62629d15ae1d2ef1f46a417a";
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    it("It should return a user with specified id", (done) => {
      chai
        .request(server)
        .get("/getUserById/" + id)
        .set({ Authorization: token })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done()
        });
    });
  });

  describe("DELETE /deleteUser/:id",()=>{
    let id = "62629d15ae1d2ef1f46a417a";
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    it("It should delete a user with specified id",(done)=>{
      chai
          .request(server)
          .delete('/deleteUser/'+id)
          .set({Authorization: token})
          .end((err,response)=>{
            response.should.have.status(200)
            response.should.be.a('object')
            done()
          })
    })
  })
});
