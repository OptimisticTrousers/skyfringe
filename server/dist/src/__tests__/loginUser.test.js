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
const app_1 = __importDefault(require("../app"));
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
describe("POST /api/auth/login", () => {
    it("should return a 401 status code when no user is found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({ email: populateDB_1.bob.email, password: populateDB_1.bob.password });
        expect(response.status).toEqual(401);
    }));
    it("should return 400 if validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/auth/login").send({
            email: "invalid_email",
            password: "",
        });
        expect(response.status).toEqual(400);
    }));
    it("returns user object after successful login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({ email: populateDB_1.zoro.email, password: "password" });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.fullName).toEqual(populateDB_1.zoro.fullName);
        expect(response.body.userName).toEqual(populateDB_1.zoro.userName);
        expect(response.body.email).toEqual(populateDB_1.zoro.email);
        expect(response.body.password).toBeUndefined();
        expect(response.headers["set-cookie"]).toBeTruthy();
    }));
});
