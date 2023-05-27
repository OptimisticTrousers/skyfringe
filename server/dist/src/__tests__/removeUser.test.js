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
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const post_1 = __importDefault(require("../models/post"));
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// User ID for user Monkey D. Luffy
const userId = populateDB_1.luffyId.toString();
describe("Confirm user has expanded presence in the database", () => {
    test("if user exists", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all posts and comments the user has liked
        const user = yield user_1.default.findById(userId);
        expect(user).toBeDefined();
    }));
});
describe("removeUser functionality", () => {
    beforeAll(() => (0, accountController_1.removeUser)(userId));
    it("removes all user's posts", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all posts made by the user
        const posts = yield post_1.default.find({ author: userId });
        expect(posts.length).toBe(0);
    }));
    it("removes all user's comments", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all comments made by the user
        const comments = yield comment_1.default.find({ author: userId });
        expect(comments.length).toBe(0);
    }));
    it("removes user", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find user
        const user = yield user_1.default.findById(userId);
        expect(user).toBeNull();
    }));
});
