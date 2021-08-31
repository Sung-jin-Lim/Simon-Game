// button Colors
var buttonColors = ["red", "green", "blue", "yellow"];
// console.log(buttonColors[1]);

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;
// function that detects when a button is clicked then calls nextsequence

$(document).keydown(function () {
  if (!started) {
    nextSequence();

    started = true;
  }
});

// function nextSequence()
function nextSequence() {
  level++;

  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // corresponding sound sequence for animation
  var AutoAudio = new Audio("sounds/" + randomChosenColor + ".mp3");

  // animation for random sequence
  $("#" + randomChosenColor)
    .fadeOut(50)
    .fadeIn(50);
  AutoAudio.play();
  userClickedPattern = [];
}

// button sounds + Fade Animation
$(".buttons").click(function (event) {
  var clickedColor = event.target.id;

  var audio = new Audio(
    "/Boooss Level Challenge 1/sounds/" + clickedColor + ".mp3"
  );
  audio.play();

  // animation
  $("#" + clickedColor)
    .fadeOut(50)
    .fadeIn(50);

  // answer checker
  userClickedPattern.push(clickedColor);
  checkAnswer(userClickedPattern.lastIndexOf(clickedColor));
});

//

// player sequence checker (really hard!)

function checkAnswer(currentLevel) {
  // Check if the LAST button clicked is right
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    // set a variable to count how many colors the user got right
    var count = 0;
    // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        // if the two values match, count + 1
        count++;
      }
    }
    // ONLY if the count is the same number as gamePattern length,
    // (meaning each one of the colors was right) then it's success
    if (count === gamePattern.length) {
      console.log("success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    // otherwise, it's wrong and trigger Game Over
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("h1").text("Game Over (Press Any Key to Restart)");
    startOver();
  }
}

if ($(h1) == "Game Over (Press Any Key to Restart)") {
  console.log("yes it works");
}

// Reset every variable -------------

function startOver() {
  level = 0;
  gamePattern = [];
  pressed = false;
}
