import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import UserDetails from "./models/userModel.js";

dotenv.config();

const app = express();

// Set up passport.js
passport.use(UserDetails.createStrategy({ userNameField: "email" }));
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

export default app;
