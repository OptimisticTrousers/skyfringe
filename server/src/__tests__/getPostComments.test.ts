import request from "supertest";
import express from "express";
import { zoroPostId } from "../config/populateDB";
import { comment_list } from "../controllers/commentController";
// Import db setup and teardown functionality
import "../config/testSeeds";

const app = express();
// Use the controller
app.get("/posts/:postId/comments", comment_list);

describe("GET /api/posts/:postId/comments", () => {
  test("returns all comments for the post", async () => {
    const response = await request(app).get(`/posts/${zoroPostId}/comments`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    // Expect the response body to be an array
    expect(Array.isArray(response.body)).toBe(true);
  });
});
