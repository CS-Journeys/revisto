import express from "express";

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

router.get("/", me);
router.post("/register", register);
router.post("/login", login);
router.patch("/", updateUser);
router.delete("/", deleteUser);
router.post("/requestReset", requestPasswordReset);
router.post("/resetPass", resetPassword);

export default router;
