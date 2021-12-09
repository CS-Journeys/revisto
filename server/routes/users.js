import express from "express";

import {me, register} from "../controllers/users.js";

const router = express.Router();

router.get("/", me);
router.post("/register", register);


export default router;
