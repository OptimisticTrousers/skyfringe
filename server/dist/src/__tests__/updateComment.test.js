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
const commentController_1 = require("../controllers/commentController");
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setup new app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use the controller
app.put("/comments/:commentId", mockUser_1.default, commentController_1.comment_update);
describe("PUT /api/posts/:postId/comments/:commentId", () => {
    const newContent = "Updated comment";
    it("should return a 400 error if no object is sent", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/comments/${populateDB_1.luffyCommentId}`)
            .send({});
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(400);
        expect(response.body[0].msg).toBe("Content is required");
    }));
    it("should return a 400 error if content is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/comments/${populateDB_1.luffyCommentId}`)
            .send({ content: "" });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(400);
        expect(response.body[0].msg).toBe("Content is required");
    }));
    it("returns a 403 error if the user is not the user who wrote the comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/comments/${populateDB_1.zoroCommentId}`)
            .send({ content: newContent });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(403);
        expect(response.body.message).toEqual("Forbidden");
    }));
    it("should update a comment content", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/comments/${populateDB_1.luffyCommentId}`)
            .send({ content: newContent });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(200);
        expect(response.body.content).toBe(newContent);
    }));
});
