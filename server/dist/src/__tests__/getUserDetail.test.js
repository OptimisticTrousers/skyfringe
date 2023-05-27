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
const populateDB_1 = require("../config/populateDB");
const userController_1 = require("../controllers/userController");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setup new app instance
const app = (0, express_1.default)();
// Use the controller
app.get("/users/:userId", userController_1.user_detail);
describe("GET /users/:userId", () => {
    it("returns user information in JSON format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/users/${populateDB_1.luffyId}`);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        // There are five total posts in the db
        expect(response.body.user._id).toEqual(populateDB_1.luffyId.toString());
        expect(Array.isArray(response.body.posts)).toEqual(true);
        expect(Array.isArray(response.body.likedPosts)).toEqual(true);
        expect(Array.isArray(response.body.comments)).toEqual(true);
        expect(Array.isArray(response.body.likedComments)).toEqual(true);
    }));
});
