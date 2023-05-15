import path from "path";
import express, { NextFunction } from "express";
import request from "supertest";
import { config } from "dotenv";
import mockUser from "../middleware/mockUser";
import { luffyId } from "../config/populateDB";
import { post_create } from "../controllers/postController";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setting up ENV variables, specifically for S3_BUCKET
config();

// Setup new app instance
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// Use the controller
app.post("/posts", mockUser, post_create);

describe("POST /api/posts", () => {
  it("should return an error if neither text nor image is provided", async () => {
    const response = await request(app).post("/posts").send({});

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body[0].msg).toEqual("Post text or image is required");
  });
  it("should create a new post with text content", async () => {
    const response = await request(app).post("/posts").send({
      content: "This is a test post with text content",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.author._id).toBe(luffyId.toString());
    expect(response.body.content).toEqual(
      "This is a test post with text content"
    );
    expect(response.body.likes).toEqual([]);
    expect(response.body.photo).toBeUndefined();
  });
});
