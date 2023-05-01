import express from "express";
import request from "supertest";
import { comment_create } from "../controllers/commentController";
import mockUser from "../middleware/mockUser";
import Comment from "../models/comment";
import { luffyPostId } from "../config/populateDB";

// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
// Use the controller
app.post("/posts/:postId/comments", mockUser, comment_create);

describe("POST /api/posts/:postId/comments", () => {
  it("should return a 200 response and create a new comment", async () => {
    const content = "test comment";
    const response = await request(app)
      .post(`/posts/${luffyPostId}/comments`)
      .send({ content });

    const newComment = await Comment.findOne({ content });
    expect(newComment).toBeTruthy();

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual(content);
  });
  it("returns a 400 error if the content is empty", async () => {
    const response = await request(app)
      .post(`/posts/${luffyPostId}/comments`)
      .send({});

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual([
      {
        msg: "Content is required",
        param: "content",
        location: "body",
        value: "",
      },
    ]);
  });
});
