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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const populateDB_1 = require("../config/populateDB");
const commentController_1 = require("../controllers/commentController");
// Import db setup and teardown functionality
require("../config/testSeeds");
const app = (0, express_1.default)();
// Use the controller
app.get("/posts/:postId/comments", commentController_1.comment_list);
describe("GET /api/posts/:postId/comments", () => {
    test("returns all comments for the post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/posts/${populateDB_1.zoroPostId}/comments`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(200);
        // Expect the response body to be an array
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
