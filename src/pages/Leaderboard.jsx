import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// In-memory leaderboard storage (replaces localStorage for Claude.ai compatibility)
let leaderboardData = [
  {
    id: 1,
    name: "Alex the Great",
    score: 98,
    category: "programming",
    difficulty: "hard",
    accuracy: 98,
    streak: 8,
    timeBonus: 150,
    date: "2024-01-15",
    achievements: ["perfect_score", "speed_demon", "streak_master"]
  },
  {
    id: 2,
    name: "Science Sarah",
    score: 92,
    category: "science",
    difficulty: "medium",
    accuracy: 85,
    streak: 6,
    timeBonus: 120,
    date: "2024-01-14",
    achievements: ["knowledge_seeker", "speed_demon"]
  },
  {
    id: 3,
    name: "Geography Guru",
    score: 87,
    category: "geography",
    difficulty: "easy",
    accuracy: 90,
    streak: 5,
    timeBonus: 80,
    date: "2024-01-13",
    achievements: ["knowledge_seeker"]
  },
  {
    id: 4,
    name: "History Hero",
    score: 81,
    category: "history",
    difficulty: "medium",
    accuracy: 75,
    streak: 4,
    timeBonus: 95,
    date: "2024-01-12",
    achievements: ["knowledge_seeker"]
  },
  {
    id: 5,
    name: "Code Ninja",
    score: 76,
    category: "programming",
    difficulty: "easy",
    accuracy: 80,
    streak: 3,
    timeBonus: 60,
    date: "2024-01-11",
    achievements: ["knowledge_seeker"]
  }
];

const achievements = {
  perfect_score: { name: "Perfect Score", icon: "🏆", color: "text-yellow-500" },
  speed_demon: { name: "Speed Demon", icon: "⚡", color: "text-blue-500" },
  streak_master: { name: "Streak Master", icon: "🔥", color: "text-red-500" },
  knowledge_seeker: { name: "Knowledge Seeker", icon: "🎓", color: "text-purple-500" }
};

const categories = {
  programming: { name: "Programming", icon: "💻", color: "bg-blue-500" },
  science: { name: "Science", icon: "🧬", color: "bg-green-500" },
  geography: { name: "Geography", icon: "🌍", color: "bg-orange-500" },
  history: { name: "History", icon: "🏛️", color: "bg-purple-500" }
};

const difficulties = {
  easy: { name: "Easy", color: "bg-green-400" },
  medium: { name: "Medium", color: "bg-yellow-400" },
  hard: { name: "Hard", color: "bg-red-400" }
};

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [viewMode, setViewMode] = useState('overall'); // overall, monthly, weekly
  const [isLoading, setIsLoading] = useState(true);

  // Load leaderboard data
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      let filteredData = [...leaderboardData];
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filteredData = filteredData.filter(entry => entry.category === selectedCategory);
      }
      
      // Filter by difficulty
      if (selectedDifficulty !== 'all') {
        filteredData = filteredData.filter(entry => entry.difficulty === selectedDifficulty);
      }
      
      // Sort by score (descending)
      filteredData.sort((a, b) => b.score - a.score);
      
      setLeaderboard(filteredData);
      setIsLoading(false);
    }, 1000);
  }, [selectedCategory, selectedDifficulty, viewMode]);

  // Add new score (mock function for demo)
  const addMockScore = () => {
    const newScore = {
      id: Date.now(),
      name: "You",
      score: Math.floor(Math.random() * 100),
      category: "programming",
      difficulty: "medium",
      accuracy: Math.floor(Math.random() * 100),
      streak: Math.floor(Math.random() * 10),
      timeBonus: Math.floor(Math.random() * 200),
      date: new Date().toISOString().split('T')[0],
      achievements: ["knowledge_seeker"]
    };
    
    leaderboardData.unshift(newScore);
    setLeaderboard([newScore, ...leaderboard]);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-400 to-gray-600";
    if (rank === 3) return "from-amber-600 to-amber-800";
    return "from-blue-500 to-purple-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-xl text-gray-600">
            See how you rank among the quiz champions!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📂 Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="all">All Categories</option>
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                ⚡ Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="all">All Difficulties</option>
                {Object.entries(difficulties).map(([key, diff]) => (
                  <option key={key} value={key}>
                    {diff.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📅 Period
              </label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="overall">All Time</option>
                <option value="monthly">This Month</option>
                <option value="weekly">This Week</option>
              </select>
            </div>
          </div>

        
          <div className="mt-6 text-center">

          </div>
        </motion.div>

        {/* Statistics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-purple-600">{leaderboard.length}</div>
            <div className="text-gray-600">Total Players</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-yellow-600">
              {leaderboard[0]?.score || 0}
            </div>
            <div className="text-gray-600">Highest Score</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-blue-600">
              {leaderboard.length > 0 
                ? Math.round(leaderboard.reduce((sum, p) => sum + p.accuracy, 0) / leaderboard.length)
                : 0}%
            </div>
            <div className="text-gray-600">Avg Accuracy</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-red-600">
              {Math.max(...leaderboard.map(p => p.streak || 0), 0)}
            </div>
            <div className="text-gray-600">Best Streak</div>
          </div>
        </motion.div>

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <h2 className="text-2xl font-bold text-center">🏅 Top Players</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤔</div>
              <p className="text-xl text-gray-600 mb-4">No scores found</p>
              <p className="text-gray-500">Be the first to take the quiz!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      index < 3 ? 'bg-gradient-to-r ' + getRankColor(index + 1) + ' bg-opacity-10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      
                      {/* Left: Rank & Player Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getRankColor(index + 1)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                          {getRankIcon(index + 1)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {player.category && categories[player.category] && (
                              <span className={`px-2 py-1 ${categories[player.category].color} text-white text-xs rounded-full`}>
                                {categories[player.category].icon} {categories[player.category].name}
                              </span>
                            )}
                            {player.difficulty && difficulties[player.difficulty] && (
                              <span className={`px-2 py-1 ${difficulties[player.difficulty].color} text-white text-xs rounded-full`}>
                                {difficulties[player.difficulty].name}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{player.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Center: Stats */}
                      <div className="hidden md:flex items-center gap-8 mx-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{player.score}</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-red-600">{player.streak}</div>
                          <div className="text-xs text-gray-500">Streak</div>
                        </div>
                      </div>

                      {/* Right: Achievements & Actions */}
                      <div className="flex items-center gap-4">
                        {/* Achievements */}
                        <div className="flex gap-1">
                          {player.achievements?.slice(0, 3).map((achId) => (
                            <div
                              key={achId}
                              className={`text-xl ${achievements[achId]?.color || 'text-gray-400'}`}
                              title={achievements[achId]?.name}
                            >
                              {achievements[achId]?.icon || '🏅'}
                            </div>
                          ))}
                          {player.achievements?.length > 3 && (
                            <span className="text-xs text-gray-500">+{player.achievements.length - 3}</span>
                          )}
                        </div>

                        {/* Mobile Stats */}
                        <div className="md:hidden">
                          <div className="text-right">
                            <div className="text-xl font-bold text-purple-600">{player.score}</div>
                            <div className="text-xs text-gray-500">{player.accuracy}% • {player.streak} streak</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Category/Difficulty - Show on smaller screens */}
                    <div className="md:hidden mt-3 flex flex-wrap gap-2">
                      {player.category && categories[player.category] && (
                        <span className={`px-2 py-1 ${categories[player.category].color} text-white text-xs rounded-full`}>
                          {categories[player.category].icon} {categories[player.category].name}
                        </span>
                      )}
                      {player.difficulty && difficulties[player.difficulty] && (
                        <span className={`px-2 py-1 ${difficulties[player.difficulty].color} text-white text-xs rounded-full`}>
                          {difficulties[player.difficulty].name}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Achievement Legend */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            🏆 Achievement Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(achievements).map(([key, achievement]) => (
              <div key={key} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <span className={`text-2xl ${achievement.color}`}>
                  {achievement.icon}
                </span>
                <div>
                  <div className="font-semibold text-gray-800">{achievement.name}</div>
                  <div className="text-xs text-gray-600">
                    {key === 'perfect_score' && 'Score 100% accuracy'}
                    {key === 'speed_demon' && 'High time bonus'}
                    {key === 'streak_master' && '5+ correct streak'}
                    {key === 'knowledge_seeker' && '70%+ accuracy'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
        >
         
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
            <h4 className="text-2xl font-bold mb-4">🚀 Ready to Join the Leaderboard?</h4>
            <p className="text-lg opacity-90 mb-4">
              Challenge yourself with our diverse quiz categories and climb to the top!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">60+</div>
                <div className="text-sm opacity-80">Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm opacity-80">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm opacity-80">Difficulties</div>
              </div>
              <div>
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm opacity-80">Fun</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Leaderboard; 