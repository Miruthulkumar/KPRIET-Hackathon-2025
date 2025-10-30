import { motion } from "framer-motion";
import JournalInput from "../components/JournalInput";
import { useLanguage } from "../context/LanguageContext";

const JournalPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
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
          className="text-7xl mb-4"
        >
          🪷
        </motion.div>
        
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800">
            {t.journal.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto">
            {t.journal.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <span className="font-light">{t.journal.privacy}</span>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <JournalInput />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 right-10 text-6xl pointer-events-none"
        style={{ zIndex: 0 }}
      >
        🌿
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2 }}
        className="fixed top-32 left-10 text-5xl pointer-events-none"
        style={{ zIndex: 0 }}
      >
        ✨
      </motion.div>
    </div>
  );
};

export default JournalPage;
