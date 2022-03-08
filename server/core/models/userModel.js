import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: { type: String },
  userType: { type: String, default: "normal-user" },
  region: { type: String, default: "US" },
  language: { type: String, default: "EN" },
  lastPost: { type: Date, default: () => new Date(0) }
});

// Add passport-local-mongoose plug-in
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model("users", UserSchema);