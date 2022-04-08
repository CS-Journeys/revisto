import asyncHandler from "express-async-handler";

/**
 * DO NOT IMPLEMENT UNTIL EMAIL SERVICE IS IMPLEMENTED
 * Get all unprocessed email bounces
 */
export const getBounces = asyncHandler(async (req, res) => {
  let bounces = [];

  res.json({ bounces });
});


/**
 * DO NOT IMPLEMENT UNTIL EMAIL SERVICE IS IMPLEMENTED
 * Get all unprocessed email complaints
 */
export const getComplaints = asyncHandler(async (req, res) => {
  let complaints = [];

  res.json({ complaints });
});


/**
 * DO NOT IMPLEMENT UNTIL EMAIL SERVICE IS IMPLEMENTED
 * Process email bounce of given id
 * 
 * @param {ObjectId}  req.params.id
 */
export const processBounce = asyncHandler(async (req, res) => {

  res.end();
});


/**
 * DO NOT IMPLEMENT UNTIL EMAIL SERVICE IS IMPLEMENTED
 * Process email complaint of given id
 * 
 * @param {ObjectId}  req.params.id
 */
export const processComplaint = asyncHandler(async (req, res) => {

  res.end();
});
