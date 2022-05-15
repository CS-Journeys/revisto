import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const BanSchema = new Schema({
  endDate: { type: Date, required: true },
  reason: { type: String, required: true }
});

export default mongoose.model("bans", BanSchema);