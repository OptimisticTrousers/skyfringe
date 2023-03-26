import express from "express";
import request from "supertest";
import Post from "../models/post";
import { post_list } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.get("/posts", post_list);

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("GET /posts", () => {
  it("returns all of the posts in JSON format", async () => {
    const response = await request(app).get("/posts");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toEqual(200);
    // There are five total posts in the db
    expect(Array.isArray(response.body.posts)).toEqual(true);
    expect(response.body.posts.length).toEqual(5);
  });
  // it("should sort posts by createdAt in ascending order", async () => {
  //   const post1 = new Post({
  //     author: "4c8a331bda76c559ef000004",
  //     content: "This is the first post",
  //     likes: [],
  //     photo: {
  //       imageUrl: "https://example.com/image1.jpg",
  //       altText: "A test image 1",
  //     },
  //     createdAt: new Date("2022-01-01T00:00:00.000Z"),
  //   });
  //   await post1.save();

  //   const post2 = new Post({
  //     author: "4c8a331bda76c559ef000004",
  //     content: "This is the second post",
  //     likes: [],
  //     photo: {
  //       imageUrl: "https://example.com/image2.jpg",
  //       altText: "A test image 2",
  //     },
  //     createdAt: new Date("2022-01-02T00:00:00.000Z"),
  //   });
  //   await post2.save();

  //   const response = await request(app).get("/posts");
  //   expect(response.status).toBe(200);
  //   expect(response.body.posts).toEqual([
  //     expect.objectContaining({
  //       _id: post1.id,
  //       content: post1.content,
  //       createdAt: post1.createdAt.toISOString(),
  //     }),
  //     expect.objectContaining({
  //       _id: post2.id,
  //       content: post2.content,
  //       createdAt: post2.createdAt.toISOString(),
  //     }),
  //   ]);
  // });
});
