import express from 'express';

import { authenticateJWT } from '../auth/auth-jwt.js';
import { getPosts, getPost, createPost, getUserPosts, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/id/:id', getPost);
router.get('/user', authenticateJWT, getUserPosts);
router.post('/', authenticateJWT, createPost);
router.delete("/:id", deletePost);

export default router;