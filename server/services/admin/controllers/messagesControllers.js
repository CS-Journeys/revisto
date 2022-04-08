import asyncHandler from "express-async-handler";

/**
 * Get all messages, sorted by date
 * 
 * @param {boolean}   req.query.fromUser  only get messages from user or admin
 * @param {boolean}   req.query.hasReply  only get messages that do/don't have a reply
 */
export const getMessages = asyncHandler(async (req, res) => {
  let messages = [];
  res.json({ messages });
});


/**
 * Reply to the message of the given id
 * 
 * @param {ObjectId}  req.params.id  original message id
 * @param {string}    req.body.text  reply message text
 */
export const replyToMessage = asyncHandler(async (req, res) => {
  res.end();
});
