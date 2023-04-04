import express from "express"
import request from "supertest"
import app from "../app";

// Import db setup and teardown functionality
import "../config/testSeeds";

const luffyCommentId

describe("PUT /api/comments/:commentId", () => {
  it("should update a comment content'", async () => {
    const newContent = 'Updated comment';
    const response = await request(app)
      .put(`/comments/${comment._id}`)
      .send({ content: newContent });

    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(newContent);
  })
  it("should add a like to a comment", async () => {

  })
})