import request from "supertest";
import app from "../app";
// Import db setup and teardown functionality
import "../config/testSeeds";

describe("POST /api/auth/login", () => {
  it("should return a 403 status code when no user is found", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "bobjones@gmail.com", password: "bobjones" });
    expect(response.status).toEqual(401);
  });
  it("should return 400 if validation fails", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "invalid_email",
      password: "",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toContainEqual({
      msg: "Please enter a valid email address",
      param: "email",
      location: "body",
      value: "invalid_email",
    });
    expect(response.body).toContainEqual({
      msg: "Password must be at least 8 characters long",
      param: "password",
      location: "body",
      value: "",
    });
  });
  it("returns user object after successful login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "zoro@onepiece.com", password: "password" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.fullName).toEqual("Roronoa Zoro");
    expect(response.body.userName).toEqual("zoro");
    expect(response.body.email).toEqual("zoro@onepiece.com");
    expect(response.headers["set-cookie"]).toBeTruthy();
  });
});
