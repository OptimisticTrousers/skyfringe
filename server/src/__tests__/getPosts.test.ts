import express from "express";
import request from "supertest";
import { post_list } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.get("/posts", post_list);

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("GET /posts", () => {
  it("returns all of the posts in JSON format", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    // There are five total posts in the db
    expect(Array.isArray(response.body.posts)).toEqual(true);
    expect(response.body.posts.length).toEqual(5);
  });
});
