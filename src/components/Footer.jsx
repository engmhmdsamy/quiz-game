import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuizContext } from '../App';

function Footer() {
  const navigate = useNavigate();
  const { totalQuestions, allCategories, user, leaderboard } = useContext(QuizContext);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'Take Quiz', icon: '🎯', path: '/quiz' },
    { name: 'Leaderboard', icon: '🏆', path: '/leaderboard' },
  ];

  const categories = [
    { name: 'Programming', icon: '💻', count: 15 },
    { name: 'Science', icon: '🧬', count: 15 },
    { name: 'Geography', icon: '🌍', count: 15 },
    { name: 'History', icon: '🏛️', count: 15 },
  ];

  const stats = [
    { label: 'Total Questions', value: totalQuestions + '+', icon: '📚' },
    { label: 'Categories', value: allCategories?.length || '4', icon: '📂' },
    { label: 'Difficulty Levels', value: '3', icon: '⚡' },
    { label: 'Active Players', value: leaderboard?.length || '0', icon: '👥' },
  ];

  const handleNavigation = (path) => {
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
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Link 
                to="/"
                className="flex items-center space-x-3 mb-4 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎮</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">QuizGame</h3>
                  <p className="text-sm opacity-70">Ultimate Challenge</p>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed">
                Challenge your knowledge with our interactive quiz platform. 
                Featuring multiple categories, difficulty levels, and real-time leaderboards.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-4"
            >
              {[
                { icon: '📧', action: () => window.open('mailto:info@quizgame.com') },
                { icon: '🐦', action: () => window.open('https://twitter.com') },
                { icon: '📘', action: () => window.open('https://facebook.com') },
                { icon: '📷', action: () => window.open('https://instagram.com') }
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={social.action}
                  className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 text-purple-300">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => handleNavigation(link.path)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group w-full text-left"
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </motion.button>
                  </motion.li>
                ))}
                
                {/* Quick Quiz Link */}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={handleQuickQuiz}
                    className="flex items-center space-x-3 text-yellow-300 hover:text-yellow-100 transition-colors group w-full text-left"
                  >
                    <span className="group-hover:scale-110 transition-transform">⚡</span>
                    <span>Quick Random Quiz</span>
                  </motion.button>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-xl font-bold mb-6 text-purple-300">Quiz Categories</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <motion.li
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.button
                      whileHover={{ x: 3 }}
                      onClick={() => navigate('/quiz', { 
                        state: { 
                          category: category.name.toLowerCase(), 
                          difficulty: 'easy',
                          playerName: user?.name || 'Player' 
                        } 
                      })}
                      className="flex items-center justify-between w-full text-left group hover:bg-white hover:bg-opacity-5 rounded-lg p-2 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg group-hover:scale-110 transition-transform">{category.icon}</span>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{category.name}</span>
                      </div>
                      <span className="text-xs bg-purple-600 bg-opacity-50 px-2 py-1 rounded-full group-hover:bg-opacity-70 transition-all">
                        {category.count}
                      </span>
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="text-xl font-bold mb-6 text-purple-300">Platform Stats</h4>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-5 rounded-lg p-4 backdrop-blur-sm cursor-pointer hover:bg-opacity-10 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span>{stat.icon}</span>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-900">{stat.value}</div>
                        <div className="text-sm text-black">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="border-t border-gray-700 bg-black bg-opacity-20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <motion.h4 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              🚀 Ready to Challenge Your Mind?
            </motion.h4>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of quiz enthusiasts and test your knowledge across multiple categories!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                🏠 Get Started Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickQuiz}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                ⚡ Quick Quiz
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="border-t border-gray-700 bg-black bg-opacity-30"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} QuizGame Ultimate. Made with ❤️ for quiz enthusiasts everywhere.
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 backdrop-blur-sm"
              >
                <span>⬆️</span>
                <span className="text-sm">Back to Top</span>
              </motion.button>
              
              <div className="text-gray-500 hidden md:block">|</div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation('/leaderboard')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                View Rankings
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Back-to-Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        ⬆️
      </motion.button>
    </motion.footer>
  );
}

export default Footer;