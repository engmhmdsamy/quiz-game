import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuizContext } from '../App';

const categories = [
  {
    id: 'programming',
    name: 'Programming',
    icon: '💻',
    description: 'Test your coding knowledge',
    color: 'from-blue-500 to-cyan-500',
    questions: 15
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🧬',
    description: 'Explore the wonders of science',
    color: 'from-green-500 to-emerald-500',
    questions: 15
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Discover the world around us',
    color: 'from-orange-500 to-red-500',
    questions: 15
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'Journey through time',
    color: 'from-purple-500 to-pink-500',
    questions: 15
  }
];

const difficulties = [
  { id: 'easy', name: 'Easy', icon: '😊', color: 'bg-green-500', description: '10 points per question' },
  { id: 'medium', name: 'Medium', icon: '🤔', color: 'bg-yellow-500', description: '20 points per question' },
  { id: 'hard', name: 'Hard', icon: '🔥', color: 'bg-red-500', description: '30 points per question' }
];

function Home() {
  const navigate = useNavigate();
  const { user, questionsDatabase, totalQuestions } = useContext(QuizContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [playerName, setPlayerName] = useState(user?.name || '');
  const [questionCount, setQuestionCount] = useState(10);

  const handleStartQuiz = () => {
    const gameSettings = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      playerName: playerName.trim() || 'Anonymous Player',
      questionCount: questionCount
    };

    console.log('Starting quiz with settings:', gameSettings);
    navigate('/quiz', { state: gameSettings });
  };

  const handleRandomQuiz = () => {
    const gameSettings = {
      category: null,
      difficulty: null,
      playerName: playerName.trim() || 'Anonymous Player',
      questionCount: questionCount
    };

    console.log('Starting random quiz with settings:', gameSettings);
    navigate('/quiz', { state: gameSettings });
  };

  const getQuestionCount = () => {
    if (!selectedCategory) return totalQuestions;

    const categoryData = questionsDatabase[selectedCategory];
    if (!categoryData) return 0;

    if (selectedDifficulty) {
      return categoryData[selectedDifficulty]?.length || 0;
    }

    return Object.values(categoryData).reduce((total, questions) => total + questions.length, 0);
  };

  const availableQuestions = getQuestionCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <div className="container mx-auto px-6 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Ultimate Quiz Game
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Challenge your knowledge across multiple categories and difficulty levels.
            Compete with friends and climb the leaderboard!
          </p>
        </motion.div>

        {/* Player Stats */}
        {user && user.gamesPlayed > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">👋 Welcome back, {user.name}!</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.bestScore}</div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{user.gamesPlayed}</div>
                  <div className="text-sm text-gray-600">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">#{user.rank || '?'}</div>
                  <div className="text-sm text-gray-600">Global Rank</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Player Name Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <label className="block text-gray-700 font-semibold mb-2">
              🎮 Enter Your Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your awesome name..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-gray-800"
              maxLength={20}
            />
          </div>
        </motion.div>

        {/* Quiz Settings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <label className="block text-gray-700 font-semibold mb-2">
              📊 Number of Questions
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-gray-800"
            >
              <option value={5}>5 Questions (Quick)</option>
              <option value={10}>10 Questions (Standard)</option>
              <option value={15}>15 Questions (Extended)</option>
              <option value={20}>20 Questions (Challenge)</option>
            </select>
          </div>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🎯 Choose Your Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCategory === category.id
                    ? 'ring-4 ring-purple-400 shadow-2xl scale-105'
                    : 'hover:shadow-xl'
                  }`}
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
                  <div className="absolute -right-4 -top-4 text-6xl opacity-20">
                    {category.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                        {category.questions} Questions
                      </span>
                      {selectedCategory === category.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-2xl"
                        >
                          ✅
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              ⚡ Select Difficulty Level
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {difficulties.map((diff) => (
                <motion.button
                  key={diff.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-8 py-6 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg min-w-[150px] ${selectedDifficulty === diff.id
                      ? `${diff.color} ring-4 ring-white scale-110`
                      : `${diff.color} opacity-70 hover:opacity-100`
                    }`}
                >
                  <div className="text-3xl mb-2">{diff.icon}</div>
                  <div className="text-lg">{diff.name}</div>
                  <div className="text-xs opacity-80 mt-1">{diff.description}</div>
                </motion.button>
              ))}
            </div>

            {/* Questions Available */}
            <div className="text-center mt-4">
              <span className="text-gray-600">
                📊 Available Questions: <strong className="text-purple-600">{availableQuestions}</strong>
              </span>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          {/* Custom Quiz Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 69, 19, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartQuiz}
            disabled={!selectedCategory || availableQuestions === 0}
            className={`px-10 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${selectedCategory && availableQuestions > 0
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:shadow-2xl'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
          >
            {selectedCategory && availableQuestions > 0 ? (
              <>
                <span className="mr-2">🎯</span>
                Start {selectedCategory} Quiz
                <div className="text-sm opacity-80 mt-1">
                  {selectedDifficulty} • {Math.min(questionCount, availableQuestions)} questions
                </div>
              </>
            ) : (
              <>
                <span className="mr-2">🔒</span>
                {selectedCategory ? 'No Questions Available' : 'Select Category First'}
              </>
            )}
          </motion.button>

          {/* Random Quiz Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandomQuiz}
            className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
          >
            <span className="mr-2">🎲</span>
            Random Challenge
            <div className="text-sm opacity-80 mt-1">
              Mixed categories • {questionCount} questions
            </div>
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-purple-600">{totalQuestions}+</div>
            <div className="text-gray-600">Total Questions</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-green-600">{categories.length}</div>
            <div className="text-gray-600">Categories</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-orange-600">{difficulties.length}</div>
            <div className="text-gray-600">Difficulty Levels</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-blue-600">∞</div>
            <div className="text-gray-600">Fun Guaranteed</div>
          </div>
        </motion.div>

        {/* Additional Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/leaderboard')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            <span className="mr-2">🏅</span>
            View Leaderboard
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;