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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const mockUser_1 = __importDefault(require("../middleware/mockUser"));
const postController_1 = require("../controllers/postController");
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setup new app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.put("/posts/:postId/likes", mockUser_1.default, postController_1.post_like);
describe("PUT /api/posts/:postId/likes", () => {
    const luffyIdString = populateDB_1.luffyId.toString();
    it("should allow a user to like a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/posts/${populateDB_1.luffyPostId}/likes`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.likes.some((like) => like._id.toString() === luffyIdString)).toBe(true); // assuming the user ID is stored in the variable userId
    }));
    it("should allow a user to remove their like from a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/posts/${populateDB_1.luffyPostId}/likes`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.likes.some((like) => like._id.toString() === luffyIdString)).toBe(false); // assuming the user ID is stored in the variable userId
    }));
});
