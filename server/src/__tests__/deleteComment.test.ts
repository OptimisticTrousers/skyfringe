import express from "express";
import request from "supertest";
import errorHandler from "../middleware/errorHandler";
import mockUser from "../middleware/mockUser";
import { comment_delete } from "../controllers/commentController";
import {
  luffyCommentId,
  luffyPostId,
  zoroCommentId,
  zoroPostId,
} from "../config/populateDB";

// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
// Use the controller
app.delete("/posts/:postId/comments/:commentId", mockUser, comment_delete);
// error handler
app.use(errorHandler);

describe("DELETE /posts/:postId/comments/:commentId", () => {
  it("returns deleted comment ID successful delete operation", async () => {
    const response = await request(app).delete(
      `/posts/${zoroPostId}/comments/${luffyCommentId}`
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBe(luffyCommentId.toString());
  });
  // it("throws an error if the post ID is not valid", async () => {
  //   const response = await request(app).delete(
  //     `/posts/${undefined}/comments/${luffyCommentId}`
  //   );
  //   expect(response.headers["content-type"]).toMatch(/json/);
  //   expect(response.status).toEqual(400);
  //   expect(response.body.message).toEqual("Invalid post ID");
  // });
  // it("throws an error if the post is not found", async () => {
  //   const response = await request(app).delete(
  //     `/posts/${randomId1}/comments/${luffyCommentId}`
  //   );
  //   expect(response.headers["content-type"]).toMatch(/json/);
  //   expect(response.status).toEqual(400);
  //   expect(response.body.message).toEqual("Post not found");
  // });
  // it("throws an error if the commentId is not valid", async () => {
  //   const response = await request(app).delete(
  //     `/posts/${luffyPostId}/comments/${undefined}`
  //   );
  //   expect(response.headers["content-type"]).toMatch(/json/);
  //   expect(response.status).toEqual(400);
  //   expect(response.body.message).toEqual("Invalid comment ID");
  // });
  // it("throws an error if the comment is not found", async () => {
  //   const response = await request(app).delete(
  //     `/posts/${luffyPostId}/comments/${randomId2}`
  //   );
  //   expect(response.headers["content-type"]).toMatch(/json/);
  //   expect(response.status).toEqual(400);
  //   expect(response.body.message).toEqual("Comment not found");
  // });
  it("returns a 403 error if the user is not the user who wrote the comment", async () => {
    const response = await request(app).delete(
      `/posts/${luffyPostId}/comments/${zoroCommentId}`
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Forbidden");
  });
});
