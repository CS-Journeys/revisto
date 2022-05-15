import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  reportCount: { type: Number, default: 0 },
  reports: { type: [Schema.Types.ObjectId], ref: "reports", default: [] },
  hidden: { type : Boolean, default : false },
  archived: { type : Boolean, default : false },
  reactedUsers: [{type: Schema.Types.ObjectId, ref: "users"}],
  reactionCount: {type: Number, default: 0}
});

// Update dateUpdated on save
PostSchema.pre("save", function (next) {
  this.dateUpdated = new Date();
  next();
});

export default mongoose.model("posts", PostSchema);
