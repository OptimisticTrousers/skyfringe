"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
};
exports.default = cookieExtractor;
