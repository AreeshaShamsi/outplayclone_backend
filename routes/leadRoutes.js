import express from "express";
import { getLeads, createLead, updateLead, deleteLead } from "../controllers/LeadController.js";

const router = express.Router();

// CRUD routes
router.get("/", getLeads);             // GET all
router.post("/create", createLead);    // CREATE
router.put("/update/:id", updateLead); // UPDATE
router.delete("/delete/:id", deleteLead); // DELETE

export default router;
