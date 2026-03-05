var started = false;
var gameIsOver = false;

function changeSection(from, to) {
  document.getElementById(from).style.display = "none";
  document.getElementById(to).style.display = "initial";
}

function gameOver() {
  // Ensure telemetry is finalized exactly when the game over screen appears.
  if (typeof telemetryEnd === "function") {
    telemetryEnd();
  }

  document.getElementById("gameOver").style.display = "initial";
  $('#score').text('');
  $('#finalScore').text(score);
  gameIsOver = true;
}

function game() {
  document.getElementById("main").style.display = "none";
  document.getElementById("wrapper").style.display = "none";
  document.getElementById("bg-image").style.display = "none";

  gameStartTime = millis();
  started = true;
}

function returnToMenuFromGameOver() {
  document.getElementById("main").style.display = "initial";
  document.getElementById("wrapper").style.display = "initial";
  document.getElementById("bg-image").style.display = "initial";
  document.getElementById("gameOver").style.display = "none";
  started = false;
  gameIsOver = false;
  background(0);
  resetGame();
}
