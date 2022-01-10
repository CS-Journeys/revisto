import express from 'express';

import { authenticateJWT } from '../auth/jwtAuth.js';
import { getPosts, getPost, createPost, getUserPosts, deletePost, updatePost, reportPost } from '../controllers/postsControllers.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/id/:id', getPost);
router.get('/user', authenticateJWT, getUserPosts);
router.post('/', authenticateJWT, createPost);
router.delete("/id/:id", authenticateJWT, deletePost);
router.patch("/id/:id", authenticateJWT, updatePost);
router.post("/report/:id", authenticateJWT, reportPost);

export default router;