import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";

// Get post by id
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).exec();
  res.json({ post });
});

// Get reported posts where reportCount > 0 and sort by reportCount from highest to lowest
export const getReportedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ reportCount: { $gt: 0 } }).sort({ reportCount: -1 }).exec();
  res.json({ posts });
});