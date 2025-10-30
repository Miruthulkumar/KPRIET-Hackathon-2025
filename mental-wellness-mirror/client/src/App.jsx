import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/JournalPage";
import InsightPage from "./pages/InsightPage";
import LanguageSelector from "./components/LanguageSelector";
import { useLanguage } from "./context/LanguageContext";

function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path) => location.pathname === path;
  
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
