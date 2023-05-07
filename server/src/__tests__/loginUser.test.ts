import request from "supertest";
import app from "../app";
import { bob, zoro } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

describe("POST /api/auth/login", () => {
  it("should return a 401 status code when no user is found", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: bob.email, password: bob.password });
    expect(response.status).toEqual(401);
  });
  it("should return 400 if validation fails", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "invalid_email",
      password: "",
    });
    expect(response.status).toEqual(400);
  });
  it("returns user object after successful login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: zoro.email, password: "password" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.fullName).toEqual(zoro.fullName);
    expect(response.body.userName).toEqual(zoro.userName);
    expect(response.body.email).toEqual(zoro.email);
    expect(response.body.password).toBeUndefined();
    expect(response.headers["set-cookie"]).toBeTruthy();
  });
});
