import express from "express";
import request from "supertest";
import mockUser from "../middleware/mockUser";
import errorHandler from "../middleware/errorHandler";
import { post_like } from "../controllers/postController";

// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.put("/posts/:postId/likes", mockUser, post_like);
// error handler
app.use(errorHandler);

const luffyPostId = "4c8a331bda76c559ef000009";
const luffyId = "4c8a331bda76c559ef000004";

describe("PUT /api/posts/:postId/likes", () => {
  it("should allow a user to like a post", async () => {
    const response = await request(app).put(`/posts/${luffyPostId}/likes`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body.likes).toContain(luffyId);
  });
  it("should allow a user to remove their like from a post", async () => {
    const response = await request(app).put(`/posts/${luffyPostId}/likes`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body.likes).not.toContain(luffyId);
  });
});
