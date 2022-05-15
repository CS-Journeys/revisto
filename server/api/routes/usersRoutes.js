import express from "express";
import requireLogin from "../../core/middleware/requireLogin.js";

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

router.get("/", requireLogin, me);
router.post("/register", register);
router.post("/login", login);
router.patch("/", requireLogin, updateUser);
router.delete("/", requireLogin, deleteUser);
router.post("/requestReset", requireLogin, requestPasswordReset);
router.post("/resetPass", requireLogin, resetPassword);

export default router;
