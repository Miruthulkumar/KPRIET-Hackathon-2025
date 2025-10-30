import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from "axios";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure environment variables are loaded with explicit path
dotenv.config({ path: path.join(__dirname, "../.env") });

// OpenRouter client for chat completions (text analysis)
const openrouterClient = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Mental Wellness Mirror",
  },
});

// Analyze text entry
export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Call OpenRouter GPT to analyze emotional tone
    const completion = await openrouterClient.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a compassionate mental wellness assistant. Analyze the user's journal entry and provide:
1. A one-word mood (e.g., anxious, calm, stressed, happy, sad, reflective, energized)
2. A brief, warm, humanlike insight (2-3 sentences) that acknowledges their feelings and offers gentle encouragement or suggestions.
3. A stress score from 0-100 (0 = completely relaxed, 100 = extremely stressed)
4. An anxiety score from 0-100 (0 = no anxiety, 100 = severe anxiety)

Respond in JSON format: {"mood": "...", "insight": "...", "stressScore": 0-100, "anxietyScore": 0-100}`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    const analysis = JSON.parse(response);

    res.json(analysis);
  } catch (error) {
    console.error("Error analyzing text:", error);
    
    // Handle specific error types
    if (error.status === 429) {
      return res.status(429).json({ 
        error: "API quota exceeded. Please check your OpenRouter credits or try again later.",
        details: error.message 
      });
    }
    
    if (error.status === 401) {
      return res.status(401).json({ 
        error: "Invalid API key. Please check your OpenRouter API key.",
        details: error.message 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to analyze text", 
      details: error.message 
    });
  }
};

// Analyze voice entry using Hugging Face Whisper
export const analyzeVoice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio file is required" });
    }

    const audioFilePath = req.file.path;

    // Step 1: Transcribe audio using Hugging Face Whisper API
    const audioBuffer = fs.readFileSync(audioFilePath);
    
    const transcriptionResponse = await axios.post(
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
      audioBuffer,
      {
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "audio/webm",
          "Accept": "application/json",
        },
      }
    );

    const transcript = transcriptionResponse.data.text;

    if (!transcript || transcript.trim().length === 0) {
      // Clean up uploaded file
      fs.unlinkSync(audioFilePath);
      return res.status(400).json({ error: "No speech detected in audio" });
    }

    // Step 2: Analyze the transcript with GPT (OpenRouter)
    const completion = await openrouterClient.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a compassionate mental wellness assistant. Analyze the user's voice journal transcript and provide:
1. A one-word mood (e.g., anxious, calm, stressed, happy, sad, reflective, energized)
2. A brief, warm, humanlike insight (2-3 sentences) that acknowledges their feelings and offers gentle encouragement or suggestions.
3. A stress score from 0-100 (0 = completely relaxed, 100 = extremely stressed)
4. An anxiety score from 0-100 (0 = no anxiety, 100 = severe anxiety)

Respond in JSON format: {"mood": "...", "insight": "...", "stressScore": 0-100, "anxietyScore": 0-100}`,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    const analysis = JSON.parse(response);

    // Clean up uploaded file
    fs.unlinkSync(audioFilePath);

    res.json({
      transcript,
      ...analysis,
    });
  } catch (error) {
    console.error("Error analyzing voice:", error);
    
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    // Handle specific error types
    if (error.response?.status === 503) {
      return res.status(503).json({ 
        error: "Hugging Face model is loading. Please wait a moment and try again.",
        details: "The Whisper model is initializing on Hugging Face servers."
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: "API quota exceeded. Please check your Hugging Face credits or try again later.",
        details: error.message 
      });
    }
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(401).json({ 
        error: "Invalid Hugging Face API token. Please check your configuration.",
        details: error.message 
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: "API quota exceeded. Please check your OpenRouter credits or try again later.",
        details: error.message 
      });
    }
    
    if (error.status === 401) {
      return res.status(401).json({ 
        error: "Invalid API key. Please check your OpenRouter API key.",
        details: error.message 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to analyze voice", 
      details: error.message 
    });
  }
};
