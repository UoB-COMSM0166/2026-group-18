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

function resetGame() {
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
    runGameFrame();
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
