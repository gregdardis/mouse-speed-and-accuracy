const GAMEPLAY_BOX_DIV_HEIGHT = 750;
const GAMEPLAY_BOX_DIV_WIDTH = 1000;
const CIRCLE_DIAMETER = 50;
const NUMBER_OF_CIRCLES = 5;

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
    var startGameInstructions = document.getElementsByClassName("start-game-instructions");
    for (var i = 0; i < startGameInstructions.length; i++) {
        startGameInstructions[i].style.display = "none";
    }
}

function spawnRandomCircle(circleNumber) {
    var gameplayBoxDiv = document.getElementById("gameplay-box-div");
    var circle = document.createElement("div");
    circle.setAttribute("class", "circle");
    setCirclePosition(circle, circleNumber);
    circle.onclick = function() {
        circle.style.visibility = "hidden";
        circleTimer.circlesClicked++;
        if (circleTimer.circlesClicked == NUMBER_OF_CIRCLES) {
            circleTimer.end = new Date().getTime();
            var timeTaken = circleTimer.end - circleTimer.start;
            console.log("Time taken: " + timeTaken + " ms");
        }
    }
    gameplayBoxDiv.appendChild(circle);
}

function spawnCircles() {
    for (var i = 0; i < NUMBER_OF_CIRCLES; i++) {
        spawnRandomCircle(i);
    }
}

function spawnCirclesAfterDelay() {
    setTimeout(spawnCircles, 500);
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
