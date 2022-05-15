import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import Report from "../../../core/models/reportModel.js";

/**
 * Get all reports, sorted by date
 * 
 * @param {boolean}   req.query.ignored   only get ignored or not ignored reports
 */
export const getReports = asyncHandler(async (req, res) => {
  let query = req.query;
  let reports = await Report
    .find(query)
    .sort({dateCreated: 'ascending'})
    .exec();

  res.json({ reports });
});


/**
 * Update the report of the given id
 * 
 * @param {ObjectId}  req.params.id       id of the report to update
 * @param {Object}    req.body.ignored    whether or not to ignore the report
 */
export const updateReport = asyncHandler(async (req, res) => {
  // Find the report
  let report = await Report.findById(req.params.id).exec();
  if (!report) throw createHttpError(404, "Report not found");

  // Update the report
  if ('ignored' in req.body) report.ignored = req.body.ignored;
  await report.save();

  res.end();
});
