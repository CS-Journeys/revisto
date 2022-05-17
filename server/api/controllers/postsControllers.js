import createHttpError from "http-errors";
import asyncHandler from "express-async-handler";

import Post from "../../core/models/postModel.js";
import {getFeaturedPosts} from "../../services/featured_posts/featuredPosts.js";
import getTopReaction from "../utils/getTopReaction.js";
import logger from "../../core/utils/logger.js";

const EARLIEST_DATE_SORT = { dateCreated: -1 };
const PAGE_SIZE = 20;

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const page = req.query.page ? req.query.page : 0;
  if (page < 0) {
    throw new createHttpError(400, "Page number must be positive");
  }
  const sortOrder = req.query.sortAttribute ? { [req.query.sortAttribute] : -1} : EARLIEST_DATE_SORT;
  const before = new Date(req.query.before);

  const query = req.query.before ? { dateCreated: { $lt: before } } : {};
  const responseFields = "title content dateCreated reactions";

  let posts = await Post.find(query, responseFields)
    .sort(sortOrder)
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .exec();

  posts = posts.map((post) => {
    post = post.toObject();
    post.topReaction = getTopReaction(post);
    delete post.reactions;
    return post;
  });

  res.json({ posts });
});

// Get featured posts
export const getFeatured = asyncHandler(async (req, res) => {
  res.json({ posts: getFeaturedPosts() });
});

// Get post of given id
export const getPost = asyncHandler(async (req, res) => {
  const responseFields = "title content dateCreated user reactions";
  let post = await Post.findById(req.params.id, responseFields).exec();

  if (!post) throw createHttpError(404, "Post not found");

  // Turn the post obj into a basic vanilla object so that we can add/remove props
  post = post.toObject();
  
  // Determine if user owns the post
  if (post.user.equals(req.user._id)) {
    post.isMine = true;
  }

  // Get my reaction
  if (req.user._id) {
    post.reaction = post.reactions.get(req.user._id.toString());
  }

  // Get top reaction
  post.topReaction = getTopReaction(post);
  
  // Prevent private info from being exposed to the frontend
  delete post.user;
  delete post.reactions;

  res.json({ post });
});

// Get all of the current user's posts
export const getUserPosts = asyncHandler(async (req, res) => {
  let posts = await Post.find({ user: req.user._id }, "title content dateCreated reactions")
    .sort(EARLIEST_DATE_SORT)
    .exec();

  posts = posts.map((post) => {
    post = post.toObject();
    post.topReaction = getTopReaction(post);
    delete post.reactions;
    return post;
  });

  res.json({ posts });
});

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
  let post = new Post(req.body);
  post.user = req.user._id;
  await post.save();

  res.json({ id: post._id });
});

// Delete post of given id
export const deletePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id).exec();

  if (!post) throw createHttpError(404, "Post not found");
  if (post.user.toString() != req.user._id) {
    throw createHttpError(403, "FORBIDDEN");
  }
  await Post.deleteOne({ _id: post._id });

  res.status(204).end();
});

// Update post of given id
export const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id).exec();

  if (!post) throw createHttpError(404, "Post not found");
  if (post.user.toString() != req.user._id) {
    throw createHttpError(403, "FORBIDDEN");
  }

  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.content) {
    post.content = req.body.content;
  }
  await post.save();
  return res.end();
});

// Report post of given id
export const reportPost = asyncHandler(async (req, res) => {
  const query = {
    $inc: { reportCount: 1 },
    $push: req.body.reason
      ? { reports: req.body.reason }
      : { reports: "No Comment" },
  };

  await Post.findByIdAndUpdate(req.params.id, query).exec();

  res.end();
});

// React to post with given id
export const reactPost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id).exec();
  if (!post) throw createHttpError(404, "Post not found");

  // Ensure no self-reaction
  if (post.user.equals(req.user._id)) {
    throw createHttpError(403, "FORBIDDEN");
  }

  if (!req.body.reaction) {
    logger.debug(req.body);
    throw createHttpError(400, "Please specify the reaction");
  }

  post.reactions.set(req.user._id.toString(), req.body.reaction);
  post.reactionCount = post.reactions.size;

  await post.save();
  
  res.end();
});