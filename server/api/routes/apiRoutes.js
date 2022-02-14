import express from "express";

import { authenticate } from "../../core/utils/jwtAuth.js";
import getUserObject from "../middleware/getUserObject.js";
import getRoute from "../../core/middleware/getRoute.js";
import checkPermissions from "../middleware/permissions.js";

import postRoutes from "./postsRoutes.js";
import userRoutes from "./usersRoutes.js";

const router = express.Router();

router.use(authenticate);
router.use(getRoute);
router.use(getUserObject);
router.use(checkPermissions);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);

export default router;