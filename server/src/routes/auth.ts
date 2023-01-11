import { Router } from "express";
import {
  register_user,
  login_user,
  logout_user,
} from "../controllers/authController";

const router = Router();

router.route("/register").get(register_user);

router.route("/login").get(login_user);

router.route("/logout").delete(logout_user);

export default router;
