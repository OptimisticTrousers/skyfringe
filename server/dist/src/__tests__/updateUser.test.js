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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.put("/users/:userId", userController_1.user_update);
describe("User Update", () => {
    it("should update user details successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock a valid user object with appropriate properties
        const validUser = {
            fullName: "John Doe",
            bio: "Lorem ipsum dolor sit amet",
            oldPassword: "password",
            newPassword: "newPassword",
            newPasswordConf: "newPassword",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/users/${populateDB_1.luffyId}`)
            .send(validUser);
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.body.fullName).toBe(validUser.fullName);
        expect(response.body.bio).toBe(validUser.bio);
        expect(response.body.oldPassword).toBe(validUser.oldPassword);
        expect(response.body.newPassword).toBe(validUser.newPassword);
        expect(response.body.newPasswordConf).toBe(validUser.newPasswordConf);
        // Add more assertions as needed to validate the updated user object
    }));
    it("should return validation errors when invalid data is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock an invalid user object with missing required fields
        const invalidUser = {
            fullName: "",
            bio: "Lorem ipsum dolor sit amet",
            oldPassword: "",
            newPassword: "",
            newPasswordConf: "",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/users/${populateDB_1.luffyId}`)
            .send(invalidUser);
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].msg).toBe("Full Name must be a string");
        expect(response.body[1].msg).toBe("At least one of oldPassword, newPassword, or newPasswordConf is required");
        expect(response.body[2].msg).toBe("At least one of oldPassword, newPassword, or newPasswordConf is required");
        expect(response.body[3].msg).toBe("At least one of oldPassword, newPassword, or newPasswordConf is required");
        // Add more assertions as needed to validate the returned validation errors
    }));
    it("should return an error when old password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock a user object with an incorrect old password
        const userWithIncorrectOldPassword = {
            fullName: "John Doe",
            bio: "Lorem ipsum dolor sit amet",
            oldPassword: "incorrectPassword",
            newPassword: "newPassword",
            newPasswordConf: "newPassword",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put("/api/users/:userId") // Replace :userId with a valid user ID
            .send(userWithIncorrectOldPassword);
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "You typed your old password incorrectly");
    }));
    // Add more test cases to cover other scenarios, such as password mismatch, etc.
    it("successfully updates basic user info (i.e. full name)", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/users/${populateDB_1.luffyId}`).send({
            fullName: "Monkey D. Looney",
            bio: "Kaido sucks!",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.fullName).toBe("Monkey D. Looney");
        expect(response.body.bio).toBe("Kaido sucks!");
    }));
    it("returns validation errors if oldPassword is not empty but the other fields are", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock a user object with an incorrect old password
        const userWithOldPasswordOnly = {
            oldPassword: "password",
            newPassword: "",
            newPasswordConf: "",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/users/${populateDB_1.luffyId}`)
            .send(userWithOldPasswordOnly);
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "At least one of oldPassword, newPassword, or newPasswordConf is required");
    }));
    it("returns validation errors if newPassword field is not empty, but the other fields are", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock a user object with an incorrect old password
        const userWithNewPasswordOnly = {
            oldPassword: "",
            newPassword: "newPassword",
            newPasswordConf: "",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/users/${populateDB_1.luffyId}`)
            .send(userWithNewPasswordOnly);
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "At least one of oldPassword, newPassword, or newPasswordConf is required");
    }));
    it("returns validation errors if newPasswordConf is not empty, but the other fields are", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock a user object with an incorrect old password
        const userWithNewPasswordOnly = {
            oldPassword: "",
            newPassword: "",
            newPasswordConf: "newPassword",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/users/${populateDB_1.luffyId}`)
            .send(userWithNewPasswordOnly);
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "At least one of oldPassword, newPassword, or newPasswordConf is required");
    }));
    it("returns validation errors if 'newPassword' and 'newPasswordConf' are not matching", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock a user object with an incorrect old password
        const userWithIncorrectNewPassword = {
            fullName: "John Doe",
            bio: "Lorem ipsum dolor sit amet",
            oldPassword: "password",
            newPassword: "newPassword",
            newPasswordConf: "newPasswordWrong",
        };
        // Make a request to update user details
        const response = yield (0, supertest_1.default)(app)
            .put(`/api/users/${populateDB_1.luffyId}`)
            .send(userWithIncorrectNewPassword);
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "'New Password' and 'Confirm New Password' are not equal");
    }));
    it("successfully updates bio", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/users/${populateDB_1.luffyId}`).send({
            bio: "Kaido sucks!",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.bio).toBe("Kaido sucks!");
    }));
    it("successfully updates full name only", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/users/${populateDB_1.luffyId}`).send({
            fullName: "Monkey D. Looney",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.fullName).toBe("Monkey D. Looney");
    }));
    it("does not attempt to update bio information if none is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/users/${populateDB_1.luffyId}`).send({
            fullName: "Monkey D. Looney",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        // Bio is the same as the old bio
        expect(response.body.bio).toBe(populateDB_1.luffy.bio);
    }));
    it("does not attempt to update fullName information if none is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/users/${populateDB_1.luffyId}`).send({
            bio: "New bio",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        // Bio is the same as the old bio
        expect(response.body.fullName).toBe(populateDB_1.luffy.fullName);
    }));
});
