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
const accountController_1 = require("../controllers/accountController");
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// User ID for user Monkey D. Luffy
const userId = populateDB_1.luffyId.toString();
describe("Confirm user has expanded presence in the database", () => {
    test("user has liked posts and comments", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all posts and comments the user has liked
        const posts = yield post_1.default.find({ likes: userId });
        const comments = yield comment_1.default.find({ likes: userId });
        expect(posts.length).toBe(1);
        expect(comments.length).toBe(3);
    }));
});
describe("removeAllLikes functionality", () => {
    beforeAll(() => (0, accountController_1.removeAllLikes)(userId));
    it("removes all user's likes from posts", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all posts the user has liked
        const posts = yield post_1.default.find({ likes: userId });
        expect(posts.length).toBe(0);
    }));
    it("removes all user's likes from comments", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all comments the user has liked
        const comments = yield comment_1.default.find({ likes: userId });
        expect(comments.length).toBe(0);
    }));
});
