import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "users" }
});
export default mongoose.model("posts", PostSchema);
