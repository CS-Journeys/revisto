import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import Message from "../../../core/models/messageModel.js";

/**
 * Get all messages, sorted by date
 * 
 * @param {boolean}   req.query.fromUser  only get messages from user or admin
 * @param {boolean}   req.query.hasReply  only get messages that do/don't have a reply
 */
export const getMessages = asyncHandler(async (req, res) => {
  // Generate the query
  let query = {};
  if ('fromUser' in req.query) {
    query.user = {$exists: req.query.fromUser};
  }
  if ('hasReply' in req.query) {
    query.reply = {$exists: req.query.hasReply};
  }

  // Get the messages
  let messages = await Message
    .find(query)
    .sort({ dateCreated: 'ascending' })
    .exec();

  res.json({ messages });
});


/**
 * Reply to the message of the given id
 * 
 * @param {ObjectId}  req.params.id  original message id
 * @param {string}    req.body.text  reply message text
 */
export const replyToMessage = asyncHandler(async (req, res) => {
  // Find the original message
  let originalMessage = await Message.findById(req.params.id).exec();
  if (!originalMessage) throw createHttpError(404, "Message not found");

  // Create the reply
  let message = new Message();
  message.text = req.body.text;
  await message.save();

  // Update the original message to have a reply
  originalMessage.reply = message._id;
  await originalMessage.save();

  res.json({ id: message._id });
});
