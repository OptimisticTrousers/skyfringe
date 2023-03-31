import request from "supertest";
import app from "../app";

// Import db setup and teardown functionality
import "../config/testSeeds";

describe("login_user controller", () => {
  it("should return a 403 status code when no user is found", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "bobjones@onepiece.com", password: "bobjones" });
    expect(response.status).toEqual(403);
  });
  it("returns user object after successful login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "zoro@onepiece.com", password: "password" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.user.fullName).toEqual("Roronoa Zoro");
    expect(response.body.user.userName).toEqual("zoro");
    expect(response.body.user.email).toEqual("zoro@onepiece.com");
    expect(response.body.user.friends).toEqual([
      "4c8a331bda76c559ef000004",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ]);
  });
  it("returns the Luffy guest user object if no 'email' or 'password' property is in the req.body", async () => {
    const response = await request(app).post("/api/auth/login").send({});
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["set-cookie"][0]).toMatch(/jwt=/);
    expect(response.body.user.fullName).toEqual("Monkey D. Luffy");
    expect(response.body.user.userName).toEqual("luffy");
    expect(response.body.user.email).toEqual("luffy@onepiece.com");
    expect(response.body.user.friends).toEqual(["4c8a331bda76c559ef000005"]);
  });
});
