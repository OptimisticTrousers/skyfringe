import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import restrictTestUserActions from "../middleware/restrictTestUserActions";
import { luffyId } from "../config/populateDB";

// Create a test app
const app = express();

// Create a dummy route that uses the middleware
app.get(
  "/users/:userId",
  restrictTestUserActions,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

describe("Middleware that restricts certain actions from the test account", () => {
  // Test case: Request with a test user ID
  test("Test user ID should be restricted", async () => {
    const response = await request(app).get(`/users/${luffyId}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: `Cannot perform a GET action with the test user`,
    });
  });

  // Test case: Request with a non-test user ID
  test("Non-test user ID should be allowed", async () => {
    const nonTestUserId = "1234567890";

    const response = await request(app).get(`/users/${nonTestUserId}`);

    expect(response.status).toBe(200);
  });
});
