import express from "express";

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
router.get("/user", getUserPosts);
router.post("/", createPost);
router.delete("/id/:id", deletePost);
router.patch("/id/:id", updatePost);
router.post("/report/:id", reportPost);
router.patch("/react/:id", reactPost);

export default router;