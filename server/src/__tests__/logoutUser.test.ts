import request from "supertest";
import app from "../app";
// Import db setup and teardown functionality
import "../config/testSeeds";

describe("GET /api/auth/logout", () => {
  it("should return 401 if user is not logged in", async () => {
    const response = await request(app).get("/api/auth/logout");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("User not logged in");
  });
  it("should logout the user", async () => {
    const agent = request.agent(app);
    const response = await agent
      .post("/api/auth/login")
      .send({ email: "luffy@onepiece.com", password: "password" });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeTruthy();
    const logoutResponse = await agent.get("/api/auth/logout");
    expect(logoutResponse.headers["content-type"]).toMatch(/json/);
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.message).toBe("User successfully logged out");
    expect(logoutResponse.header["set-cookie"]).toEqual([
      "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
    ]);
  });
});
