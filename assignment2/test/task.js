const should = require("chai").should();
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

//Assertion

chai.use(chaiHttp);

describe("POST /user ", () => {
  const userCredentials = {
    email: "kgore1511@gmail.com",
    password: "123456",
  };

  it("user should login", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        done();
      });
  });

  const registerCredentials = {
    name: "admin",
    email: "admin@gmail.com",
    password: "123456",
  };
  it("user should not Register", (done) => {
    chai
      .request(server)
      .post("/user/register")
      .send(registerCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        //res.body.should.be.a("Object");
        done();
      });
  });

  it("user should login", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        done();
      });
  });

  it("user should not login", (done) => {
    chai
      .request(server)
      .post("/user/login")
      //.send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("Object");
        done();
      });
  });
});

describe("GET /news", () => {
  it("It should get news", (done) => {
    chai
      .request(server)
      .get("/weather")
      .send(process.env.ACCESS_TOKEN_SECRET)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.have.property("data");
        done();
      });
  });

  it("It should not get news", (done) => {
    chai
      .request(server)
      .get("/news")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("GET /weather", () => {
  it("It should get weather", (done) => {
    chai
      .request(server)
      .get("/weather")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.have.property("data").with.lengthOf(5);
        done();
      });
  });

  it("It should not get weather", (done) => {
    chai
      .request(server)
      .get("/wheather")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
