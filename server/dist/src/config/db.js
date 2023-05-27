"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoConfig = () => {
    const mongoDb = process.env.DB_STRING;
    if (!mongoDb) {
        throw new Error("DB_STRING value is not defined in .env file");
    }
    mongoose_1.default.connect(mongoDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "mongo connection error"));
};
exports.default = mongoConfig;
