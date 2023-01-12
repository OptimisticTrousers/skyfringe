import request from "supertest";
import assert from "assert";
import app from "../app";
import initializeMongoServer from "../config/mongoConfigTesting";

describe("POST /register", () => {
  beforeAll(() => {
    initializeMongoServer();
  });
  test("user makes an account with an email that already exists", (done) => {
    const user = {
      firstName: "Bob",
      lastName: "Jones",
      email: "bobjones@gmail.com",
      password: "bobjones",
    };
    request(app)
      .post("/api/auth/register")
      .send({ user })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
  test("user creates an account");
});
