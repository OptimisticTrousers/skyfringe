import request from "supertest";
import express from "express";
import { post_detail } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.get("/posts/:postId", post_detail);

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

// Post ID for post by Luffy
const postId = "4c8a331bda76c559ef000009";

describe("post_detail controller", () => {
  it("should return a 404 if the post is not found", async () => {
    const response = await request(app).get(`/posts/${postId}`).expect(404);

    expect(response.body.message).toBe("Post not found");
  });
});
