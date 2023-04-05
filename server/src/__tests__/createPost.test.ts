import path from "path";
import express from "express";
import request from "supertest";
import { config } from "dotenv";
import mockUser from "../middleware/mockUser";
import { luffyId } from "../config/populateDB";
import { post_create } from "../controllers/postController";
import errorHandler from "../middleware/errorHandler";

// Setting up ENV variables, specifically for S3_BUCKET
config();

// Setup new app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// Use the controller
app.post("/posts", mockUser, post_create);
// error handler
app.use(errorHandler);

// Import db setup and teardown functionality
import "../config/testSeeds";

describe("POST /api/posts", () => {
  it("should return an error if neither text nor image is provided", async () => {
    const response = await request(app).post("/posts").send({});

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.errors[0].msg).toEqual(
      "Post text or image is required"
    );
  });
  it("should create a new post with text content", async () => {
    const response = await request(app).post("/posts").send({
      content: "This is a test post with text content",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.post.author).toBe(luffyId.toString());
    expect(response.body.post.content).toEqual(
      "This is a test post with text content"
    );
    expect(response.body.post.likes).toEqual([]);
    expect(response.body.post.photo).toBeUndefined();
  });
  it("should create a new post with an image", async () => {
    const fileName = "roblox.png";
    const response = await request(app)
      .post("/posts")
      .attach("file", `images/${fileName}`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.post.author).toBe(luffyId);
    expect(response.body.content).toBeUndefined();
    expect(response.body.photo).toEqual({
      imageUrl: `${process.env.S3_BUCKET}/${fileName}`,
      altText: "test",
    });
  });
});
