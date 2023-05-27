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
const userController_1 = require("../controllers/userController");
const populateDB_1 = require("../config/populateDB");
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
app.put("/users/:userId/avatar", userController_1.user_avatar_put);
describe("PUT /api/users/:userId/avatar", () => {
    it("should remove user profile pic", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = populateDB_1.luffyId; // Replace with a valid user ID
        const response = yield (0, supertest_1.default)(app)
            .put(`/users/${userId}/avatar`)
            .send({ imageUpdated: true });
        expect(response.status).toBe(200);
        expect(response.body.photo).toBeUndefined();
    }));
    it("should return validation errors for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = populateDB_1.luffyId; // Replace with a valid user ID
        const response = yield (0, supertest_1.default)(app)
            .put(`/users/${userId}/avatar`)
            .send({ imageUpdated: "invalid" });
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(1);
    }));
});
