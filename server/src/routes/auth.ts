import { Router } from "express";
import passport from "passport";
import {
  register_user,
  login_user,
  logout_user,
  check_auth_user,
} from "../controllers/authController";

const router = Router();

router.route("/register").post(register_user);

router.route("/login").post(login_user);

router
  .route("/logout")
  .post(passport.authenticate("jwt", { session: true }), logout_user);

router.route("/current").get(check_auth_user);

export default router;
