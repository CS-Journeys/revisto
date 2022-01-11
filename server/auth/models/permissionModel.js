import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  userType: {type: String, required: true},
  route: {type: String, required: true},
  GET: {type: String },
  POST: {type: String },
  PUT: {type: String },
  PATCH: {type: String },
  DELETE: {type: String }
});

export default mongoose.model("permissions", PermissionSchema);