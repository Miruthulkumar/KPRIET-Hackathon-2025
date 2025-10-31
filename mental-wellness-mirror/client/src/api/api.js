import axios from "axios";

// Use environment variable or deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://haven-backend-24qm.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Analyze text
export const analyzeText = async (text) => {
  const response = await api.post("/analyze-text", { text });
  return response.data;
};

// Analyze voice using Hugging Face Whisper
export const analyzeVoice = async (audioBlob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "voice-note.webm");

  const response = await axios.post(
    `${API_BASE_URL}/analyze-voice`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Create entry
export const createEntry = async (entryData) => {
  const response = await api.post("/entries", entryData);
  return response.data;
};

// Get all entries
export const getEntries = async (type = null, limit = 50) => {
  const params = {};
  if (type) params.type = type;
  if (limit) params.limit = limit;

  const response = await api.get("/entries", { params });
  return response.data;
};

// Get entry by ID
export const getEntryById = async (id) => {
  const response = await api.get(`/entries/${id}`);
  return response.data;
};

// Delete entry
export const deleteEntry = async (id) => {
  const response = await api.delete(`/entries/${id}`);
  return response.data;
};

// Generate therapy report
export const generateReport = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/report/generate`,
    {
      responseType: 'blob', // Important for downloading PDF
    }
  );
  return response.data;
};

// Chat API functions
export const getOrCreateChatSession = async (sessionId) => {
  const response = await api.get(`/chat/session/${sessionId}`);
  return response.data;
};

export const sendChatMessage = async (sessionId, message) => {
  const response = await api.post(`/chat/session/${sessionId}/message`, {
    message,
  });
  return response.data;
};

export const getAllChatSessions = async () => {
  const response = await api.get("/chat/sessions");
  return response.data;
};

export const deleteChatSession = async (sessionId) => {
  const response = await api.delete(`/chat/session/${sessionId}`);
  return response.data;
};

export const clearChatHistory = async (sessionId) => {
  const response = await api.delete(`/chat/session/${sessionId}/history`);
  return response.data;
};

export default api;
