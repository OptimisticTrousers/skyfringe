import express from "express";
import request from "supertest";
import validateUserId from "../middleware/validateUserId";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
// Use the middleware
app.get("/users/:userId", validateUserId);

describe("validateUserId middleware function", () => {
  it("throws an error if the user ID is not valid", async () => {
    const response = await request(app).get(`/users/invalid-postid`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid user ID");
  });
  it("throws an error if the post is not found", async () => {
    const response = await request(app).get(
      "/users/609e39ca255e1d2cd452e2d8" // non-existing ObjectId
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("User not found");
  });
});
