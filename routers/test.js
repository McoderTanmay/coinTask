import express from "express";
import { test } from "../controller/testController.js";

const router = express.Router();
router.post("/", test);

export default router;