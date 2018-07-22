const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const { server, db } = require("../server");

const person = {
  name: "name",
  email: "helloabc@gmai.com",
  street: "malcom",
  city: "New york",
  state: "florida",
  zip: "234567",
  number: "8923774847",
};

after(() => {
  db.close();
});

describe("get /contactlist", () => {
  it("should return 200 status code", done => {
    request(server)
      .get("/contactlist")
      .expect(200, done);
  });
});

describe("get /contactlist/:id", () => {
  let id;
  before(done => {
    request(server)
      .post("/contactlist")
      .set("Content-Type", "application/json")
      .send(person)
      .end((err, res) => {
        if (err) return done(err);
        id = res.body._id;
        done();
      });
  });
  it("should return 200 status code", done => {
    request(server)
      .get("/contactlist/" + id)
      .expect(200, done);
  });
});

describe("post /contactlist", () => {
  it("should return 200 status code", done => {
    request(server)
      .post("/contactlist")
      .set("Content-Type", "application/json")
      .send(person)
      .expect(200, done);
  });
});

describe("put /contactlist", () => {
  let id;
  before(done => {
    request(server)
      .post("/contactlist")
      .set("Content-Type", "application/json")
      .send(person)
      .end((err, res) => {
        if (err) return done(err);
        console.log("put body:", res.body);
        id = res.body._id;
        done();
      });
  });
  it("should return 200 status code", done => {
    request(server)
      .put(`/contactlist/${id}`)
      .send(person)
      .set("Content-Type", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

after(function() {
  server.close();
});
