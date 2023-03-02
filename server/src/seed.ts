import bcrypt from "bcryptjs";
import User from "./models/user";
import Post from "./models/post";
import Comment from "./models/comment";
import mongoConfig from "./config/db";
import mongoose from "mongoose";

async function seed(config: any) {
  if (process.env.NODE_ENV !== "test") {
    throw new Error('NODE_ENV must equal "test"!');
  }

  try {
    config();

    console.log("Resetting database...");
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
    ]);

    const luffyId = new mongoose.Types.ObjectId("63ffe2394ba6931001673a16");
    const zoroId = new mongoose.Types.ObjectId("63ffe28a03861eacdf3b618d");
    const namiId = new mongoose.Types.ObjectId("63ffe29611ff85f225e99d8d");
    const usoppId = new mongoose.Types.ObjectId("63ffe2ad135076c12765b2c1");
    const sanjiId = new mongoose.Types.ObjectId("63ffe2bf437a932c8f0a29c2");
    const chopperId = new mongoose.Types.ObjectId("63ffe2cf76e04ac74aeb2ad9");
    const robinId = new mongoose.Types.ObjectId("63ffe2dd7f606102f2089563");
    const frankyId = new mongoose.Types.ObjectId("63ffe3abe057bf774d4f3343");
    const brookId = new mongoose.Types.ObjectId("63ffe3b6ce9d3bc87e11beab");
    const jinbeiId = new mongoose.Types.ObjectId("63ffe3c419931753b2effed0");

    console.log("Seeding users...");

    const passwordHash = await bcrypt.hash("password", 11);
    // Set up array of user/post/comment docs to be later saved to db
    const users = [
      {
        fullName: "Monkey D. Luffy",
        userName: "luffy",
        password: "",
        email: "luffy@onepiece.com",
        friends: [
          {
            user: "63ffe28a03861eacdf3b618d",
            status: "friend",
          },
        ],
      },
      {
        fullName: "Roronoa Zoro",
        userName: "zoro",
        password: "",
        email: "zoro@onepiece.com",
        friends: [
          {
            user: "63ffe2394ba6931001673a16",
            status: "friend",
          },
        ],
      },
    ];

    const posts = [
      {
        user: "63ffe28a03861eacdf3b618d",
        content: "I'm going to be the King of the Pirates!",
        likes: [],
        comments: [],
        createdAt: "2020-12-02T09:32:49.309Z",
        updatedAt: "2022-04-19T02:31:49.436Z",
        image: {
          imageUrl: "",
          altText: "",
        },
      },
      {
        user: "63ffe2394ba6931001673a16",
        content: "Two-Sword Style",
        likes: [],
        comments: [],
        createdAt: "2020-12-02T09:32:49.309Z",
        updatedAt: "2022-04-19T02:31:49.436Z",
        image: {
          imageUrl: "",
          altText: "",
        },
      },
    ];

    // Save seeded users
    await Promise.all([exampleUser.save(), seedUser.save()]);

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  }
}

seed(mongoConfig);
