import express from "express";
import request from "supertest";
import errorHandler from "../middleware/errorHandler";
import mockUser from "../middleware/mockUser";
import { comment_like } from "../controllers/commentController";
import { luffyCommentId, luffyId } from "../config/populateDB";

// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.put("/comments/:commentId/likes", mockUser, comment_like);
// error handler
app.use(errorHandler);

describe("PUT /api/posts/:postId/comments/:commentId/likes", () => {
  const luffyIdString = luffyId.toString();
  it("should allow a user to like a post", async () => {
    const response = await request(app).put(
      `/comments/${luffyCommentId}/likes`
    );

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body.likes).toContain(luffyIdString);
  });
  it("should allow a user to remove their like from a post", async () => {
    const response = await request(app).put(
      `/comments/${luffyCommentId}/likes`
    );

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body.likes).not.toContain(luffyIdString);
  });
});
