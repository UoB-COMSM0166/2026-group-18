const WEAPON_UNLOCK_REQUIREMENTS = {
  shotgun: 1,
  missile: 2,
  mine: 3,
  ultrasonic: 1
};

function getWeaponUnlockLevel(weaponId) {
  return WEAPON_UNLOCK_REQUIREMENTS[weaponId];
}

function isWeaponUnlocked(weaponId, currentLevel) {
  var levelToCheck = typeof currentLevel === "number" ? currentLevel : level;
  var requiredLevel = getWeaponUnlockLevel(weaponId);
  if (typeof requiredLevel !== "number") {
    return true;
  }
  return levelToCheck >= requiredLevel;
}

function getUnlockedWeapons(currentLevel) {
  var levelToCheck = typeof currentLevel === "number" ? currentLevel : level;
  var unlocked = [];
  for (var weaponId in WEAPON_UNLOCK_REQUIREMENTS) {
    if (Object.prototype.hasOwnProperty.call(WEAPON_UNLOCK_REQUIREMENTS, weaponId) &&
      isWeaponUnlocked(weaponId, levelToCheck)) {
      unlocked.push(weaponId);
    }
  }
  return unlocked;
}

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
