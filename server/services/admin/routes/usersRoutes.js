import express from "express";
import { getUsers, banUser, unbanUser } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/:id/ban", banUser);
router.delete("/:id/ban", unbanUser);

export default router;