const GAMEPLAY_BOX_DIV_HEIGHT = 750;
const GAMEPLAY_BOX_DIV_WIDTH = 1000;
const CIRCLE_DIAMETER = 50;
const NUMBER_OF_CIRCLES = 5;
const START_GAME_DELAY = 500;

// TODO: possibly deal with these variables in a better way
var circleTimer = {
    circlesClicked: 0,
    start: 0,
    end: 0,
};

document.getElementById("start-game-button").onclick = function() {
    playGame();
}

function hideStartGameInstructions() {
    var startGameInstructions = document.getElementsByClassName("start-game-messages");
    for (var i = 0; i < startGameInstructions.length; i++) {
        startGameInstructions[i].style.display = "none";
    }
}

function showStartGameInstructions() {
    var startGameInstructions = document.getElementsByClassName("start-game-messages");
    for (var i = 0; i < startGameInstructions.length; i++) {
        startGameInstructions[i].style.display = "block";
    }
}

function printTimeTakenOnScreen(timeTaken) {
    var timeTakenPara = document.createElement("p");
    var timeTakenMessage = document.createTextNode("Time to click all circles: " + timeTaken + " ms.")
    timeTakenPara.appendChild(timeTakenMessage);
    timeTakenPara.className = "gameplay-box-messages";

    var gameplayBoxDiv = document.getElementById("gameplay-box-div");
    gameplayBoxDiv.appendChild(timeTakenPara);
}

function calculateAndPrintTime() {
    circleTimer.end = new Date().getTime();
    var timeTaken = circleTimer.end - circleTimer.start;
    printTimeTakenOnScreen(timeTaken);
    return timeTaken;
}

function addToAndUpdateScoreArray(timeTaken) {
    // creates an Array 'scores' if it doesn't already exist
    scores = (typeof scores != "undefined" && scores instanceof Array ) ? scores : [];

    scores.push(timeTaken);
    console.log(scores);
}

function spawnRandomCircle(circleNumber) {
    var gameplayBoxDiv = document.getElementById("gameplay-box-div");
    var circle = createCircle(circleNumber);

    circle.onclick = function() {
        circle.style.visibility = "hidden";
        circleTimer.circlesClicked++;
        if (circleTimer.circlesClicked == NUMBER_OF_CIRCLES) {
            var timeTaken = calculateAndPrintTime();
            addToAndUpdateScoreArray(timeTaken);
            showStartGameInstructions();
        }
    }

    gameplayBoxDiv.appendChild(circle);
}

function createCircle(circleNumber) {
    var circle = document.createElement("div");
    circle.setAttribute("class", "circle");
    setCirclePosition(circle, circleNumber);
    return circle;
}

function spawnCircles() {
    for (var i = 0; i < NUMBER_OF_CIRCLES; i++) {
        spawnRandomCircle(i);
    }
}

function spawnCirclesAfterDelay() {
    setTimeout(spawnCircles, START_GAME_DELAY);
}

function playGame() {
    hideStartGameInstructions();
    spawnCirclesAfterDelay();
    circleTimer.start = new Date().getTime();
}

/*
 * Returns a random number between 0 and (GAMEPLAY_BOX_DIV_HEIGHT - CIRCLE_DIAMETER) to be used as relative positioning
 * Y coordinate for a circle within gameplay-box-div
 */
function getRandomYCoordinate() {
    return Math.floor(Math.random() * (GAMEPLAY_BOX_DIV_HEIGHT - CIRCLE_DIAMETER + 1));
}

/*
 * Returns a random number between 0 and (GAMEPLAY_BOX_DIV_WIDTH - CIRCLE_DIAMETER) to be used as relative positioning
 * X coordinate for a circle within gameplay-box-div.
 */
function getRandomXCoordinate() {
    return Math.floor(Math.random() * (GAMEPLAY_BOX_DIV_WIDTH - CIRCLE_DIAMETER + 1));
}

/*
 * Gives the circle a random position within the gameplay-box-div.
 * Since this is compared to it's starting position, have to subtract circle diameter
 * so all circles start in the top left.
 */
function setCirclePosition(circle, circleNumber) {
    var x = getRandomXCoordinate();
    var y = getRandomYCoordinate() - (CIRCLE_DIAMETER * circleNumber);
    circle.style.top = y + "px";
    circle.style.left = x + "px";
}
