import { motion } from "framer-motion";

const InsightCard = ({ mood, insight, stressScore, anxietyScore, loading }) => {
  const getMoodEmoji = (moodText) => {
    if (!moodText) return "🌸";
    
    const lowerMood = moodText.toLowerCase();
    
    if (lowerMood.includes("happy") || lowerMood.includes("joy")) return "😊";
    if (lowerMood.includes("sad") || lowerMood.includes("down")) return "😔";
    if (lowerMood.includes("angry") || lowerMood.includes("frustrat")) return "😤";
    if (lowerMood.includes("anxious") || lowerMood.includes("worry") || lowerMood.includes("stress")) return "😰";
    if (lowerMood.includes("calm") || lowerMood.includes("peace")) return "😌";
    if (lowerMood.includes("excited") || lowerMood.includes("energet")) return "🤗";
    if (lowerMood.includes("tired") || lowerMood.includes("exhaust")) return "😴";
    if (lowerMood.includes("grateful") || lowerMood.includes("thank")) return "🙏";
    if (lowerMood.includes("love")) return "🥰";
    if (lowerMood.includes("confus")) return "🤔";
    if (lowerMood.includes("hope")) return "🌟";
    if (lowerMood.includes("content")) return "😊";
    
    return "🌸";
  };

  const getMoodColor = (moodText) => {
    if (!moodText) return "from-[#b8d4c5] to-[#c8e3f5]";
    
    const lowerMood = moodText.toLowerCase();
    
    if (lowerMood.includes("happy") || lowerMood.includes("joy")) return "from-yellow-200 to-yellow-300";
    if (lowerMood.includes("sad") || lowerMood.includes("down")) return "from-blue-200 to-blue-300";
    if (lowerMood.includes("angry") || lowerMood.includes("frustrat")) return "from-red-200 to-red-300";
    if (lowerMood.includes("anxious") || lowerMood.includes("worry") || lowerMood.includes("stress")) return "from-purple-200 to-purple-300";
    if (lowerMood.includes("calm") || lowerMood.includes("peace")) return "from-[#b8d4c5] to-[#a8c4b5]";
    if (lowerMood.includes("excited") || lowerMood.includes("energet")) return "from-orange-200 to-orange-300";
    if (lowerMood.includes("grateful") || lowerMood.includes("thank")) return "from-pink-200 to-pink-300";
    if (lowerMood.includes("love")) return "from-rose-200 to-rose-300";
    if (lowerMood.includes("hope")) return "from-[#c8e3f5] to-[#b8d3e5]";
    
    return "from-[#b8d4c5] to-[#c8e3f5]";
  };

  const getScoreEmoji = (score) => {
    if (score === undefined || score === null) return "🌸";
    if (score <= 20) return "😌"; // Very low
    if (score <= 40) return "🙂"; // Low
    if (score <= 60) return "😐"; // Moderate
    if (score <= 80) return "😟"; // High
    return "😰"; // Very high
  };

  const getScoreColor = (score) => {
    if (score === undefined || score === null) return "text-gray-500";
    if (score <= 20) return "text-green-600";
    if (score <= 40) return "text-green-500";
    if (score <= 60) return "text-yellow-600";
    if (score <= 80) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score === undefined || score === null) return "Unknown";
    if (score <= 20) return "Very Low";
    if (score <= 40) return "Low";
    if (score <= 60) return "Moderate";
    if (score <= 80) return "High";
    return "Very High";
  };

  const getScoreBarColor = (score) => {
    if (score === undefined || score === null) return "bg-gray-300";
    if (score <= 20) return "bg-green-500";
    if (score <= 40) return "bg-green-400";
    if (score <= 60) return "bg-yellow-500";
    if (score <= 80) return "bg-orange-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="peaceful-card p-10"
      >
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="text-6xl"
          >
            🌸
          </motion.div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-light text-gray-700">
              Reflecting on your words...
            </h3>
            <p className="text-sm text-gray-500 font-light max-w-md">
              Taking a moment to understand and appreciate what you've shared
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Mood Card */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="peaceful-card overflow-hidden"
      >
        <div className={`bg-gradient-to-br ${getMoodColor(mood)} p-8 text-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-7xl mb-4"
          >
            {getMoodEmoji(mood)}
          </motion.div>
          <h3 className="text-sm uppercase tracking-wider text-gray-600 font-medium mb-2">
            Detected Emotion
          </h3>
          <p className="text-2xl font-light text-gray-800 capitalize">
            {mood}
          </p>
        </div>
      </motion.div>

      {/* Stress & Anxiety Scores */}
      {(stressScore !== undefined || anxietyScore !== undefined) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Stress Score */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="peaceful-card p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{getScoreEmoji(stressScore)}</span>
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 font-medium">
                      Stress Level
                    </h4>
                    <p className={`text-2xl font-light ${getScoreColor(stressScore)}`}>
                      {stressScore}/100
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(stressScore)} bg-gray-100`}>
                  {getScoreLabel(stressScore)}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stressScore}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className={`h-full ${getScoreBarColor(stressScore)} rounded-full`}
                />
              </div>
            </div>
          </motion.div>

          {/* Anxiety Score */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="peaceful-card p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{getScoreEmoji(anxietyScore)}</span>
                  <div>
                    <h4 className="text-sm uppercase tracking-wide text-gray-500 font-medium">
                      Anxiety Level
                    </h4>
                    <p className={`text-2xl font-light ${getScoreColor(anxietyScore)}`}>
                      {anxietyScore}/100
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(anxietyScore)} bg-gray-100`}>
                  {getScoreLabel(anxietyScore)}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${anxietyScore}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className={`h-full ${getScoreBarColor(anxietyScore)} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="peaceful-card p-10"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-3xl"
            >
              💭
            </motion.span>
            <h3 className="text-xl font-light text-gray-700">
              Gentle Reflection
            </h3>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-600 leading-relaxed font-light text-lg text-center">
              {insight}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-6 border-t border-gray-200/50"
          >
            <p className="text-sm text-center text-gray-400 font-light italic">
              Remember: Every feeling is valid and temporary. You're doing great. 🌱
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InsightCard;
