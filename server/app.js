import express from "express";
import cors from "cors";
import passport from "passport";

import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import UserDetails from "./models/userModel.js";

const app = express();

// Set up passport.js
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;
