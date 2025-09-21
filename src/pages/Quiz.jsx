import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizContext } from '../App';

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);
  const { 
    currentQuiz, 
    gameSettings, 
    startQuiz, 
    answerQuestion, 
    nextQuestion, 
    endQuiz,
    questionsDatabase 
  } = useContext(QuizContext);

  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const quizSettings = location.state || {
    category: 'programming',
    difficulty: 'easy',
    playerName: 'Demo Player',
    questionCount: 10
  };

  useEffect(() => {
    console.log('Quiz component mounted with settings:', quizSettings);
    setIsLoading(true);
    
    const questions = startQuiz(quizSettings);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && currentQuiz.isActive) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 5) {
          playSound('tick');
        }
      }, 1000);
    } else if (timeLeft === 0 && !showFeedback && currentQuiz.isActive) {
      handleAnswer(null); 
    }
    
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, showFeedback, currentQuiz.isActive]);

  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      let frequency;
      
      switch (type) {
        case 'correct': frequency = 800; break;
        case 'wrong': frequency = 200; break;
        case 'tick': frequency = 400; break;
        case 'finish': frequency = 600; break;
        default: frequency = 400;
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleAnswer = (selectedOption) => {
    if (showFeedback) return;
    
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);
    
    const currentQuestion = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
    
    answerQuestion(selectedOption, timeLeft);
    
    setTimeout(() => {
      const nextIndex = currentQuiz.currentIndex + 1;
      if (nextIndex < currentQuiz.questions.length) {
        nextQuestion();
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        endQuiz();
        playSound('finish');
        navigate('/result');
      }
    }, 2500);
  };

  if (isLoading || currentQuiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparing Your Quiz...</h2>
          <p className="text-gray-600">
            Loading {quizSettings.category} questions 
            {quizSettings.difficulty && ` (${quizSettings.difficulty} level)`}
          </p>
        </div>
      </div>
    );
  }

  if (!currentQuiz.isActive || currentQuiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Questions Available</h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't load questions for your selected category and difficulty.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuiz.currentIndex];
  const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;
  const timerProgress = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Stats */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-xl mb-8 border border-gray-200"
        >
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-600">
                👋 {quizSettings.playerName}
              </div>
              {quizSettings.category && (
                <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                  📂 {quizSettings.category}
                </div>
              )}
              {quizSettings.difficulty && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  quizSettings.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  quizSettings.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  ⚡ {quizSettings.difficulty}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{currentQuiz.score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentQuiz.stats.streak}</div>
                <div className="text-xs text-gray-500">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {currentQuiz.currentIndex + 1}/{currentQuiz.questions.length}
                </div>
                <div className="text-xs text-gray-500">Questions</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden shadow-inner"
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg"
          />
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <div className={`inline-block px-8 py-4 rounded-2xl shadow-xl font-bold text-2xl transition-all duration-300 ${
            timeLeft <= 5 ? 'bg-red-500 text-white animate-pulse scale-110' : 
            timeLeft <= 10 ? 'bg-yellow-500 text-white' : 
            'bg-green-500 text-white'
          }`}>
            ⏱️ {timeLeft}s
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-2 mx-auto shadow-inner">
            <motion.div
              animate={{ width: `${timerProgress}%` }}
              className={`h-full rounded-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 
                timeLeft <= 10 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuiz.currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 mb-8"
          >
            {/* Question */}
            <div className="text-center mb-8">
              <motion.h2
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight"
              >
                {currentQuestion.question}
              </motion.h2>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                <span className="px-3 py-1 bg-gray-100 rounded-full capitalize">
                  {currentQuestion.category}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  +{currentQuestion.points} points
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
                  {currentQuestion.difficulty}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105";
                
                if (showFeedback) {
                  if (option === currentQuestion.answer) {
                    buttonStyle = "bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-4 ring-green-300 scale-105";
                  } else if (option === selectedAnswer && option !== currentQuestion.answer) {
                    buttonStyle = "bg-gradient-to-r from-red-500 to-rose-600 text-white ring-4 ring-red-300";
                  } else {
                    buttonStyle = "bg-gray-300 text-gray-600";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!showFeedback ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`p-6 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 ${buttonStyle} ${
                      !showFeedback ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl opacity-80 font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-center flex-1">{option}</span>
                      {showFeedback && option === currentQuestion.answer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-2xl"
                        >
                          ✅
                        </motion.span>
                      )}
                      {showFeedback && option === selectedAnswer && option !== currentQuestion.answer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-2xl"
                        >
                          ❌
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                {selectedAnswer === currentQuestion.answer ? (
                  <div className="text-green-600">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="text-xl font-bold">Correct!</div>
                    <div className="text-sm">
                      +{currentQuestion.points + Math.max(0, timeLeft * 2)} points
                      {timeLeft > 20 && <span className="text-purple-600"> (Speed Bonus!)</span>}
                    </div>
                  </div>
                ) : (
                  <div className="text-red-600">
                    <div className="text-4xl mb-2">{selectedAnswer ? '😅' : '⏰'}</div>
                    <div className="text-xl font-bold">
                      {selectedAnswer ? 'Oops! Better luck next time!' : 'Time\'s up!'}
                    </div>
                    <div className="text-sm">
                      Correct answer: <strong className="text-green-600">{currentQuestion.answer}</strong>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Quick Stats During Game */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
            <div className="text-2xl text-green-600 font-bold">{currentQuiz.stats.correctAnswers}</div>
            <div className="text-xs text-gray-600">Correct</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
            <div className="text-2xl text-red-600 font-bold">{currentQuiz.stats.wrongAnswers}</div>
            <div className="text-xs text-gray-600">Wrong</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
            <div className="text-2xl text-purple-600 font-bold">{currentQuiz.stats.maxStreak}</div>
            <div className="text-xs text-gray-600">Best Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
            <div className="text-2xl text-blue-600 font-bold">{currentQuiz.stats.timeBonus}</div>
            <div className="text-xs text-gray-600">Time Bonus</div>
          </div>
        </motion.div>

        {/* Emergency Exit Button */}
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (window.confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
                navigate('/');
              }
            }}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm opacity-75 hover:opacity-100"
          >
            🚪 Quit Quiz
          </motion.button>
        </div>

      </div>
    </div>
  );
}

export default Quiz;