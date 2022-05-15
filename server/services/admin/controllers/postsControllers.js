import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import Post from "../../../core/models/postModel.js";

/**
 * Get all posts, sorted by number of reports
 * 
 * @param {boolean}   req.query.hidden    only get hidden or visible posts
 * @param {boolean}   req.query.archived  only get archived or active posts
 * @param {string}    req.query.orderBy   sort by this field instead of num reports
 */
export const getPosts = asyncHandler(async (req, res) => {
  let orderBy = req.query.orderBy;
  let query = req.query;
  let sorter = { reportCount: -1 };
  delete query.orderBy;

  // Select the sort type
  if (orderBy == 'title') sorter = { title : 'ascending' };
  else if (orderBy == 'user') sorter = { user : 'ascending' };
  else if (orderBy == 'dateCreated') sorter = { dateCreated : 'descending' };
  else if (orderBy == 'dateUpdated') sorter = { dateUpdated : 'descending' };
  else throw createHttpError(400, orderBy + " sort not implemented");

  // Get the posts
  const posts = await Post.find(query).sort(sorter).exec();

  res.json({ posts });
});


/**
 * Update the post of the given id
 * 
 * @param {ObjectId}  req.params.id  id of the post to update
 * @param {Object}    req.body.post  the new post data
 */
export const updatePost = asyncHandler(async (req, res) => {
  // Find the post
  let post = await Post.findById(req.params.id).exec();
  if (!post) throw createHttpError(404, "Post not found");

  // Update the post
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if ('hidden' in req.body) post.hidden = req.body.hidden;
  if ('archived' in req.body) post.archived = req.body.archived;
  await post.save();

  res.end();
});
