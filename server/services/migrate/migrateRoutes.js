// NOTE: THIS IS PROBABLY NOT THE WAY
// WE SHOULD BE DOING MIGRATIONS, IT JUST WORKS FOR NOW

import express from "express";
import {addReactions, removeReactions } from "./migrations/reactions.js";

const router = express.Router();

// Adds reaction fields to documents that are missing said fields
router.post("/reactions/add", addReactions);

// Use this to remove all reactions -- warning, it will actually remove all reactions lol
//router.post("/reactions/remove", removeReactions);

export default router;