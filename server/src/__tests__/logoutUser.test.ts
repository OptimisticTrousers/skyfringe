import request from "supertest";
import app from "../app";
import { logout_user } from "../controllers/authController";

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("DESCRIBE POST /api/auth/logout", () => {
  it("should logout the user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "zoro@onepiece.com", password: "password" });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    
  });
});
