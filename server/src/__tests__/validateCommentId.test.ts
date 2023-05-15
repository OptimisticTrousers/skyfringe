import express from "express";
import request from "supertest";
import validateCommentId from "../middleware/validateCommentId";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.use(express.json());
// Use the middleware
app.get("/comments/:commentId", validateCommentId);

describe("validateCommentId middleware function", () => {
  it("throws an error if the comment ID is not valid", async () => {
    const response = await request(app).get(`/comments/invalid-postid`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid comment ID");
  });
  it("throws an error if the comment is not found", async () => {
    const response = await request(app).get(
      "/comments/609e39ca255e1d2cd452e2d8" // non-existing ObjectId
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Comment not found");
  });
});
