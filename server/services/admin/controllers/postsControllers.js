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

  if (orderBy == "title") sorter = { title : 1 };
  else if (orderBy == "user") sorter = { user : 1 };
  else if (orderBy == "dateCreated") sorter = { dateCreated : -1 };
  else if (orderBy == "dateUpdated") sorter = { dateUpdated : -1};
  else throw createHttpError(400, orderBy + " sort not implemented");

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

  res.end();
});
