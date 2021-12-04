import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { exit } from 'process';

dotenv.config();

if(!("ATLAS_URI" in process.env)){
    console.error("Bad URL");
    throw new Error("Mongodb Connection URL not defined. Check .env file");
}

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
let dbConnection;
  
function connectToServer(){
    client.connect(function (err, db) {
        dbConnection = db.db("revistoDb");
        console.log("Successfully connected to MongoDB.");
    });
}

function getDb(){
    return dbConnection;
}

export { connectToServer, getDb };