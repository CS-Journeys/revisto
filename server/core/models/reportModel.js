import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  reason: { type: String },
  dateReported: { type: Date, default: Date.now }
});

export default mongoose.model("reports", ReportSchema);