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
const populateDB_1 = require("../config/populateDB");
const postController_1 = require("../controllers/postController");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setup new app instance
const app = (0, express_1.default)();
// Use the controller
app.delete("/posts/:postId", mockUser_1.default, postController_1.post_delete);
jest.mock("../config/multer", () => {
    return {
        single: jest.fn(),
    };
});
jest.mock("../config/s3", () => ({
    s3Uploadv3: jest.fn(),
    s3Deletev3: jest.fn(),
}));
describe("DELETE /posts/:postId", () => {
    it("should delete post and return deleted post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/posts/${populateDB_1.luffyPostId}`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(populateDB_1.luffyPostId.equals(response.body._id)).toBe(true);
    }));
    it("returns a 403 error if the user is not the user who wrote the post", () => __awaiter(void 0, void 0, void 0, function* () {
        // Return an error if the user somehow is not the same as the user who created the post
        const response = yield (0, supertest_1.default)(app).delete(`/posts/${populateDB_1.zoroPostId}`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(403);
        expect(response.body.message).toEqual("Forbidden");
    }));
});
