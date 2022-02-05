import express from "express";

import { authenticate } from "../utils/jwtAuth.js";
import getRoute from "../middleware/getRoute.js";
import getUserObject from "../middleware/getUserObject.js";
import checkPermissions from "../middleware/permissions.js";

import postRoutes from "./api/postsRoutes.js";
import userRoutes from "./api/usersRoutes.js";
import adminRoutes from "./api/adminRoutes.js";

const router = express.Router();

router.use("/", authenticate);
router.use("/", getRoute);
router.use("/", getUserObject);
router.use("/", checkPermissions);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;