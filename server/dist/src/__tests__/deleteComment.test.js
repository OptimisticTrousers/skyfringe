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
// Use the controller
app.delete("/comments/:commentId", mockUser_1.default, commentController_1.comment_delete);
describe("DELETE /api/posts/:postId/comments/:commentId", () => {
    it("returns deleted comment ID successful delete operation", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/comments/${populateDB_1.luffyCommentId}`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(populateDB_1.luffyCommentId.equals(response.body._id)).toBe(true);
    }));
    it("returns a 403 error if the user is not the user who wrote the comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/comments/${populateDB_1.zoroCommentId}`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(403);
        expect(response.body.message).toEqual("Forbidden");
    }));
});
