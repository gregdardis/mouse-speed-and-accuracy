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

// TODO: refactor this function to re-use code
function printTimeTakenOnScreen(timeTaken) {
    if (roundInfo.roundNumber == 1) {
        var timeTakenPara = document.createElement("p");
        var timeTakenMessage = document.createTextNode("Time to click all circles: " + timeTaken + " ms.")
        timeTakenPara.appendChild(timeTakenMessage);
        timeTakenPara.className = "gameplay-box-messages";

        var gameplayBoxDiv = document.getElementById("gameplay-box-div");
        gameplayBoxDiv.appendChild(timeTakenPara);
    } else {
        var gameplayMessages = document.getElementsByClassName("gameplay-box-messages");

        // time taken paragraph is the third element of the class gameplay-box-messages
        var timeTakenPara = gameplayMessages[2];
        var timeTakenMessage = document.createTextNode("Time to click all circles: " + timeTaken + " ms.")
        timeTakenPara.replaceChild(timeTakenMessage, timeTakenPara.childNodes[0]);
        timeTakenPara.style.display = "";
    }
}

function hidePrintedTime() {
    var gameplayMessages = document.getElementsByClassName("gameplay-box-messages");

    // time taken paragraph is the third element of the class gameplay-box-messages
    gameplayMessages[2].style.display = "none";
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
    scores.sort();
    var localScoresDiv = document.getElementById("local-scores-div");
    removeAllLocalScores();
    addUpdatedLocalScores(scores, localScoresDiv);
    displayAverage(scores, localScoresDiv);
}

function addUpdatedLocalScores(scores, localScoresDiv) {
    for (var i = 0; i < scores.length; i++) {
        var scorePara = document.createElement("p");
        var score = document.createTextNode((i + 1) + ") " + scores[i] + " ms");
        scorePara.appendChild(score);
        scorePara.setAttribute("class", "local-score");
        localScoresDiv.appendChild(scorePara);
    }
}

function removeAllLocalScores() {
    var localScores = document.getElementsByClassName("local-score");
    while(localScores.length > 0) {
        localScores[0].parentNode.removeChild(localScores[0]);
    }
}

function displayAverage(scores, localScoresDiv) {
    var averagePara = document.createElement("p");
    var averageScore = calculateAverage(scores);
    var average = document.createTextNode("Average: " + averageScore +  " ms");
    averagePara.appendChild(average);
    averagePara.setAttribute("class", "local-score");
    localScoresDiv.appendChild(averagePara);
}

function calculateAverage(scores) {
    var average = 0;
    for (var i = 0; i < scores.length; i++) {
        average += scores[i];
    }
    average /= scores.length;
    return Math.round(average);
}

function startNextRound() {
    hidePrintedTime();
    showStartGameInstructions();
}

function spawnRandomCircle(circleNumber) {
    var gameplayBoxDiv = document.getElementById("gameplay-box-div");
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
