import express from "express";
import request from "supertest";
import { post_list } from "../controllers/postController";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
// Use the controller
app.get("/posts", post_list);

describe("GET /posts", () => {
  it("returns all of the posts in JSON format", async () => {
    const response = await request(app).get("/posts");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    // There are five total posts in the db
    expect(Array.isArray(response.body)).toEqual(true);
  });
});
