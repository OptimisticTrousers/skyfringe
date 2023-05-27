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
const dotenv_1 = require("dotenv");
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// Setting up ENV variables, specifically for JWT_SECRET
(0, dotenv_1.config)();
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET value is not defined in .env file");
}
describe("POST api/auth/register", () => {
    it("returns user and token objects after successful user sign up/register (with password hidden)", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/auth/register").send(populateDB_1.bob);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toBe(200);
        expect(response.body.fullName).toBe(populateDB_1.bob.fullName);
        expect(response.body.userName).toBe(populateDB_1.bob.userName);
        expect(response.body.email).toBe(populateDB_1.bob.email);
        expect(response.body.password).toBeUndefined();
        expect(response.headers["set-cookie"]).toBeTruthy();
    }));
    it("should return 400 if validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/auth/register").send({
            fullName: "",
            userName: "",
            email: "invalid_email",
            password: "",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(400);
        expect(response.body).toContainEqual({
            msg: "Please enter a valid email address",
            param: "email",
            location: "body",
            value: "invalid_email",
        });
        expect(response.body).toContainEqual({
            msg: "Full name is required",
            param: "fullName",
            location: "body",
            value: "",
        });
        expect(response.body).toContainEqual({
            msg: "Username must be at least 5 characters long",
            param: "userName",
            location: "body",
            value: "",
        });
        expect(response.body).toContainEqual({
            msg: "Password must be at least 8 characters long",
            param: "password",
            location: "body",
            value: "",
        });
    }));
    test("if when a user makes an account with an email that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        // Luffy user already present in the database
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/auth/register").send(populateDB_1.luffy);
        expect(response.status).toBe(400);
        expect(response.body[0].msg).toBe("E-mail already in use");
    }));
});
