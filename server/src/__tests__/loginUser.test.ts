import request from "supertest";
import assert from "assert";
import app from "../app";

describe("POST /login", () => {
  test("user ", (done) => {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
