import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

// Load .env configuration
dotenv.config();
if (!("ATLAS_URI" in process.env)) {
  logger.error("MongoDB connection URL not defined. Ask the lead developers for more info.");
  throw new Error("Missing 'ATLAS_URI' parameter in .env");
}

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    logger.error(err);
    throw new Error("MongoDB connection error");
  } else {
    logger.info("Connected to MongoDB");
  }
});

let db = mongoose.connection;

db.on("error", (err) => {logger.error("Mongoose Connection Error: " + err)});

export default db;