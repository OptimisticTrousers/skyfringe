import express from "express";
import request from "supertest";
import User from "../models/user";
import jwt from "jsonwebtoken";
import app from "../app";
import { clearMongoServer } from "../config/mongoConfigTesting";

describe("PUT /api/users/:userId", () => {
  const user1 = new User({
    fullName: "John Doe",
    userName: "johndoe",
    email: "johndoe@example.com",
    password: "password123",
  });

  const user2 = new User({
    fullName: "Bob Jones",
    userName: "bobjones",
    email: "bobjones@example.com",
    password: "password123",
  });

  const user3 = new User({
    fullName: "Locos Pollos",
    userName: "locospollos",
    email: "locospollos@example.com",
    password: "password123",
  });

  const token1 = jwt.sign({ id: user1._id }, process.env.JWT_SECRET!);
  const token2 = jwt.sign({ id: user2._id }, process.env.JWT_SECRET!);
  const token3 = jwt.sign({ id: user3._id }, process.env.JWT_SECRET!);

  beforeAll(async () => {
    // Save the new users
    await user1.save();
    await user2.save();
    await user3.save();
  });

  describe("Sending friend requests", () => {
    it("should allow user1, John Doe to send a friend request to user2, Bob Jones", async () => {
      const response = await request(app)
        .put(`/users/${user2._id}`)
        .set("Cookie", `jwt=${token1}; HttpOnly`)
        .send({ action: "send" });

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the recipient, Bob Jones and his information
      expect(response.body.user.friendRequests[0].status).toEqual("incoming");
      expect(response.body.user.friendRequests[0].user._id).toEqual(user1._id);
    });
    it("should allow user2, Bob Jones to send a friend request to user3, Locos Pollos", async () => {
      const response = await request(app)
        .put(`/users/${user3._id}`)
        .set("Cookie", `jwt=${token2}; HttpOnly`)
        .send({ action: "send" });

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the recipient, Locos Pollos and his information
      expect(response.body.user.friendRequests[0].status).toEqual("incoming");
      expect(response.body.user.friendRequests[0].user._id).toEqual(user2._id);
    });
    it("should allow user3, Locos Pollos to send a friend request to user1, John Doe", async () => {
      const response = await request(app)
        .put(`/users/${user1._id}`)
        .set("Cookie", `jwt=${token3}; HttpOnly`)
        .send({ action: "send" });

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the recipient, John Doe and his information
      // FriendRequests at index 0 is user1, John Doe's request to user2, Bob Jones
      expect(response.body.user.friendRequests[0].status).toEqual("outgoing");
      expect(response.body.user.friendRequests[0].user._id).toEqual(user2._id);
      expect(response.body.user.friendRequests[1].status).toEqual("incoming");
      expect(response.body.user.friendRequests[1].user._id).toEqual(user3._id);
    });
  });
  describe("Outgoing friend requests", () => {
    it("user1, John Doe the sender, should show an outgoing request for user2 the recipient, Bob Jones", async () => {
      const response = await request(app)
        .get(`/users/${user1._id}`)
        .set("Cookie", `jwt=${token1}; HttpOnly`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the sender, John Doe and his information
      expect(response.body.user.friendRequests[0].status).toEqual("outgoing");
      expect(response.body.user.friendRequests[0].user._id).toEqual(user3._id);
    });
    it("user2, Bob Jones the sender, should show an outgoing request for user3 the recipient, Locos Pollos", async () => {
      const response = await request(app)
        .get(`/users/${user2._id}`)
        .set("Cookie", `jwt=${token2}; HttpOnly`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the sender, Bob Jones and his information
      expect(response.body.user.friendRequests[0].status).toEqual("outgoing");
    });
    it("user3, Locos Pollos the sender, should show an outgoing request for user1 the recipient, John Doe", async () => {
      const response = await request(app)
        .get(`/users/${user3._id}`)
        .set("Cookie", `jwt=${token3}; HttpOnly`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the sender, Locos Pollos and his information
      expect(response.body.user.friendRequests[0].status).toEqual("outgoing");
    });
  });
  describe("Accepting friend requests", () => {
    it("should allow the user2, Bob Jones to accept user1, John Doe's friend request", async () => {
      // Accept friend user from user2, Bob Jones' perspective
      const response = await request(app)
        .put(`/users/${user2._id}`)
        .set("Cookie", `jwt=${token2}; HttpOnly`)
        .send({ action: "accept" });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      // Returns the sender, Bob Jones and his information
      expect(response.body.user.friends.length).toEqual(1);
      // The only friend that user2, Bob Jones, should have, is John Doe, user1
      expect(response.body.user.friends[0]._id).toEqual(user1._id);
      expect(response.body.user.friendRequests[0].status).toEqual([]);
    });
  });
  describe("Rejecting friend requests", () => {
    it("should allow the user to reject friend requests", async () => {
      // Reject friend request from user2's perspective
      const response = await request(app)
        .put(`/users/${user2._id}`)
        .set("Cookie", `jwt=${token2}; HttpOnly`)
        .send({ status: "rejectedOutgoing" });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body.user.friendRequests[0].status).toEqual(
        "rejectedIncoming"
      );
    });
    it("allows the user1, John Doe to reject user3, Locos Pollos, and then send a request to the rejected", async () => {
      const response = await request(app)
        .put(`/users/${user2._id}`)
        .set("Cookie", `jwt=${token2}; HttpOnly`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body.user.friendRequests[0]);
    });
  });
  describe("Checking friend request status", () => {
    it("should show that a user has rejected an incoming friend request", async () => {
      const response = await request(app)
        .get(`/users/${user3._id}`)
        .set("Cookie", `jwt=${token3}; HttpOnly`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body.user.friendRequests[0].status).toEqual(
        "rejectedIncoming"
      );
    });
    it("should show that a user has had their outgoing friend request rejected", async () => {
      const response = await request(app)
        .get(`/users/${user2._id}`)
        .set("Cookie", `jwt=${token2}; HttpOnly`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body.user.friendRequests[0].status).toEqual(
        "rejectedOutgoing"
      );
    });
  });
});
