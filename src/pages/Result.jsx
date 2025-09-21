import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuizContext } from '../App';

// Achievement system
const achievements = [
  {
    id: 'perfect_score',
    name: 'Perfect Score!',
    description: 'Answered all questions correctly',
    icon: '🏆',
    condition: (stats) => stats.correctAnswers === stats.total
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'High time bonus earned',
    icon: '⚡',
    condition: (stats) => stats.timeBonus > 100
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Achieved 5+ correct answers in a row',
    icon: '🔥',
    condition: (stats) => stats.maxStreak >= 5
  },
  {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Scored above 70%',
    icon: '🎓',
    condition: (stats) => (stats.correctAnswers / stats.total) >= 0.7
  },
  {
    id: 'persistent',
    name: 'Never Give Up',
    description: 'Completed the quiz despite low score',
    icon: '💪',
    condition: (stats) => (stats.correctAnswers / stats.total) < 0.5 && stats.total >= 5
  }
];

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lastResult, currentQuiz, resetQuiz } = useContext(QuizContext);
  
  const [gameStats, setGameStats] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Get result data from multiple sources
  useEffect(() => {
    let resultData = null;

    // Priority 1: Data from navigation state
    if (location.state) {
      resultData = location.state;
      console.log('Got result data from navigation state:', resultData);
    }
    // Priority 2: Data from context (lastResult)
    else if (lastResult) {
      resultData = lastResult;
      console.log('Got result data from context:', resultData);
    }
    // Priority 3: Data from current quiz if just finished
    else if (currentQuiz && currentQuiz.questions.length > 0) {
      resultData = {
        score: currentQuiz.score,
        total: currentQuiz.questions.length,
        correctAnswers: currentQuiz.stats.correctAnswers,
        wrongAnswers: currentQuiz.stats.wrongAnswers,
        totalPoints: currentQuiz.stats.totalPoints,
        streak: currentQuiz.stats.streak,
        maxStreak: currentQuiz.stats.maxStreak,
        timeBonus: currentQuiz.stats.timeBonus,
        playerName: 'Player',
        category: 'Mixed',
        difficulty: 'Mixed'
      };
      console.log('Generated result data from current quiz:', resultData);
    }
    // Fallback: Demo data
    else {
      resultData = {
        score: 85,
        total: 10,
        correctAnswers: 7,
        wrongAnswers: 3,
        totalPoints: 85,
        streak: 3,
        maxStreak: 5,
        timeBonus: 120,
        playerName: 'Demo Player',
        category: 'programming',
        difficulty: 'easy'
      };
      console.log('Using demo result data');
    }

    setGameStats(resultData);
  }, [location.state, lastResult, currentQuiz]);

  const percentage = gameStats ? Math.round((gameStats.correctAnswers / gameStats.total) * 100) : 0;
  
  // Performance rating
  const getPerformanceRating = () => {
    if (percentage >= 90) return { text: "Outstanding! 🌟", color: "text-yellow-500", bg: "bg-yellow-50" };
    if (percentage >= 80) return { text: "Excellent! 🎉", color: "text-green-500", bg: "bg-green-50" };
    if (percentage >= 70) return { text: "Great Job! 👏", color: "text-blue-500", bg: "bg-blue-50" };
    if (percentage >= 60) return { text: "Good Effort! 👍", color: "text-purple-500", bg: "bg-purple-50" };
    if (percentage >= 40) return { text: "Keep Trying! 💪", color: "text-orange-500", bg: "bg-orange-50" };
    return { text: "Practice More! 📚", color: "text-red-500", bg: "bg-red-50" };
  };

  // Check achievements
  useEffect(() => {
    if (!gameStats) return;
    
    const newAchievements = achievements.filter(achievement => 
      achievement.condition(gameStats)
    );
    setUnlockedAchievements(newAchievements);
    
    if (newAchievements.length > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [gameStats]);

  const rating = getPerformanceRating();

  // Navigation functions with real routing
  const handlePlayAgain = () => {
    resetQuiz(); // Clear previous quiz data
    navigate('/quiz', { 
      state: { 
        category: gameStats?.category === 'Mixed' ? null : gameStats?.category,
        difficulty: gameStats?.difficulty === 'Mixed' ? null : gameStats?.difficulty,
        playerName: gameStats?.playerName || 'Player'
      } 
    });
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleHome = () => {
    navigate('/');
  };

  // Loading state
  if (!gameStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Celebration Animation */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-8xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className={`inline-block px-8 py-4 rounded-2xl ${rating.bg} ${rating.color} mb-4`}
            >
              <h1 className="text-4xl font-bold">{rating.text}</h1>
            </motion.div>
            
            <h2 className="text-2xl text-gray-700">
              Hey <span className="font-bold text-purple-600">{gameStats.playerName}</span>! 👋
            </h2>
          </div>

          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={percentage >= 70 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percentage / 100) }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-5xl font-bold text-gray-800"
                  >
                    {percentage}%
                  </motion.div>
                  <div className="text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center shadow-lg"
            >
              <div className="text-3xl font-bold">{gameStats.correctAnswers}</div>
              <div className="text-sm opacity-90">Correct</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 text-white text-center shadow-lg"
            >
              <div className="text-3xl font-bold">{gameStats.wrongAnswers}</div>
              <div className="text-sm opacity-90">Wrong</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white text-center shadow-lg"
            >
              <div className="text-3xl font-bold">{gameStats.maxStreak}</div>
              <div className="text-sm opacity-90">Best Streak</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white text-center shadow-lg"
            >
              <div className="text-3xl font-bold">{gameStats.totalPoints || gameStats.score}</div>
              <div className="text-sm opacity-90">Total Points</div>
            </motion.div>
          </motion.div>

          {/* Game Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {gameStats.category && (
              <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium capitalize">
                📂 {gameStats.category}
              </div>
            )}
            {gameStats.difficulty && (
              <div className={`px-4 py-2 rounded-full font-medium capitalize ${
                gameStats.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                gameStats.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                ⚡ {gameStats.difficulty}
              </div>
            )}
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              🎯 {gameStats.total} Questions
            </div>
            {gameStats.timeBonus > 0 && (
              <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
                ⏱️ +{gameStats.timeBonus} Time Bonus
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200"
          >
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
              🏆 Achievements Unlocked!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold">{achievement.name}</h4>
                      <p className="text-sm opacity-90">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <span className="mr-2">🔄</span>
            Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLeaderboard}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xl font-bold rounded-2xl shadow-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            <span className="mr-2">🏆</span>
            Leaderboard
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHome}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
          >
            <span className="mr-2">🏠</span>
            Home
          </motion.button>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <p className="text-lg italic text-gray-600 mb-2">
              {percentage >= 80 
                ? "\"The expert in anything was once a beginner who refused to give up!\" 🌟"
                : "\"Every mistake is a step closer to mastery. Keep learning!\" 💪"
              }
            </p>
            <p className="text-sm text-gray-500">Keep challenging yourself! 🚀</p>
          </div>
        </motion.div>

        {/* Debug Info (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-800 text-white p-4 rounded-lg text-xs">
            <strong>Debug - Result Data Source:</strong>
            <pre>{JSON.stringify(gameStats, null, 2)}</pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default Result;