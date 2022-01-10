import express from "express";

import { getPost } from "../controllers/adminController.js";

const router = express.Router();

router.get("/posts/:id", getPost);

export default router;