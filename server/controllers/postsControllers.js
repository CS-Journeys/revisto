import createHttpError from "http-errors";
import asyncHandler from "express-async-handler";

import Post from "../models/postModel.js";

const REVERSE_DATE_SORT = { dateCreated: -1 };

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const before = new Date(req.query.before);
  const query = req.query.before ? { dateCreated: { $lt: before } } : {};
  const responseFields = "title content dateCreated";
  const posts = await Post.find(query, responseFields)
    .sort(REVERSE_DATE_SORT)
    .limit(20)
    .select()
    .exec();
  
  res.json({ posts });
});

// Get post of given id
export const getPost = asyncHandler(async (req, res) => {
  const responseFields = "title content dateCreated user"
  let post = await Post.findById(req.params.id, responseFields).exec();

  if (!post) throw createHttpError(404, "Post not found");

  post = post.toObject();
  if (post.user.equals(req.user._id)) {
    post.isMine = true;
  }
  delete post.user;

  res.json({ post });
});

// Get all of the current user's posts
export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id }, "title content dateCreated")
    .sort(REVERSE_DATE_SORT)
    .exec();

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
  if (req.ifOwn && post.user.toString() != req.user._id) {
    throw createHttpError(403, "FORBIDDEN");
  }
  await Post.deleteOne({ _id: post._id });

  res.status(204).end();
});

// Update post of given id
export const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id).exec();

  if (!post) throw createHttpError(404, "Post not found");
  if (req.ifOwn && post.user.toString() != req.user._id) {
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
