import express, { NextFunction, Request, Response } from "express";
import request from "supertest";
import { user_avatar_put } from "../controllers/userController";
import path from "path";
import { luffyId } from "../config/populateDB";
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
app.put("/users/:userId/avatar", user_avatar_put);

describe("PUT /api/users/:userId/avatar", () => {
  it("should remove user profile pic", async () => {
    const userId = luffyId; // Replace with a valid user ID

    const response = await request(app)
      .put(`/users/${userId}/avatar`)
      .send({ imageUpdated: true });

    expect(response.status).toBe(200);
    expect(response.body.photo).toBeUndefined();
  });

  it("should return validation errors for invalid request", async () => {
    const userId = luffyId; // Replace with a valid user ID

    const response = await request(app)
      .put(`/users/${userId}/avatar`)
      .send({ imageUpdated: "invalid" });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
  });
});
