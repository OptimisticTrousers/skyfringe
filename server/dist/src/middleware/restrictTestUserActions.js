"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const populateDB_1 = require("../config/populateDB");
const restrictTestUserActions = (req, res, next) => {
    const userId = req.params.userId;
    // If the user is operating a test account, certain actions cannot be performed like updating and deleting the test user account
    if (userId === populateDB_1.luffyId.toString()) {
        res
            .status(400)
            .json({
            message: `Cannot perform a ${req.method} action with the test user`,
        });
    }
    next();
};
exports.default = restrictTestUserActions;
