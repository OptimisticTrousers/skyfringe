import express from "express";
import request from "supertest";
import { post_delete } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.delete("/posts/:postId", post_delete);

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

// Post ID for post by Luffy
const postId = "4c8a331bda76c559ef000009";

describe("DELETE /posts/:postId", () => {
  it("should delete post and return deleted post", async () => {
    const response = await request(app).delete(`/posts/${postId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.post.content).toEqual(
      "I'm going to be the King of the Pirates!"
    );
  });
});
