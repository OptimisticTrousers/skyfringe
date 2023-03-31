import express from "express";
import request from "supertest";
import { post_create } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.post("/posts", post_create);

// Import db setup and teardown functionality
import "../config/testSeeds";

describe("POST /posts", () => {
  it("should return an error if neither text nor image is provided", async () => {
    const response = await request(app).post("/api/posts").send({});

    expect(response.status).toEqual(400);
    expect(response.body.errors[0].msg).toEqual(
      "Post text or image is required"
    );
  });
  it("should create a new post with text content", async () => {
    const response = await request(app).post("/posts").send({
      content: "This is a test post with text content",
    });

    expect(response.status).toEqual(200);
    expect(response.body.post.author).toBeDefined();
    expect(response.body.post.content).toEqual(
      "This is a test post with text content"
    );
    expect(response.body.post.likes).toEqual([]);
    expect(response.body.post.comment).toEqual([]);
    expect(response.body.post.image).toBeUndefined();
  });
});
