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
const post_1 = __importDefault(require("../models/post"));
const accountController_1 = require("../controllers/accountController");
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// User ID for user Monkey D. Luffy
const userId = populateDB_1.luffyId.toString();
// Post IDs for all posts by luffy
const postIds = [populateDB_1.luffyPostId];
describe("Confirm user has posts in the database", () => {
    test("user has 1 post", () => __awaiter(void 0, void 0, void 0, function* () {
        // Luffy has 1 total friend, with 3 requests. Therefore, 4 other users should have a reference to Peter. Those users are found below
        const posts = yield post_1.default.find({ authopr: userId });
        expect(posts.length).toBe(1);
    }));
});
describe("removeAllPosts functionality", () => {
    beforeAll(() => (0, accountController_1.removeAllPosts)(userId));
    it("removes all posts associated with a user", () => __awaiter(void 0, void 0, void 0, function* () {
        // Find all of the posts made by user
        const posts = yield post_1.default.find({ author: userId });
        expect(posts.length).toBe(1);
    }));
});
