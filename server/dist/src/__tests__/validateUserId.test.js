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
const validateUserId_1 = __importDefault(require("../middleware/validateUserId"));
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setup new app instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use the middleware
app.get("/users/:userId", validateUserId_1.default);
describe("validateUserId middleware function", () => {
    it("throws an error if the user ID is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/users/invalid-postid`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid user ID");
    }));
    it("throws an error if the post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/users/609e39ca255e1d2cd452e2d8" // non-existing ObjectId
        );
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("User not found");
    }));
});
