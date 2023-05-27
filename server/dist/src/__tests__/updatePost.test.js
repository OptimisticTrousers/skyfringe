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
const postController_1 = require("../controllers/postController");
const populateDB_1 = require("../config/populateDB");
const mockUser_1 = __importDefault(require("../middleware/mockUser"));
// Import db setup and teardown functionality
require("../config/testSeeds");
jest.mock("../config/multer", () => ({
    single: jest.fn((id) => {
        return jest.fn((req, res, next) => {
            next();
        });
    }),
}));
// Setup new app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use the controller
app.put("/posts/:postId", mockUser_1.default, postController_1.post_update);
describe("PUT /posts/:postId", () => {
    it("returns newly updated post on successful update operation", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/posts/${populateDB_1.luffyPostId}`)
            .send({ content: "Updated post", imageUpdated: false });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.content).toEqual("Updated post");
    }));
    it("provides validation error if post text or image is left blank", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/posts/${populateDB_1.luffyPostId}`).send({});
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(400);
        // Returns array of validation errors in case of missing post text
        expect(response.body[0].msg).toBe("Post text or image is required");
    }));
    it("should remove post pic", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/posts/${populateDB_1.luffyPostId}`)
            .send({ content: "Updated post", imageUpdated: true });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(200);
        expect(response.body.photo).toBeUndefined();
    }));
    it("should return validation errors for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/posts/${populateDB_1.luffyPostId}`)
            .send({ content: "Updated post", imageUpdated: "invalid" });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(1);
    }));
});
