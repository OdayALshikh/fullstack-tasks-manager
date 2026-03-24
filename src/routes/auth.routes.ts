import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";

// Create a new Router instance

const router = Router();

// Route for user registration
// POST /api/auth/register
router.post("/register", registerUser);
router.post("/Login", loginUser);
router.post("/logout", logoutUser);

export default router;
