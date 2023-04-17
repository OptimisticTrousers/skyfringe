import express from "express";
import request from "supertest";
import mockUser from "../middleware/mockUser";
import { comment_update } from "../controllers/commentController";

// Import db setup and teardown functionality
import "../config/testSeeds";
import errorHandler from "../middleware/errorHandler";
import { zoroCommentId } from "../config/populateDB";

// Setup new app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Use the controller
app.put("/comments/:commentId", mockUser, comment_update);
// error handler
app.use(errorHandler);

const luffyCommentId = "4c8a331bda76c559ef000014";

describe("PUT /api/comments/:commentId", () => {
  const newContent = "Updated comment";
  it("should update a comment content", async () => {
    const response = await request(app)
      .put(`/comments/${luffyCommentId}`)
      .send({ content: newContent });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.content).toBe(newContent);
  });
  it("should return a 400 error if no object is sent", async () => {
    const response = await request(app)
      .put(`/comments/${luffyCommentId}`)
      .send({});

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe("Content is required");
  });
  it("should return a 400 error if content is empty", async () => {
    const response = await request(app)
      .put(`/comments/${luffyCommentId}`)
      .send({ content: "" });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe("Content is required");
  });
  it("returns a 403 error if the user is not the user who wrote the comment", async () => {
    const response = await request(app)
      .put(`/comments/${zoroCommentId}`)
      .send({ content: newContent });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Forbidden");
  });
});
