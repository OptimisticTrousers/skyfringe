import express from "express";
import request from "supertest";
import { post_list } from "../controllers/postController";
import { luffyId } from "../config/populateDB";
import { user_friends } from "../controllers/userController";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
// Use the controller
app.get("/users/:userId/friends", user_friends);

describe("GET /api/users/:userId/friends", () => {
  it("should return a list of user friends/friend requests", async () => {
    const response = await request(app).get(`/users/${luffyId}/friends`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.friendRequests)).toEqual(true);
    expect(Array.isArray(response.body.friends)).toEqual(true);
  });
});
