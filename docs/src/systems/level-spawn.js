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

const LEVEL_TRANSITION_FADE_IN_MS = 320;
const LEVEL_TRANSITION_HOLD_MS = 900;
const LEVEL_TRANSITION_HOLD_HINT = "HOLD SPACE TO CONTINUE";
const LEVEL_TRANSITION_FRAME_COUNT = 16;
const LEVEL_TRANSITION_FRAME_DURATION_MS = 80;
let levelTransitionCard = null;
const levelTransitionFramesCache = {};

const LEVEL_TRANSITION_CONTENT = {
  1: {
    title: "LEVEL 1 BRIEFING",
    enemy: "New Enemy: Asteroids only (no enemy ships yet).",
    weapon: "Weapon Tip: Hold \"UP,DOWN,LEFT,RIGHT\" to move. Auto Laser fires itself. Press Z for Shotgun, V for Ultrasonic.",
    skillImagePath: "assets/level1-skill.gif",
    skillImageHint: "Add image: assets/level1-skill.gif",
    skillImagePathSecondary: "assets/level1-skill-2.gif",
    skillImageHintSecondary: "Add image: assets/level1-skill-2.gif"
  },
  2: {
    title: "LEVEL 2 BRIEFING",
    enemy: "New Enemy: Type A Drone (blue). Fast chaser that fires straight bullets.",
    weapon: "Weapon Tip: Press X to launch a Missile (locks onto asteroids). Keep moving to dodge bullets.",
    skillImagePath: "assets/level2-skill.gif",
    skillImageHint: "Add image: assets/level2-skill.gif"
  },
  3: {
    title: "LEVEL 3 BRIEFING",
    enemy: "New Enemy: Type B Hunter (yellow). Slower but launches homing missiles.",
    weapon: "Weapon Tip: Press C to drop Mines. Lure enemies close, then clear space safely.",
    skillImagePath: "assets/level3-skill.gif",
    skillImageHint: "Add image: assets/level3-skill.gif"
  }
};

function getLevelTransitionContent(targetLevel) {
  return LEVEL_TRANSITION_CONTENT[targetLevel] || {
    title: "LEVEL " + targetLevel + " BRIEFING",
    enemy: "New Enemy: Mixed hostile units incoming.",
    weapon: "Weapon Tip: Rotate weapons by cooldown and keep stress under control.",
    skillImagePath: "",
    skillImageHint: "",
    skillImagePathSecondary: "",
    skillImageHintSecondary: ""
  };
}

function getLevelTransitionFrameSet(basePath) {
  if (!basePath) {
    return null;
  }

  var baseNoExt = basePath.replace(/\.gif$/i, "");

  var cacheItem = levelTransitionFramesCache[baseNoExt];
  if (!cacheItem) {
    cacheItem = {
      frames: [],
      loaded: false,
      loading: true,
      error: false
    };
    levelTransitionFramesCache[baseNoExt] = cacheItem;

    var loadedCount = 0;
    for (var i = 0; i < LEVEL_TRANSITION_FRAME_COUNT; i++) {
      (function(frameIndex) {
        var path = baseNoExt + "-" + ("0" + frameIndex).slice(-2) + ".png";
        loadImage(path, function(img) {
          cacheItem.frames[frameIndex] = img;
          loadedCount++;
          if (loadedCount === LEVEL_TRANSITION_FRAME_COUNT) {
            cacheItem.loaded = true;
            cacheItem.loading = false;
          }
        }, function() {
          cacheItem.error = true;
          cacheItem.loading = false;
        });
      })(i);
    }
  }

  return cacheItem;
}

function triggerLevelTransition(targetLevel) {
  var content = getLevelTransitionContent(targetLevel);
  levelTransitionCard = {
    level: targetLevel,
    startedAt: millis(),
    holdStartedAt: null,
    title: content.title,
    enemy: content.enemy,
    weapon: content.weapon,
    skillImagePath: content.skillImagePath,
    skillImageHint: content.skillImageHint,
    skillImagePathSecondary: content.skillImagePathSecondary,
    skillImageHintSecondary: content.skillImageHintSecondary
  };
}

function isLevelTransitionActive() {
  return !!levelTransitionCard && !crashed;
}

function beginLevelTransitionHold() {
  if (!isLevelTransitionActive()) {
    return false;
  }
  if (levelTransitionCard.holdStartedAt === null) {
    levelTransitionCard.holdStartedAt = millis();
  }
  return true;
}

function cancelLevelTransitionHold() {
  if (levelTransitionCard) {
    levelTransitionCard.holdStartedAt = null;
  }
}

function getLevelTransitionHoldProgress() {
  if (!isLevelTransitionActive() || levelTransitionCard.holdStartedAt === null) {
    return 0;
  }
  var holdElapsed = millis() - levelTransitionCard.holdStartedAt;
  return constrain(holdElapsed / LEVEL_TRANSITION_HOLD_MS, 0, 1);
}

function tryCompleteLevelTransitionByHold() {
  if (!isLevelTransitionActive() || levelTransitionCard.holdStartedAt === null) {
    return false;
  }
  if (millis() - levelTransitionCard.holdStartedAt >= LEVEL_TRANSITION_HOLD_MS) {
    levelTransitionCard = null;
    return true;
  }
  return false;
}

function drawLevelTransitionCard() {
  if (!isLevelTransitionActive()) {
    return;
  }
  if (tryCompleteLevelTransitionByHold()) {
    return;
  }

  var elapsed = millis() - levelTransitionCard.startedAt;
  var alpha = map(min(elapsed, LEVEL_TRANSITION_FADE_IN_MS), 0, LEVEL_TRANSITION_FADE_IN_MS, 0, 215);
  var holdProgress = getLevelTransitionHoldProgress();
  var panelWidth = min(820, width - 60);
  var panelHeight = min(380, height - 60);
  var panelX = (width - panelWidth) / 2;
  var panelY = (height - panelHeight) / 2;
  var bodyWidth = panelWidth - 48;
  var isDualSkillLayout = levelTransitionCard.level === 1;
  var imageBoxSpacing = 16;
  var imageBoxWidth = min(260, isDualSkillLayout ? (panelWidth - 140) / 2 : panelWidth - 120);
  var imageBoxHeight = 120;
  var imageContainerWidth = imageBoxWidth * (isDualSkillLayout ? 2 : 1) + (isDualSkillLayout ? imageBoxSpacing : 0);
  var imageContainerX = panelX + (panelWidth - imageContainerWidth) / 2;
  var imageBoxLeftX = imageContainerX;
  var imageBoxRightX = imageContainerX + imageBoxWidth + imageBoxSpacing;
  var imageBoxY = panelY + 146;
  var frameSet = getLevelTransitionFrameSet(levelTransitionCard.skillImagePath);
  var frameSetSecondary = getLevelTransitionFrameSet(levelTransitionCard.skillImagePathSecondary);

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
  textSize(34);
  text(levelTransitionCard.title, width / 2, panelY + 16);

  textAlign(LEFT, TOP);
  fill(220, 245, 255, min(255, alpha + 40));
  textSize(16);
  text(levelTransitionCard.enemy, panelX + 24, panelY + 82, bodyWidth, 52);

  stroke(80, 220, 255, alpha);
  strokeWeight(1.5);
  fill(12, 24, 30, alpha);
  rect(imageBoxLeftX, imageBoxY, imageBoxWidth, imageBoxHeight, 6);
  if (isDualSkillLayout) {
    rect(imageBoxRightX, imageBoxY, imageBoxWidth, imageBoxHeight, 6);
  }

  if (isDualSkillLayout) {
    if (frameSet && frameSet.loaded && frameSet.frames.length === LEVEL_TRANSITION_FRAME_COUNT) {
      var frameIndex = Math.floor((millis() - levelTransitionCard.startedAt) / LEVEL_TRANSITION_FRAME_DURATION_MS) % LEVEL_TRANSITION_FRAME_COUNT;
      var frameImage = frameSet.frames[frameIndex];
      if (frameImage) {
        imageMode(CENTER);
        image(frameImage, imageBoxLeftX + imageBoxWidth / 2, imageBoxY + imageBoxHeight / 2, imageBoxWidth - 12, imageBoxHeight - 12);
      }
    } else {
      noStroke();
      fill(170, 230, 255, min(255, alpha + 30));
      textAlign(CENTER, CENTER);
      textSize(13);
      text(levelTransitionCard.skillImageHint || "Skill image can be loaded here.", imageBoxLeftX + imageBoxWidth / 2, imageBoxY + imageBoxHeight / 2);
    }

    if (frameSetSecondary && frameSetSecondary.loaded && frameSetSecondary.frames.length === LEVEL_TRANSITION_FRAME_COUNT) {
      var frameIndexSecondary = Math.floor((millis() - levelTransitionCard.startedAt) / LEVEL_TRANSITION_FRAME_DURATION_MS) % LEVEL_TRANSITION_FRAME_COUNT;
      var frameImageSecondary = frameSetSecondary.frames[frameIndexSecondary];
      if (frameImageSecondary) {
        imageMode(CENTER);
        image(frameImageSecondary, imageBoxRightX + imageBoxWidth / 2, imageBoxY + imageBoxHeight / 2, imageBoxWidth - 12, imageBoxHeight - 12);
      }
    } else {
      noStroke();
      fill(170, 230, 255, min(255, alpha + 30));
      textAlign(CENTER, CENTER);
      textSize(13);
      text(levelTransitionCard.skillImageHintSecondary || "Skill image placeholder.", imageBoxRightX + imageBoxWidth / 2, imageBoxY + imageBoxHeight / 2);
    }
  } else {
    if (frameSet && frameSet.loaded && frameSet.frames.length === LEVEL_TRANSITION_FRAME_COUNT) {
      var frameIndex = Math.floor((millis() - levelTransitionCard.startedAt) / LEVEL_TRANSITION_FRAME_DURATION_MS) % LEVEL_TRANSITION_FRAME_COUNT;
      var frameImage = frameSet.frames[frameIndex];
      if (frameImage) {
        imageMode(CENTER);
        image(frameImage, imageBoxLeftX + imageBoxWidth / 2, imageBoxY + imageBoxHeight / 2, imageBoxWidth - 12, imageBoxHeight - 12);
      }
    } else {
      noStroke();
      fill(170, 230, 255, min(255, alpha + 30));
      textAlign(CENTER, CENTER);
      textSize(13);
      text(levelTransitionCard.skillImageHint || "Skill image can be loaded here.", imageBoxLeftX + imageBoxWidth / 2, imageBoxY + imageBoxHeight / 2);
    }
  }

  noStroke();
  textAlign(LEFT, TOP);
  fill(220, 245, 255, min(255, alpha + 40));
  textSize(16);
  text(levelTransitionCard.weapon, panelX + 24, imageBoxY + imageBoxHeight + 16, bodyWidth, 52);

  var holdBarWidth = panelWidth - 120;
  var holdBarHeight = 12;
  var holdBarX = panelX + (panelWidth - holdBarWidth) / 2;
  var holdBarY = panelY + panelHeight - 42;
  noStroke();
  fill(20, 20, 20, alpha);
  rect(holdBarX, holdBarY, holdBarWidth, holdBarHeight, 4);
  fill(80, 220, 255, min(255, alpha + 30));
  rect(holdBarX, holdBarY, holdBarWidth * holdProgress, holdBarHeight, 4);

  textAlign(CENTER, BOTTOM);
  fill(130, 220, 255, min(255, alpha + 20));
  textSize(12);
  text(LEVEL_TRANSITION_HOLD_HINT, width / 2, holdBarY - 6);
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
