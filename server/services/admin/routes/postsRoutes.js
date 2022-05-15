import express from "express";
import { getPosts, updatePost } from "../controllers/postsControllers.js";

const router = express.Router();

router.get("/", getPosts);
router.patch("/:id", updatePost);

export default router;