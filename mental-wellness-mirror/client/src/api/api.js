import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

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
    "http://localhost:5001/api/analyze-voice",
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
    "http://localhost:5001/api/report/generate",
    {
      responseType: 'blob', // Important for downloading PDF
    }
  );
  return response.data;
};

export default api;
