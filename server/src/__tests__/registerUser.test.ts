import request from "supertest";
import assert from "assert";
import app from "../app";
import initializeMongoServer from "../config/mongoConfigTesting";

// Import db setup and teardown
import "../config/mongoSetup";

describe("POST /register", () => {
  it("returns user object after successful user sign up/register (with password hidden)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      fullName: "Bob Jones",
      userName: "bobjones",
      email: "bobjones@gmail.com",
      password: "bobjones",
    });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.fullName).toBe("Bob Jones");
  });
  test("logs the")
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
