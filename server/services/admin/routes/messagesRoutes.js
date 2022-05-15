import express from "express";
import { getMessages, replyToMessage } from "../controllers/messagesControllers.js";

const router = express.Router();

router.get("/", getMessages);
router.post("/:id", replyToMessage);

export default router;