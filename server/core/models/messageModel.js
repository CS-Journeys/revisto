import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  reply: { type: Schema.Types.ObjectId, ref: "messages" }
});

export default mongoose.model("messages", MessageSchema);