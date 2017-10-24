const GAMEPLAY_BOX_DIV_HEIGHT = 750;
const GAMEPLAY_BOX_DIV_WIDTH = 1000;
const CIRCLE_DIAMETER = 50;
const NUMBER_OF_CIRCLES = 5;
const START_GAME_DELAY = 500;
const BETWEEN_ROUNDS_DELAY = 2000;

// TODO: possibly deal with these variables in a better way
var circleTimer = {
    circlesClicked: 0,
    start: 0,
    end: 0,
};

var roundInfo = {
    roundNumber: 0
}

document.getElementById("start-game-button").onclick = function() {
    roundInfo.roundNumber++;
    playGame();
}

function playGame() {
    hideStartGameInstructions();
    spawnCirclesAfterDelay();
    circleTimer.start = new Date().getTime();
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
        startGameInstructions[i].style.display = "";
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

function hidePrintedTime() {
    var timeTakenInfo = document.getElementsByClassName("gameplay-box-messages");

    // time taken paragraph is the third element of the class gameplay-box-messages
    timeTakenInfo[2].style.display = "none";
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
    // console.log(scores);
}

function startNextRound() {
    hidePrintedTime();
    showStartGameInstructions();

}

function spawnRandomCircle(circleNumber) {
    var gameplayBoxDiv = document.getElementById("gameplay-box-div");
    console.log("Circle number: " + circleNumber);
    var circle = createCircle(circleNumber);

    circle.onclick = function() {
        circle.style.visibility = "hidden";
        circleTimer.circlesClicked++;
        if ((circleTimer.circlesClicked % NUMBER_OF_CIRCLES) == 0) {
            var timeTaken = calculateAndPrintTime();
            addToAndUpdateScoreArray(timeTaken);
            setTimeout(startNextRound, BETWEEN_ROUNDS_DELAY);
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
    for (var i = roundInfo.roundNumber*NUMBER_OF_CIRCLES - NUMBER_OF_CIRCLES; i < roundInfo.roundNumber*NUMBER_OF_CIRCLES; i++) {
        spawnRandomCircle(i);
    }
}

function spawnCirclesAfterDelay() {
    setTimeout(spawnCircles, START_GAME_DELAY);
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
 * multiplied by how many circles have already spawned so all circles start in the top left.
 */
function setCirclePosition(circle, circleNumber) {
    var x = getRandomXCoordinate();
    var y = getRandomYCoordinate() - (CIRCLE_DIAMETER * circleNumber);
    circle.style.top = y + "px";
    circle.style.left = x + "px";
}
