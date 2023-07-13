/* Constants */
let maxTime = 60;

/* DOM elements */
var startButton = document.querySelector(".startButton");
var viewHighScoresLink = document.querySelector("#view-hs");
var viewCounter = document.querySelector("#view-counter");
var goBackButton = document.querySelector("#go-back");
var clearButton = document.querySelector("#clear-scores");
var questionsContainer = document.querySelector("#questions-container");
var scoresContainer = document.querySelector("#scores-container");
var initialSection = document.querySelector("#quiz-initial-section");
var clearButton = document.querySelector("#clear-scores");
var questionsSection = document.querySelector("#quiz-questions-section");
var highScoresSection = document.querySelector("#high-scores-section");
var counter = document.querySelector("#counter");
var initialsInput = document.querySelector("#initials");
var myScoreSection = document.querySelector("#my-score-container");
var submitButton = document.querySelector("#submit-score");
var resultsText = document.querySelector("#score-results");
var question = document.querySelector("#question");
var options = document.querySelector("#options");
var answerText = document.querySelector("#answer-status");
var resultsList = $("#scores-in-order");

/* Variables */
var secondsLeft = maxTime;
var mySeconds = maxTime;
counter.textContent = secondsLeft;
var playersScore = { score: 0, initials: "" };
var scoresArray = [];
var timerInterval;
var currentQuestion = 0;

/* Questions array */
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["Alerts", "Strings", "Booleans", "Numbers"],
    answer: "Alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    options: ["Parentheses", "Quotes", "Curly brackets", "Square brackets"],
    answer: "Parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store ____.",
    options: [
      "Numbers and strings",
      "Other arrays",
      "Booleans",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    options: ["Quotes", "Commas", "Curly brackets", "Parenthesis"],
    answer: "Quotes",
  },
  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    options: ["Console log", "Javascript", "Terminal / bash", "For loops"],
    answer: "Console log",
  },
];

/* Event listeners */
startButton.addEventListener("click", function (event) {
  initialSection.classList.add("hidden");
  questionsSection.classList.remove("hidden");
  viewCounter.classList.remove("hidden");
  secondsLeft = maxTime;
  currentQuestion = 0;
  displayQuestion(currentQuestion);
  setTime();
});

goBackButton.addEventListener("click", function (event) {
  questionsContainer.classList.remove("hidden");
  questionsSection.classList.add("hidden");
  initialSection.classList.remove("hidden");
  showScoresLink();
  hideHighScores();
});

submitButton.addEventListener("click", function (event) {
  getPlayer();
});

viewHighScoresLink.addEventListener("click", function (event) {
  showHighScores();
});

clearButton.addEventListener("click", function (event) {
  localStorage.clear();
  scoresArray = [];
  renderScores(scoresArray);
});

clearButton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

function displayScore() {
  resultsText.textContent = "Your score time is:  " + mySeconds;
}
function getScores() {
  var scores = JSON.parse(localStorage.getItem("scores"));
  if (scores !== null) {
    scoresArray = scores;
  }
  // TODO: sort scores array by scores
  renderScores(scoresArray);
}
function displayQuestion(currentQuestion) {
  question.innerHTML = "";
  options.innerHTML = "";
  answerText.textContent = "";
  var ulCreate = document.createElement("ul");
  ulCreate.innerHTML = "";

  var userQuestion = questions[currentQuestion].question;
  var userChoices = questions[currentQuestion].options;
  question.textContent = userQuestion;

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    options.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", checkAnswer);
  });
}

function checkAnswer(event) {
  if (event.target.textContent == questions[currentQuestion].answer) {
    answerText.textContent = "CORRECT ✅";
  } else {
    answerText.textContent = "INCORRECT ❌";
    // substract 15 seconds from the clock
    if (secondsLeft > 15) {
      secondsLeft -= 15;
    } else {
      showMyScore();
    }
  }
  setTimeout(function () {
    event.preventDefault();
    console.log("Ready to move to the next question in 1.5 seconds...");
    isGameFinished();
  }, 1500);
}

function isGameFinished() {
  currentQuestion += 1;
  if (currentQuestion >= questions.length - 1) {
    showMyScore();
  } else {
    displayQuestion(currentQuestion);
  }
}

function renderScores(scoresArray) {
  resultsList.children("div").empty();
  for (var i = 0; i < scoresArray.length; i++) {
    var divEle = $("<div>");
    var pElement = $("<p>");
    pElement.text(
      i +
        1 +
        ". " +
        scoresArray[i].initials +
        " ( Score time: " +
        scoresArray[i].score +
        " )"
    );
    divEle.append(pElement);
    resultsList.append(divEle);
  }
}

function saveScore() {
  getScores();
  scoresArray.push(playersScore);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  initialsInput.value = "";
  showHighScores();
  hideMyScore();
}

function getPlayer() {
  var initials = initialsInput.value;
  if (initials) {
    playersScore.initials = initials;
    playersScore.score = mySeconds;
    saveScore();
  } else {
    alert("Invalid initials, please try again!");
  }
}

function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    counter.textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      showMyScore();
    }
  }, 1000);
}

/* HIDE / SHOW functions */
function hideScoresLink() {
  viewHighScoresLink.classList.add("hidden");
}
function showScoresLink() {
  viewHighScoresLink.classList.remove("hidden");
}
function showMyScore() {
  mySeconds = secondsLeft;
  window.clearInterval(timerInterval); // stop timer
  myScoreSection.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
  viewCounter.classList.add("hidden");
  scoresContainer.classList.add("hidden");
  displayScore();
}
function hideMyScore() {
  myScoreSection.classList.add("hidden");
}
function showHighScores() {
  scoresContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
  viewCounter.classList.add("hidden");
  getScores();
  hideScoresLink();
  window.clearInterval(timerInterval); // stop timer
  counter.textContent = maxTime;
}
function hideHighScores() {
  scoresContainer.classList.add("hidden");
  questionsContainer.classList.remove("hidden");
}
