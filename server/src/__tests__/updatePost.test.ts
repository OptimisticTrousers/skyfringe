import express from "express";
import request from "supertest";
import { post_update } from "../controllers/postController";

// Setup new app instance
const app = express();

// Use the controller
app.put("/posts/:postId", post_update);

// Import db setup and teardown functionality
import "../config/testSeeds";

const postId = "4c8a331bda76c559ef000009";

describe("PUT /posts/:postId", () => {
  it("returns newly updated post on successful update operation", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({ text: "Updated post" });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.text).toEqual("Updated post");
  });
  it("provides validation error if post text is left blank", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({ text: "" });
    expect(response.status).toEqual(404);
    // Returns array of validation errors in case of missing post text
    expect(response.body[0].msg).toBe("Post text or image is required");
  });
  it("should update the post image", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .attach("image", "test/new-image.jpg")
      .expect(200);
    expect(response.body.post.image.imageUrl).toEqual(expect.any(String));
    expect(response.body.post.image.altText).toEqual("Test image");
  });
  it("should return 400 if invalid image file provided", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .attach("image", "test/invalid-file.txt")
      .expect(400);

    expect(response.body.error).toBe("Invalid file type");
  });
  it("should return an error when attempting to update a post with invalid data", async () => {
    const update = {
      // Property name is content instead of text
      content: "",
    };

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({ update });

    expect(response.status).toBe(400);
  });
});
