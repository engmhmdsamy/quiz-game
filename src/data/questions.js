const questionsDatabase = {
  programming: {
    easy: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
        answer: "HyperText Markup Language",
        points: 10,
        category: "programming",
        difficulty: "easy"
      },
      {
        id: 2,
        question: "Which language runs in a web browser?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript",
        points: 10,
        category: "programming",
        difficulty: "easy"
      },
      {
        id: 3,
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets",
        points: 10,
        category: "programming",
        difficulty: "easy"
      },
      {
        id: 4,
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>",
        points: 10,
        category: "programming",
        difficulty: "easy"
      },
      {
        id: 5,
        question: "What does JS stand for?",
        options: ["JavaStyle", "JavaScript", "JustScript", "JavaSource"],
        answer: "JavaScript",
        points: 10,
        category: "programming",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        id: 6,
        question: "Who developed React?",
        options: ["Google", "Microsoft", "Facebook", "Twitter"],
        answer: "Facebook",
        points: 20,
        category: "programming",
        difficulty: "medium"
      },
      {
        id: 7,
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: "push()",
        points: 20,
        category: "programming",
        difficulty: "medium"
      },
      {
        id: 8,
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        answer: "var myVar;",
        points: 20,
        category: "programming",
        difficulty: "medium"
      },
      {
        id: 9,
        question: "Which CSS property is used to change the text color?",
        options: ["color", "text-color", "font-color", "text-style"],
        answer: "color",
        points: 20,
        category: "programming",
        difficulty: "medium"
      },
      {
        id: 10,
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Interface", "Advanced Process Interface"],
        answer: "Application Programming Interface",
        points: 20,
        category: "programming",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        id: 11,
        question: "Which design pattern is React based on?",
        options: ["MVC", "Component-Based Architecture", "Observer", "Singleton"],
        answer: "Component-Based Architecture",
        points: 30,
        category: "programming",
        difficulty: "hard"
      },
      {
        id: 12,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: "O(log n)",
        points: 30,
        category: "programming",
        difficulty: "hard"
      },
      {
        id: 13,
        question: "In JavaScript, what does 'hoisting' refer to?",
        options: ["Moving elements up in DOM", "Variable and function declarations are moved to top", "Lifting heavy objects", "Creating higher-order functions"],
        answer: "Variable and function declarations are moved to top",
        points: 30,
        category: "programming",
        difficulty: "hard"
      },
      {
        id: 14,
        question: "Which HTTP status code indicates 'Not Found'?",
        options: ["200", "404", "500", "403"],
        answer: "404",
        points: 30,
        category: "programming",
        difficulty: "hard"
      },
      {
        id: 15,
        question: "What is a closure in JavaScript?",
        options: ["A way to close browser", "Function with access to outer scope", "CSS property", "HTML element"],
        answer: "Function with access to outer scope",
        points: 30,
        category: "programming",
        difficulty: "hard"
      }
    ]
  },
  
  science: {
    easy: [
      {
        id: 16,
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "H2"],
        answer: "H2O",
        points: 10,
        category: "science",
        difficulty: "easy"
      },
      {
        id: 17,
        question: "How many bones are there in an adult human body?",
        options: ["206", "205", "207", "208"],
        answer: "206",
        points: 10,
        category: "science",
        difficulty: "easy"
      },
      {
        id: 18,
        question: "What planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        points: 10,
        category: "science",
        difficulty: "easy"
      },
      {
        id: 19,
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide",
        points: 10,
        category: "science",
        difficulty: "easy"
      },
      {
        id: 20,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        answer: "Diamond",
        points: 10,
        category: "science",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        id: 21,
        question: "What is the speed of light?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "300,792,458 m/s"],
        answer: "299,792,458 m/s",
        points: 20,
        category: "science",
        difficulty: "medium"
      },
      {
        id: 22,
        question: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Proton", "Electron"],
        answer: "Atom",
        points: 20,
        category: "science",
        difficulty: "medium"
      },
      {
        id: 23,
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        answer: "4",
        points: 20,
        category: "science",
        difficulty: "medium"
      },
      {
        id: 24,
        question: "What type of animal is a Komodo dragon?",
        options: ["Snake", "Lizard", "Dragon", "Crocodile"],
        answer: "Lizard",
        points: 20,
        category: "science",
        difficulty: "medium"
      },
      {
        id: 25,
        question: "Which organ in the human body produces insulin?",
        options: ["Liver", "Kidney", "Pancreas", "Heart"],
        answer: "Pancreas",
        points: 20,
        category: "science",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        id: 26,
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        answer: "Nitrogen",
        points: 30,
        category: "science",
        difficulty: "hard"
      },
      {
        id: 27,
        question: "What is the pH level of pure water?",
        options: ["6", "7", "8", "9"],
        answer: "7",
        points: 30,
        category: "science",
        difficulty: "hard"
      },
      {
        id: 28,
        question: "Which scientist developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        answer: "Albert Einstein",
        points: 30,
        category: "science",
        difficulty: "hard"
      },
      {
        id: 29,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
        answer: "Mitochondria",
        points: 30,
        category: "science",
        difficulty: "hard"
      },
      {
        id: 30,
        question: "How many electrons does a carbon atom have?",
        options: ["4", "6", "8", "12"],
        answer: "6",
        points: 30,
        category: "science",
        difficulty: "hard"
      }
    ]
  },
  
  geography: {
    easy: [
      {
        id: 31,
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        answer: "Paris",
        points: 10,
        category: "geography",
        difficulty: "easy"
      },
      {
        id: 32,
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific",
        points: 10,
        category: "geography",
        difficulty: "easy"
      },
      {
        id: 33,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7",
        points: 10,
        category: "geography",
        difficulty: "easy"
      },
      {
        id: 34,
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        answer: "Nile",
        points: 10,
        category: "geography",
        difficulty: "easy"
      },
      {
        id: 35,
        question: "Which country has the largest population?",
        options: ["India", "USA", "China", "Russia"],
        answer: "China",
        points: 10,
        category: "geography",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        id: 36,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        answer: "Canberra",
        points: 20,
        category: "geography",
        difficulty: "medium"
      },
      {
        id: 37,
        question: "Which desert is the largest in the world?",
        options: ["Sahara", "Antarctic", "Arabian", "Gobi"],
        answer: "Antarctic",
        points: 20,
        category: "geography",
        difficulty: "medium"
      },
      {
        id: 38,
        question: "Mount Everest is located in which mountain range?",
        options: ["Alps", "Andes", "Himalayas", "Rockies"],
        answer: "Himalayas",
        points: 20,
        category: "geography",
        difficulty: "medium"
      },
      {
        id: 39,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        answer: "Japan",
        points: 20,
        category: "geography",
        difficulty: "medium"
      },
      {
        id: 40,
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Luxembourg"],
        answer: "Vatican City",
        points: 20,
        category: "geography",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        id: 41,
        question: "Which African country was never colonized?",
        options: ["Ethiopia", "Liberia", "Both Ethiopia and Liberia", "Kenya"],
        answer: "Both Ethiopia and Liberia",
        points: 30,
        category: "geography",
        difficulty: "hard"
      },
      {
        id: 42,
        question: "What is the deepest point on Earth?",
        options: ["Mariana Trench", "Dead Sea", "Grand Canyon", "Baikal Lake"],
        answer: "Mariana Trench",
        points: 30,
        category: "geography",
        difficulty: "hard"
      },
      {
        id: 43,
        question: "Which two countries share the longest international border?",
        options: ["USA-Mexico", "Russia-China", "USA-Canada", "India-China"],
        answer: "USA-Canada",
        points: 30,
        category: "geography",
        difficulty: "hard"
      },
      {
        id: 44,
        question: "What is the currency of Switzerland?",
        options: ["Euro", "Swiss Franc", "Swiss Dollar", "Pound"],
        answer: "Swiss Franc",
        points: 30,
        category: "geography",
        difficulty: "hard"
      },
      {
        id: 45,
        question: "Which strait separates Europe and Asia?",
        options: ["Bering Strait", "Bosphorus", "Gibraltar", "Hormuz"],
        answer: "Bosphorus",
        points: 30,
        category: "geography",
        difficulty: "hard"
      }
    ]
  },
  
  history: {
    easy: [
      {
        id: 46,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        answer: "1945",
        points: 10,
        category: "history",
        difficulty: "easy"
      },
      {
        id: 47,
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        answer: "George Washington",
        points: 10,
        category: "history",
        difficulty: "easy"
      },
      {
        id: 48,
        question: "Which ancient wonder of the world was located in Egypt?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
        answer: "Great Pyramid of Giza",
        points: 10,
        category: "history",
        difficulty: "easy"
      },
      {
        id: 49,
        question: "The Titanic sank in which year?",
        options: ["1910", "1912", "1914", "1916"],
        answer: "1912",
        points: 10,
        category: "history",
        difficulty: "easy"
      },
      {
        id: 50,
        question: "Who painted the Mona Lisa?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci",
        points: 10,
        category: "history",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        id: 51,
        question: "The Berlin Wall fell in which year?",
        options: ["1987", "1988", "1989", "1990"],
        answer: "1989",
        points: 20,
        category: "history",
        difficulty: "medium"
      },
      {
        id: 52,
        question: "Who was known as the 'Iron Lady'?",
        options: ["Queen Elizabeth II", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"],
        answer: "Margaret Thatcher",
        points: 20,
        category: "history",
        difficulty: "medium"
      },
      {
        id: 53,
        question: "The French Revolution began in which year?",
        options: ["1789", "1790", "1791", "1792"],
        answer: "1789",
        points: 20,
        category: "history",
        difficulty: "medium"
      },
      {
        id: 54,
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek", "Roman", "Byzantine", "Persian"],
        answer: "Roman",
        points: 20,
        category: "history",
        difficulty: "medium"
      },
      {
        id: 55,
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"],
        answer: "Alexander Graham Bell",
        points: 20,
        category: "history",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        id: 56,
        question: "The Hundred Years' War was fought between which two countries?",
        options: ["England and France", "Spain and Portugal", "Germany and Austria", "Italy and Greece"],
        answer: "England and France",
        points: 30,
        category: "history",
        difficulty: "hard"
      },
      {
        id: 57,
        question: "Who was the last Pharaoh of Egypt?",
        options: ["Tutankhamun", "Cleopatra VII", "Ramesses II", "Hatshepsut"],
        answer: "Cleopatra VII",
        points: 30,
        category: "history",
        difficulty: "hard"
      },
      {
        id: 58,
        question: "The Treaty of Versailles ended which war?",
        options: ["World War I", "World War II", "Franco-Prussian War", "Crimean War"],
        answer: "World War I",
        points: 30,
        category: "history",
        difficulty: "hard"
      },
      {
        id: 59,
        question: "Which civilization built Machu Picchu?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        answer: "Inca",
        points: 30,
        category: "history",
        difficulty: "hard"
      },
      {
        id: 60,
        question: "The Silk Road connected which two regions?",
        options: ["Europe and Africa", "Asia and Europe", "America and Asia", "Africa and Asia"],
        answer: "Asia and Europe",
        points: 30,
        category: "history",
        difficulty: "hard"
      }
    ]
  }
};

// Utility functions
export const getQuestionsByCategory = (category) => {
  return questionsDatabase[category] || {};
};

export const getQuestionsByDifficulty = (category, difficulty) => {
  const categoryQuestions = questionsDatabase[category];
  return categoryQuestions ? categoryQuestions[difficulty] || [] : [];
};

export const getRandomQuestions = (count = 10, category = null, difficulty = null) => {
  let allQuestions = [];
  
  if (category && difficulty) {
    allQuestions = getQuestionsByDifficulty(category, difficulty);
  } else if (category) {
    const categoryData = questionsDatabase[category];
    allQuestions = [
      ...categoryData.easy,
      ...categoryData.medium,
      ...categoryData.hard
    ];
  } else {
    // Get all questions from all categories
    Object.keys(questionsDatabase).forEach(cat => {
      Object.keys(questionsDatabase[cat]).forEach(diff => {
        allQuestions = [...allQuestions, ...questionsDatabase[cat][diff]];
      });
    });
  }
  
  // Shuffle and return specified count
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getAllCategories = () => {
  return Object.keys(questionsDatabase);
};

export const getDifficulties = () => {
  return ['easy', 'medium', 'hard'];
};

// Export the main database
export default questionsDatabase;