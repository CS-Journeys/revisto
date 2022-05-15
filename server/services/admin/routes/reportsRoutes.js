import express from "express";
import { getReports, updateReport } from "../controllers/reportsControllers.js";

const router = express.Router();

router.get("/", getReports);
router.post("/:id", updateReport);

export default router;