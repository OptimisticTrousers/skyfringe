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
const restrictTestUserActions_1 = __importDefault(require("../middleware/restrictTestUserActions"));
const populateDB_1 = require("../config/populateDB");
// Create a test app
const app = (0, express_1.default)();
// Create a dummy route that uses the middleware
app.get("/users/:userId", restrictTestUserActions_1.default, (req, res) => {
    res.sendStatus(200);
});
describe("Middleware that restricts certain actions from the test account", () => {
    // Test case: Request with a test user ID
    test("Test user ID should be restricted", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/users/${populateDB_1.luffyId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: `Cannot perform a GET action with the test user`,
        });
    }));
    // Test case: Request with a non-test user ID
    test("Non-test user ID should be allowed", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonTestUserId = "1234567890";
        const response = yield (0, supertest_1.default)(app).get(`/users/${nonTestUserId}`);
        expect(response.status).toBe(200);
    }));
});
