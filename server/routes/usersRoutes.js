import express from "express";

import { authenticateJWT } from "../auth/jwtAuth.js";
import {
  me,
  register,
  login,
  updateUser,
  deleteUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", authenticateJWT, me);
router.post("/register", register);
router.post("/login", login);
router.patch("/", authenticateJWT, updateUser);
router.delete("/", authenticateJWT, deleteUser);
router.get("/resetPass", requestPasswordReset);
router.post("/resetPass", resetPassword);

export default router;
