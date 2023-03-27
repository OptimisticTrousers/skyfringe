import request from "supertest";
import app from "../app";

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("POST /register", () => {
  it("returns user and token objects after successful user sign up/register (with password hidden)", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "Bob Jones",
      userName: "bobjones",
      email: "bobjones@gmail.com",
      password: "bobjones",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.user).toEqual({
      fullName: "Bob Jones",
      userName: "bobjones",
      email: "bobjones@gmail.com",
      password: "bobjones",
    });
    expect(response.body.token).toBeDefined();
  });
  it("returns JWT token as json", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "Bob Jones",
      userName: "bobjones",
      email: "bobjones@gmail.com",
      password: "bobjones",
    });
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    // Using jwt.io to find the result of the JWT token
    expect(response.body.token).toBe(
      "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkJvYiBKb25lcyIsInVzZXJOYW1lIjoiYm9iam9uZXMiLCJlbWFpbCI6ImJvYmpvbmVzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYm9iam9uZXMifQ.a-baM2I_--oYBV4cZee8lxAMc9Ac0Wa-CUrbmqqlcv4"
    );
  });
  it("it attaches the JWT token in the 'Set-Cookie' header", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "Bob Jones",
      userName: "bobjones",
      email: "bobjones@gmail.com",
      password: "bobjones",
    });
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.headers["Set-Cookie"]).toBe(null);
  });
  test("the user is authenticated once they register", () => {});
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
  // test("user creates an account");
});
