import express from "express";
import request from "supertest";
import { comment_delete } from "../controllers/commentController";

// Setup new app instance
const app = express();

// Use the controller
app.delete("/posts/:postId/comments/:commentId", comment_delete);

// Import db setup and teardown functionality
import "../config/testSeeds";

describe("DELETE /posts/:postId/comments/:commentId", () => {
  it("returns deleted comment ID ");
});
