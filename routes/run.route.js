import express from "express";
import { saveRun, getRuns } from "../controllers/run.controller.js";

const router = express.Router();

router.post("/", saveRun);

router.get("/", getRuns);

export default router;
