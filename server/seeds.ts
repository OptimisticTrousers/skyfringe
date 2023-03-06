import bcrypt from "bcryptjs";
import User from "./src/models/user";
import Post from "./src/models/post";
import Comment from "./src/models/comment";
import mongoConfig from "./src/config/db";
import mongoose from "mongoose";

async function seed(config: any) {
  // if (process.env.NODE_ENV !== "test") {
  //   throw new Error('NODE_ENV must equal "test"!');
  // }

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
    const crocodileId = new mongoose.Types.ObjectId("64052ec796cf9621788637ab");

    console.log("Seeding users...");

    const password = "password";
    const salt = 10;
    // Set up array of user/post/comment docs to be later saved to db
    const users = [
      {
        _id: luffyId,
        fullName: "Monkey D. Luffy",
        userName: "luffy",
        password: await bcrypt.hash(password, salt),
        email: "luffy@onepiece.com",
        friends: [
          {
            user: "63ffe28a03861eacdf3b618d",
            status: "friend",
          },
          {
            user: "63ffe29611ff85f225e99d8d",
            status: "incomingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "rejectedFriendRequest",
          },
        ],
      },
      {
        _id: zoroId,
        fullName: "Roronoa Zoro",
        userName: "zoro",
        password: await bcrypt.hash(password, salt),
        email: "zoro@onepiece.com",
        friends: [
          {
            user: "63ffe2394ba6931001673a16",
            status: "friend",
          },
          {
            user: "63ffe29611ff85f225e99d8d",
            status: "incomingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "rejectedFriendRequest",
          },
        ],
      },
      {
        _id: namiId,
        fullName: "Nami",
        userName: "nami",
        password: await bcrypt.hash(password, salt),
        email: "nami@onepiece.com",
        friends: [
          {
            user: "63ffe2394ba6931001673a16",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe28a03861eacdf3b618d",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "rejectedFriendRequest",
          },
        ],
      },
      {
        _id: usoppId,
        fullName: "Usopp",
        userName: "usopp",
        password: await bcrypt.hash(password, salt),
        email: "usopp@onepiece.com",
        friends: [
          {
            user: "63ffe2394ba6931001673a16",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe28a03861eacdf3b618d",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "rejectedFriendRequest",
          },
        ],
      },
      {
        _id: crocodileId,
        fullName: "Crocodile",
        userName: "croc",
        password: await bcrypt.hash(password, salt),
        email: "crocodileonepiece.com",
        friends: [
          {
            user: "63ffe2394ba6931001673a16",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe28a03861eacdf3b618d",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe29611ff85f225e99d8d",
            status: "outgoingFriendRequest",
          },
          {
            user: "63ffe2ad135076c12765b2c1",
            status: "outgoingFriendRequest",
          },
        ],
      },
    ];

    const posts = [
      {
        author: "63ffe28a03861eacdf3b618d",
        content: "I'm going to be the King of the Pirates!",
        likes: [],
        comments: [],
        createdAt: "2020-12-02T09:32:49.309Z",
        updatedAt: "2022-04-19T02:31:49.436Z",
      },
      {
        author: "63ffe2394ba6931001673a16",
        content: "Two-Sword Style",
        likes: [],
        comments: [],
        createdAt: "2020-12-02T09:32:49.309Z",
        updatedAt: "2022-04-19T02:31:49.436Z",
      },
    ];

    // Save seeded users
    const userData = await User.insertMany(users);
    const postData = await Post.insertMany(posts);
    console.log(userData);
    console.log(postData);
    // (async () => {
    //   User.insertMany(users, (err: any, docs: any) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(docs);
    //   });

    //   Post.insertMany(posts, (err: any, docs: any) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(docs);
    //   });
    // })();

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  }
}

seed(mongoConfig);
