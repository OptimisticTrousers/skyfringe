import express from "express";
import request from "supertest";
import { post_update } from "../controllers/postController";
import { luffyPostId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";
import mockUser from "../middleware/mockUser";

// Setup new app instance
const app = express();
app.use(express.json());
// Use the controller
app.put("/posts/:postId", mockUser, post_update);

describe("PUT /posts/:postId", () => {
  it("returns newly updated post on successful update operation", async () => {
    const response = await request(app)
      .put(`/posts/${luffyPostId}`)
      .send({ content: "Updated post", imageUpdated: false });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual("Updated post");
  });
  it("provides validation error if post text or image is left blank", async () => {
    const response = await request(app).put(`/posts/${luffyPostId}`).send({});
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    // Returns array of validation errors in case of missing post text
    expect(response.body[0].msg).toBe("Post text or image is required");
  });
});
