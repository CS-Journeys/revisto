import express from "express";

import { getPost, getReportedPosts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/posts/id/:id", getPost);
router.delete("/posts/id/:id", getReportedPosts);
router.get("/posts/reported", getReportedPosts);

export default router;