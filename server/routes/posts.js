import express from 'express';

import { getPosts, getPost, createPost, getUserPosts } from '../controllers/posts.js';
import { authenticateJWT } from '../auth/auth-jwt.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/user/:id', getUserPosts);
router.post('/', authenticateJWT, createPost);

export default router;