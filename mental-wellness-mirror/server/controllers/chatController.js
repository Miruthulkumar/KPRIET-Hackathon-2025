import Chat from "../models/Chat.js";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// System prompt for the wellness companion
const SYSTEM_PROMPT = `You are a compassionate mental wellness companion and therapist. Your role is to:

- Listen actively and empathetically to the user's thoughts and feelings
- Provide supportive, non-judgmental responses
- Ask thoughtful follow-up questions to help users explore their emotions
- Offer gentle coping strategies and wellness techniques when appropriate
- Use a warm, caring, and professional tone
- Keep responses concise but meaningful (2-4 sentences typically)
- Focus on emotional support, mindfulness, and positive psychology

Remember: You're here to support, not diagnose. Encourage professional help when needed.`;

// Create or get chat session
export const getOrCreateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    let chat = await Chat.findOne({ sessionId });

    if (!chat) {
      chat = new Chat({
        sessionId,
        messages: [],
      });
      await chat.save();
    }

    res.json(chat);
  } catch (error) {
    console.error("Error getting/creating session:", error);
    res.status(500).json({ error: "Failed to get chat session" });
  }
};

// Send message and get AI response
export const sendMessage = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Find or create chat session
    let chat = await Chat.findOne({ sessionId });
    if (!chat) {
      chat = new Chat({ sessionId, messages: [] });
    }

    // Add user message
    chat.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    // Prepare messages for OpenRouter
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chat.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenRouter API
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Mental Wellness Mirror",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Add assistant response
    chat.messages.push({
      role: "assistant",
      content: assistantMessage,
      timestamp: new Date(),
    });

    await chat.save();

    res.json({
      message: assistantMessage,
      chat,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get all chat sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Chat.find()
      .sort({ lastActivity: -1 })
      .select("sessionId lastActivity createdAt messages")
      .limit(50);

    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Delete chat session
export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chat = await Chat.findOneAndDelete({ sessionId });

    if (!chat) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Failed to delete session" });
  }
};

// Clear chat history (keep session, remove messages)
export const clearHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chat = await Chat.findOne({ sessionId });

    if (!chat) {
      return res.status(404).json({ error: "Session not found" });
    }

    chat.messages = [];
    await chat.save();

    res.json({ message: "Chat history cleared", chat });
  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
};