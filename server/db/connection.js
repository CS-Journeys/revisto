import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env configuration
dotenv.config();
if (!("ATLAS_URI" in process.env)) {
  console.error("MongoDB connection URL not defined. Ask the lead developers for more info.");
  throw new Error("Missing 'ATLAS_URI' parameter in .env");
}

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err);
    throw new Error("MongoDB connection error");
  } else {
    console.log("Connected to MongoDB");
  }
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose Connection Error: '));

export default db;