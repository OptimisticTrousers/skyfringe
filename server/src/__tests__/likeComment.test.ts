import express from "express";
import request from "supertest";
import mockUser from "../middleware/mockUser";
import { comment_like } from "../controllers/commentController";
import { luffyCommentId, luffyId, namiCommentId } from "../config/populateDB";
import { User as IUser } from "../../../shared/types";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
// Use the controller
app.put("/comments/:commentId/likes", mockUser, comment_like);

describe("PUT /api/posts/:postId/comments/:commentId/likes", () => {
  const luffyIdString = luffyId.toString();
  it("should allow a user to like a post", async () => {
    // Liking a comment made by luffy
    const response = await request(app).put(
      `/comments/${luffyCommentId}/likes`
    );

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(
      response.body.likes.some(
        (like: IUser) => like._id.toString() === luffyIdString
      )
    ).toBe(true); // assuming the user ID is stored in the variable userId
  });
  it("should allow a user to remove their like from a post", async () => {
    // Unliking a comment made by nami
    const response = await request(app).put(`/comments/${namiCommentId}/likes`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(
      response.body.likes.some(
        (like: IUser) => like._id.toString() === luffyIdString
      )
    ).toBe(false); // assuming the user ID is stored in the variable userId
  });
});
