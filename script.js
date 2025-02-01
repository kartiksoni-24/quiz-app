const apiUrl = "http://localhost:5000/quiz"; // Fetch from backend

let quizData = {}; // Store quiz questions
let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15;

// Get elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");
const progressText = document.getElementById("progress-text");
const timeDisplay = document.getElementById("time");

// Fetch quiz data from API
async function fetchQuizData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch quiz data: ${response.status}`);

    quizData = await response.json();
    console.log("Quiz Data Fetched:", quizData);

    if (!quizData.questions || quizData.questions.length === 0) {
      throw new Error("No questions found.");
    }

    startQuiz();
  } catch (error) {
    questionText.innerText = "Error loading quiz. Try again later.";
    console.error(error);
  }
}

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  // Ensure result box is hidden
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  nextBtn.style.display = "none";

  loadQuestion();
}

// Load the current question
function loadQuestion() {
  clearInterval(timer);

  // Hide "Quiz Completed" message when quiz is running
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  if (currentQuestionIndex >= quizData.questions.length) {
    return showResults();
  }

  const questionData = quizData.questions[currentQuestionIndex];
  questionText.innerText = questionData.description;
  optionsContainer.innerHTML = ""; // Clear previous options

  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option.description;
    button.classList.add("option-btn");
    button.onclick = () => checkAnswer(index, questionData.options);
    optionsContainer.appendChild(button);
  });

  progressText.innerText = `Question ${currentQuestionIndex + 1} of ${
    quizData.questions.length
  }`;
  startTimer();
}

// Handle answer selection
function checkAnswer(selectedIndex, options) {
  clearInterval(timer);
  const buttons = optionsContainer.querySelectorAll("button");

  buttons.forEach((btn, index) => {
    if (options[index].is_correct) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (options[selectedIndex].is_correct) {
    score += parseFloat(quizData.correct_answer_marks);
  }

  nextBtn.style.display = "block";
}

// Start the countdown timer
function startTimer() {
  let timeLeft = timeLimit;
  timeDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(-1, quizData.questions[currentQuestionIndex].options);
    }
  }, 1000);
}

// Show the final score
function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.innerText = `You scored ${score} points!`;
}

// Move to the next question when "Next" is clicked
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  nextBtn.style.display = "none"; // Hide the next button
  loadQuestion();
});

// Restart quiz when "Restart" is clicked
restartBtn.addEventListener("click", fetchQuizData);

// Start quiz on page load
fetchQuizData();
