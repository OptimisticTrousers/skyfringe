import express from "express";
import request from "supertest";
import { comment_list } from "../controllers/commentController";
// Import db setup and teardown functionality
import "../config/testSeeds";
import { zoroPostId } from "../config/populateDB";

// Setup new app instance
const app = express();

// Use the controller
app.get("/posts/:postId/comments", comment_list);

describe("GET /api/posts/:postId/comments", () => {
  test("returns all comments for the post", async () => {
    const response = await request(app).get(`/posts/${zoroPostId}/comments`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].content).toBe("Four-Sword Style");
    expect(response.body[1].content).toBe("Moss head");
    expect(response.body[2].content).toBe("So cool!");
  });
});
