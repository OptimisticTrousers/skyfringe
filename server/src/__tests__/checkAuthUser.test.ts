import request from "supertest";
import app from "../app";
// Import db setup and teardown functionality
import "../config/testSeeds";

describe("GET /api/auth/current", () => {
  it("should return 401 if no token provided", async () => {
    const res = await request(app).get("/api/auth/current").expect(401);

    expect(res.body.message).toBe("No token provided");
  });
  it("should return 500 if token is invalid", async () => {
    const res = await request(app)
      .get("/api/auth/current")
      .set("Cookie", "jwt=invalid-token")
      .expect(500);

    expect(res.body.message).toBe("jwt malformed");
  });
  it("should return 401 if token has wrong user", async () => {
    const res = await request(app)
      .get("/api/auth/current")
      // random jwt token
      .set(
        "Cookie",
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjOGEzMzFiZGE3NmM1NTllZjAwMDA2MiJ9.4gB4o6nyY1DYD5x4tRS2nqlE2zAGXPHVSDstC4zU6Rg"
      )
      .expect(401);

    expect(res.body.message).toBe("No user found");
  });

  it("should return the logged in user", async () => {
    // First, login a user and get their token
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "luffy@onepiece.com",
        password: "password",
      })
      .expect(200);

    const token = loginRes.headers["set-cookie"][0].split(";")[0].split("=")[1];

    // Then, make a request to the current user route with the token
    const res = await request(app)
      .get("/api/auth/current")
      .set("Cookie", `jwt=${token}`)
      .expect(200);

    expect(res.body.fullName).toBe("Monkey D. Luffy");
    expect(res.body.userName).toBe("luffy");
    expect(res.body.email).toBe("luffy@onepiece.com");
    expect(res.body.password).toBeUndefined();
  });
});
