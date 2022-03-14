// NOTE: THIS IS PROBABLY NOT THE WAY
 // WE SHOULD BE DOING MIGRATIONS, IT JUST WORKS FOR NOW

import {updateReactions } from "./migrations/1-post-reactions-migrate";

import express from "express";
const router = express.Router();

router.put("/posts/update/reactions", updateReactions);
