import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  reason: { type: String },
  dateCreated: { type: Date, default: Date.now },
  ignored: { type: Boolean, default: false }
});

export default mongoose.model("reports", ReportSchema);