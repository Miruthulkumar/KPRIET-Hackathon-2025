import { useState } from "react";
import { motion } from "framer-motion";
import VoiceRecorder from "./VoiceRecorder";
import InsightCard from "./InsightCard";
import CopingRecommendations from "./CopingRecommendations";
import { analyzeText, analyzeVoice, createEntry } from "../api/api";

const JournalInput = () => {
  const [mode, setMode] = useState("text"); // 'text' or 'voice'
  const [textContent, setTextContent] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleTextSubmit = async () => {
    if (!textContent.trim()) {
      alert("Please write something first!");
      return;
    }

    setLoading(true);
    setSaved(false);
    setResult(null);

    try {
      // Analyze text
      const analysis = await analyzeText(textContent);
      setResult(analysis);

      // Save entry
      await createEntry({
        entryType: "text",
        content: textContent,
        mood: analysis.mood,
        insight: analysis.insight,
        stressScore: analysis.stressScore,
        anxietyScore: analysis.anxietyScore,
      });

      setSaved(true);
    } catch (error) {
      console.error("Error:", error);
      
      // Display specific error message based on response
      let errorMessage = "Failed to analyze entry. Please try again.";
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 429) {
        errorMessage = "API quota exceeded. Please check your credits or try again later.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid API key. Please check your configuration.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSubmit = async () => {
    if (!audioBlob) {
      alert("Please record your voice first!");
      return;
    }

    setLoading(true);
    setSaved(false);
    setResult(null);

    try {
      // Analyze voice using Hugging Face Whisper
      const analysis = await analyzeVoice(audioBlob);
      setResult(analysis);

      // Save entry
      await createEntry({
        entryType: "voice",
        transcript: analysis.transcript,
        mood: analysis.mood,
        insight: analysis.insight,
        stressScore: analysis.stressScore,
        anxietyScore: analysis.anxietyScore,
      });

      setSaved(true);
    } catch (error) {
      console.error("Error:", error);
      
      // Display specific error message based on response
      let errorMessage = "Failed to analyze voice entry. Please try again.";
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 429) {
        errorMessage = "API quota exceeded. Please check your credits or try again later.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid API key. Please check your configuration.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTextContent("");
    setAudioBlob(null);
    setResult(null);
    setSaved(false);
  };

  return (
    <div className="space-y-8">
      {/* Mode Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode("text")}
          className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
            mode === "text"
              ? "bg-gradient-to-r from-[#b8d4c5] to-[#c8e3f5] text-gray-700 shadow-md"
              : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-sm"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <span>Write</span>
          </span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setMode("voice")}
          className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
            mode === "voice"
              ? "bg-gradient-to-r from-[#b8d4c5] to-[#c8e3f5] text-gray-700 shadow-md"
              : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-sm"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">🎙️</span>
            <span>Speak</span>
          </span>
        </motion.button>
      </motion.div>

      {/* Input Area */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: mode === "text" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="peaceful-card p-10"
      >
        {mode === "text" ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-light text-gray-700">
                Share what's on your mind
              </h3>
              <p className="text-sm text-gray-500 font-light">
                This is a judgement-free space, just for you
              </p>
            </div>
            
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="I'm feeling..."
              className="serene-textarea h-64 text-lg"
              style={{ lineHeight: "1.8" }}
            />
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleTextSubmit}
              disabled={loading}
              className="calm-button-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🌸</span>
                  <span>Reflecting...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  <span>Reflect on My Words</span>
                </span>
              )}
            </motion.button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-light text-gray-700">
                Let your voice be heard
              </h3>
              <p className="text-sm text-gray-500 font-light">
                Sometimes speaking feels easier than writing
              </p>
            </div>
            
            <VoiceRecorder onRecordingComplete={setAudioBlob} />
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleVoiceSubmit}
              disabled={loading || !audioBlob}
              className="calm-button-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🌸</span>
                  <span>Listening...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  <span>Reflect on My Voice</span>
                </span>
              )}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Result */}
      {(loading || result) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <InsightCard
            mood={result?.mood}
            insight={result?.insight}
            stressScore={result?.stressScore}
            anxietyScore={result?.anxietyScore}
            loading={loading}
          />

          {!loading && result && (
            <CopingRecommendations
              stressScore={result?.stressScore}
              anxietyScore={result?.anxietyScore}
              mood={result?.mood}
            />
          )}

          {saved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="peaceful-card p-6">
                <p className="text-[#b8d4c5] font-medium text-lg mb-2">
                  ✓ Safely saved
                </p>
                <p className="text-gray-500 text-sm font-light">
                  Your thoughts are preserved in your personal sanctuary
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="calm-button-secondary"
              >
                <span className="flex items-center gap-2">
                  <span>🌱</span>
                  <span>Express More</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default JournalInput;
