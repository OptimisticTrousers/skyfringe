import mongoose from "mongoose";
import {
  clearMongoServer,
  initializeMongoServer,
  stopMongoServer,
} from "./mongoConfigTesting";
import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(() => initializeMongoServer());
afterAll(async () => {
  await clearMongoServer();
  await stopMongoServer();
});

// Explicitly define IDs here to make it easier to understand relationships in test db.
const luffyId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000004");
const zoroId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000005");
const namiId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000006");
const usoppId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000007");
const crocodileId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000008");

const luffyPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef00009");
const zoroPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000010");
const namiPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000011");
const usoppPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000012");
const crocodilePostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000013");

const luffyCommentId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000014");
const zoroCommentId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000015");

// Set up array of user/post/comment docs to be later saved to db
const users = [
  {
    _id: luffyId,
    fullName: "Monkey D. Luffy",
    userName: "luffy",
    email: "luffy@onepiece.com",
    password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
    friends: [
      {
        user: "4c8a331bda76c559ef000005",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000006",
        status: "outgoingRequest",
      },
      {
        user: "4c8a331bda76c559ef000007",
        status: "incomingRequest",
      },
      {
        user: "4c8a331bda76c559ef000008",
        status: "rejectedFriendRequest",
      },
    ],
  },
  {
    _id: zoroId,
    fullName: "Roronoa Zoro",
    userName: "zoro",
    email: "zoro@onepiece.com",
    password: "$2a$10$qCPh8/C30SpOOrjkaavXquYiqvv5SmQXQNdPgvtasqB9eaJxGDDY.",
    friends: [
      {
        user: "4c8a331bda76c559ef000004",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000006",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000007",
        status: "friend",
      },
    ],
  },
  {
    _id: namiId,
    fullName: "Nami",
    userName: "nami",
    email: "nami@onepiece.com",
    password: "$2a$10$LireFRYIV1YJgzWeHoFG3.iVM.PMWKILHITKmgApmMEfl4fAjDgvu",
    friends: [
      {
        user: "4c8a331bda76c559ef000004",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000005",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000007",
        status: "friend",
      },
    ],
  },
  {
    _id: usoppId,
    fullName: "Usopp",
    userName: "usopp",
    email: "usopp@onepiece.com",
    password: "$2a$10$p27n84..B5CTA.of5JUS3e7jNvpSns82qrv6oR4WAwtImCaw7Zuui",
    friends: [
      {
        user: "4c8a331bda76c559ef000004",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000005",
        status: "friend",
      },
      {
        user: "4c8a331bda76c559ef000006",
        status: "friend",
      },
    ],
  },
  {
    _id: crocodileId,
    fullName: "Crocodile",
    userName: "crocodile",
    email: "crocodile@onepiece.com",
    password: "$2a$10$f5I6hnSWaZZgKGfbVijlGuZQshNINCrynXNTHl4O5RgO08HK6tILS",
    friends: [],
  },
];

const posts = [
  {
    _id: luffyPostId,
    author: "4c8a331bda76c559ef000004",
    content: "I'm going to be the King of the Pirates!",
    comments: [],
    likes: [],
  },
  {
    _id: zoroPostId,
    author: "4c8a331bda76c559ef000005",
    content: "Two-Sword Style",
    coments: [],
    likes: [],
  },
  {
    _id: usoppPostId,
    author: "4c8a331bda76c559ef000007",
    content:
      "I've sunk countless warship! People fear me as Captain Usopp, Lord of Destruction! Hey... if you wanna run, now's the time!",
    comments: [],
    likes: [],
  },
  {
    _id: namiPostId,
    author: "4c8a331bda76c559ef000006",
    content: "I’ll have mapped out the entire world!",
    comments: [],
    likes: [],
  },
  {
    _id: crocodilePostId,
    author: "4c8a331bda76c559ef000008",
    content: "Ahahahahahah",
    comments: [],
    likes: [],
  },
];

const comments = [
  {
    // Luffy comments on Zoro's post, liked by Nami and Usopp
    _id: luffyCommentId,
    user: "4c8a331bda76c559ef000004",
    content: "Three-Sword Style",
    likes: ["4c8a331bda76c559ef000006", "4c8a331bda76c559ef000007"],
  },
  {
    _id: zoroCommentId,
    user: "4c8a331bda76c559ef000005",
    content: "How did I end up following a captain like this?",
    likes: [
      "4c8a331bda76c559ef00004",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ],
  },
  {
    // Luffy comments on Crocodile's post, liked by Zoro, Nami and Usopp
    _id: luffyCommentId,
    user: "4c8a331bda76c559ef000004",
    content: "I'll kick your ass!",
    likes: [
      "4c8a331bda76c559ef000005",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ],
  },
];

// IIFE to populate database with intial data. Use insertMany to reduce overall db calls
(async () => {
  User.insertMany(users, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
  Post.insertMany(posts, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
  Comment.insertMany(comments, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
})();
