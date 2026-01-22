
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("#start-btn").click(function () {
  // Start game same like keypress
  if (!started) {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = true;
    nextSequence();
  }
});

$(".btn").click(function() {
if (started) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Start to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  flashBackground(randomChosenColour);

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
  flashBackground(currentColor);

}

function playSound(name) {
  var audio = new Audio("." + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$("#stop-btn").click(function () {
  // Reset everything
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Stopped. Press Start");
});

function flashBackground(colour) {
  $("body").removeClass("flash-red flash-green flash-blue flash-yellow");

  $("body").addClass("flash-" + colour);

  setTimeout(function () {
    $("body").removeClass("flash-" + colour);
  }, 160);
}
