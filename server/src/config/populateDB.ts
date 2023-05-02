import mongoose from "mongoose";
import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

// Explicitly define IDs here to make it easier to understand relationships in test db.
export const luffyId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000004");
export const zoroId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000005");
export const namiId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000006");
export const usoppId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000007");
export const crocodileId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000008"
);

export const luffyPostId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000009"
);
export const zoroPostId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000010"
);
export const namiPostId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000011"
);
export const usoppPostId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000012"
);
export const crocodilePostId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000013"
);

export const luffyCommentId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000014"
);
export const luffySecondCommentId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000015"
);
export const zoroCommentId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000016"
);

export const namiCommentId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000017"
);

export const usoppCommentId = new mongoose.Types.ObjectId(
  "4c8a331bda76c559ef000018"
);

export const bobId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000019");

const S3_BUCKET = process.env.S3_BUCKET;

const coverUrl = `${S3_BUCKET}/covers/cover.webp`;

const altText =
  "One Piece Manga Chapter 726 Cover - Characters in childhood and current versions standing side by side, with the caption 'We can live how we want'";

export const luffy = {
  _id: luffyId,
  fullName: "Monkey D. Luffy",
  userName: "luffy",
  email: "luffy@onepiece.com",
  password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
  bio: "I'm going to be the King of the Pirates!",
  friends: [zoroId],
  friendRequests: [
    {
      user: namiId,
      status: "outgoing",
    },
    {
      user: usoppId,
      status: "incoming",
    },
    {
      user: crocodileId,
      status: "rejectedIncoming",
    },
  ],
  photo: {
    imageUrl: `${S3_BUCKET}/users/luffy.webp`,
    altText: "Fictional character Monkey D. Luffy from the One Piece manga",
  },
  cover: {
    imageUrl: coverUrl,
    altText: altText,
  },
};

export const zoro = {
  _id: zoroId,
  fullName: "Roronoa Zoro",
  userName: "zoro",
  email: "zoro@onepiece.com",
  password: "$2a$10$qCPh8/C30SpOOrjkaavXquYiqvv5SmQXQNdPgvtasqB9eaJxGDDY.",
  bio: "Scars On The Back Are A Swordsman Shame",
  friends: [luffyId, namiId, usoppId],
  photo: {
    imageUrl: `${S3_BUCKET}/users/zoro.webp`,
    altText: "Fictional character Roronoa Zoro from the One Piece manga",
  },
  cover: {
    imageUrl: coverUrl,
    altText: altText,
  },
};

export const nami = {
  _id: namiId,
  fullName: "Nami",
  userName: "nami",
  email: "nami@onepiece.com",
  password: "$2a$10$LireFRYIV1YJgzWeHoFG3.iVM.PMWKILHITKmgApmMEfl4fAjDgvu",
  bio: "The forecast is thunder and lightning!",
  friends: [luffyId, zoroId, usoppId],
  photo: {
    imageUrl: `${S3_BUCKET}/users/nami.webp`,
    altText: "Fictional character Nami from the One Piece manga",
  },
  cover: {
    imageUrl: coverUrl,
    altText: altText,
  },
};

export const usopp = {
  _id: usoppId,
  fullName: "Usopp",
  userName: "usopp",
  email: "usopp@onepiece.com",
  password: "$2a$10$p27n84..B5CTA.of5JUS3e7jNvpSns82qrv6oR4WAwtImCaw7Zuui",
  bio: "I'm Captain Usopp!",
  friends: [luffyId, zoroId, namiId],
  photo: {
    imageUrl: `${S3_BUCKET}/users/usopp.webp`,
    altText: "Fictional character Usopp from the One Piece manga",
  },
  cover: {
    imageUrl: coverUrl,
    altText: altText,
  },
};

export const crocodile = {
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
      user: luffyId,
      status: "rejectedOutgoing",
    },
  ],
  photo: {
    imageUrl: `${S3_BUCKET}/users/crocodile.webp`,
    altText: "Fictional character Crocodile from the One Piece manga",
  },
  cover: {
    imageUrl: coverUrl,
    altText: altText,
  },
};

export const bob = {
  _id: bobId,
  fullName: "Bob Jones",
  userName: "bobjones",
  email: "bobjones@gmail.com",
  password:
    "$2a$14c8a331bda76c559ef0000040$f5I6hnSWaZZgKGfbVijlGuZQshNINCrynXNTHl4O5RgO08HK6tILS",
};

// Set up array of user/post/comment docs to be later saved to db
const users = [luffy, zoro, nami, usopp, crocodile, bob];

const posts = [
  {
    _id: luffyPostId,
    author: luffyId,
    content: "MEAT!",
    likes: [zoroId, namiId, usoppId],
    photo: {
      imageUrl: `${S3_BUCKET}/posts/4c8a331bda76c559ef000009_luffy.webp`,
      altText: "Monkey D. Luffy eating meat",
    },
  },
  {
    _id: zoroPostId,
    author: zoroId,
    content: "Three-Sword Style",
    likes: [],
    photo: {
      imageUrl: `${S3_BUCKET}/posts/4c8a331bda76c559ef000010_zoro.webp`,
      altText: "Roronoa Zoro using three swords",
    },
  },
  {
    _id: usoppPostId,
    author: usoppId,
    content:
      "I've sunk countless warship! People fear me as Captain Usopp, Lord of Destruction! Hey... if you wanna run, now's the time!",
    likes: [],
  },
  {
    _id: namiPostId,
    author: namiId,
    likes: [],
    photo: {
      imageUrl: `${S3_BUCKET}/posts/4c8a331bda76c559ef000011_nami.jpg`,
      altText: "Nami creating a map",
    },
  },
  {
    _id: crocodilePostId,
    author: crocodileId,
    content: "Ahahahahahah",
    likes: [],
  },
];

const comments = [
  {
    // Luffy comments on Zoro's post, liked by Nami, and Usopp
    _id: luffyCommentId,
    post: zoroPostId,
    author: luffyId,
    content: "Four-Sword Style",
    likes: [namiId, usoppId],
  },
  {
    // Nami's comments on Zoro's post, liked by Luffy, and Usopp
    _id: namiCommentId,
    post: zoroPostId,
    author: namiId,
    content: "Moss head",
    likes: [luffyId, usoppId],
  },
  {
    // Usopp's comments on Zoro's post, liked by Luffy, and Usopp
    _id: usoppCommentId,
    post: zoroPostId,
    author: usoppId,
    content: "So cool!",
    likes: [luffyId, usoppId],
  },
  {
    // Zoro comments on Luffy's post, liked by Luffy, Nami, and Usopp
    _id: zoroCommentId,
    post: luffyPostId,
    author: zoroId,
    content: "How did I end up following a captain like this?",
    likes: [luffyId, namiId, usoppId],
  },
  {
    // Luffy comments on Crocodile's post, liked by Zoro, Nami and Usopp
    _id: luffySecondCommentId,
    post: crocodilePostId,
    author: luffyId,
    content: "I'll kick your ass!",
    likes: [zoroId, namiId, usoppId],
  },
];

// Function used to populate database with intial data. Use insertMany to reduce overall db calls
export const populate = async () => {
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
};
