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
const commentController_1 = require("../controllers/commentController");
const mockUser_1 = __importDefault(require("../middleware/mockUser"));
const comment_1 = __importDefault(require("../models/comment"));
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setup new app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use the controller
app.post("/posts/:postId/comments", mockUser_1.default, commentController_1.comment_create);
describe("POST /api/posts/:postId/comments", () => {
    it("should return a 200 response and create a new comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const content = "test comment";
        const response = yield (0, supertest_1.default)(app)
            .post(`/posts/${populateDB_1.luffyPostId}/comments`)
            .send({ content });
        const newComment = yield comment_1.default.findOne({ content });
        expect(newComment).toBeTruthy();
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.content).toEqual(content);
    }));
    it("returns a 400 error if the content is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post(`/posts/${populateDB_1.luffyPostId}/comments`)
            .send({});
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(400);
        expect(response.body).toEqual([
            {
                msg: "Content is required",
                param: "content",
                location: "body",
                value: "",
            },
        ]);
    }));
});
