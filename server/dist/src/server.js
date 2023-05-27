"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = __importDefault(require("./config/socket"));
// Connect to MongoDB. Done here to avoid calling in test suites when app is imported
(0, db_1.default)();
// Setting up the web socket and web server
(0, socket_1.default)(app_1.default);
