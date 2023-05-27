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
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
// Define isolated app for middleware unit testing
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Define custom route with basic req/res
app.post("/", (req, res, next) => {
    if (req.body.data !== "1234") {
        res.status(400); // bad request
        const err = new Error("Incorrect data sent");
        return next(err);
    }
    else {
        res.status(200);
        res.json({ data: "Data returned" });
    }
});
// Employ error handler middleware
app.use(errorHandler_1.default);
describe("Error Handler", () => {
    test("errorHandler is not called for successful requests", (done) => {
        (0, supertest_1.default)(app)
            .post("/")
            .send({ data: "1234" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
    test("errorHandler returns error status code if manually provided", (done) => {
        (0, supertest_1.default)(app)
            .post("/")
            .send({ data: "5678" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
    test("errorHandler returns manually set error message if provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/")
            .send({ data: "5678" })
            .set("Accept", "application/json");
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toBe("Incorrect data sent");
        expect(res.status).toBe(400);
    }));
});
