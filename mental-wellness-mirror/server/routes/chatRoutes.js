import express from "express";
import {
  getOrCreateSession,
  sendMessage,
  getAllSessions,
  deleteSession,
  clearHistory,
} from "../controllers/chatController.js";

const router = express.Router();

// Get or create a chat session
router.get("/session/:sessionId", getOrCreateSession);

// Send a message and get AI response
router.post("/session/:sessionId/message", sendMessage);

// Get all chat sessions
router.get("/sessions", getAllSessions);

// Delete a chat session
router.delete("/session/:sessionId", deleteSession);

// Clear chat history (keep session)
router.delete("/session/:sessionId/history", clearHistory);

export default router;