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
const user_1 = __importDefault(require("../models/user"));
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const chat_1 = __importDefault(require("../models/chat"));
const notification_1 = __importDefault(require("../models/notification"));
const message_1 = __importDefault(require("../models/message"));
const db_1 = __importDefault(require("./db"));
// Importing file that populates mock data for the database
const populateDB_1 = require("./populateDB");
(0, db_1.default)();
// Deleting all of the documents in each collection in the database for the real Mongo database
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Resetting database...");
        yield Promise.all([
            user_1.default.deleteMany({}),
            post_1.default.deleteMany({}),
            comment_1.default.deleteMany({}),
            chat_1.default.deleteMany({}),
            message_1.default.deleteMany({}),
            notification_1.default.deleteMany({}),
        ]);
        console.log("Successfully reset database");
        yield (0, populateDB_1.populate)();
    }
    catch (err) {
        console.log(`An error occurred while deleting all of the documents in the database: ${err}`);
    }
}))();
