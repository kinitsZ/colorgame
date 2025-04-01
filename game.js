var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started = false;

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function nextSequence(){
    userClickedPattern=[]; //reset user pattern every level
    level++;
    $("h1").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for(let i=0; i<gamePattern.length; i++){
        setTimeout(function(){
            $(`#${gamePattern[i]}`).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        },1000*i);
    }
    
};

$(".btn").click(function() { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length)
});

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

$(document).keypress(function (e) { 
    if(!started){
        level=0;
        gamePattern=[];
        $("h1").text(`Level ${level}`);

        nextSequence();
        started = true;
    }
});


function checkAnswer(currentLevel){

    var correctSoFar = true;

    for(let i=0; i<currentLevel; i++){        
        if(userClickedPattern[i]!=gamePattern[i]){
            correctSoFar=false;
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            started=false;
            break;
        }
    }
    if(userClickedPattern.length===gamePattern.length){
        if(correctSoFar){
            console.log("success");
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    
}