import express from "express";

import usersRoutes from "./usersRoutes.js";
import postsRoutes from "./postsRoutes.js";
import reportsRoutes from "./reportsRoutes.js";
import emailRoutes from "./emailRoutes.js";
import messagesRoutes from "./messagesRoutes.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/reports", reportsRoutes);
router.use("/posts", postsRoutes);
router.use("/email", emailRoutes);
router.use("/messages", messagesRoutes);

export default router;