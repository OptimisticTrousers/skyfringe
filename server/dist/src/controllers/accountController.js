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
exports.removeUser = exports.removeAllFriends = exports.removeAllComments = exports.removeAllPosts = exports.removeAllLikes = void 0;
const s3_1 = require("../config/s3");
const comment_1 = __importDefault(require("../models/comment"));
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
// This function has been delegated to its own module because of the complexity involved in this multi-step db query
// ! The order of deletion operations may be important, so follow the order of functions in this module
// Removes all instances of the user's ID from comment and post likes arrays
const removeAllLikes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Remove all likes this user has submitted for all posts
    yield post_1.default.updateMany({ likes: userId }, // find all posts the user has liked
    { $pull: { likes: userId } } // remove the likes from the likes array
    );
    // Remove all likes this user has submitted for all comments
    yield comment_1.default.updateMany({ likes: userId }, // find all comments the user has liked
    { $pull: { likes: userId } } // remove the likes from the likes array
    );
});
exports.removeAllLikes = removeAllLikes;
// Removes all the user's posts, images associated with these posts, and comments associated with these posts
const removeAllPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find all posts by this user
    const posts = yield post_1.default.find({ author: userId });
    // Isolate those posts with images
    const postsWithImages = posts.filter((post) => { var _a; return ((_a = post.photo) === null || _a === void 0 ? void 0 : _a.imageUrl) !== undefined; });
    // Isolate image URLs of these post images
    const imageURLs = postsWithImages.map((post) => { var _a; return (_a = post.photo) === null || _a === void 0 ? void 0 : _a.imageUrl; });
    // Remove bulk resources from AWS S3
    imageURLs.forEach((imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const path = imageUrl.substring(imageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
        yield (0, s3_1.s3Deletev3)(path);
    }));
    // Finally, remove all posts by this user
    yield post_1.default.deleteMany({ author: userId });
});
exports.removeAllPosts = removeAllPosts;
// Removes all comment documents made by the user and any references to these comments among all posts
const removeAllComments = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Remove all comments by this user
    yield comment_1.default.deleteMany({ author: userId });
});
exports.removeAllComments = removeAllComments;
// Removes all instances of the user from other users' friend lists
const removeAllFriends = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.updateMany({ friends: userId }, // find all users with this user as a friend of some type
    { $pull: { friendRequest: userId } } // remove all friend entries for this user
    );
    yield user_1.default.updateMany({ "friendRequests.user": userId }, // find all users with this user as a friend of some type
    { $pull: { friendRequests: { user: userId } } } // remove all friend entries for this user
    );
});
exports.removeAllFriends = removeAllFriends;
// Remove the user document and any images
const removeUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Ensure to use findOneAndDelete to return the deleted user (use information for AWS S3 destroy operation)
    const user = yield user_1.default.findOneAndDelete({ _id: userId });
    // Remove avatar from AWS S3 if image exists
    const avatarImageUrl = (_a = user === null || user === void 0 ? void 0 : user.photo) === null || _a === void 0 ? void 0 : _a.imageUrl;
    if (avatarImageUrl) {
        const path = avatarImageUrl.substring(avatarImageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
        yield (0, s3_1.s3Deletev3)(path);
    }
    // Remove cover from AWS S3 if image exists
    const coverImageUrl = (_b = user === null || user === void 0 ? void 0 : user.cover) === null || _b === void 0 ? void 0 : _b.imageUrl;
    if (coverImageUrl) {
        const path = coverImageUrl.substring(coverImageUrl.indexOf("facebook_clone") + "facebook_clone".length + 1);
        yield (0, s3_1.s3Deletev3)(path);
    }
});
exports.removeUser = removeUser;
