import express from "express";
import { getBounces, getComplaints, processBounce, processComplaint } from "../controllers/emailControllers.js";

const router = express.Router();

router.get("/bounces", getBounces);
router.get("/complaints", getComplaints);
router.post("/bounces/:id", processBounce);
router.post("/complaints/:id", processComplaint);

export default router;