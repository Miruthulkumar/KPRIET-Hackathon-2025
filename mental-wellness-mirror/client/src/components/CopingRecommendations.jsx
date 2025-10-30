import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BreathingExercise from "./BreathingExercise";

const CopingRecommendations = ({ stressScore, anxietyScore, mood }) => {
  const [showBreathing, setShowBreathing] = useState(false);
  // Generate recommendations based on scores
  const getRecommendations = () => {
    const recommendations = [];
    const avgScore = (stressScore + anxietyScore) / 2;

    // High stress/anxiety (> 60)
    if (avgScore > 60) {
      recommendations.push({
        icon: "🫁",
        title: "Deep Breathing Exercise",
        description: "Try the 4-7-8 technique: Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 3-4 times.",
        action: "Start Breathing",
        color: "from-blue-100 to-blue-200",
        priority: "high",
        interactive: true
      });

      recommendations.push({
        icon: "🚶",
        title: "Take a Walk",
        description: "A 10-minute walk can significantly reduce stress hormones and clear your mind.",
        action: "Go for a Walk",
        color: "from-green-100 to-green-200",
        priority: "high"
      });

      recommendations.push({
        icon: "🎵",
        title: "Listen to Calming Music",
        description: "Classical or nature sounds can lower heart rate and reduce anxiety within minutes.",
        action: "Play Music",
        color: "from-purple-100 to-purple-200",
        priority: "high"
      });
    }

    // Moderate stress/anxiety (40-60)
    if (avgScore >= 40 && avgScore <= 60) {
      recommendations.push({
        icon: "📝",
        title: "Practice Gratitude",
        description: "Write down 3 things you're grateful for today. This shifts focus to positive aspects.",
        action: "Start Writing",
        color: "from-yellow-100 to-yellow-200",
        priority: "medium"
      });

      recommendations.push({
        icon: "☕",
        title: "Take a Mindful Break",
        description: "Step away from your tasks for 5-10 minutes. Stretch, hydrate, or enjoy a cup of tea.",
        action: "Take Break",
        color: "from-orange-100 to-orange-200",
        priority: "medium"
      });

      recommendations.push({
        icon: "🧘",
        title: "Quick Meditation",
        description: "A 5-minute guided meditation can help center your thoughts and reduce tension.",
        action: "Meditate Now",
        color: "from-indigo-100 to-indigo-200",
        priority: "medium"
      });
    }

    // Low stress/anxiety (< 40)
    if (avgScore < 40) {
      recommendations.push({
        icon: "✨",
        title: "You're Doing Great!",
        description: "Your stress and anxiety levels are healthy. Keep up with your self-care routine.",
        action: "Keep Going",
        color: "from-green-100 to-green-200",
        priority: "low"
      });

      recommendations.push({
        icon: "📚",
        title: "Learn Something New",
        description: "You're in a good headspace to explore new interests or practice a skill you enjoy.",
        action: "Explore",
        color: "from-pink-100 to-pink-200",
        priority: "low"
      });

      recommendations.push({
        icon: "🤝",
        title: "Connect with Others",
        description: "Reach out to a friend or loved one. Positive social connections boost well-being.",
        action: "Connect",
        color: "from-rose-100 to-rose-200",
        priority: "low"
      });
    }

    // Specific anxiety recommendations
    if (anxietyScore > stressScore + 15) {
      recommendations.push({
        icon: "🧠",
        title: "Ground Yourself (5-4-3-2-1)",
        description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste. This anchors you to the present.",
        action: "Try Grounding",
        color: "from-teal-100 to-teal-200",
        priority: "high"
      });
    }

    // Specific stress recommendations
    if (stressScore > anxietyScore + 15) {
      recommendations.push({
        icon: "📅",
        title: "Prioritize Tasks",
        description: "Break down overwhelming tasks into smaller steps. Focus on one thing at a time.",
        action: "Make a List",
        color: "from-amber-100 to-amber-200",
        priority: "high"
      });
    }

    // Mood-specific recommendations
    if (mood && mood.toLowerCase().includes("sad")) {
      recommendations.push({
        icon: "🌞",
        title: "Get Some Sunlight",
        description: "Natural light boosts serotonin. Try spending 15 minutes outside or by a window.",
        action: "Go Outside",
        color: "from-yellow-100 to-yellow-200",
        priority: "medium"
      });
    }

    // Return top 4 most relevant recommendations
    return recommendations
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 4);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          💡
        </motion.div>
        <h3 className="text-2xl font-light text-gray-800">
          Personalized Coping Strategies
        </h3>
        <p className="text-gray-500 font-light">
          Based on your current stress and anxiety levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="peaceful-card overflow-hidden"
          >
            <div className={`bg-gradient-to-br ${rec.color} p-6`}>
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{rec.icon}</span>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-medium text-gray-800">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {rec.description}
                  </p>
                  {rec.interactive && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowBreathing(true)}
                      className="mt-3 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>🫁</span>
                      <span>{rec.action}</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathing && (
          <BreathingExercise onClose={() => setShowBreathing(false)} />
        )}
      </AnimatePresence>

      {/* Emergency Resources for Very High Scores */}
      {(stressScore > 80 || anxietyScore > 80) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="peaceful-card p-6 border-2 border-red-200"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">🆘</span>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-red-700 mb-2">
                Need Immediate Support?
              </h4>
              <p className="text-gray-600 font-light mb-4">
                Your levels indicate you might benefit from professional support. It's okay to ask for help.
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all">
                  📞 National Mental Health Helpline: 1800-XXX-XXXX
                </button>
                <button className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-all">
                  💬 Text Crisis Support: Text "HELLO" to XXXXX
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Positive Reinforcement for Low Scores */}
      {(stressScore < 30 && anxietyScore < 30) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="peaceful-card p-6 bg-gradient-to-r from-green-50 to-blue-50"
        >
          <div className="text-center space-y-2">
            <span className="text-5xl">🌟</span>
            <h4 className="text-xl font-light text-gray-800">
              You're in a Great Place!
            </h4>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Your stress and anxiety levels are healthy. Whatever you're doing, keep it up! 
              Remember this feeling and the practices that got you here.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CopingRecommendations;