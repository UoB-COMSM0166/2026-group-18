function updateLevel() {
  var previousLevel = level;
  var elapsed = (millis() - gameStartTime) / 1000;
  if (elapsed < 90) {
    level = 1;
  } else if (elapsed < 180) {
    level = 2;
  } else {
    level = 3;
  }
  if (level != previousLevel) {
    enemySpawnTimer = frameCount;
  }
}

function maintainAsteroids() {
  if (crashed) {
    return;
  }
  var target = 5;
  if (level == 2) {
    target = 7;
  } else if (level == 3) {
    target = 9;
  }
  var systemAsteroids = 0;
  for (var i = 0; i < asteroids.length; i++) {
    if (asteroids[i].isSystemSpawn == true) {
      systemAsteroids++;
    }
  }
  if (systemAsteroids < target && frameCount - systemAsteroidSpawnTimer >= 120) {
    asteroids.push(new Asteroid(undefined, undefined, undefined, true));
    systemAsteroidSpawnTimer = frameCount;
  }
}

function drawLevelLabel() {
  push();
  fill(255);
  noStroke();
  textSize(18);
  textAlign(LEFT, TOP);
  text("Level " + level, 20, 20);
  pop();
}

function spawnEnemies() {
  if (level < 2 || crashed) {
    return;
  }
  if (frameCount - enemySpawnTimer < 600) {
    return;
  }
  enemySpawnTimer = frameCount;
  if (level == 2) {
    enemies.push(new Enemy("A"));
  } else if (level == 3 && enemies.length < 3) {
    if (random() < 0.5) {
      enemies.push(new Enemy("A"));
    } else {
      enemies.push(new Enemy("B"));
    }
  }
}
