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
// Import db setup and teardown functionality
require("../config/testSeeds");
describe("GET /api/auth/current", () => {
    it("should return 401 if no token provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/auth/current").expect(401);
        expect(res.body.message).toBe("No token provided");
    }));
    it("should return 500 if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/auth/current")
            .set("Cookie", "jwt=invalid-token")
            .expect(500);
        expect(res.body.message).toBe("jwt malformed");
    }));
    it("should return 401 if token has wrong user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/auth/current")
            // random jwt token
            .set("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjOGEzMzFiZGE3NmM1NTllZjAwMDA2MiJ9.4gB4o6nyY1DYD5x4tRS2nqlE2zAGXPHVSDstC4zU6Rg")
            .expect(401);
        expect(res.body.message).toBe("No user found");
    }));
    it("should return the logged in user", () => __awaiter(void 0, void 0, void 0, function* () {
        // First, login a user and get their token
        const loginRes = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({
            email: "luffy@onepiece.com",
            password: "password",
        })
            .expect(200);
        const token = loginRes.headers["set-cookie"][0].split(";")[0].split("=")[1];
        // Then, make a request to the current user route with the token
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/auth/current")
            .set("Cookie", `jwt=${token}`)
            .expect(200);
        expect(res.body.fullName).toBe("Monkey D. Luffy");
        expect(res.body.userName).toBe("luffy");
        expect(res.body.email).toBe("luffy@onepiece.com");
        expect(res.body.password).toBeUndefined();
    }));
});
