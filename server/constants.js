import dotenv from "dotenv";
dotenv.config();

export const ENV = process.env.NODE_ENV || "development";
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const FEATURED_POSTS_UPDATE_INTERVAL = 60;          // minutes