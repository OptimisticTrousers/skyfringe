import express from "express";
import request from "supertest";
import errorHandler from "../middleware/errorHandler";
import { comment_create } from "../controllers/commentController";
import mockUser from "../middleware/mockUser";
import { luffyPostId } from "../config/populateDB";

// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Use the controller
app.post("/posts/:postId/comments", mockUser, comment_create);
// error handler
app.use(errorHandler);

describe("POST /api/posts/:postId/comments/:commentId", () => {
  it("creates a new comment", async () => {
    const content = "test comment";
    const response = await request(app)
      .post(`/posts/${luffyPostId}/comments`)
      .send({ content });

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
    expect(response.body.errors[0].msg).toEqual("Content is required");
  });
});
