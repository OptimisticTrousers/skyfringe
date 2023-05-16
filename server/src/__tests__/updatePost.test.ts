import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import { post_update } from "../controllers/postController";
import { luffyPostId } from "../config/populateDB";
import mockUser from "../middleware/mockUser";
// Import db setup and teardown functionality
import "../config/testSeeds";

jest.mock("../config/multer", () => ({
  single: jest.fn((id: string) => {
    return jest.fn((req: Request, res: Response, next: NextFunction) => {
      next();
    });
  }),
}));

// Setup new app instance
const app = express();
app.use(express.json());
// Use the controller
app.put("/posts/:postId", mockUser, post_update);

describe("PUT /posts/:postId", () => {
  it("returns newly updated post on successful update operation", async () => {
    const response = await request(app)
      .put(`/posts/${luffyPostId}`)
      .send({ content: "Updated post", imageUpdated: false });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual("Updated post");
  });
  it("provides validation error if post text or image is left blank", async () => {
    const response = await request(app).put(`/posts/${luffyPostId}`).send({});
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    // Returns array of validation errors in case of missing post text
    expect(response.body[0].msg).toBe("Post text or image is required");
  });
  it("should remove post pic", async () => {
    const response = await request(app)
      .put(`/posts/${luffyPostId}`)
      .send({ content: "Updated post", imageUpdated: true });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.photo).toBeUndefined();
  });

  it("should return validation errors for invalid request", async () => {
    const response = await request(app)
      .put(`/posts/${luffyPostId}`)
      .send({ content: "Updated post", imageUpdated: "invalid" });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
  });
});
