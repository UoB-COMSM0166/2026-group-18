// P5 GAME CODE

var ship;
var jet;
var score;
var asteroids;
var laserBeams;
var explosions;
var missiles;
var enemies;
var enemyBullets;
var enemyMissiles;
var shotgunBullets;
var mines;
var ultrasonicWaves;


var pickups;
var stars;
var crashed;
let level = 1;
let stress = 0;
let stressTier = 0;
let stressCooldown = 0;
let stressTierFlashTimer = 0;
let lastStressTierForHud = 0;
let previousStressTierForColor = 0;
let stressTierColorAnimTimer = 0;
const STRESS_TIER_COLOR_ANIM_FRAMES = 18;
const WEAPON_HUD_LAYOUT = {
  x: 18,
  y: 0,
  width: 150,
  height: 28,
  gap: 10,
  bottomMargin: 18,
  labelPadding: 10,
  barHeight: 5
};
const WEAPON_HUD_CONFIG = [
  {
    id: "shotgun",
    label: "Shotgun",
    key: "Z",
    cooldownMs: 15000,
    cooldownRef: function () { return shotgunCooldown; },
    activeCountRef: function () { return Array.isArray(shotgunBullets) ? shotgunBullets.length : 0; },
    limit: 20
  },
  {
    id: "missile",
    label: "Missile",
    key: "X",
    cooldownMs: 5000,
    cooldownRef: function () { return missileCooldown; }
  },
  {
    id: "mine",
    label: "Mine",
    key: "C",
    cooldownMs: 20000,
    cooldownRef: function () { return mineCooldown; },
    activeCountRef: function () { return Array.isArray(mines) ? mines.length : 0; },
    limit: 3
  },
  {
    id: "ultrasonic",
    label: "Ultrasonic",
    key: "V",
    cooldownMs: 30000,
    cooldownRef: function () { return ultrasonicCooldown; }
  }
];
let collisionCooldown = 0;
let enemySpawnTimer = 0;
let gameStartTime;
let systemAsteroidSpawnTimer = 0;

let pickupSpawnTimer = 0;
let missileCooldown = 0;
let shotgunCooldown = 0;
let mineCooldown = 0;
let ultrasonicCooldown = 0;

//set telemetry
let telemetry = null;
let telemetryFinalized = false;
let lastStressSampleAt = 0;
let telemetryPrevState = null;
// Task 5: ship-hit feedback config/state
let hitSfxDurationMs = 1000;
let hitFlashDurationMs = 1500;
let hitFlashHz = 10;

let hitSfxUntilMs = 0;
let hitFlashUntilMs = 0;
let lastShipHitAtMs = 0;
let hitSfx = null;
let hitSfxVolume = 0.8;
let bgm = null;
let bgmVolume = 0.3;
let bgmStarted = false;



function resetGame() {
  telemetryStart();
  score = 0;
  crashed = false;
  level = 1;
  resetStressState();
  syncStressGlobals();
  collisionCooldown = 0;
  const nowSeconds = millis() / 1000;
  enemySpawnTimer = nowSeconds;
  systemAsteroidSpawnTimer = nowSeconds;
  ship = new Ship();
  jet = new Jet(ship.pos);
  asteroids = [];
  laserBeams = [];
  explosions = [];
  missiles = [];
  enemies = [];
  enemyBullets = [];
  enemyMissiles = [];
  shotgunBullets = [];
  mines = [];
  ultrasonicWaves = [];

  pickups = [];
  pickupSpawnTimer = frameCount;
  stressTierFlashTimer = 0;
  lastStressTierForHud = getStressTierNow();
  previousStressTierForColor = lastStressTierForHud;
  stressTierColorAnimTimer = 0;
  missileCooldown = 0;
  shotgunCooldown = 0;
  mineCooldown = 0;
  ultrasonicCooldown = 0;
  hitSfxUntilMs = 0;
  hitFlashUntilMs = 0;
  lastShipHitAtMs = 0;

  for (var i = 0; i < 5; i++) {
  	asteroids.push(new Asteroid(undefined, undefined, undefined, true));
  }
  stars = new Stars();
}

function triggerShipHitFeedback() {
  const now = millis();

  if (now >= hitSfxUntilMs) {
    playHitSfx();
  }

  lastShipHitAtMs = now;
  hitSfxUntilMs = now + hitSfxDurationMs;
  hitFlashUntilMs = now + hitFlashDurationMs;
}


function isShipHitFlashActive() {
  return millis() < hitFlashUntilMs;
}

function initHitSfx() {
  if (hitSfx) return;
  hitSfx = new Audio("assets/audio/hit-explosion.wav");
  hitSfx.preload = "auto";
  hitSfx.volume = hitSfxVolume;
  hitSfx.load();
}

function playHitSfx() {
  initHitSfx();

  if (!hitSfx || hitSfx.readyState < 2) {
    return;
  }

  try {
    hitSfx.currentTime = 0;
    hitSfx.play();
  } catch (err) {
    // Ignore autoplay/runtime play errors silently.
  }
}

function initBgm() {
  if (bgm) return;
  bgm = new Audio("assets/audio/bgm-loop.mp3");
  bgm.preload = "auto";
  bgm.loop = true;
  bgm.volume = bgmVolume;
  bgm.load();
}

function startBgm() {
  initBgm();
  if (!bgm || bgmStarted) return;
  try {
    bgm.currentTime = 0;
    bgm.play();
    bgmStarted = true;
  } catch (err) {
    // Ignore autoplay/runtime play errors silently.
  }
}

function stopBgm() {
  if (!bgm) return;
  try {
    bgm.pause();
    bgm.currentTime = 0;
  } catch (err) {
    // Ignore runtime errors silently.
  }
  bgmStarted = false;
}



function setup() {
  var canvas = createCanvas(900, 600);
  canvas.parent('game');
  resetGame();
  initHitSfx();
  initBgm();
}

function draw() {
  if (started) {
    if (!bgmStarted && !crashed) {
      startBgm();
    }
    telemetrySampleStress();
    runGameFrame();
    telemetryAutoCount();
    if (crashed){
      telemetryEnd(); //gameover
    }
  }
}

function drawStressBar(){

    push();
    const stressNow = getStressValue();
    const tierNow = typeof getStressTierNow === "function" ? getStressTierNow() : getStressTier(stressNow);
    const integrityNow = MAX_STRESS - stressNow;
    const integrityRatio = constrain(integrityNow / MAX_STRESS, 0, 1);

    if (tierNow !== lastStressTierForHud) {
      stressTierFlashTimer = 24;
      previousStressTierForColor = lastStressTierForHud;
      stressTierColorAnimTimer = STRESS_TIER_COLOR_ANIM_FRAMES;
      lastStressTierForHud = tierNow;
    }

    let barWidth = 200;
    let barHeight = 20;
    let x = width - barWidth - 20;
    let y = 20;


    noStroke();
    fill(40);
    rect(x, y, barWidth, barHeight);


    const fullColor = color(0, 255, 110);
    const midColor = color(255, 210, 0);
    const lowColor = color(255, 70, 70);
    let targetColor;

    if (integrityRatio > 0.6) {
      const t = map(integrityRatio, 0.6, 1, 0, 1);
      targetColor = lerpColor(midColor, fullColor, constrain(t, 0, 1));
    } else {
      const t = map(integrityRatio, 0, 0.6, 0, 1);
      targetColor = lerpColor(lowColor, midColor, constrain(t, 0, 1));
    }

    let barColor = targetColor;
    if (stressTierColorAnimTimer > 0) {
      const previousIntegrityRatio = constrain((MAX_STRESS - (previousStressTierForColor === 0 ? 20 : previousStressTierForColor === 1 ? 57.5 : 87.5)) / MAX_STRESS, 0, 1);
      let previousColor;
      if (previousIntegrityRatio > 0.6) {
        const t = map(previousIntegrityRatio, 0.6, 1, 0, 1);
        previousColor = lerpColor(midColor, fullColor, constrain(t, 0, 1));
      } else {
        const t = map(previousIntegrityRatio, 0, 0.6, 0, 1);
        previousColor = lerpColor(lowColor, midColor, constrain(t, 0, 1));
      }
      const t = 1 - (stressTierColorAnimTimer / STRESS_TIER_COLOR_ANIM_FRAMES);
      barColor = lerpColor(previousColor, targetColor, constrain(t, 0, 1));
      stressTierColorAnimTimer--;
    }

    fill(barColor);
    let currentWidth = map(integrityNow, 0, MAX_STRESS, 0, barWidth);
    rect(x, y, currentWidth, barHeight);


    noFill();
    strokeWeight(2);
    if (stressTierFlashTimer > 0) {
      stroke(frameCount % 6 < 3 ? color(255, 255, 255) : color(80, 220, 255));
      stressTierFlashTimer--;
    } else {
      stroke(120);
    }
    rect(x, y, barWidth, barHeight);

    fill(220);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);

    text("Stress " + Math.round(stressNow) + " / " + MAX_STRESS, x, y + barHeight + 6);

    var handlingText = "normal";
    if (tierNow === 1) {
      handlingText = "reduced";
    } else if (tierNow >= 2) {
      handlingText = "critical";
    }
    text("Handling: " + handlingText, x, y + barHeight + 20);

    text("Tip: collect cyan pickups to recover stress", x, y + barHeight + 34);

    pop();
}

function getWeaponHudConfig(weaponId) {
  for (var i = 0; i < WEAPON_HUD_CONFIG.length; i++) {
    if (WEAPON_HUD_CONFIG[i].id === weaponId) {
      return WEAPON_HUD_CONFIG[i];
    }
  }
  return null;
}

function getWeaponCooldownRemainingMs(weaponId) {
  var config = getWeaponHudConfig(weaponId);
  if (!config) {
    return 0;
  }

  var lastUsedAt = typeof config.cooldownRef === "function" ? config.cooldownRef() : 0;
  if (!lastUsedAt) {
    return 0;
  }

  return Math.max(0, config.cooldownMs - (millis() - lastUsedAt));
}

function isWeaponReadyFromCooldown(weaponId) {
  return getWeaponCooldownRemainingMs(weaponId) <= 0;
}

function getWeaponHudState(config) {
  var unlocked = typeof isWeaponUnlocked === "function" ? isWeaponUnlocked(config.id) : true;
  var activeCount = typeof config.activeCountRef === "function" ? config.activeCountRef() : 0;
  var hasLimit = typeof config.limit === "number";
  var limitReached = hasLimit && activeCount >= config.limit;
  var remainingMs = getWeaponCooldownRemainingMs(config.id);
  var coolingDown = remainingMs > 0;
  var progress = config.cooldownMs > 0 ? constrain(1 - (remainingMs / config.cooldownMs), 0, 1) : 1;
  var status = "READY";
  var detail = "Ready";

  if (!unlocked) {
    status = "LOCKED";
    detail = "L" + getWeaponUnlockLevel(config.id);
    progress = 0;
  } else if (limitReached) {
    status = "LIMIT";
    detail = activeCount + "/" + config.limit;
  } else if (coolingDown) {
    status = "COOLING";
    detail = (remainingMs / 1000).toFixed(1) + "s";
  } else if (hasLimit) {
    detail = activeCount + "/" + config.limit;
  }

  return {
    status: status,
    detail: detail,
    progress: progress
  };
}

function getWeaponHudColors(status) {
  if (status === "READY") {
    return {
      accent: color(60, 220, 130),
      text: color(220, 245, 228),
      background: color(10, 22, 18, 205)
    };
  }
  if (status === "COOLING") {
    return {
      accent: color(255, 190, 70),
      text: color(255, 239, 198),
      background: color(28, 22, 10, 205)
    };
  }
  if (status === "LIMIT") {
    return {
      accent: color(255, 120, 90),
      text: color(255, 225, 215),
      background: color(32, 16, 14, 205)
    };
  }
  return {
    accent: color(120, 140, 160),
    text: color(208, 216, 225),
    background: color(18, 22, 28, 205)
  };
}

function drawWeaponHud() {
  var layout = WEAPON_HUD_LAYOUT;
  var rowY = height - layout.bottomMargin - layout.height;

  push();
  textAlign(LEFT, TOP);

  for (var i = 0; i < WEAPON_HUD_CONFIG.length; i++) {
    var config = WEAPON_HUD_CONFIG[i];
    var state = getWeaponHudState(config);
    var colors = getWeaponHudColors(state.status);
    var x = layout.x + (i * (layout.width + layout.gap));

    noStroke();
    fill(colors.background);
    rect(x, rowY, layout.width, layout.height, 7);

    fill(colors.accent);
    rect(x, rowY + layout.height - layout.barHeight, layout.width * state.progress, layout.barHeight, 0, 0, 7, 7);

    fill(18, 24, 32, 230);
    rect(x + 6, rowY + 5, 18, 18, 5);
    fill(colors.accent);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(config.key, x + 15, rowY + 14);

    textAlign(LEFT, TOP);
    fill(240);
    textSize(11);
    text(config.label, x + 30, rowY + 4);

    fill(colors.text);
    textSize(9);
    text(state.status + " " + state.detail, x + 30, rowY + 16);
  }

  pop();
}

function newTelemetryRun() {
  return {
    survivalTime: 0,
    collisionCount: 0,
    stressOverTime: [],
    pickupCount: 0,
    shotsFired: 0,
    enemyHitsTaken: 0,
    score: 0,
    difficulty: level,
    startedAt: new Date().toISOString()
  };
}

function snapshotTelemetryState() {
  return {
    laserBeams: Array.isArray(laserBeams) ? laserBeams.length : 0,
    missiles: Array.isArray(missiles) ? missiles.length : 0,
    shotgunBullets: Array.isArray(shotgunBullets) ? shotgunBullets.length : 0,
    mines: Array.isArray(mines) ? mines.length : 0,
    pickups: Array.isArray(pickups) ? pickups.length : 0,
    collisionCooldown: typeof collisionCooldown === "number" ? collisionCooldown : 0,
    stress: typeof getStressValue === "function" ? getStressValue() : stress
  };
}

function telemetryStart() {
  telemetry = newTelemetryRun();
  telemetryFinalized = false;
  gameStartTime = millis();
  lastStressSampleAt = gameStartTime;
  telemetryPrevState = snapshotTelemetryState();
}

function telemetrySampleStress() {
  if (!telemetry || crashed) return;
  const now = millis();
  if (now - lastStressSampleAt >= 500) {
    telemetry.stressOverTime.push({
      t: Number(((now - gameStartTime) / 1000).toFixed(2)),
      stress: getStressValue()
    });
    lastStressSampleAt = now;
  }
}

//autocount
function telemetryAutoCount() {
  if (!telemetry || telemetryFinalized) return;

  if (!telemetryPrevState) {
    telemetryPrevState = snapshotTelemetryState();
    return;
  }

  const curr = snapshotTelemetryState();

  telemetry.shotsFired +=
    Math.max(0, curr.laserBeams - telemetryPrevState.laserBeams) +
    Math.max(0, curr.missiles - telemetryPrevState.missiles) +
    Math.max(0, curr.shotgunBullets - telemetryPrevState.shotgunBullets) +
    Math.max(0, curr.mines - telemetryPrevState.mines);

  const pickupDrop = telemetryPrevState.pickups - curr.pickups;
  const stressDrop = telemetryPrevState.stress - curr.stress;
  if (pickupDrop > 0 && stressDrop > 0.5) {
    telemetry.pickupCount += pickupDrop;
  }

  const collisionEdge =
    telemetryPrevState.collisionCooldown <= 0 && curr.collisionCooldown > 0;
  if (collisionEdge) telemetry.collisionCount++;

  const stressRise = curr.stress - telemetryPrevState.stress;
  if (!collisionEdge && stressRise > 2) {
    telemetry.enemyHitsTaken += 1;
  }

  telemetryPrevState = curr;
}

function telemetryEnd() {
  if (!telemetry || telemetryFinalized) return;
  stopBgm();

  telemetry.survivalTime = Number(((millis() - gameStartTime) / 1000).toFixed(2));
  telemetry.score = score;
  telemetry.difficulty = level;
  telemetry.endedAt = new Date().toISOString();
  telemetryFinalized = true;

  console.log("Telemetry Summary:", telemetry);
  console.log("Telemetry JSON:\n" + JSON.stringify(telemetry, null, 2));
  window.lastTelemetry = telemetry;

  //output
  const panel = document.getElementById("gameOver");
  if (panel) {
    let pre = document.getElementById("telemetryOutput");
    if (!pre) {
      pre = document.createElement("pre");
      pre.id = "telemetryOutput";
      panel.appendChild(pre);
    }

    pre.style.whiteSpace = "pre-wrap";
    pre.style.overflow = "auto";
    pre.style.position = "fixed";
    pre.style.left = "20px";
    pre.style.bottom = "20px";
    pre.style.width = "520px";
    pre.style.maxHeight = "320px";
    pre.style.padding = "14px";
    pre.style.textAlign = "left";
    pre.style.fontSize = "18px";
    pre.style.lineHeight = "1.4";
    pre.style.color = "#b9fff0";
    pre.style.background = "rgba(0, 0, 0, 0.7)";
    pre.style.border = "1px solid rgba(185, 255, 240, 0.5)";
    pre.style.zIndex = "999";

    const preview = {
      survivalTime: telemetry.survivalTime,
      collisionCount: telemetry.collisionCount,
      pickupCount: telemetry.pickupCount,
      shotsFired: telemetry.shotsFired,
      enemyHitsTaken: telemetry.enemyHitsTaken,
      stressSamples: telemetry.stressOverTime.length,
      score: telemetry.score,
      difficulty: telemetry.difficulty
    };
    pre.textContent = JSON.stringify(preview, null, 2);
  }
}

function downloadTelemetry() {
  if (!telemetry) return;
  telemetry.score = score;
  telemetry.difficulty = level;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `telemetry_${stamp}_score${telemetry.score}_diff${telemetry.difficulty}.json`;
  const blob = new Blob([JSON.stringify(telemetry, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function recordCollision() { if (telemetry) telemetry.collisionCount++; }
function recordPickup() { if (telemetry) telemetry.pickupCount++; }
function recordShot() { if (telemetry) telemetry.shotsFired++; }
function recordEnemyHit() { if (telemetry) telemetry.enemyHitsTaken++; }

//use T to download
window.addEventListener("keydown", function (e) {
  if (e.key === "t" || e.key === "T") {
    downloadTelemetry();
  }
});
