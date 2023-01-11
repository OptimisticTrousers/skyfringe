import request from "supertest";
import assert from "assert";
import app from "../app";


app.get("/user", (req, res) => {
  res.status(200).json({ name: "john" });
});

describe("GET /user", () => {
  test("responds with json", (done) => {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
