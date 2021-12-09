import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exit } from 'process';

dotenv.config();

if(!("ATLAS_URI" in process.env)){
    console.error("Bad URL");
    throw new Error("Mongodb Connection URL not defined. Check .env file");
}

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose Connection Error: '));

console.log("Connected to MongoDB");