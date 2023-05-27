"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const passport_1 = __importDefault(require("./config/passport"));
const notFoundHandler_1 = __importDefault(require("./middleware/notFoundHandler"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use((0, cookie_parser_1.default)());
(0, passport_1.default)();
// routes
app.use("/api", index_1.default);
// catch 404 and forward to error handler
app.use(notFoundHandler_1.default);
// error handler
app.use(errorHandler_1.default);
exports.default = app;
