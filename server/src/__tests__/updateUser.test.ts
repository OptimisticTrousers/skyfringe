import request from "supertest";
import { config } from "dotenv";
import app from "../app";
import User from "../models/user";
import jwt from "jsonwebtoken";

// Using env files to access JWT_SECRET
config();

// Import db setup and teardown functionality
import "../config/testSeeds";

const zoroId = "4c8a331bda76c559ef000005";

describe("PUT /api/users/:userId", () => {
  it("correctly updates a user", async () => {
    // Create a test user and generate a JWT token for it
    const user = new User({
      fullName: "John Doe",
      userName: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
      bio: "Test bio",
      photo: {
        imageUrl: "https://example.com/profile.jpg",
        altText: "Profile picture",
      },
      cover: {
        imageUrl: "https://example.com/cover.jpg",
        altText: "Cover photo",
      },
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    const updatedUser = {
      fullName: "Bob Jones",
      userName: "bobjones",
      bio: "New bio",
      photo: {
        imageUrl: "https://example.com/newprofile.jpg",
        altText: "New profile picture",
      },
      cover: {
        imageUrl: "https://example.com/newcover.jpg",
        altText: "New cover photo",
      },
    };

    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .set("Cookie", `jwt=${token}; HttpOnly`)
      .send(updatedUser);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.fullName).toEqual("Bob Jones");
    expect(response.body.userName).toEqual("johndoe");
    expect(response.body.email).toEqual("johndoe@example.com");
    expect(response.body.password).toBeUndefined();

    await user.remove();
  });
  it("should return 404 if user does not exist", async () => {
    const response = await request(app).put(`/api/users/${undefined}`).send({});

    expect(response.status).toEqual(404);
  });
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).put(`/api/users/${zoroId}`).send({});

    expect(response.status).toEqual(400);
  });
});
