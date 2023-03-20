import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { post_detail } from "../controllers/postController";
import Post from "../models/post";

// Setup new app instance
const app = express();

// Use the controller
app.get("/posts/:postId", post_detail);

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("post_detail controller", () => {
  it("should return a 404 if the post is not found", async () => {
    // Post ID that is not in the database
    const id = "4c8a331bda76c559ef000088";
    const response = await request(app).get(`/posts/${id}`);
    expect(response.status).toEqual(404);
  });
  it("should return a post if it exists", async () => {
    // Luffy's Post ID
    const id = "4c8a331bda76c559ef000009";
    const response = await request(app).get(`/posts/${id}`);
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.post.content).toBe(
      "I'm going to be the King of the Pirates!"
    );
  });
  it("returns the length of the amount of likes on the post", async () => {
    // Luffy's Post ID
    const id = "4c8a331bda76c559ef000009";
    const response = await request(app).get(`/posts/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.post.likes.length).toEqual(3);
  });
  it("returns the length of the amount of comments on the post", async () => {
    // Luffy's Post ID
    const id = "4c8a331bda76c559ef000009";
    const response = await request(app).get(`/posts/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.post.comments.length).toEqual(1);
  });
});
