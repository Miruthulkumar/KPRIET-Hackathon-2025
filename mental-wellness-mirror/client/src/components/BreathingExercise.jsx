import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BreathingExercise = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("ready"); // ready, breatheIn, hold, breatheOut, complete
  const [cycle, setCycle] = useState(0);
  const [totalCycles] = useState(4); // 4 cycles of 4-7-8 breathing
  const timerRef = useRef(null);

  // 4-7-8 Breathing Technique
  const breathingPattern = {
    breatheIn: 4,    // 4 seconds inhale
    hold: 7,         // 7 seconds hold
    breatheOut: 8,   // 8 seconds exhale
  };

  useEffect(() => {
    if (!isActive) return;

    const runCycle = async () => {
      // Breathe In
      setPhase("breatheIn");
      await wait(breathingPattern.breatheIn * 1000);

      // Hold
      setPhase("hold");
      await wait(breathingPattern.hold * 1000);

      // Breathe Out
      setPhase("breatheOut");
      await wait(breathingPattern.breatheOut * 1000);

      // Check if completed all cycles
      if (cycle + 1 >= totalCycles) {
        setPhase("complete");
        setIsActive(false);
      } else {
        setCycle(prev => prev + 1);
      }
    };

    runCycle();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, cycle]);

  const wait = (ms) => {
    return new Promise(resolve => {
      timerRef.current = setTimeout(resolve, ms);
    });
  };

  const startExercise = () => {
    setIsActive(true);
    setCycle(0);
    setPhase("breatheIn");
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase("ready");
    setCycle(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case "ready":
        return "Get Ready";
      case "breatheIn":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "breatheOut":
        return "Breathe Out";
      case "complete":
        return "Complete!";
      default:
        return "";
    }
  };

  const getPhaseSubtext = () => {
    switch (phase) {
      case "ready":
        return "Find a comfortable position";
      case "breatheIn":
        return `${breathingPattern.breatheIn} seconds through your nose`;
      case "hold":
        return `${breathingPattern.hold} seconds`;
      case "breatheOut":
        return `${breathingPattern.breatheOut} seconds through your mouth`;
      case "complete":
        return "Well done! Notice how you feel";
      default:
        return "";
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case "breatheIn":
        return 1.5;
      case "hold":
        return 1.5;
      case "breatheOut":
        return 0.5;
      default:
        return 1;
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case "breatheIn":
        return "from-blue-400 to-cyan-400";
      case "hold":
        return "from-purple-400 to-pink-400";
      case "breatheOut":
        return "from-green-400 to-emerald-400";
      case "complete":
        return "from-yellow-400 to-orange-400";
      default:
        return "from-[#b8d4c5] to-[#c8e3f5]";
    }
  };

  const getAnimationDuration = () => {
    switch (phase) {
      case "breatheIn":
        return breathingPattern.breatheIn;
      case "hold":
        return 0.5; // Gentle pulse during hold
      case "breatheOut":
        return breathingPattern.breatheOut;
      default:
        return 1;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-10 max-w-2xl w-full shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-2">
            4-7-8 Breathing Exercise
          </h2>
          <p className="text-gray-500 font-light">
            A powerful technique to calm your mind and body
          </p>
        </div>

        {/* Breathing Circle Animation */}
        <div className="flex items-center justify-center mb-8" style={{ height: "300px" }}>
          <div className="relative w-64 h-64">
            {/* Outer glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#b8d4c5] to-[#c8e3f5] rounded-full blur-2xl"
            />
            
            {/* Main breathing circle */}
            <motion.div
              animate={{
                scale: getCircleScale(),
              }}
              transition={{
                duration: getAnimationDuration(),
                ease: "easeInOut"
              }}
              className={`absolute inset-0 bg-gradient-to-br ${getCircleColor()} rounded-full shadow-2xl flex items-center justify-center`}
            >
              <div className="text-center">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white"
                >
                  <p className="text-3xl font-light mb-2">{getPhaseText()}</p>
                  <p className="text-sm opacity-90">{getPhaseSubtext()}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Inner particles */}
            {isActive && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: i * 45,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/50 rounded-full"
                    style={{ transformOrigin: "0 0" }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        {isActive && phase !== "complete" && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Cycle {cycle + 1} of {totalCycles}</span>
              <span>{Math.round(((cycle) / totalCycles) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${((cycle) / totalCycles) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#b8d4c5] to-[#c8e3f5] rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          {!isActive && phase !== "complete" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startExercise}
              className="calm-button-primary px-8 py-4 text-lg"
            >
              <span className="flex items-center gap-2">
                <span>🫁</span>
                <span>Start Exercise</span>
              </span>
            </motion.button>
          )}

          {isActive && phase !== "complete" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopExercise}
              className="px-8 py-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-full font-medium transition-all"
            >
              Stop
            </motion.button>
          )}

          {phase === "complete" && (
            <div className="space-y-4 w-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <span className="text-6xl">✨</span>
                <p className="text-gray-600 font-light mt-4">
                  Great job! You've completed the breathing exercise.
                </p>
              </motion.div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startExercise}
                  className="calm-button-primary flex-1 py-3"
                >
                  Do Another Round
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="calm-button-secondary flex-1 py-3"
                >
                  Close
                </motion.button>
              </div>
            </div>
          )}

          {!isActive && phase === "ready" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="calm-button-secondary px-6 py-3"
            >
              Close
            </motion.button>
          )}
        </div>

        {/* Instructions */}
        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-3">How it works:</h3>
            <ul className="space-y-2 text-gray-600 font-light">
              <li className="flex gap-2">
                <span>🫁</span>
                <span><strong>Breathe in</strong> through your nose for 4 seconds</span>
              </li>
              <li className="flex gap-2">
                <span>⏸️</span>
                <span><strong>Hold</strong> your breath for 7 seconds</span>
              </li>
              <li className="flex gap-2">
                <span>💨</span>
                <span><strong>Breathe out</strong> through your mouth for 8 seconds</span>
              </li>
              <li className="flex gap-2">
                <span>🔄</span>
                <span><strong>Repeat</strong> for 4 cycles (about 2 minutes)</span>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BreathingExercise;