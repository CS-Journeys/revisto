import express from 'express';

import { getPosts, getPost, createPost, getUserPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.get('/user/:id', getUserPosts);

export default router;