import express from "express";
import request from "supertest";
import mockUser from "../middleware/mockUser";
import { post_like } from "../controllers/postController";
import { User as IUser } from "../../../shared/types";
import { luffyId, luffyPostId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
app.put("/posts/:postId/likes", mockUser, post_like);

describe("PUT /api/posts/:postId/likes", () => {
  const luffyIdString = luffyId.toString();
  it("should allow a user to like a post", async () => {
    const response = await request(app).put(`/posts/${luffyPostId}/likes`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(
      response.body.likes.some(
        (like: IUser) => like._id.toString() === luffyIdString
      )
    ).toBe(true); // assuming the user ID is stored in the variable userId
  });
  it("should allow a user to remove their like from a post", async () => {
    const response = await request(app).put(`/posts/${luffyPostId}/likes`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(
      response.body.likes.some(
        (like: IUser) => like._id.toString() === luffyIdString
      )
    ).toBe(false); // assuming the user ID is stored in the variable userId
  });
});
