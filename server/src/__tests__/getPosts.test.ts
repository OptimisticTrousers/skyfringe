import express from "express";
import { post_list } from "../controllers/postController";
import request from "supertest";

// Setup new app instance
const app = express();

// Use the controller
app.get("/posts", post_list);

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("GET /posts", () => {
  it("returns all of the posts in JSON format", async () => {
    const response = await request(app).get("/posts");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.statusCode).toEqual(200);
    // There are five total posts in the db
    expect(response.body.length).toEqual(5);
  });
});
