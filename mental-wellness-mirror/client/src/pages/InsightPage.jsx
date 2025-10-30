import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getEntryById } from "../api/api";
import InsightCard from "../components/InsightCard";

const InsightPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      setLoading(true);
      const data = await getEntryById(id);
      setEntry(data);
    } catch (error) {
      console.error("Error fetching entry:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity }
          }}
          className="text-6xl mx-auto mb-4"
        >
          🌸
        </motion.div>
        <p className="text-gray-500 font-light">Retrieving your reflection...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="peaceful-card p-16">
          <div className="text-6xl mb-6">🍃</div>
          <p className="text-gray-600 text-xl font-light mb-8">
            This entry seems to have drifted away
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="calm-button-primary px-8 py-3"
            >
              <span className="flex items-center gap-2">
                <span>←</span>
                <span>Return to Garden</span>
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8 pb-20"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 px-6 py-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-all font-light inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Garden</span>
          </motion.button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-light text-gray-800 mb-2">
            Reflection from{" "}
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h1>
          <p className="text-gray-400 font-light flex items-center justify-center gap-2">
            <span>{entry.entryType === "text" ? "📝" : "🎙️"}</span>
            <span>{entry.entryType === "text" ? "Written Expression" : "Voice Expression"}</span>
          </p>
        </motion.div>
      </div>

      {/* Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <InsightCard mood={entry.mood} insight={entry.insight} />
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="peaceful-card p-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">
            {entry.entryType === "text" ? "📖" : "🎵"}
          </span>
          <h2 className="text-xl font-light text-gray-700">
            {entry.entryType === "text" ? "Your Words" : "Your Voice"}
          </h2>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-light text-lg">
            {entry.entryType === "text" ? entry.content : entry.transcript}
          </p>
        </div>
      </motion.div>

      {/* Decorative timestamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center py-6"
      >
        <p className="text-sm text-gray-400 font-light">
          Captured at{" "}
          {new Date(entry.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 right-10 text-5xl pointer-events-none"
        style={{ zIndex: 0 }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default InsightPage;
