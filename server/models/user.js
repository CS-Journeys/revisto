import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

//Define a schema
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  password: String,
  email: String,
  region: String
});

//Add passport-local-mongoose plug-in
UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("users", UserSchema);