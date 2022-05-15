import express from "express";
import requireLogin from "../../core/middleware/requireLogin.js";

import {
  getPosts,
  getPost,
  createPost,
  getUserPosts,
  deletePost,
  updatePost,
  reportPost,
  reactPost
} from "../controllers/postsControllers.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/id/:id", getPost);
router.get("/user", requireLogin, getUserPosts);
router.post("/", requireLogin, createPost);
router.delete("/id/:id", requireLogin, deletePost);
router.patch("/id/:id", requireLogin, updatePost);
router.post("/report/:id", requireLogin, reportPost);
router.patch("/react/:id", requireLogin, reactPost);

export default router;