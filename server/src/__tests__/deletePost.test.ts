import express from "express";
import request from "supertest";
import { post_delete } from "../controllers/postController";
// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

// Setup new app instance
const app = express();

// Use the controller
app.delete("/posts/:postId", post_delete);

// Post ID for post by Luffy
const postId = "4c8a331bda76c559ef000009";

// ID for Luffy
const luffyId = "4c8a331bda76c559ef000004";

describe("DELETE /posts/:postId", () => {
  it("should delete post and return deleted post", async () => {
    const response = await request(app).delete(`/posts/${postId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.post._id).toEqual(postId);
    expect(response.body.post.author).toEqual(luffyId);
    expect(response.body.post.content).toEqual("MEAT!");
    expect(response.body.post.likes).toEqual([
      "4c8a331bda76c559ef000005",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ]);
  });
});
