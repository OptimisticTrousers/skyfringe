import request from "supertest"
import app from "../app";
import { logout_user } from "../controllers/authController";

// Import db setup and teardown functionality
import "../config/mongoSetupTesting";

describe("DESCRIBE POST /api/auth/logout", () => {
  it("should logout the user ")
})
