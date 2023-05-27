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
const authController_1 = require("../controllers/authController");
// Import db setup and teardown functionality
require("../config/testSeeds");
const app = (0, express_1.default)();
// Use the controller
app.get("/logout", authController_1.logout_user);
describe("GET /api/auth/logout", () => {
    it("should return 200 and clear jwt cookie if user is logged in", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/logout").set("Cookie", `jwt=jwt`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User successfully logged out");
        expect(response.header["set-cookie"]).toEqual([
            "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        ]);
    }));
});
