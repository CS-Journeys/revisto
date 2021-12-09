import mongoose from 'mongoose';

//Define a schema
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now }
});

//Update dateUpdated on save
PostSchema.pre('save', function (next) {
  this.dateUpdated = new Date();
  next();
});

export default mongoose.model("posts", PostSchema);
