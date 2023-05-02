import request from "supertest";
import express from "express";
import { logout_user } from "../controllers/authController";
// Import db setup and teardown functionality
import "../config/testSeeds";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/logout", logout_user);

describe("GET /api/auth/logout", () => {
  it("should return 200 and clear jwt cookie if user is logged in", async () => {
    const response = await request(app).get("/logout").set("Cookie", `jwt=jwt`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User successfully logged out");
    expect(response.header["set-cookie"]).toEqual([
      "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ]);
  });
});
