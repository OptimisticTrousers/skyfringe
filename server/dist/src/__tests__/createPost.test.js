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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = require("dotenv");
const mockUser_1 = __importDefault(require("../middleware/mockUser"));
const populateDB_1 = require("../config/populateDB");
const postController_1 = require("../controllers/postController");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setting up ENV variables, specifically for S3_BUCKET
(0, dotenv_1.config)();
// Setup new app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Use the controller
app.post("/posts", mockUser_1.default, postController_1.post_create);
describe("POST /api/posts", () => {
    it("should return an error if neither text nor image is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/posts").send({});
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(400);
        expect(response.body[0].msg).toEqual("Post text or image is required");
    }));
    it("should create a new post with text content", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/posts").send({
            content: "This is a test post with text content",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.author._id).toBe(populateDB_1.luffyId.toString());
        expect(response.body.content).toEqual("This is a test post with text content");
        expect(response.body.likes).toEqual([]);
        expect(response.body.photo).toBeUndefined();
    }));
});
