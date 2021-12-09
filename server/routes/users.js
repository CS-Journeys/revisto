import express from "express";

import {me, register, login} from "../controllers/users.js";

const router = express.Router();

router.get("/", me);
router.post("/register", register);
router.post("/login", login);

export default router;
