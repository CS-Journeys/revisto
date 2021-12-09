import mongoose from 'mongoose';

//Define a schema
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  region: String
});

export default mongoose.model("posts", PostSchema);