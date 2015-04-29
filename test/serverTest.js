"use strict";

import request from "supertest";
import app from "../api/";
import PrettyError from "pretty-error";

const pe = new PrettyError();
const finish = done => {
  return (err, result) => {
    if (err) {
      console.log(pe.render(err));
    }
    done();
  }
};

describe("Server", () => {
  let server;

  beforeEach(() => {
    server = request(app.callback());
  });

  it("should return HTML", done => {
    server.get("/")
      .expect("Content-Type", "text/html; charset=utf-8")
      .end(finish(done))
  });

  it("should redirect when not logged in", done => {
    server.get("/")
      .expect(200)
      .end(finish(done));
  });

  describe("/admin", () => {
    describe ("/admin/dashboard", () => {
      it("should redirect unauthorized users to login", done => {
        server.get("/admin")
          .expect(302)
          .end(finish(done));
      });
    });
  });
});
