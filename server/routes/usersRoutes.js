import express from "express";

import { authenticateJWT } from "../auth/jwtAuth.js";
import {
  me,
  register,
  login,
  updateUser,
  deleteUser
} from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", authenticateJWT, me);
router.post("/register", register);
router.post("/login", login);
router.patch("/", authenticateJWT, updateUser);
router.delete("/", authenticateJWT, deleteUser);

export default router;
