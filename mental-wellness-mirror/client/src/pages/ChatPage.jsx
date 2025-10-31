import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getOrCreateChatSession,
  sendChatMessage,
  clearChatHistory,
} from "../api/api";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadChatSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatSession = async () => {
    try {
      const session = await getOrCreateChatSession(sessionId);
      setMessages(session.messages || []);
    } catch (error) {
      console.error("Error loading chat session:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");

    // Add user message optimistically
    const newUserMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsLoading(true);

    try {
      const response = await sendChatMessage(sessionId, userMessage);

      // Add assistant response
      const assistantMessage = {
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage = {
        role: "assistant",
        content:
          "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearHistory = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear this conversation? This cannot be undone."
      )
    ) {
      try {
        await clearChatHistory(sessionId);
        setMessages([]);
      } catch (error) {
        console.error("Error clearing history:", error);
      }
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-120px)] flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="peaceful-card p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-4xl"
            >
              💬
            </motion.div>
            <div>
              <h1 className="text-3xl font-light text-gray-800">
                Wellness Chat
              </h1>
              <p className="text-gray-500 font-light">
                A safe space for meaningful conversation
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearHistory}
            className="px-4 py-2 bg-red-50 text-red-400 rounded-full text-sm hover:bg-red-100 transition font-light"
          >
            Clear Chat
          </motion.button>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 peaceful-card p-6 overflow-y-auto mb-6 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-6"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="text-8xl"
            >
              🌸
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-gray-700">
                Start a Conversation
              </h3>
              <p className="text-gray-500 font-light max-w-md">
                Share what's on your mind, and I'll be here to listen and
                support you
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
              {[
                "How are you feeling today?",
                "I'm feeling stressed",
                "Can we talk about anxiety?",
                "I need support",
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInputMessage(suggestion)}
                  className="px-5 py-2 bg-gradient-to-r from-[#b8d4c5]/20 to-[#c8e3f5]/20 text-gray-600 rounded-full text-sm hover:from-[#b8d4c5]/30 hover:to-[#c8e3f5]/30 transition font-light border border-gray-200"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[#b8d4c5] to-[#c8e3f5] text-gray-800"
                      : message.isError
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-white text-gray-700 border border-gray-200"
                  } rounded-2xl p-4 shadow-sm`}
                >
                  <p className="font-light leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white text-gray-700 border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0,
                  }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSendMessage}
        className="peaceful-card p-4 flex gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Share what's on your mind..."
          disabled={isLoading}
          className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b8d4c5]/50 font-light text-gray-700 bg-white/50"
        />
        <motion.button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          whileHover={{ scale: inputMessage.trim() && !isLoading ? 1.05 : 1 }}
          whileTap={{ scale: inputMessage.trim() && !isLoading ? 0.95 : 1 }}
          className="px-8 py-4 bg-gradient-to-r from-[#b8d4c5] to-[#c8e3f5] text-gray-700 rounded-full font-light disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
        >
          Send 💫
        </motion.button>
      </motion.form>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="fixed top-20 right-10 text-8xl pointer-events-none"
        style={{ zIndex: 0 }}
      >
        🕊️
      </motion.div>
    </motion.div>
  );
};

export default ChatPage;