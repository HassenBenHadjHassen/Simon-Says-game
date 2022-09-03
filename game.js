//Warning

if (innerWidth < 1028) {
    alert("This game is Not Made For Mobile Users, Please use a computer Instead!");
}


//Variables

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;

//Logic

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound("sounds/" + userChosenColour + ".mp3");
    animatePress(userChosenColour);
    checkAnswers(userClickedPattern.length-1);
})

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

//Functions

function nextSequence() {
    level++
    $("#level-title").text("Level " + level);
    randomNumber = Math.random();
    randomNumber*=4;
    randomNumber = Math.floor(randomNumber);

    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("sounds/" + randomChosenColour + ".mp3");
}


function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswers(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("Wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}