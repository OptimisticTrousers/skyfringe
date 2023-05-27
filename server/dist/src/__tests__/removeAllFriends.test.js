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
const accountController_1 = require("../controllers/accountController");
const user_1 = __importDefault(require("../models/user"));
const populateDB_1 = require("../config/populateDB");
// Import db setup and teardown functionality
require("../config/testSeeds");
// User ID for user Peter Parker
const userId = populateDB_1.luffyId.toString();
describe("Confirm user has friends in the database", () => {
    test("user has friends/friend requests", () => __awaiter(void 0, void 0, void 0, function* () {
        // Luffy has 1 total friend, with 3 requests. Therefore, 4 other users should have a reference to Peter. Those users are found below
        const friends = yield user_1.default.find({ friends: userId });
        const friendRequests = yield user_1.default.find({ "friendRequests.user": userId });
        expect(friends.length).toBe(1);
        expect(friendRequests.length).toBe(3);
    }));
});
describe("removeAllFriends functionality", () => {
    beforeAll(() => (0, accountController_1.removeAllFriends)(userId));
    it("does not impact user's friend list", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (yield user_1.default.findById(userId).exec());
        expect(user.friends.length).toBe(1);
        expect(user.friendRequests.length).toBe(3);
    }));
    it("removes all references to the user in other user's friend lists", () => __awaiter(void 0, void 0, void 0, function* () {
        const friends = yield user_1.default.find({ friends: userId });
        const friendRequests = yield user_1.default.find({ "friendRequests.user": userId });
        expect(friends.length).toBe(0);
        expect(friendRequests.length).toBe(0);
    }));
});
