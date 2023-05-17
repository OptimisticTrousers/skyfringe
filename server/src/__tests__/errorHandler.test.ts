import errorHandler from "../middleware/errorHandler";
import request from "supertest";
import express from "express";

// Define isolated app for middleware unit testing
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Define custom route with basic req/res
app.post("/", (req, res, next) => {
  if (req.body.data !== "1234") {
    res.status(400); // bad request
    const err = new Error("Incorrect data sent");
    return next(err);
  } else {
    res.status(200);
    res.json({ data: "Data returned" });
  }
});

// Employ error handler middleware
app.use(errorHandler);

describe("Error Handler", () => {
  test("errorHandler is not called for successful requests", (done) => {
    request(app)
      .post("/")
      .send({ data: "1234" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  test("errorHandler returns error status code if manually provided", (done) => {
    request(app)
      .post("/")
      .send({ data: "5678" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, done);
  });

  test("errorHandler returns manually set error message if provided", async () => {
    const res = await request(app)
      .post("/")
      .send({ data: "5678" })
      .set("Accept", "application/json");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.message).toBe("Incorrect data sent");
    expect(res.status).toBe(400);
  });
});
