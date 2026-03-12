const WEAPON_UNLOCK_REQUIREMENTS = {
  shotgun: 1,
  missile: 2,
  mine: 3,
  ultrasonic: 1
};
const LEVEL_SCORE_THRESHOLDS = {
  2: 300000,
  3: 700000
};

const LEVEL_TRANSITION_DURATION_MS = 4200;
const LEVEL_TRANSITION_FADE_MS = 320;
let levelTransitionCard = null;

const LEVEL_TRANSITION_CONTENT = {
  1: {
    title: "LEVEL 1 BRIEFING",
    enemy: "New Enemy: Asteroids only (no enemy ships yet).",
    weapon: "Weapon Tip: Hold UP to boost. Auto Laser fires itself. Press Z for Shotgun, V for Ultrasonic."
  },
  2: {
    title: "LEVEL 2 BRIEFING",
    enemy: "New Enemy: Type A Drone (blue). Fast chaser that fires straight bullets.",
    weapon: "Weapon Tip: Press X to launch a Missile (locks onto asteroids). Keep moving to dodge bullets."
  },
  3: {
    title: "LEVEL 3 BRIEFING",
    enemy: "New Enemy: Type B Hunter (yellow). Slower but launches homing missiles.",
    weapon: "Weapon Tip: Press C to drop Mines. Lure enemies close, then clear space safely."
  }
};

function getLevelTransitionContent(targetLevel) {
  return LEVEL_TRANSITION_CONTENT[targetLevel] || {
    title: "LEVEL " + targetLevel + " BRIEFING",
    enemy: "New Enemy: Mixed hostile units incoming.",
    weapon: "Weapon Tip: Rotate weapons by cooldown and keep stress under control."
  };
}

function triggerLevelTransition(targetLevel) {
  var content = getLevelTransitionContent(targetLevel);
  levelTransitionCard = {
    level: targetLevel,
    startedAt: millis(),
    title: content.title,
    enemy: content.enemy,
    weapon: content.weapon
  };
}

function isLevelTransitionActive() {
  if (!levelTransitionCard || crashed) {
    return false;
  }
  if (millis() - levelTransitionCard.startedAt >= LEVEL_TRANSITION_DURATION_MS) {
    levelTransitionCard = null;
    return false;
  }
  return true;
}

function drawLevelTransitionCard() {
  if (!isLevelTransitionActive()) {
    return;
  }

  var elapsed = millis() - levelTransitionCard.startedAt;

  var alpha = 215;
  if (elapsed < LEVEL_TRANSITION_FADE_MS) {
    alpha = map(elapsed, 0, LEVEL_TRANSITION_FADE_MS, 0, 215);
  } else if (elapsed > LEVEL_TRANSITION_DURATION_MS - LEVEL_TRANSITION_FADE_MS) {
    alpha = map(LEVEL_TRANSITION_DURATION_MS - elapsed, 0, LEVEL_TRANSITION_FADE_MS, 0, 215);
  }

  var panelWidth = min(760, width - 120);
  var panelHeight = 170;
  var panelX = (width - panelWidth) / 2;
  var panelY = 72;

  push();
  noStroke();
  fill(0, 0, 0, alpha);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  stroke(80, 220, 255, alpha);
  strokeWeight(2);
  noFill();
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  noStroke();
  textAlign(CENTER, TOP);
  fill(255, 80, 80, min(255, alpha + 20));
  textSize(28);
  text(levelTransitionCard.title, width / 2, panelY + 14);

  textAlign(LEFT, TOP);
  fill(220, 245, 255, 255);
  textSize(14);
  text(levelTransitionCard.enemy, panelX + 24, panelY + 66, panelWidth - 48, 46);
  text(levelTransitionCard.weapon, panelX + 24, panelY + 112, panelWidth - 48, 52);
  pop();
}

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
  if (score >= LEVEL_SCORE_THRESHOLDS[3]) {
    level = 3;
  } else if (score >= LEVEL_SCORE_THRESHOLDS[2]) {
    level = 2;
  } else {
    level = 1;
  }
  if (level != previousLevel) {
    enemySpawnTimer = millis() / 1000;
    triggerLevelTransition(level);
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
