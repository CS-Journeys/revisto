import mongoose from 'mongoose';

//Define a schema
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: String,
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "users" }
});
export default mongoose.model("posts", PostSchema);
