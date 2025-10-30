import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EmotionChart from "../components/EmotionChart";
import { getEntries, deleteEntry } from "../api/api";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'text', 'voice'

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await getEntries();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to release this entry from your sanctuary?")) {
      try {
        await deleteEntry(id);
        setEntries(entries.filter((entry) => entry._id !== id));
      } catch (error) {
        console.error("Error deleting entry:", error);
        alert("Failed to delete entry");
      }
    }
  };

  const filteredEntries =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.entryType === filter);

  const moodEmoji = {
    anxious: "😰",
    calm: "😌",
    stressed: "😫",
    happy: "😊",
    sad: "😢",
    reflective: "🤔",
    energized: "⚡",
    peaceful: "🕊️",
    frustrated: "😤",
    content: "😊",
    worried: "😟",
    hopeful: "🌟",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-4"
        >
          🌺
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-light text-gray-800">
          Your Inner Garden
        </h1>
        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
          Watch your emotional landscape bloom and grow over time
        </p>
      </motion.div>

      {/* Chart */}
      {entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <EmotionChart entries={entries} />
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="peaceful-card p-8 text-center"
        >
          <div className="text-5xl mb-3">🌸</div>
          <div className="text-4xl font-light text-gray-700 mb-2">{entries.length}</div>
          <div className="text-gray-500 font-light">Moments Captured</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="peaceful-card p-8 text-center"
        >
          <div className="text-5xl mb-3">✍️</div>
          <div className="text-4xl font-light text-gray-700 mb-2">
            {entries.filter((e) => e.entryType === "text").length}
          </div>
          <div className="text-gray-500 font-light">Written Reflections</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="peaceful-card p-8 text-center"
        >
          <div className="text-5xl mb-3">🎙️</div>
          <div className="text-4xl font-light text-gray-700 mb-2">
            {entries.filter((e) => e.entryType === "voice").length}
          </div>
          <div className="text-gray-500 font-light">Voice Expressions</div>
        </motion.div>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-4"
      >
        {["all", "text", "voice"].map((filterType) => (
          <motion.button
            key={filterType}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(filterType)}
            className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
              filter === filterType
                ? "bg-gradient-to-r from-[#b8d4c5] to-[#c8e3f5] text-gray-700 shadow-md"
                : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-sm"
            }`}
          >
            {filterType === "all" ? "All Entries" : `${filterType.charAt(0).toUpperCase() + filterType.slice(1)} Only`}
          </motion.button>
        ))}
      </motion.div>

      {/* Entries List */}
      {loading ? (
        <div className="text-center py-16">
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
          <p className="text-gray-500 font-light">Loading your memories...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="peaceful-card p-16 text-center"
        >
          <div className="text-6xl mb-6">🌱</div>
          <p className="text-gray-600 text-xl font-light mb-8">
            {entries.length === 0
              ? "Your sanctuary awaits your first reflection"
              : "No entries match this filter"}
          </p>
          <Link to="/journal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="calm-button-primary px-10 py-4 text-lg"
            >
              <span className="flex items-center gap-2">
                <span>✨</span>
                <span>Begin Your Journey</span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredEntries.map((entry, index) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="peaceful-card p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-4xl"
                  >
                    {moodEmoji[entry.mood.toLowerCase()] || "💭"}
                  </motion.span>
                  <div>
                    <h3 className="font-medium text-gray-700 capitalize text-lg">
                      {entry.mood}
                    </h3>
                    <p className="text-sm text-gray-400 font-light">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-light ${
                    entry.entryType === "text"
                      ? "bg-[#b8d4c5]/20 text-[#6b8e7f]"
                      : "bg-[#c8e3f5]/20 text-[#6b91a8]"
                  }`}
                >
                  {entry.entryType === "text" ? "📝 Written" : "🎙️ Spoken"}
                </span>
              </div>

              <p className="text-gray-600 mb-6 line-clamp-3 font-light leading-relaxed">
                {entry.insight}
              </p>

              {entry.entryType === "text" && entry.content && (
                <div className="mb-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-sm line-clamp-2 italic font-light">
                    "{entry.content}"
                  </p>
                </div>
              )}

              {entry.entryType === "voice" && entry.transcript && (
                <div className="mb-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-sm line-clamp-2 italic font-light">
                    "{entry.transcript}"
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDelete(entry._id)}
                className="px-6 py-2 bg-red-50 text-red-400 rounded-full text-sm hover:bg-red-100 transition font-light"
              >
                Release 🕊️
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 left-10 text-6xl pointer-events-none"
        style={{ zIndex: 0 }}
      >
        🌿
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
