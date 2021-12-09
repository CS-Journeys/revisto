import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

//Define a schema
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  password: String,
  username: String,
  region: { type: String, default: "US" },
  language: { type: String, default: "EN" },
});

//Add passport-local-mongoose plug-in
UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("users", UserSchema);