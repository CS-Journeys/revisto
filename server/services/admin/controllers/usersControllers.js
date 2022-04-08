import asyncHandler from "express-async-handler";

/**
 * Get all users, sorted by number of reports received
 * 
 * @param {boolean}   req.query.banned    only get users which have/haven't been banned
 */
export const getUsers = asyncHandler(async (req, res) => {
  let users = [];

  res.json({ users });
});


/**
 * Ban the user of the given id
 * 
 * @param {string}    req.body.duration   ban duration in vercel.ms format https://github.com/vercel/ms
 * @param {string}    req.body.reason     reason for banning the user
 * @param {ObjectId}  req.params.id       id of the user to ban
 */
export const banUser = asyncHandler(async (req, res) => {

  res.end();
});


/** 
 * Remove any ban from the user of the given id
 * 
 * @param {ObjectId}  req.params.id       id of the user to unban
 */
export const unbanUser = asyncHandler(async (req, res) => {

  res.end();
});