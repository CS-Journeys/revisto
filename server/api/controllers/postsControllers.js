import createHttpError from "http-errors";
import asyncHandler from "express-async-handler";

import Post from "../../core/models/postModel.js";

const REVERSE_DATE_SORT = { dateCreated: -1 };

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {

  const before = new Date(req.query.before);
  const query = req.query.before ? { dateCreated: { $lt: before } } : {};
  const responseFields = "title content dateCreated";

  const SORT_ORDER = { [req.query.sortAttribute] : -1};

  const posts = await Post.find(query, responseFields)
    .sort(SORT_ORDER)
    .limit(20)
    .select()
    .exec();

  res.json({ posts });
});

// Get post of given id
export const getPost = asyncHandler(async (req, res) => {
  const responseFields = "title content dateCreated user reactedUsers";
  let post = await Post.findById(req.params.id, responseFields).exec();

  if (!post) throw createHttpError(404, "Post not found");

  // Turn the post obj into a basic vanilla object so that we can add/remove props
  post = post.toObject();
  
  // Determine if user owns the post
  if (post.user.equals(req.user._id)) {
    post.isMine = true;
  }

  // Determine if user has already reacted to the post
  if (post.reactedUsers.some(id => id.equals(req.user._id))) {
    post.isReacted = true;
  }
  
  // Prevent private info from being exposed to the frontend
  delete post.user;
  delete post.reactedUsers;

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

  // Has user already reacted?
  if (post.reactedUsers.includes(req.user._id)) {
    throw createHttpError(403, "Already Reacted!");
  }

  // Else increment reaction
  post.reactionCount++;
  post.reactedUsers.push(req.user._id);

  await post.save();
  
  res.end();
});