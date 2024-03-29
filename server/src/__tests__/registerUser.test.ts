import request from "supertest";
import app from "../app";
import { config } from "dotenv";
import { bob, luffy } from "../config/populateDB";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Setting up ENV variables, specifically for JWT_SECRET
config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET value is not defined in .env file");
}

describe("POST api/auth/register", () => {
  it("returns user and token objects after successful user sign up/register (with password hidden)", async () => {
    const response = await request(app).post("/api/auth/register").send(bob);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(bob.fullName);
    expect(response.body.userName).toBe(bob.userName);
    expect(response.body.email).toBe(bob.email);
    expect(response.body.password).toBeUndefined();
    expect(response.headers["set-cookie"]).toBeTruthy();
  });
  it("should return 400 if validation fails", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "",
      userName: "",
      email: "invalid_email",
      password: "",
    });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toContainEqual({
      msg: "Please enter a valid email address",
      param: "email",
      location: "body",
      value: "invalid_email",
    });
    expect(response.body).toContainEqual({
      msg: "Full name is required",
      param: "fullName",
      location: "body",
      value: "",
    });
    expect(response.body).toContainEqual({
      msg: "Username must be at least 5 characters long",
      param: "userName",
      location: "body",
      value: "",
    });
    expect(response.body).toContainEqual({
      msg: "Password must be at least 8 characters long",
      param: "password",
      location: "body",
      value: "",
    });
  });
  test("if when a user makes an account with an email that already exists", async () => {
    // Luffy user already present in the database
    const response = await request(app).post("/api/auth/register").send(luffy);
    expect(response.status).toBe(400);
    expect(response.body[0].msg).toBe("E-mail already in use");
  });
});
