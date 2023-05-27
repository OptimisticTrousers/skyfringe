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
app.get("/search-users/:query", userController_1.user_search);
describe("GET /api/search-users:query", () => {
    test("if first name matches", () => __awaiter(void 0, void 0, void 0, function* () {
        // send GET request
        const response = yield (0, supertest_1.default)(app).get(`/search-users/luffy`);
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        // check correct user(s) given
        expect(response.body.length).toEqual(1);
        expect(response.body[0]._id).toEqual(populateDB_1.users[0]._id.toString());
    }));
    test("if full name matches", () => __awaiter(void 0, void 0, void 0, function* () {
        // send GET request
        const response = yield (0, supertest_1.default)(app).get(`/search-users/roronoa zoro`);
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        // check correct user(s) given
        expect(response.body.length).toEqual(1);
        expect(response.body[0]._id).toEqual(populateDB_1.users[1]._id.toString());
    }));
    test("if no match", () => __awaiter(void 0, void 0, void 0, function* () {
        // send GET request
        const response = yield (0, supertest_1.default)(app).get(`/search-users/bob jones`);
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        // check correct user(s) given
        expect(response.body).toEqual([]);
    }));
});
