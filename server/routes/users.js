import express from "express";

import {me, register} from "../controllers/users.js";

const router = express.Router();

router.get("/", me);
router.get("/", register);


export default router;
