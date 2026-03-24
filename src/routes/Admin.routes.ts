import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  UpdateUserById,
} from "../controllers/user.controller";
import { validateObjectId } from "../middleware/validateObjectId";
const router = Router();
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorizeMiddleware";
import { roles } from "../config/roles";

// Middleware example: يمكن إضافة auth هنا لاحقًا
// GET /api/users -> get all users
router.get("/", protect, authorize(roles.user), getAllUsers);

router.post("/add-User", protect, authorize(roles.admin), createUser);

// GET /api/users/:id -> get one user
router.get(
  "/:id",
  validateObjectId("id"),
  protect,
  authorize(roles.user),
  getUserById,
);

// PUT /api/users/:id -> update user
router.patch("/:id", validateObjectId("id"), UpdateUserById);

// DELETE /api/users/:id -> delete userDeleteUserById
//protect → authorize → controller
router.delete(
  "/:id",
  validateObjectId("id"),
  protect,
  authorize(roles.admin),
  deleteUserById,
);

// router.delete("/:id", validateObjectId("id"), deleteUserById,);

export default router;
