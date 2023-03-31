import mongoose from "mongoose";
import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

// Explicitly define IDs here to make it easier to understand relationships in test db.
const luffyId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000004");
const zoroId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000005");
const namiId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000006");
const usoppId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000007");
const crocodileId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000008");

const luffyPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000009");
const zoroPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000010");
const namiPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000011");
const usoppPostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000012");
const crocodilePostId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000013");

const luffyCommentId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000014");
const luffySecondCommentId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000015"
);
const zoroCommentId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000016");

// Set up array of user/post/comment docs to be later saved to db
const users = [
  {
    _id: luffyId,
    fullName: "Monkey D. Luffy",
    userName: "luffy",
    email: "luffy@onepiece.com",
    password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
    bio: "I'm going to be the King of the Pirates!",
    friends: ["4c8a331bda76c559ef000005"],
    friendRequests: [
      {
        user: "4c8a331bda76c559ef000006",
        status: "outgoing",
      },
      {
        user: "4c8a331bda76c559ef000007",
        status: "incoming",
      },
      {
        user: "4c8a331bda76c559ef000008",
        status: "rejectedIncoming",
      },
    ],
  },
  {
    _id: zoroId,
    fullName: "Roronoa Zoro",
    userName: "zoro",
    email: "zoro@onepiece.com",
    password: "$2a$10$qCPh8/C30SpOOrjkaavXquYiqvv5SmQXQNdPgvtasqB9eaJxGDDY.",
    bio: "Scars On The Back Are A Swordsman Shame",
    friends: [
      "4c8a331bda76c559ef000004",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ],
  },
  {
    _id: namiId,
    fullName: "Nami",
    userName: "nami",
    email: "nami@onepiece.com",
    password: "$2a$10$LireFRYIV1YJgzWeHoFG3.iVM.PMWKILHITKmgApmMEfl4fAjDgvu",
    bio: "The forecast is thunder and lightning!",
    friends: [
      "4c8a331bda76c559ef000004",
      "4c8a331bda76c559ef000005",
      "4c8a331bda76c559ef000007",
    ],
  },
  {
    _id: usoppId,
    fullName: "Usopp",
    userName: "usopp",
    email: "usopp@onepiece.com",
    password: "$2a$10$p27n84..B5CTA.of5JUS3e7jNvpSns82qrv6oR4WAwtImCaw7Zuui",
    bio: "I'm Captain Usopp!",
    friends: [
      "4c8a331bda76c559ef000004",
      "4c8a331bda76c559ef000005",
      "4c8a331bda76c559ef000006",
    ],
  },
  {
    _id: crocodileId,
    fullName: "Crocodile",
    userName: "crocodile",
    email: "crocodile@onepiece.com",
    password:
      "$2a$14c8a331bda76c559ef0000040$f5I6hnSWaZZgKGfbVijlGuZQshNINCrynXNTHl4O5RgO08HK6tILS",
    bio: "Ahahahahahaha!",
    friends: [],
    friendRequests: [
      {
        user: "4c8a331bda76c559ef000004",
        status: "rejectedOutgoing",
      },
    ],
  },
];

const posts = [
  {
    _id: luffyPostId,
    author: "4c8a331bda76c559ef000004",
    content: "MEAT!",
    likes: [
      "4c8a331bda76c559ef000005",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ],
  },
  {
    _id: zoroPostId,
    author: "4c8a331bda76c559ef000005",
    content: "Two-Sword Style",
    likes: [],
  },
  {
    _id: usoppPostId,
    author: "4c8a331bda76c559ef000007",
    content:
      "I've sunk countless warship! People fear me as Captain Usopp, Lord of Destruction! Hey... if you wanna run, now's the time!",
    likes: [],
  },
  {
    _id: namiPostId,
    author: "4c8a331bda76c559ef000006",
    content: "I’ll have mapped out the entire world!",
    likes: [],
  },
  {
    _id: crocodilePostId,
    author: "4c8a331bda76c559ef000008",
    content: "Ahahahahahah",
    likes: [],
  },
];

const comments = [
  {
    // Luffy comments on Zoro's post, liked by Nami, and Usopp
    _id: luffyCommentId,
    post: zoroPostId,
    author: "4c8a331bda76c559ef000004",
    content: "Three-Sword Style",
    likes: ["4c8a331bda76c559ef000006", "4c8a331bda76c559ef000007"],
  },
  {
    // Zoro comments on Luffy's post, liked by Luffy, Nami, and Usopp
    _id: zoroCommentId,
    post: luffyPostId,
    author: "4c8a331bda76c559ef000005",
    content: "How did I end up following a captain like this?",
    likes: [
      "4c8a331bda76c559ef000004",
      "4c8a331bda76c559ef000006",
      "4c8a331bda76c559ef000007",
    ],
  },
  {
    // Luffy comments on Crocodile's post, liked by Zoro, Nami and Usopp
    _id: luffySecondCommentId,
    post: crocodilePostId,
    author: "4c8a331bda76c559ef000004",
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
  try {
    const userDocs = await User.insertMany(users);
    console.log(`${userDocs.length} users seeded successfully.`);
  } catch (error) {
    console.log(`Error seeding users: ${error}`);
  }

  try {
    const postDocs = await Post.insertMany(posts);
    console.log(`${postDocs.length} posts seeded successfully.`);
  } catch (error) {
    console.log(`Error seeding posts: ${error}`);
  }

  try {
    const commentDocs = await Comment.insertMany(comments);
    console.log(`${commentDocs.length} comments seeded successfully.`);
  } catch (error) {
    console.log(`Error seeding comments: ${error}`);
  }
  console.log("Done!");
})();
