import express from "express"
import { start, deviation } from "../controller/taskController.js";

const router = express.Router();

router.get("/start", start);
router.get("/deviation", deviation);

export default router;