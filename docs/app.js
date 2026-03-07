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
  for (var i = 0; i < 5; i++) {
  	asteroids.push(new Asteroid(undefined, undefined, undefined, true));
  }
  stars = new Stars();
}

function setup() {
  var canvas = createCanvas(900, 600);
  canvas.parent('game');
  resetGame();
}

function draw() {
  if (started) {
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


    const tierColors = [
      color(140, 140, 140),
      color(255, 210, 0),
      color(255, 70, 70)
    ];
    const fromColor = tierColors[Math.max(0, Math.min(2, previousStressTierForColor))];
    const toColor = tierColors[Math.max(0, Math.min(2, tierNow))];

    let barColor = toColor;
    if (stressTierColorAnimTimer > 0) {
      const t = 1 - (stressTierColorAnimTimer / STRESS_TIER_COLOR_ANIM_FRAMES);
      barColor = lerpColor(fromColor, toColor, constrain(t, 0, 1));
      stressTierColorAnimTimer--;
    }

    fill(barColor);
    let currentWidth = map(stressNow, 0, MAX_STRESS, 0, barWidth);
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

    var tierLabel = tierNow === 1 ? "MED" : getStressUILabelByTier(tierNow);
    text("Tier " + (tierNow + 1) + " - " + tierLabel, x, y + barHeight + 6);

    var handlingText = "normal";
    if (tierNow === 1) {
      handlingText = "reduced";
    } else if (tierNow >= 2) {
      handlingText = "heavily reduced";
    }
    text("Handling: " + handlingText, x, y + barHeight + 20);

    text("Tip: collect cyan pickups to recover stress", x, y + barHeight + 34);

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
