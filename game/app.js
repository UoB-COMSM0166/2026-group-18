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
// C1: active de-stress pickups
var pickups;
var stars;
var crashed;
let level = 1;
let stress = 0;
let stressTier = 0;
let stressCooldown = 0;
let collisionCooldown = 0;
let enemySpawnTimer = 0;
let gameStartTime;
let systemAsteroidSpawnTimer = 0;
// C1: pickup spawn cadence timer
let pickupSpawnTimer = 0;
let missileCooldown = 0;
let shotgunCooldown = 0;
let mineCooldown = 0;

function resetGame() {
  score = 0;
  crashed = false;
  level = 1;
  resetStressState();
  syncStressGlobals();
  collisionCooldown = 0;
  enemySpawnTimer = frameCount;
  systemAsteroidSpawnTimer = frameCount;
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
  // C1 reset: clear pickups and restart spawn timer
  pickups = [];
  pickupSpawnTimer = frameCount;
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

    let barWidth = 200;
    let barHeight = 20;
    let x = width - barWidth - 20;
    let y = 20;

    noStroke();
    fill(40);
    rect(x,y,barWidth,barHeight);

    fill(getStressUIColorByTier(tierNow));

    let currentWidth = map(stressNow,0,MAX_STRESS,0,barWidth);
    rect(x,y,currentWidth,barHeight);

    fill(220);
    textSize(11);
    textAlign(LEFT, TOP);
    text(getStressUILabelByTier(tierNow), x, y + barHeight + 4);

    pop();
}
