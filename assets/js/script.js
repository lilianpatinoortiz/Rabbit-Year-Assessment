// questions
// options
// correct answers

// scores

// use data attributes

// when button clicked --
// set class hide to the initial screen
// set time to MAX and start timer
// set class to display to questions

// when questions finished --
// stop timer, save the time
// save the score
// ask for name to the user
// submit foorm

var startButton = document.querySelector(".startButton");
var viewHighScoresLink = document.querySelector("#view-hs");
var goBackButton = document.querySelector("#go-back");

var questionsContainer = document.querySelector("#questions-container");
var scoresContainer = document.querySelector("#scores-container");

var initialSection = document.querySelector("#quiz-initial-section");
var questionsSection = document.querySelector("#quiz-questions-section");
var highScoresSection = document.querySelector("#high-scores-section");

startButton.addEventListener("click", function (event) {
  initialSection.classList.add("hidden");
  questionsSection.classList.remove("hidden");
});

viewHighScoresLink.addEventListener("click", function (event) {
  scoresContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
});

goBackButton.addEventListener("click", function (event) {
  questionsContainer.classList.remove("hidden");
  scoresContainer.classList.add("hidden");
});
