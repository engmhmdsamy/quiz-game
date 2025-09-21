import { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import questionsDatabase, {
  getRandomQuestions,
  getQuestionsByDifficulty,
  getAllCategories,
  getDifficulties
} from './data/questions';

export const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Result from './pages/Result';
import Quiz from './pages/Quiz';

function App() {
  const [quizState, setQuizState] = useState({
    user: {
      name: 'Player',
      gamesPlayed: 0,
      bestScore: 0,
      totalPoints: 0,
      achievements: [],
      rank: 0
    },

    gameSettings: {
      category: null,
      difficulty: null,
      playerName: 'Player',
      questionCount: 10
    },

    currentQuiz: {
      questions: [],
      currentIndex: 0,
      score: 0,
      isActive: false,
      timeLeft: 30,
      answers: [],
      stats: {
        correctAnswers: 0,
        wrongAnswers: 0,
        totalPoints: 0,
        streak: 0,
        maxStreak: 0,
        timeBonus: 0,
        startTime: null,
        endTime: null
      }
    },

    lastResult: null,

    allCategories: getAllCategories(),
    allDifficulties: getDifficulties(),
    totalQuestions: Object.values(questionsDatabase).reduce((total, category) => {
      return total + Object.values(category).reduce((catTotal, difficulty) => {
        return catTotal + difficulty.length;
      }, 0);
    }, 0)
  });

  const [leaderboard, setLeaderboard] = useState([
    {
      id: 1,
      name: "Quiz Master",
      score: 95,
      category: "programming",
      difficulty: "hard",
      accuracy: 95,
      streak: 8,
      timeBonus: 180,
      date: new Date().toISOString().split('T')[0],
      achievements: ["perfect_score", "speed_demon", "streak_master"]
    },
    {
      id: 2,
      name: "Science Genius",
      score: 88,
      category: "science",
      difficulty: "medium",
      accuracy: 88,
      streak: 6,
      timeBonus: 120,
      date: new Date().toISOString().split('T')[0],
      achievements: ["knowledge_seeker", "speed_demon"]
    },
    {
      id: 3,
      name: "History Buff",
      score: 82,
      category: "history",
      difficulty: "easy",
      accuracy: 82,
      streak: 5,
      timeBonus: 100,
      date: new Date().toISOString().split('T')[0],
      achievements: ["knowledge_seeker"]
    }
  ]);

  const quizActions = {
    startQuiz: (settings) => {
      let selectedQuestions = [];

      if (settings.category && settings.difficulty) {
        selectedQuestions = getQuestionsByDifficulty(settings.category, settings.difficulty);
        console.log(`Loading ${settings.difficulty} ${settings.category} questions:`, selectedQuestions.length);
      } else if (settings.category) {
        const categoryData = questionsDatabase[settings.category];
        if (categoryData) {
          selectedQuestions = [
            ...categoryData.easy || [],
            ...categoryData.medium || [],
            ...categoryData.hard || []
          ];
        }
        console.log(`Loading all ${settings.category} questions:`, selectedQuestions.length);
      } else {
        selectedQuestions = getRandomQuestions(settings.questionCount || 10);
        console.log(`Loading random questions:`, selectedQuestions.length);
      }

      const shuffledQuestions = [...selectedQuestions].sort(() => Math.random() - 0.5);
      const quizQuestions = shuffledQuestions.slice(0, settings.questionCount || 10);

      console.log('Final quiz questions:', quizQuestions);

      setQuizState(prev => ({
        ...prev,
        gameSettings: settings,
        currentQuiz: {
          ...prev.currentQuiz,
          questions: quizQuestions,
          currentIndex: 0,
          score: 0,
          isActive: true,
          timeLeft: 30,
          answers: [],
          stats: {
            correctAnswers: 0,
            wrongAnswers: 0,
            totalPoints: 0,
            streak: 0,
            maxStreak: 0,
            timeBonus: 0,
            startTime: Date.now(),
            endTime: null
          }
        }
      }));

      return quizQuestions;
    },

    answerQuestion: (selectedAnswer, timeLeft) => {
      setQuizState(prev => {
        const currentQuestion = prev.currentQuiz.questions[prev.currentQuiz.currentIndex];
        const isCorrect = selectedAnswer === currentQuestion.answer;
        const timeBonus = Math.max(0, timeLeft * 2);
        const points = isCorrect ? (currentQuestion.points || 10) + timeBonus : 0;

        const newStats = {
          ...prev.currentQuiz.stats,
          correctAnswers: prev.currentQuiz.stats.correctAnswers + (isCorrect ? 1 : 0),
          wrongAnswers: prev.currentQuiz.stats.wrongAnswers + (isCorrect ? 0 : 1),
          totalPoints: prev.currentQuiz.stats.totalPoints + points,
          streak: isCorrect ? prev.currentQuiz.stats.streak + 1 : 0,
          maxStreak: Math.max(
            prev.currentQuiz.stats.maxStreak,
            isCorrect ? prev.currentQuiz.stats.streak + 1 : prev.currentQuiz.stats.streak
          ),
          timeBonus: prev.currentQuiz.stats.timeBonus + timeBonus
        };

        const newAnswers = [...prev.currentQuiz.answers, {
          questionId: currentQuestion.id,
          selectedAnswer,
          correctAnswer: currentQuestion.answer,
          isCorrect,
          points,
          timeLeft
        }];

        return {
          ...prev,
          currentQuiz: {
            ...prev.currentQuiz,
            score: prev.currentQuiz.score + points,
            answers: newAnswers,
            stats: newStats
          }
        };
      });
    },

    nextQuestion: () => {
      setQuizState(prev => ({
        ...prev,
        currentQuiz: {
          ...prev.currentQuiz,
          currentIndex: prev.currentQuiz.currentIndex + 1,
          timeLeft: 30
        }
      }));
    },

    endQuiz: () => {
      setQuizState(prev => {
        const finalStats = {
          ...prev.currentQuiz.stats,
          endTime: Date.now()
        };

        const result = {
          score: prev.currentQuiz.score,
          total: prev.currentQuiz.questions.length,
          stats: finalStats,
          gameSettings: prev.gameSettings,
          answers: prev.currentQuiz.answers,
          date: new Date().toISOString().split('T')[0]
        };

        const newLeaderboardEntry = {
          id: Date.now(),
          name: prev.gameSettings.playerName || prev.user.name,
          score: prev.currentQuiz.score,
          category: prev.gameSettings.category,
          difficulty: prev.gameSettings.difficulty,
          accuracy: Math.round((finalStats.correctAnswers / prev.currentQuiz.questions.length) * 100),
          streak: finalStats.maxStreak,
          timeBonus: finalStats.timeBonus,
          date: new Date().toISOString().split('T')[0],
          achievements: [] 
        };

        setLeaderboard(prevLeaderboard =>
          [...prevLeaderboard, newLeaderboardEntry]
            .sort((a, b) => b.score - a.score)
            .slice(0, 20) 
        );

        return {
          ...prev,
          lastResult: result,
          currentQuiz: {
            ...prev.currentQuiz,
            isActive: false,
            stats: finalStats
          },
          user: {
            ...prev.user,
            gamesPlayed: prev.user.gamesPlayed + 1,
            bestScore: Math.max(prev.user.bestScore, prev.currentQuiz.score),
            totalPoints: prev.user.totalPoints + prev.currentQuiz.score
          }
        };
      });
    },

    resetQuiz: () => {
      setQuizState(prev => ({
        ...prev,
        currentQuiz: {
          questions: [],
          currentIndex: 0,
          score: 0,
          isActive: false,
          timeLeft: 30,
          answers: [],
          stats: {
            correctAnswers: 0,
            wrongAnswers: 0,
            totalPoints: 0,
            streak: 0,
            maxStreak: 0,
            timeBonus: 0,
            startTime: null,
            endTime: null
          }
        }
      }));
    },

    updateUser: (userData) => {
      setQuizState(prev => ({
        ...prev,
        user: { ...prev.user, ...userData }
      }));
    }
  };

  const contextValue = {
    ...quizState,
    leaderboard,
    ...quizActions,
    setLeaderboard,
    getRandomQuestions,
    getQuestionsByDifficulty,
    questionsDatabase
  };

  return (
    <QuizContext.Provider value={contextValue}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <Navbar />

          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/result" element={<Result />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-xs z-50">
            <div><strong>Debug Info:</strong></div>
            <div>Total Questions: {contextValue.totalQuestions}</div>
            <div>Categories: {contextValue.allCategories.join(', ')}</div>
            <div>Current Quiz Active: {contextValue.currentQuiz.isActive ? 'Yes' : 'No'}</div>
            <div>Questions Loaded: {contextValue.currentQuiz.questions.length}</div>
            <div>Current Index: {contextValue.currentQuiz.currentIndex}</div>
          </div>
        )}
      </Router>
    </QuizContext.Provider>
  );
}

export default App;