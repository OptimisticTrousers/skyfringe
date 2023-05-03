import request from "supertest";
import app from "../app";
import { luffyId } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

describe("GET /api/users/:userId/friends", () => {
  it("should return a list of user friends/friend requests", async () => {
    const response = await request(app).get(`/api/users/${luffyId}/friends`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });
});
