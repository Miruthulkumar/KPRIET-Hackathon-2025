import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import InsightPage from "./pages/InsightPage";
import ChatPage from "./pages/ChatPage";
import LanguageSelector from "./components/LanguageSelector";
import { useLanguage } from "./context/LanguageContext";
import { generateReport } from "./api/api";

function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  const handleGenerateReport = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const blob = await generateReport();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mental-wellness-report-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('✅ Therapy report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      if (error.response?.status === 404) {
        alert('Please create at least one journal entry before generating a report.');
      } else {
        alert('Failed to generate report. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100/50"
    >
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="text-3xl breathe">🌸</div>
              <h1 className="text-2xl font-light text-gray-700 tracking-wide">
                Haven 
              </h1>
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-[#b8d4c5]/30 to-[#c8e3f5]/30 text-gray-700 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🏡</span>
                  <span className="hidden sm:inline">{t.nav.dashboard}</span>
                </span>
              </motion.button>
            </Link>
            <Link to="/journal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive('/journal') 
                    ? 'bg-gradient-to-r from-[#b8d4c5]/30 to-[#c8e3f5]/30 text-gray-700 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>✍️</span>
                  <span className="hidden sm:inline">{t.nav.journal}</span>
                </span>
              </motion.button>
            </Link>
            
            {/* Chat Button */}
            <Link to="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive('/chat')
                    ? 'bg-gradient-to-r from-[#b8d4c5]/30 to-[#c8e3f5]/30 text-gray-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>💬</span>
                  <span className="hidden sm:inline">Chat</span>
                </span>
              </motion.button>
            </Link>

            {/* Generate Report Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="px-4 py-2 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate Therapy Report"
            >
              <span className="flex items-center gap-2">
                {isGenerating ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span className="hidden md:inline">Generating...</span>
                  </>
                ) : (
                  <>
                    <span>📊</span>
                    <span className="hidden md:inline">Report</span>
                  </>
                )}
              </span>
            </motion.button>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

function App() {
  const { t } = useLanguage();
  
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        
        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/insight/:id" element={<InsightPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>
        
        {/* Peaceful Footer */}
        <footer className="container mx-auto px-6 py-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-sm font-light"
          >
            {t.nav.tagline} 🕊️
          </motion.p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
