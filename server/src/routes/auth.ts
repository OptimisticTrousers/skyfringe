import { Router } from "express";
import passport from "passport";
import {
  register_user,
  login_user,
  logout_user,
  check_auth_user,
  login_facebook,
  login_facebook_callback,
} from "../controllers/authController";

const router = Router();

router.get("/login/facebook", login_facebook);

router.get("/oauth2/redirect/facebook", login_facebook_callback);

router.route("/register").post(register_user);

router.route("/login").post(login_user);

router
  .route("/logout")
  .get(passport.authenticate("jwt", { session: false }), logout_user);

router.route("/current").get(check_auth_user);

export default router;
