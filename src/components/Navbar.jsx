import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizContext } from '../App';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, currentQuiz } = useContext(QuizContext);
  
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', name: 'Home', icon: '🏠', path: '/' },
    { id: 'quiz', name: 'Quiz', icon: '🎯', path: '/quiz' },
    { id: 'leaderboard', name: 'Leaderboard', icon: '🏆', path: '/leaderboard' },
  ];

  // Get active link from current path
  const getActiveLink = () => {
    const currentPath = location.pathname;
    const activeNav = navLinks.find(link => link.path === currentPath);
    return activeNav ? activeNav.id : 'home';
  };

  const activeLink = getActiveLink();

  const handleLinkClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleQuickQuiz = () => {
    navigate('/quiz', { 
      state: { 
        category: null, 
        difficulty: null, 
        playerName: user?.name || 'Player',
        questionCount: 10
      } 
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-2xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleLinkClick('/')}
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎮</span>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">QuizGame</h1>
              <p className="text-xs opacity-80 -mt-1">Ultimate Challenge</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLinkClick(link.path)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeLink === link.id
                    ? 'text-purple-600 bg-white shadow-lg'
                    : 'text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="mr-2 text-lg">{link.icon}</span>
                {link.name}
                
                {/* Active indicator */}
                {activeLink === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* User Stats & Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="flex items-center space-x-3 text-white">
              <div className="text-center">
                <div className="text-sm font-bold">{user?.gamesPlayed || 0}</div>
                <div className="text-xs opacity-80">Played</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">{user?.bestScore || 0}%</div>
                <div className="text-xs opacity-80">Best</div>
              </div>
            </div>
            
            {/* Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm"
              title={user?.name || 'Player'}
            >
              <span className="text-xl">👤</span>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white bg-opacity-10 backdrop-blur-sm border-t border-white border-opacity-20"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeLink === link.id
                      ? 'text-purple-600 bg-white shadow-lg'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.name}
                </motion.button>
              ))}
              
              {/* Mobile Stats */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-around pt-4 border-t border-white border-opacity-20 text-white"
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{user?.gamesPlayed || 0}</div>
                  <div className="text-xs opacity-80">Quizzes Played</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{user?.bestScore || 0}%</div>
                  <div className="text-xs opacity-80">Best Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">#{user?.rank || '?'}</div>
                  <div className="text-xs opacity-80">Leaderboard</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (for quick quiz) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleQuickQuiz}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl"
          title="Quick Random Quiz"
        >
          ⚡
        </motion.button>
        
        {/* Tooltip */}
        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Quick Quiz!
        </div>
      </motion.div>

      {/* Quiz Progress Bar */}
      {currentQuiz && currentQuiz.isActive && currentQuiz.questions.length > 0 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: (currentQuiz.currentIndex + 1) / currentQuiz.questions.length 
          }}
          transition={{ duration: 0.5 }}
          className="h-1 bg-gradient-to-r from-yellow-400 to-red-500 origin-left"
        />
      )}

      {/* Breadcrumb for current page */}
      <div className="bg-black bg-opacity-10 px-6 py-2 text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-purple-200 transition-colors">
            Home
          </Link>
          {location.pathname !== '/' && (
            <>
              <span className="opacity-50">›</span>
              <span className="capitalize">
                {location.pathname.replace('/', '') || 'Page'}
              </span>
            </>
          )}
          
          {/* Show current quiz info if active */}
          {currentQuiz && currentQuiz.isActive && (
            <>
              <span className="opacity-50">›</span>
              <span className="text-yellow-300">
                Question {currentQuiz.currentIndex + 1} of {currentQuiz.questions.length}
              </span>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
