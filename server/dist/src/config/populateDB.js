"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populate = exports.chats = exports.messages = exports.users = exports.locosPollos = exports.bob = exports.crocodile = exports.usopp = exports.nami = exports.zoro = exports.luffy = exports.luffySecondMessageId = exports.zoroMessageId = exports.luffyMessageId = exports.chatId = exports.locosPollosId = exports.bobId = exports.usoppCommentId = exports.namiCommentId = exports.zoroCommentId = exports.luffySecondCommentId = exports.luffyCommentId = exports.crocodilePostId = exports.usoppPostId = exports.namiPostId = exports.zoroPostId = exports.luffyPostId = exports.crocodileId = exports.usoppId = exports.namiId = exports.zoroId = exports.luffyId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const chat_1 = __importDefault(require("../models/chat"));
const message_1 = __importDefault(require("../models/message"));
const dotenv_1 = require("dotenv");
// Setting up ENV variables, specifically for S3_BUCKET
(0, dotenv_1.config)();
// Explicitly define IDs here to make it easier to understand relationships in test db.
exports.luffyId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000004");
exports.zoroId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000005");
exports.namiId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000006");
exports.usoppId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000007");
exports.crocodileId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000008");
exports.luffyPostId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000009");
exports.zoroPostId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000010");
exports.namiPostId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000011");
exports.usoppPostId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000012");
exports.crocodilePostId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000013");
exports.luffyCommentId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000014");
exports.luffySecondCommentId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000015");
exports.zoroCommentId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000016");
exports.namiCommentId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000017");
exports.usoppCommentId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000018");
exports.bobId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000019");
exports.locosPollosId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000020");
exports.chatId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000022");
exports.luffyMessageId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000023");
exports.zoroMessageId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000024");
exports.luffySecondMessageId = new mongoose_1.default.Types.ObjectId("4c8a331bda76c559ef000025");
const S3_BUCKET = process.env.AWS_BUCKET_NAME;
if (!S3_BUCKET) {
    throw new Error("S3_BUCKET value is not defined in .env file");
}
const coverUrl = `${S3_BUCKET}/facebook_clone/covers/cover.webp`;
const altText = "One Piece Manga Chapter 726 Cover - Characters in childhood and current versions standing side by side, with the caption 'We can live how we want'";
exports.luffy = {
    _id: exports.luffyId,
    fullName: "Monkey D. Luffy",
    userName: "luffy",
    email: "luffy@onepiece.com",
    password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
    bio: "I'm going to be the King of the Pirates!",
    friends: [exports.zoroId],
    friendRequests: [
        {
            user: exports.namiId,
            status: "outgoing",
        },
        {
            user: exports.usoppId,
            status: "incoming",
        },
        {
            user: exports.crocodileId,
            status: "rejectedIncoming",
        },
    ],
    photo: {
        imageUrl: `${S3_BUCKET}/facebook_clone/users/luffy.webp`,
        altText: "Fictional character Monkey D. Luffy from the One Piece manga",
    },
    cover: {
        imageUrl: coverUrl,
        altText: altText,
    },
};
exports.zoro = {
    _id: exports.zoroId,
    fullName: "Roronoa Zoro",
    userName: "zoro",
    email: "zoro@onepiece.com",
    password: "$2a$10$qCPh8/C30SpOOrjkaavXquYiqvv5SmQXQNdPgvtasqB9eaJxGDDY.",
    bio: "Scars On The Back Are A Swordsman Shame",
    friends: [exports.luffyId, exports.namiId, exports.usoppId],
    // automatically sets default to []
    // friendRequests: [],
    photo: {
        imageUrl: `${S3_BUCKET}/facebook_clone/users/zoro.webp`,
        altText: "Fictional character Roronoa Zoro from the One Piece manga",
    },
    cover: {
        imageUrl: coverUrl,
        altText: altText,
    },
};
exports.nami = {
    _id: exports.namiId,
    fullName: "Nami",
    userName: "nami",
    email: "nami@onepiece.com",
    password: "$2a$10$LireFRYIV1YJgzWeHoFG3.iVM.PMWKILHITKmgApmMEfl4fAjDgvu",
    bio: "The forecast is thunder and lightning!",
    friends: [exports.luffyId, exports.zoroId, exports.usoppId],
    // automatically sets default to []
    // friendRequests: [],
    photo: {
        imageUrl: `${S3_BUCKET}/facebook_clone/users/nami.webp`,
        altText: "Fictional character Nami from the One Piece manga",
    },
    cover: {
        imageUrl: coverUrl,
        altText: altText,
    },
};
exports.usopp = {
    _id: exports.usoppId,
    fullName: "Usopp",
    userName: "usopp",
    email: "usopp@onepiece.com",
    password: "$2a$10$p27n84..B5CTA.of5JUS3e7jNvpSns82qrv6oR4WAwtImCaw7Zuui",
    bio: "I'm Captain Usopp!",
    friends: [exports.luffyId, exports.zoroId, exports.namiId],
    friendRequests: [
        {
            user: exports.luffyId,
            status: "outgoing",
        },
    ],
    photo: {
        imageUrl: `${S3_BUCKET}/facebook_clone/users/usopp.webp`,
        altText: "Fictional character Usopp from the One Piece manga",
    },
    cover: {
        imageUrl: coverUrl,
        altText: altText,
    },
};
exports.crocodile = {
    _id: exports.crocodileId,
    fullName: "Crocodile",
    userName: "crocodile",
    email: "crocodile@onepiece.com",
    password: "$2a$14c8a331bda76c559ef0000040$f5I6hnSWaZZgKGfbVijlGuZQshNINCrynXNTHl4O5RgO08HK6tILS",
    bio: "Ahahahahahaha!",
    // automatically sets default to []
    friends: [],
    friendRequests: [
        {
            user: exports.luffyId,
            status: "outgoingRejected",
        },
    ],
    photo: {
        imageUrl: `${S3_BUCKET}/facebook_clone/users/crocodile.webp`,
        altText: "Fictional character Crocodile from the One Piece manga",
    },
    cover: {
        imageUrl: coverUrl,
        altText: altText,
    },
};
// Two users used for testing purposes only
exports.bob = {
    _id: exports.bobId,
    fullName: "Bob Jones",
    userName: "bobjones",
    email: "bobjones@gmail.com",
    password: "password",
    friends: [],
    friendRequests: [],
};
exports.locosPollos = {
    _id: exports.locosPollosId,
    fullName: "Locos Pollos",
    userName: "locospollos",
    email: "locospollos@gmail.com",
    password: "password",
    friends: [],
    friendRequests: [],
};
// Set up array of user/post/comment docs to be later saved to db
exports.users = [exports.luffy, exports.zoro, exports.nami, exports.usopp, exports.crocodile];
const posts = [
    {
        _id: exports.luffyPostId,
        author: exports.luffyId,
        content: "MEAT!",
        likes: [exports.zoroId, exports.namiId, exports.usoppId],
        photo: {
            imageUrl: `${S3_BUCKET}/facebook_clone/posts/4c8a331bda76c559ef000009_luffy.webp`,
            altText: "Monkey D. Luffy eating meat",
        },
    },
    {
        _id: exports.zoroPostId,
        author: exports.zoroId,
        content: "Three-Sword Style",
        likes: [exports.luffyId],
        photo: {
            imageUrl: `${S3_BUCKET}/facebook_clone/posts/4c8a331bda76c559ef000010_zoro.webp`,
            altText: "Roronoa Zoro using three swords",
        },
    },
    {
        _id: exports.usoppPostId,
        author: exports.usoppId,
        content: "I've sunk countless warship! People fear me as Captain Usopp, Lord of Destruction! Hey... if you wanna run, now's the time!",
        likes: [],
    },
    {
        _id: exports.namiPostId,
        author: exports.namiId,
        likes: [],
        photo: {
            imageUrl: `${S3_BUCKET}/facebook_clone/posts/4c8a331bda76c559ef000011_nami.jpg`,
            altText: "Nami creating a map",
        },
    },
    {
        _id: exports.crocodilePostId,
        author: exports.crocodileId,
        content: "Ahahahahahah",
        likes: [],
    },
];
const comments = [
    {
        // Luffy comments on Zoro's post, liked by Nami, and Usopp
        _id: exports.luffyCommentId,
        post: exports.zoroPostId,
        author: exports.luffyId,
        content: "Four-Sword Style",
        likes: [exports.namiId, exports.usoppId],
    },
    {
        // Nami's comments on Zoro's post, liked by Luffy, and Usopp
        _id: exports.namiCommentId,
        post: exports.zoroPostId,
        author: exports.namiId,
        content: "Moss head",
        likes: [exports.luffyId, exports.usoppId],
    },
    {
        // Usopp's comments on Zoro's post, liked by Luffy, and Usopp
        _id: exports.usoppCommentId,
        post: exports.zoroPostId,
        author: exports.usoppId,
        content: "So cool!",
        likes: [exports.luffyId, exports.usoppId],
    },
    {
        // Zoro comments on Luffy's post, liked by Luffy, Nami, and Usopp
        _id: exports.zoroCommentId,
        post: exports.luffyPostId,
        author: exports.zoroId,
        content: "How did I end up following a captain like this?",
        likes: [exports.luffyId, exports.namiId, exports.usoppId],
    },
    {
        // Luffy comments on Crocodile's post, liked by Zoro, Nami and Usopp
        _id: exports.luffySecondCommentId,
        post: exports.crocodilePostId,
        author: exports.luffyId,
        content: "I'll kick your ass!",
        likes: [exports.zoroId, exports.namiId, exports.usoppId],
    },
];
exports.messages = [
    {
        _id: exports.luffyMessageId,
        content: "I'll be the King of the Pirates",
        author: exports.luffy,
        chat: exports.chatId,
    },
    {
        _id: exports.zoroMessageId,
        content: "And I'll be the greatest swordsman in the world!",
        author: exports.zoro,
        chat: exports.chatId,
        photo: {
            imageUrl: `${S3_BUCKET}/facebook_clone/users/zoro.webp`,
            altText: "Fictional character Roronoa Zoro from the One Piece manga",
        },
    },
    {
        _id: exports.luffySecondMessageId,
        content: "I'd need no less than the greatest!",
        author: exports.luffy,
        chat: exports.chatId,
    },
];
exports.chats = [
    {
        _id: exports.chatId,
        participants: [exports.luffy, exports.zoro],
        messages: exports.messages,
    },
];
// Function used to populate database with intial data. Use insertMany to reduce overall db calls
const populate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDocs = yield user_1.default.insertMany(exports.users);
        console.log(`${userDocs.length} users seeded successfully.`);
    }
    catch (error) {
        console.log(`Error seeding users: ${error}`);
    }
    try {
        const postDocs = yield post_1.default.insertMany(posts);
        console.log(`${postDocs.length} posts seeded successfully.`);
    }
    catch (error) {
        console.log(`Error seeding posts: ${error}`);
    }
    try {
        const commentDocs = yield comment_1.default.insertMany(comments);
        console.log(`${commentDocs.length} comments seeded successfully.`);
    }
    catch (error) {
        console.log(`Error seeding comments: ${error}`);
    }
    try {
        const chatDocs = yield chat_1.default.insertMany(exports.chats);
        console.log(`${chatDocs.length} chats seeded successfully.`);
    }
    catch (error) {
        console.log(`Error seeding chats: ${error}`);
    }
    try {
        const messageDocs = yield message_1.default.insertMany(exports.messages);
        console.log(`${messageDocs.length} messages seeded successfully.`);
    }
    catch (error) {
        console.log(`Error seeding chats: ${error}`);
    }
    console.log("Done!");
});
exports.populate = populate;
