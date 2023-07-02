import express from "express";
import cors from "cors";
import passport from "passport";

import UserDetails from "./core/models/userModel.js";
import getRoute from "./core/middleware/getRoute.js";
import apiRoutes from "./api/routes/apiRoutes.js";
import adminRoutes from "./services/admin/routes/adminRoutes.js";
import migrateRoutes from "./services/migrate/migrateRoutes.js";
import errorHandler from "./core/middleware/errorHandler.js";
import { requestLogger, errorLogger } from "./core/utils/logger.js";

const app = express();

// Set up passport.js
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(getRoute);
app.use(requestLogger);
app.use("/health", (_, res) => res.sendStatus(200));
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);
//app.use("/migrate", migrateRoutes) //<-- only for testing!
app.use(errorLogger);
app.use(errorHandler);

export default app;
