/* Constants */
let maxTime = 20;

/* DOM elements */
var startButton = document.querySelector(".startButton");
var viewHighScoresLink = document.querySelector("#view-hs");
var viewCounter = document.querySelector("#view-counter");
var goBackButton = document.querySelector("#go-back");
var questionsContainer = document.querySelector("#questions-container");
var scoresContainer = document.querySelector("#scores-container");
var initialSection = document.querySelector("#quiz-initial-section");
var questionsSection = document.querySelector("#quiz-questions-section");
var highScoresSection = document.querySelector("#high-scores-section");
var counter = document.querySelector("#counter");
var initialsInput = document.querySelector("#initials");
var myScoreSection = document.querySelector("#my-score-container");
var submitButton = document.querySelector("#submit-score");
var resultsText = document.querySelector("#score-results");
var resultsList = $("#scores-in-order");

/* Variables */
var secondsLeft = maxTime;
var playersScore = { score: 0, initials: "" };
var scoresArray = [];

/* Questions array */
var questions = [
  {
    question: "hello",
    options: [1, 2, 3],
    answer: 1,
  },
  {
    question: "hello 2",
    options: [1, 2, 3],
    answer: 3,
  },
];

startButton.addEventListener("click", function (event) {
  initialSection.classList.add("hidden");
  questionsSection.classList.remove("hidden");
  viewCounter.classList.remove("hidden");
  secondsLeft = maxTime;
  setTime();
});

goBackButton.addEventListener("click", function (event) {
  questionsContainer.classList.remove("hidden");
  questionsSection.classList.add("hidden");
  initialSection.classList.remove("hidden");
  showScoresLink();
});

/* SCORES functions */
viewHighScoresLink.addEventListener("click", function (event) {
  showHighScores();
});

function displayScore() {
  resultsText.textContent = "Your score is:  " + playersScore.score;
}
function showHighScores() {
  scoresContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
  viewCounter.classList.add("hidden");
  getScores();
  hideScoresLink();
}
function getScores() {
  var scores = JSON.parse(localStorage.getItem("scores"));
  console.log(scores);
  if (scores !== null) {
    scoresArray = scores;
  }
  // TODO: sort scores array by scores
  renderScores(scoresArray);
}

function renderScores(scoresArray) {
  resultsList.children("div").empty();
  for (var i = 0; i < scoresArray.length; i++) {
    var divEle = $("<div>");
    var pElement = $("<p>");
    pElement.text(
      i + 1 + ". " + scoresArray[i].initials + " - " + scoresArray[i].score
    );
    divEle.append(pElement);
    resultsList.append(divEle);
  }
}

function saveScore() {
  getScores();
  scoresArray.push(playersScore);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  showHighScores();
}
function showMyScore() {
  myScoreSection.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
  viewCounter.classList.add("hidden");
  scoresContainer.classList.add("hidden");
  displayScore();
}

/* SAVE functions*/
submitButton.addEventListener("click", function (event) {
  getPlayer();
});

function getPlayer() {
  var initials = initialsInput.value;
  if (initials) {
    playersScore.initials = initials;
    playersScore.score = secondsLeft;
    saveScore();
  } else {
    alert("Invalid initials, please try again!");
  }
}

/* TIME functions */
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    counter.textContent = secondsLeft;
    if (secondsLeft === 0) {
      alert("GAME OVER");
      clearInterval(timerInterval);
      showMyScore();
    }
  }, 1000);
}
/* HIDE / SHOW SECTIONS*/
function hideScoresLink() {
  viewHighScoresLink.classList.add("hidden");
}
function showScoresLink() {
  viewHighScoresLink.classList.remove("hidden");
}
// todo: create function for each
