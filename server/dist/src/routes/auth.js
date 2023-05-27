"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.route("/login/facebook").get(authController_1.login_facebook);
router.route("/oauth2/redirect/facebook").get(authController_1.login_facebook_callback);
router.route("/register").post(authController_1.register_user);
router.route("/login").post(authController_1.login_user);
router
    .route("/logout")
    .get(passport_1.default.authenticate("jwt", { session: false }), authController_1.logout_user);
router.route("/current").get(authController_1.check_auth_user);
exports.default = router;
