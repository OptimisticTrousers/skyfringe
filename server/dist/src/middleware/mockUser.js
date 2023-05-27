"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const populateDB_1 = require("../config/populateDB");
const mockUser = (req, res, next) => {
    // Replace with your mock user object
    const user = {
        _id: populateDB_1.luffyId,
        fullName: "Monkey D. Luffy",
        userName: "luffy",
        email: "luffy@onepiece.com",
        password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
    };
    req.user = user;
    next();
};
exports.default = mockUser;
