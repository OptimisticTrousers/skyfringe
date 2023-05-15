import express from "express";
import request from "supertest";
import mockUser from "../middleware/mockUser";
import { comment_delete } from "../controllers/commentController";
import { luffyCommentId, zoroCommentId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
// Use the controller
app.delete("/comments/:commentId", mockUser, comment_delete);

describe("DELETE /api/posts/:postId/comments/:commentId", () => {
  it("returns deleted comment ID successful delete operation", async () => {
    const response = await request(app).delete(`/comments/${luffyCommentId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(luffyCommentId.equals(response.body._id)).toBe(true);
  });
  it("returns a 403 error if the user is not the user who wrote the comment", async () => {
    const response = await request(app).delete(`/comments/${zoroCommentId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Forbidden");
  });
});
