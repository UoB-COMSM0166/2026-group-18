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
    enemySpawnTimer = millis() / 1000;
  }
}

function maintainAsteroids() {
  var nowSeconds = millis() / 1000;
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
  if (systemAsteroids < target && nowSeconds - systemAsteroidSpawnTimer >= 2) {
    asteroids.push(new Asteroid(undefined, undefined, undefined, true));
    systemAsteroidSpawnTimer = nowSeconds;
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
  var nowSeconds = millis() / 1000;
  if (level < 2 || crashed) {
    return;
  }
  if (nowSeconds - enemySpawnTimer < 10) {
    return;
  }
  enemySpawnTimer = nowSeconds;
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
