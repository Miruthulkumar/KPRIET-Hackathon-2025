import express from "express";
import {
  createEntry,
  getEntries,
  getEntryById,
  deleteEntry,
} from "../controllers/entryController.js";

const router = express.Router();

// Routes
router.post("/", createEntry);
router.get("/", getEntries);
router.get("/:id", getEntryById);
router.delete("/:id", deleteEntry);

export default router;
