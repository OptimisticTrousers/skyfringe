import express from "express";
import request from "supertest";
import mockUser from "../middleware/mockUser";
import { luffyPostId, zoroPostId } from "../config/populateDB";
import { post_delete } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.delete("/posts/:postId", mockUser, post_delete);

// Import db setup and teardown functionality
import "../config/testSeeds";

describe("DELETE /posts/:postId", () => {
  it("should delete post and return deleted post", async () => {
    const response = await request(app).delete(`/posts/${luffyPostId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(luffyPostId.equals(response.body._id)).toBe(true);
  });
  it("returns a 403 error if the user is not the user who wrote the post", async () => {
    // Return an error if the user somehow is not the same as the user who created the post
    const response = await request(app).delete(`/posts/${zoroPostId}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Forbidden");
  });
});
