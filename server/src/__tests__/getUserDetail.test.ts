import express from "express";
import request from "supertest";
import { luffy, luffyId } from "../config/populateDB";
import { user_detail } from "../controllers/userController";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
// Use the controller
app.get("/users/:userId", user_detail);

describe("GET /users/:userId", () => {
  it("returns user information in JSON format", async () => {
    const response = await request(app).get(`/users/${luffyId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    // There are five total posts in the db
    expect(response.body.user._id).toEqual(luffyId.toString());
    expect(Array.isArray(response.body.posts)).toEqual(true);
    expect(Array.isArray(response.body.likedPosts)).toEqual(true);
    expect(Array.isArray(response.body.comments)).toEqual(true);
    expect(Array.isArray(response.body.likedComments)).toEqual(true);
  });
});
