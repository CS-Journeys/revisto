import asyncHandler from "express-async-handler";

/**
 * Get all reports, sorted by date
 * 
 * @param {boolean}   req.query.ignored   only get ignored or not ignored reports
 */
export const getReports = asyncHandler(async (req, res) => {
  let reports = [];

  res.json({ reports });
});


/**
 * Update the report of the given id
 * 
 * @param {ObjectId}  req.body.id       id of the report to update
 * @param {Object}    req.body.report   the new report data
 */
export const updateReport = asyncHandler(async (req, res) => {

  res.end();
});
