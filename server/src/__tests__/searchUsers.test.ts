import express from "express";
import request from "supertest";
import { users } from "../config/populateDB";
import { user_search } from "../controllers/userController";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setup new app instance
const app = express();
app.get("/search-users/:query", user_search);

describe("GET /api/search-users:query", () => {
  test("if first name matches", async () => {
    // send GET request
    const response = await request(app).get(`/search-users/luffy`);
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    // check correct user(s) given
    expect(response.body.length).toEqual(1);
    expect(response.body[0]._id).toEqual(users[0]._id.toString());
  });

  test("if full name matches", async () => {
    // send GET request
    const response = await request(app).get(`/search-users/roronoa zoro`);
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    // check correct user(s) given
    expect(response.body.length).toEqual(1);
    expect(response.body[0]._id).toEqual(users[1]._id.toString());
  });

  test("if no match", async () => {
    // send GET request
    const response = await request(app).get(`/search-users/bob jones`);
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    // check correct user(s) given
    expect(response.body).toEqual([]);
  });
});
