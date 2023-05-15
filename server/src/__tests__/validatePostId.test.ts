import express from "express";
import request from "supertest";
import validatePostId from "../middleware/validatePostId";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
// Use the middleware
app.get("/posts/:postId", validatePostId);

describe("validatePostId middleware function", () => {
  it("throws an error if the post ID is not valid", async () => {
    const response = await request(app).get(`/posts/invalid-postid`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid post ID");
  });
  it("throws an error if the post is not found", async () => {
    const response = await request(app).get(
      "/posts/609e39ca255e1d2cd452e2d8" // non-existing ObjectId
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Post not found");
  });
});
