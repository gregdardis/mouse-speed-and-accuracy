const GAMEPLAY_BOX_DIV_HEIGHT = 750;
const GAMEPLAY_BOX_DIV_WIDTH = 1000;
const CIRCLE_DIAMETER = 50;

document.getElementById("start-game-button").onclick = function() {
    playGame();
}

function hideStartGameInstructions() {
    var startGameInstructions = document.getElementsByClassName("start-game-instructions");
    for (var i = 0; i < startGameInstructions.length; i++) {
        startGameInstructions[i].style.display = "none";
    }
}

function spawnRandomCircle() {
    var gameplayBoxDiv = document.getElementById("gameplay-box-div");
    var circle = document.createElement("div");
    circle.setAttribute("id", "circle");
    setCirclePosition(circle);
    gameplayBoxDiv.appendChild(circle);
}

function playGame() {
    hideStartGameInstructions();
    spawnRandomCircle();
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

/* Gives the circle a random position within the gameplay-box-div */
function setCirclePosition(circle) {
    var x = getRandomXCoordinate();
    var y = getRandomYCoordinate();
    circle.style.top = y + "px";
    circle.style.left = x + "px";
}
