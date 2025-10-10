import express from "express";
import { getLeads, createLead } from "../controllers/LeadController.js";

const router = express.Router();

router.get("/", getLeads);
router.post("/", createLead);

export default router;
