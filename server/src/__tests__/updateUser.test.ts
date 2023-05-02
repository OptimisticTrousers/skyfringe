import request from "supertest";
import { config } from "dotenv";
import app from "../app";
import User from "../models/user";
import jwt from "jsonwebtoken";
// Import db setup and teardown functionality
import "../config/testSeeds";

// Using env files to access JWT_SECRET
config();

const randomIdNotAssociatedWithUser = "4c8a331bda76c559ef000032";

describe("PUT /api/users/:userId", () => {
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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

  const updatedUser = {
    fullName: "Bob Jones",
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

  beforeAll(async () => {
    // Save the new user fields
    await user.save();
  });

  it("correctly updates a user", async () => {
    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .set("Cookie", `jwt=${token}; HttpOnly`)
      .send(updatedUser);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.user.fullName).toEqual("Bob Jones");
    expect(response.body.user.userName).toEqual("johndoe");
    expect(response.body.user.email).toEqual("johndoe@example.com");
    expect(response.body.user.password).toBeUndefined();
    expect(response.body.user.photo.imageUrl).toEqual(
      "https://example.com/newprofile.jpg"
    );
    expect(response.body.user.photo.altText).toEqual("New profile picture");
    expect(response.body.user.cover.imageUrl).toEqual(
      "https://example.com/newcover.jpg"
    );
    expect(response.body.user.cover.altText).toEqual("New cover photo");
  });
  it("should return 400 if req.params.userId is not valid", async () => {
    const response = await request(app)
      .put(`/api/users/${undefined}`)
      .set("Cookie", `jwt=${token}; HttpOnly`)
      .send(updatedUser);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid userId");
  });
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .set("Cookie", `jwt=${token}; HttpOnly`)
      .send({});

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.errors[0].msg).toEqual(
      "At least one of the following fields must be present: fullName, bio, photo, cover"
    );
  });
  it("should return a 404 if the user is not found", async () => {
    const response = await request(app)
      .put(`/api/users/${randomIdNotAssociatedWithUser}`)
      .set("Cookie", `jwt=${token}; HttpOnly`)
      .send(updatedUser);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("User not found");
  });
});
