import express from "express";
import cors from "cors";
import passport from "passport";

import apiRoutes from "./routes/apiRoutes.js";
import UserDetails from "./models/userModel.js";
import errorController from "./controllers/errorController.js";
import { requestLogger, errorLogger } from "./utils/logger.js";

const app = express();

// Set up passport.js
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", requestLogger);
app.use("/api", apiRoutes);
app.use("/", errorLogger);
app.use("/", errorController);

export default app;
