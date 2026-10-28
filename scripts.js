"use strict";

// Select page elements
const welcome = document.getElementById("welcome");
const mainContent = document.getElementById("mainContent");
const enterBtn = document.getElementById("enterBtn");
const homeLink = document.getElementById("homeLink");

// ENTER YOUR LITTLE WORLD
enterBtn.addEventListener("click", () => {
  welcome.classList.add("hidden");
  mainContent.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
  makeHearts(8);
});

// Return to the welcome screen
homeLink.addEventListener("click", (event) => {
  event.preventDefault();

  mainContent.classList.add("hidden");
  welcome.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// OPEN THE MAIN LOVE LETTER
const openLetterBtn = document.getElementById("openLetterBtn");
const loveLetter = document.getElementById("loveLetter");

openLetterBtn.addEventListener("click", () => {
  const isHidden = loveLetter.classList.contains("hidden");

  loveLetter.classList.toggle("hidden");
  openLetterBtn.textContent = isHidden
    ? "Close My Letter ♡"
    : "Open My Letter";

  if (isHidden) {
    makeHearts(5);
  }
});

// LOCKED LETTERS
const letterButtons = document.querySelectorAll(".letter-btn[data-letter]");
const openedLetters = new Set();

const letterProgress = document.getElementById("letterProgress");
const finalLetterBtn = document.getElementById("finalLetterBtn");
const finalLetter = document.getElementById("finalLetter");

letterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const letterName = button.dataset.letter;
    const message = document.getElementById(`letter-${letterName}`);

    if (!message) {
      console.error("Letter not found:", letterName);
      return;
    }

    // Open each letter once
    if (!openedLetters.has(letterName)) {
      openedLetters.add(letterName);
      message.classList.remove("hidden");

      button.textContent = "♡ Letter opened";
      button.disabled = true;

      updateLetterProgress();
      makeHearts(3);
    }
  });
});

function updateLetterProgress() {
  const totalOpened = openedLetters.size;

  letterProgress.textContent = `Letters opened: ${totalOpened} / 5`;

  if (totalOpened === 5) {
    finalLetterBtn.disabled = false;
    finalLetterBtn.textContent = "💖 Open Your Final Letter";
    finalLetterBtn.classList.add("unlocked");
    letterProgress.textContent =
      "✨ All five letters opened! Your final surprise is ready.";
  }
}

// THE FINAL LETTER
finalLetterBtn.addEventListener("click", () => {
  if (openedLetters.size !== 5) {
    return;
  }

  const isHidden = finalLetter.classList.contains("hidden");

  finalLetter.classList.toggle("hidden");

  finalLetterBtn.textContent = isHidden
    ? "♡ Close the Final Letter"
    : "💖 Open Your Final Letter";

  if (isHidden) {
    makeHearts(15);
  }
});

// ROMANTIC QUIZ
const questions = [
  {
    question: "What is the main reason I made this website?",
    answers: [
      "To practise coding only",
      "To make you feel special",
      "Because I was bored"
    ],
    correct: 1,
    feedback: "Of course! I wanted to make something special for you. ♡"
  },
  {
    question: "When life feels difficult, what should you remember?",
    answers: [
      "I have to solve everything at once",
      "I should give up on my dreams",
      "One small step is still progress"
    ],
    correct: 2,
    feedback: "Exactly! Take your time, one step at a time. ✨"
  },
  {
    question: "What is this little universe made of?",
    answers: [
      "Care, time, and little pieces of my heart",
      "Only stars and animations",
      "Random words from the internet"
    ],
    correct: 0,
    feedback: "You got it! Every little detail was made with care. 💗"
  }
];

const questionText = document.getElementById("questionText");
const quizCount = document.getElementById("quizCount");
const answersContainer = document.getElementById("answers");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const quizResult = document.getElementById("quizResult");
const quizBox = document.getElementById("quizBox");
const scoreText = document.getElementById("scoreText");
const restartQuizBtn = document.getElementById("restartQuizBtn");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const item = questions[currentQuestion];

  quizCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = item.question;
  answersContainer.replaceChildren();
  quizFeedback.textContent = "";
  nextQuestionBtn.classList.add("hidden");
  answersContainer.classList.remove("hidden");
  questionText.classList.remove("hidden");
  quizCount.classList.remove("hidden");
  answered = false;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) {
    return;
  }

  answered = true;

  const item = questions[currentQuestion];
  const buttons = answersContainer.querySelectorAll(".answer-btn");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === item.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === item.correct) {
    score++;
    quizFeedback.textContent = item.feedback;
    makeHearts(3);
  } else {
    quizFeedback.textContent =
      "Not quite! The highlighted answer is the correct one. ♡";
  }

  nextQuestionBtn.textContent =
    currentQuestion === questions.length - 1
      ? "See my result ♡"
      : "Next question →";

  nextQuestionBtn.classList.remove("hidden");
}

nextQuestionBtn.addEventListener("click", () => {
  if (!answered) {
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showQuizResult();
  }
});

function showQuizResult() {
  answersContainer.classList.add("hidden");
  questionText.classList.add("hidden");
  quizCount.classList.add("hidden");
  nextQuestionBtn.classList.add("hidden");
  quizFeedback.classList.add("hidden");
  quizResult.classList.remove("hidden");

  scoreText.textContent =
    `You got ${score} out of ${questions.length} answers right!`;

  makeHearts(8);
}

restartQuizBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  answered = false;

  quizResult.classList.add("hidden");
  quizFeedback.classList.remove("hidden");

  renderQuestion();
});

renderQuestion();

// SEND A LITTLE LOVE
const heartBtn = document.getElementById("heartBtn");
const heartMessage = document.getElementById("heartMessage");

heartBtn.addEventListener("click", () => {
  heartMessage.textContent =
    "A little love is on its way to you, Badr. ♡";

  makeHearts(18);
});

// FLOATING HEARTS
function makeHearts(amount = 6) {
  const container = document.getElementById("hearts");
  const symbols = ["♡", "♥", "✦", "💕"];

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = `${Math.random() * 94}%`;
    heart.style.fontSize = `${14 + Math.random() * 17}px`;
    heart.style.animationDelay = `${Math.random() * 0.8}s`;
    heart.style.color = i % 2 === 0 ? "#ff9fcb" : "#c4adff";

    container.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    }, { once: true });
  }
}

// CREATE BACKGROUND STARS
const starsContainer = document.getElementById("stars");

for (let i = 0; i < 85; i++) {
  const star = document.createElement("span");

  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.animationDuration = `${2 + Math.random() * 3}s`;

  starsContainer.appendChild(star);
}