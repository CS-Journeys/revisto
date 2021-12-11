import express from "express";

import { authenticateJWT } from "../auth/jwtAuth.js";
import { me, register, login } from "../controllers/users.js";

const router = express.Router();

router.get("/", authenticateJWT, me);
router.post("/register", register);
router.post("/login", login);

export default router;
