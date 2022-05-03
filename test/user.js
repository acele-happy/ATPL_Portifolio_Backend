import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";

chai.should();
chai.use(chaiHttp);

describe("Test User APIs", () => {
  describe("POST /signup", () => {
    let user = {
      Name: "mwiza lorraine",
      Email: "mwiza@yahoo.com",
      Password: "mwiza123",
    };

    it("It should create a new user", async () => {
      chai
        .request(server)
        .post("/signup")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
        });
    });
  });

  describe("POST /loginAsAdmin", () => {
    let user = {
      Email: "acele@gmail.com",
      Password: "acelelkjh",
    }
    it("It should login admin only!", async () => {
      chai
        .request(server)
        .post("/loginAsAdmin")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
        });
    });
  });

  describe("POST /loginAsUser", () => {
    let user = {
      Email: "acele@gmail.com",
      Password: "acelelkjh",
    };

    it("It should login any exsting user", async () => {
      chai
        .request(server)
        .post("/loginAsUser")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
        });
    });
  });

  describe("GET /getAllUsers", () => {
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    it("It should return all users", async () => {
      chai
        .request(server)
        .get("/getAllUsers")
        .set({ Authorization: `${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
        });
    });
  });

  describe("GET /getUserById/:id", () => {
    let id = "62629e44b6676031fcb8c98c";
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyOWU0NGI2Njc2MDMxZmNiOGM5OGMiLCJQYXNzd29yZCI6ImFjZWxlbGtqaCIsImlhdCI6MTY1MDk3MzY1MX0.UnKrOFHbpf6eoVZa3qLN0zOO5ab_ndt2QKR5wl7YJuk";

    it("It should return a user with specified id", async () => {
      chai
        .request(server)
        .get("/getUserById/" + id)
        .set({ Authorization: token })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
        });
    });
  });
});
