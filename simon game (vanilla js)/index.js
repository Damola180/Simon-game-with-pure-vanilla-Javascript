var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// for loop to store each button clicked/

for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var userChosenColour = this.getAttribute("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatepress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
}

// new variable called level/
var level = 0;

// detecting of sound with keyboard press/

document.addEventListener("keypress", function () {
  document.querySelector("#level-title").innerHTML = "Level " + level + "";
  nextSequence();
});

// next Sequence/
function nextSequence() {
  userClickedPattern = [];
  var changingLevel = level++;
  document.querySelector("#level-title").innerHTML =
    "Level " + changingLevel + "";

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  document.querySelector("#" + randomChosenColour + "");

  // fade Effect/
  var fadeTarget = document.querySelector("#" + randomChosenColour + "");
  fadeTarget.style.opacity = "0.2";

  setTimeout(function () {
    fadeTarget.style.opacity = "1";
  }, 200);

  playSound(randomChosenColour);
}
// play sound/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatepress(currentColour) {
  var activeButton = document.querySelector("." + currentColour);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}

// Check answer function/
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    document.querySelector("h1").innerHTML =
      "GAME OVER, Press any key to restart";
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
