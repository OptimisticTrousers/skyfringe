import request from "supertest";
import app from "../app";

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("login_user controller", () => {
  it("should return a 403 status code when no user is found", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "bobjones@onepiece.com", password: "bobjones" });
    expect(response.statusCode).toEqual(403);
  });
  it("returns user object after successful login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "luffy@onepiece.com", password: "password" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toEqual(200);
    expect(response.body.user.fullName).toEqual("Monkey D. Luffy");
  });
});
