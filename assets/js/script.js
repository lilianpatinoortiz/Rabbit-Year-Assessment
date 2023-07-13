/*************  Constants */
let maxTime = 60;

/*************   DOM elements */
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

/*************  Variables */
var secondsLeft = maxTime;
var mySeconds = maxTime;
var playersScore = { score: 0, initials: "" };
var scoresArray = [];
var timerInterval;
var currentQuestion = 0;
counter.textContent = secondsLeft;

/*************   Questions array */
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["Alerts", "Strings", "Booleans", "Numbers"],
    answer: "Alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed with ____.",
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

/*************   Event listeners */

// Initial screen: start button will hide the other sections and will start displaying the questions. This function also starts the timer.
startButton.addEventListener("click", function (event) {
  showQuestionsSection();
  secondsLeft = maxTime;
  currentQuestion = 0;
  displayQuestion(currentQuestion);
  setTime();
});

// High scores screen: the go back button - when high scores are shown - makes sure we go back to the inicial screen. We also show the scores link again.
goBackButton.addEventListener("click", function (event) {
  showInitialSection();
  showScoresLink();
  hideHighScores();
});

// My score screen: the submit button is responsible of calling a function that will get the users data
submitButton.addEventListener("click", function (event) {
  getPlayer();
});

// Initial screen: this function calls the function responsible of showing the high scores screen
viewHighScoresLink.addEventListener("click", function (event) {
  showHighScores();
});

// High scores screen: clear button will clear the local storage data, and display the empty scores again
clearButton.addEventListener("click", function (event) {
  localStorage.clear();
  scoresArray = [];
  renderScores(scoresArray);
});
clearButton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

/*************  FUNCTIONS */

// My score screen: Display score in the screen
function displayScore() {
  resultsText.textContent = "Your score time is:  " + mySeconds;
}

// Initial Screen: Get scores from the local storage and calls render function
function getScores() {
  var scores = JSON.parse(localStorage.getItem("scores"));
  if (scores !== null) {
    scoresArray = scores;
  }
  // TODO: sort scores array by scores
  renderScores(scoresArray);
}

// Questions screen: Display the current question and its options, in new created elements appended to the dom one by one
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
    // for each answer, add the event listener to see if it was clicked - if so - we check if the answer is correct
    listItem.addEventListener("click", checkAnswer);
  });
}

// Questions screen: Check if the selected answer is correct or not, and display it,
function checkAnswer(event) {
  if (event.target.textContent == questions[currentQuestion].answer) {
    answerText.textContent = "CORRECT ✅";
  } else {
    answerText.textContent = "INCORRECT ❌";
    if (secondsLeft > 15) {
      secondsLeft -= 15;
    } else {
      showMyScore();
    }
  }
  // We give 1.5 second for the user to see the result of their choice selected before moving to the next question
  setTimeout(function () {
    event.preventDefault();
    console.log("Ready to move to the next question in 1.5 seconds...");
    isGameFinished();
  }, 1500);
}

// Questions screen: we check if the game should be finished or not. If finished we display the score, if not we go to the next question.
function isGameFinished() {
  currentQuestion += 1;
  if (currentQuestion >= questions.length - 1) {
    showMyScore();
  } else {
    displayQuestion(currentQuestion);
  }
}

// High scores screen: we render the top scores, creating an element for each and appending it to the div
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

// High scores screen: When the user has clicked on the submit button to save their data, we save the new scores array in the local storage
function saveScore() {
  getScores();
  scoresArray.push(playersScore);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  initialsInput.value = "";
  showHighScores();
  hideMyScore();
}

// High scores screen: We get the users score and their input for the initials. If not provided we show an alert.
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

// Questions screen: Here we initialize the timer whenever the user started the quiz, every second we substract one so it can be displayed in the screen
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

/************* HIDE / SHOW functions */

// hide the high scores link
function hideScoresLink() {
  viewHighScoresLink.classList.add("hidden");
}

// show the high scores link
function showScoresLink() {
  viewHighScoresLink.classList.remove("hidden");
}

//show my score screen
function showMyScore() {
  mySeconds = secondsLeft;
  window.clearInterval(timerInterval); // stop timer
  myScoreSection.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
  viewCounter.classList.add("hidden");
  scoresContainer.classList.add("hidden");
  displayScore();
}

// hide my score screen
function hideMyScore() {
  myScoreSection.classList.add("hidden");
}

// show high scores screen
function showHighScores() {
  scoresContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
  viewCounter.classList.add("hidden");
  getScores();
  hideScoresLink();
  window.clearInterval(timerInterval); // stop timer
  counter.textContent = maxTime;
}

// hide high scores screen
function hideHighScores() {
  scoresContainer.classList.add("hidden");
  questionsContainer.classList.remove("hidden");
}

// show questions section
function showQuestionsSection() {
  initialSection.classList.add("hidden");
  questionsSection.classList.remove("hidden");
  viewCounter.classList.remove("hidden");
  secondsLeft = maxTime;
}

// show initial section
function showInitialSection() {
  questionsContainer.classList.remove("hidden");
  questionsSection.classList.add("hidden");
  initialSection.classList.remove("hidden");
}
