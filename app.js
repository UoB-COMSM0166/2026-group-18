var started = false;
var gameIsOver = false;
// NAVIGATION WITH KEYS

var currentPos = 0; //pos 0-start, 1-controls etc..
var mainPage = true; // says if view is on the main page
var pages = ["main", "controls", "about"];
var anchorLinks = $('a');
$(window).keydown(function(e){
  if (!started){
		switch(e.which){
			case 40:
        if (mainPage){
          if (currentPos<2){
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos+=1;
            anchorLinks.eq(currentPos).addClass('flash');
          } else {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos = 0;
            anchorLinks.eq(currentPos).addClass('flash');
          }
          break;
        }  
			case 38:
        if (mainPage){
          if (currentPos>0){
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos-=1;
            anchorLinks.eq(currentPos).addClass('flash');
          } else {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos = 2;
            anchorLinks.eq(currentPos).addClass('flash');
          }
          break;
        }  
      case 13:
      case 32:
        if (mainPage){
          if (currentPos == 0) {
            game();
          } else if (currentPos == 1) {
            changeSection('main', pages[currentPos]);
            mainPage = false;
          } else if (currentPos == 2) {
            changeSection('main', pages[currentPos]);
            mainPage = false;
          }
        } else {
          changeSection(pages[currentPos], 'main');
          mainPage = true;
        }  
		}
  } else if (gameIsOver) {
    document.getElementById("main").style.display = "initial";
    document.getElementById("wrapper").style.display = "initial";
    document.getElementById("bg-image").style.display = "initial";
    document.getElementById("gameOver").style.display = "none";
    started = false;
    gameIsOver = false;
    background(0);
    resetGame();
  }
});



function changeSection(from, to) {
  document.getElementById(from).style.display = "none";
  document.getElementById(to).style.display = "initial";
}


function gameOver() {
  document.getElementById("gameOver").style.display = "initial";
  $('#score').text('');
  $('#finalScore').text(score);
  gameIsOver = true;

}

function game(){
    document.getElementById("main").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("bg-image").style.display = "none";
    
    gameStartTime = millis();
    started = true;
}


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
var crashed;
let level = 1;
let stress = 0;
let stressTier = 0;
let stressCooldown = 0;
let collisionCooldown = 0;
let enemySpawnTimer = 0;
let gameStartTime;
let systemAsteroidSpawnTimer = 0;
const STRESS_CONFIG = {
  maxStress: 100,
  // Exactly 3 tiers via 2 thresholds: [tier0 upper bound, tier1 upper bound]
  tiers: [40, 75],
  decayPerFrame: 0.03,
  cooldownFrames: 120,
  collisionDeltaAsteroid: 20,
  collisionDeltaEnemyBullet: 12
};
const HANDLING_BY_TIER = [
  { rotationMult: 1.0 },
  { rotationMult: 0.8 },
  { rotationMult: 0.6 }
];
const STRESS_UI = {
  tierColors: [
    [0, 255, 0],
    [255, 200, 0],
    [255, 0, 0]
  ],
  tierLabels: ["CALM", "TENSE", "PANIC"]
};
const MAX_STRESS = STRESS_CONFIG.maxStress;

const stressState = {
  value: 0,
  tier: 0,
  cooldownRemaining: 0
};

// Stress API: keep stress logic centralized while legacy globals still work.
function resetStressState() {
  stressState.value = 0;
  stressState.cooldownRemaining = 0;
  stressState.tier = getStressTier(0);
}

function getStressTier(stressValue) {
  const tiers = STRESS_CONFIG.tiers;
  if (stressValue < tiers[0]) return 0;
  if (stressValue < tiers[1]) return 1;
  return 2;
}

function clampTierIndex(tier) {
  return Math.max(0, Math.min(2, Math.floor(tier)));
}

function getHandlingParamsByStress(stressValue) {
  const tier = getStressTier(stressValue);
  return HANDLING_BY_TIER[clampTierIndex(tier)];
}

function getStressUIColorByTier(tier) {
  const rgb = STRESS_UI.tierColors[clampTierIndex(tier)];
  return color(rgb[0], rgb[1], rgb[2]);
}

function getStressUILabelByTier(tier) {
  return STRESS_UI.tierLabels[clampTierIndex(tier)];
}

function addStress(amount, cause) {
  // `cause` is reserved for future telemetry/collision migration.
  stressState.value = constrain(stressState.value + amount, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = STRESS_CONFIG.cooldownFrames;
  stressState.tier = getStressTier(stressState.value);
  // Ensure legacy globals reflect API-driven writes in the same frame.
  syncStressGlobals();
  return cause;
}

function getStressValue() {
  return stressState.value;
}

function getStressTierNow() {
  return stressState.tier;
}

function syncStressStateFromGlobals() {
  stressState.value = constrain(stress, 0, STRESS_CONFIG.maxStress);
  stressState.cooldownRemaining = Math.max(0, stressCooldown);
  stressState.tier = getStressTier(stressState.value);
}

function syncStressGlobals() {
  stress = stressState.value;
  stressTier = stressState.tier;
  stressCooldown = stressState.cooldownRemaining;
}

function updateStressState(dtSeconds) {
  // Backward-compat bridge: ingest any legacy `stress += ...` writes first.
  syncStressStateFromGlobals();

  var seconds = typeof dtSeconds === "number" ? dtSeconds : (1 / 60);
  var frames = seconds * 60;
  if (stressState.cooldownRemaining > 0) {
    stressState.cooldownRemaining -= frames;
  } else {
    stressState.value -= STRESS_CONFIG.decayPerFrame * frames;
  }

  stressState.cooldownRemaining = Math.max(0, stressState.cooldownRemaining);
  stressState.value = constrain(stressState.value, 0, STRESS_CONFIG.maxStress);
  stressState.tier = getStressTier(stressState.value);

  // Keep legacy globals in sync so old call sites continue to work.
  syncStressGlobals();
}

function updateStress(dtSeconds) {
  // Thin wrapper kept for existing call sites.
  updateStressState(dtSeconds);
}

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
  if(started){
    if (collisionCooldown > 0) {
      collisionCooldown--;
    }
    background(0, 160);
    updateLevel();
    maintainAsteroids();
    spawnEnemies();
    // stars.show();
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].update();
      asteroids[i].show();
      if (!crashed && collisionCooldown === 0 && ship.hit(asteroids[i])) {
        if (stress >= MAX_STRESS) {
          crashed = true;
          explosions.push(new Explosion(true, ship.pos));
        } else {
          addStress(STRESS_CONFIG.collisionDeltaAsteroid, "asteroidCollision");
        }
        collisionCooldown = 60;   // about 1 second of invulnerability
      }
    }
    for (var j = 0; j < laserBeams.length; j++) {
      laserBeams[j].update();
      laserBeams[j].show();
      var flag = false;
      for (var i = asteroids.length-1; i >-1; i--) {
        if(laserBeams[j].hit(asteroids[i])) {
          score += asteroids[i].r * 100;
          explosions.push(new Explosion(true, asteroids[i].pos));
          asteroids[i].break();
          asteroids.splice(i,1);
          laserBeams.splice(j,1);
          j--;
          flag = true;
          break;
        }
      }
      if (flag == false) {
        for (var m = enemies.length - 1; m > -1; m--) {
          if (laserBeams[j] && laserBeams[j].hit(enemies[m])) {
            score += enemies[m].type == "A" ? 400 : 700;
            explosions.push(new Explosion(true, enemies[m].pos));
            enemies.splice(m,1);
            laserBeams.splice(j,1);
            j--;
            flag = true;
            break;
          }
        }
      }
      if (flag == false && laserBeams[j].edges()) {
        laserBeams.splice(j,1);
        j--;
      }
    }
    for (var k = 0; k < explosions.length; k++) {
      explosions[k].update();
      explosions[k].show();
      if (explosions[k].particles.length == 0) {
        explosions.splice(k, 1);
        k--;
      }
    }
    for (var l = 0; l< missiles.length; l++) {
      missiles[l].getTarget();
      missiles[l].update();
      missiles[l].show();
      if (missiles[l].gotToCenter) {
        explosions.push(new Explosion(true, asteroids[missiles[l].targetIndex].pos, true));
        score += asteroids[missiles[l].targetIndex].r * 100;
        asteroids[missiles[l].targetIndex].break();
        asteroids.splice(missiles[l].targetIndex,1);
        missiles.splice(l,1);
        l--;

      }
    }
    for (var e = enemies.length - 1; e > -1; e--) {
      enemies[e].update();
      enemies[e].show();
      enemies[e].shoot();
    }
    for (var b = enemyBullets.length - 1; b > -1; b--) {
      enemyBullets[b].update();
      enemyBullets[b].show();
      if (!crashed && collisionCooldown === 0 && enemyBullets[b].hitShip()) {
        addStress(STRESS_CONFIG.collisionDeltaEnemyBullet, "enemyBullet");
        collisionCooldown = 15;
        enemyBullets.splice(b,1);
      } else if (enemyBullets[b] && enemyBullets[b].edges()) {
        enemyBullets.splice(b,1);
      }
    }
    for (var n = enemyMissiles.length - 1; n > -1; n--) {
      enemyMissiles[n].update();
      enemyMissiles[n].show();
      if (enemyMissiles[n].dead) {
        enemyMissiles.splice(n,1);
      } else if (enemyMissiles[n].hitShip()) {
        explosions.push(new Explosion(true, enemyMissiles[n].pos, true));
        enemyMissiles.splice(n,1);
        if (!crashed) {
          crashed = true;
          explosions.push(new Explosion(true, ship.pos));
        }
      } else if (enemyMissiles[n] && enemyMissiles[n].edges()) {
        enemyMissiles.splice(n,1);
      }
    }
    jet.update();
    jet.show();
    ship.update();
    ship.show();
    drawLevelLabel();
    $('#score').text(score + " | L" + level);
    if(started){
      const dt = (typeof deltaTime === "number" ? deltaTime : (1000 / 60)) / 1000;
      updateStress(dt);
      drawStressBar();
    }
    if (explosions.length == 0 && crashed &&
       missiles.length == 0 && laserBeams.length == 0 &&
       enemyMissiles.length == 0){
      gameOver();
    }
  }
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

function Stars (pos) {
  this.stars = [];
  this.starsSz = [];
  
  for (var i = 0 ; i < 500; i++) {
  	this.stars.push(new p5.Vector(Math.floor(random(0, width)),Math.floor(random(0, height))));
    this.starsSz.push(random(2,4));
  }
  
  this.show = function () {
  	for (var i = 0 ; i< this.stars.length; i++) {
    	fill(80, 80, 100, 255);
      if (random() < 0.0002) {
      	ellipse(this.stars[i].x, this.stars[i].y, this.starsSz[i]+4);
      } else {
      	ellipse(this.stars[i].x, this.stars[i].y, this.starsSz[i]);
      }	
    }
  }
}


function Missile(pos, heading) {
	this.pos = pos.copy();
  this.heading = heading;
  this.targetFound = false;
  this.targetIndex = NaN;
  this.vel =  p5.Vector.fromAngle(ship.heading).mult(25);
  this.strength =0.8;
  this.gravityConstant = 300;
  this.gotToCenter = false;
  this.crosshairVisibility = 1;
  this.getTarget = function() {
  	if (this.targetFound == false) {
      var smallestDif = 40000;
      for (var i = 0; i < asteroids.length; i++) {
        
        //trzeba poprawic, problem z przypadkiem gdy statek ma np 359* a asteroida 5* (roznica daje 354, a powinna 6)
        push();
				translate(ship.pos.x, ship.pos.y);
        var a = atan2( asteroids[i].pos.y- ship.pos.y, asteroids[i].pos.x- ship.pos.x);
        var deg = (Math.floor(ship.heading * 180 / PI) + 360) % 360;
        var dega =(Math.floor(a * 180 / PI) + 360) % 360;
        pop();
        var difference  = Math.abs(deg  - dega);
        if (difference < smallestDif) {
        	smallestDif = difference;
          this.targetIndex = i;
        }
      }
      this.targetFound = true;
    }
  }
  
  this.update = function() {
  	if (this.targetFound && !this.gotToCenter) {
      var dir = p5.Vector.sub(asteroids[this.targetIndex].pos, this.pos);
      dir.setMag(this.strength);
			this.vel.add(dir);
      this.vel.mult(0.94);
      this.pos.add(this.vel);
      if (this.pos.dist(asteroids[this.targetIndex].pos) < asteroids[this.targetIndex].r * 0.5) {
        this.gotToCenter = true;
      }
    }
  }
  
  this.show = function () {
  	if (this.targetFound) {
      push();
      fill(250,20,20)
    	ellipse(this.pos.x, this.pos.y, 10);
			
      if (frameCount % 20 == 0) {
      	this.crosshairVisibility *= -1;
      }
      if (this.crosshairVisibility ==1) {
        noFill();
      	stroke(255,0,0, 120);
      	strokeWeight(3)
      	var ax = asteroids[this.targetIndex].pos.x;
      	var ay = asteroids[this.targetIndex].pos.y;
      	ellipse(ax, ay, 50);
      	ellipse(ax, ay, 30);
      	push();
      	translate(ax,ay);
      	rotate(asteroids[this.targetIndex].heading);
      	line(0, 0-30, 0, 0 + 30);
        line(0-30, 0, 0 + 30, 0);
      	pop();
        pop();
      }
      
			
    }
  }
}

function Explosion(explosion, pos, missile) {
  this.pos = pos.copy();
  if (explosion){
  	this.particles = [];
    if (missile) {
    	this.particlesNumber = 200;
      this.col = [Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255))];
    } else if (this.pos.x == ship.pos.x && this.pos.y == ship.pos.y) {
      this.particlesNumber = 300;
      this.col = [170, 1, 20];
    } else {
    	this.particlesNumber = 100;
      this.col = [255, 255, 255];
    }
    for (var i = 0; i < this.particlesNumber; i++) {
      this.particles.push(new Explosion(false, this.pos.copy(), missile));
    }
  } else {
    this.vel = p5.Vector.random2D().mult(random(-15,15));
    this.lifespan = random(150, 220);
    this.sz = Math.floor(random(4,8));
  }

	this.update = function() {
  	for (var i = 0; i < this.particles.length; i++) {
    	this.particles[i].pos.add(this.particles[i].vel);
      this.particles[i].lifespan -=25;
      if (this.particles[i].lifespan < 0) {
      	this.particles.splice(i, 1);
        i--;
      }
    }
  }
  	
  this.show = function () {
    
    push()
  		for (var i = 0; i < this.particles.length; i++) {
      	if (random()<0.2) {
          if (!missile && !crashed) {
          	fill(this.col);
          } else {
          	fill(Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255)));
          }
      	} else {
          	fill(this.col[0], this.col[1], this.col[2], this.particles[i].lifespan)
      	}
    		ellipse(this.particles[i].pos.x, this.particles[i].pos.y, this.particles[i].sz)
    	}
    pop();
  }
}
function Laser(pos, heading) {
	this.pos = pos.copy();
  this.heading = heading;
  this.vel = p5.Vector.fromAngle(this.heading).mult(8);
  this.rocket =
  this.update = function() {
    this.pos.add(this.vel);
  }
  this.show = function() {
    push();
    strokeWeight(4);
    stroke(255,20,20,255);
    point(this.pos.x, this.pos.y);
    pop();
  }
  this.hit = function(asteroid) {
  	if (this.pos.dist(asteroid.pos) < asteroid.r) {
    	return true;
    }
  }
  this.edges = function() {
  	if (this.pos.x > width ||
        this.pos.x < 0 ||
        this.pos.y > height ||
        this.pos.y < 0) {
    	return true;
    } else {
    	return false;
    }
  }
}
function Asteroid(r, pos, vel, systemSpawn) {
  this.isSystemSpawn = systemSpawn || false;
  this.col = [Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255))];
  if (pos) {
    this.pos = pos.copy();
    this.r = r;
    this.vel = vel;
  } else {
    if (random()>0.5){
      if(random()>0.5){
        this.pos = createVector(-100, random(height));
      } else {
        this.pos = createVector(width + 100, random(height));
      }  
    } else {
      if(random()>0.5){
        this.pos = createVector(random(width), -100);
      } else {
        this.pos = createVector(random(width), height + 100);
      }  
    }
    this.r = Math.floor(random(40,90));
    this.vel = p5.Vector.random2D().mult(Math.floor(random(1,2)));
  }
  
  this.rotation = random(-PI/30, PI/30);
  this.heading = 0;
  this.total = [];
  this.pts = Math.floor(random(5,20));
  for (var i = 0; i < this.pts; i++){
  	this.total.push(Math.floor(random(this.r / 8,this.r / 2)));
  }
  
  this.show = function() {
    push();
    fill(0);
    if (!gameIsOver){
      stroke(255);
    } else {
      stroke(this.col[0],this.col[1],this.col[2], 180)
      if (frameCount % 40 == 0) {
        this.col = [Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255))];
      } 
    }
    
    strokeWeight(3)
    beginShape();
    
  	for (var i = 0; i < this.pts; i++) {
    	var angle = map(i, 0, this.pts, 0, TWO_PI);
      var x = (this.r-this.total[i])*cos(this.heading+angle);
      var y = (this.r-this.total[i])*sin(this.heading+angle);
      vertex(this.pos.x + x, this.pos.y + y)
    }
    endShape(CLOSE);
    pop();
  }
  this.update = function() {
  	this.pos.add(this.vel);
    this.heading += this.rotation;
    this.edges();
  }
  
  this.break = function() {
    var newR = Math.floor(this.r / 2);
    var newPos = this.pos;
    var newVelOne = this.vel.copy();
    var newVelTwo = this.vel.copy();
    newVelOne.rotate(PI/4)
    newVelTwo.rotate(-PI/4)
    if (newR > 10) {
      asteroids.push(new Asteroid(newR, newPos, newVelOne, false));
      asteroids.push(new Asteroid(newR, newPos, newVelTwo, false));
    }
  }
  this.edges = function () {
  	if (this.pos.x>width+this.r) {
    	this.pos.x = 0-this.r;
    } else if (this.pos.x<0-this.r) {
    	this.pos.x = width+this.r;
    } else if (this.pos.y<0-this.r) {
    	this.pos.y = height+this.r;
    } else if (this.pos.y>height+this.r) {
    	this.pos.y = 0-this.r;
    }
  }
}

function getEnemySpawnPos() {
  if (random() < 0.5) {
    if (random() < 0.5) {
      return createVector(-30, random(height));
    } else {
      return createVector(width + 30, random(height));
    }
  } else {
    if (random() < 0.5) {
      return createVector(random(width), -30);
    } else {
      return createVector(random(width), height + 30);
    }
  }
}

function Enemy(type) {
  this.type = type;
  this.pos = getEnemySpawnPos();
  this.heading = 0;
  this.r = this.type == "A" ? 18 : 22;
  var speed = this.type == "A" ? 1.8 : 1.2;
  this.vel = p5.Vector.sub(ship.pos, this.pos).setMag(speed);
  this.shootCooldown = this.type == "A" ? 80 : 150;

  this.update = function() {
    var targetVel = p5.Vector.sub(ship.pos, this.pos);
    targetVel.setMag(this.type == "A" ? 1.8 : 1.2);
    this.vel.lerp(targetVel, this.type == "A" ? 0.06 : 0.03);
    this.pos.add(this.vel);
    this.heading = this.vel.heading();
    this.edges();
    if (this.shootCooldown > 0) {
      this.shootCooldown--;
    }
  }

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    strokeWeight(2.5);
    if (this.type == "A") {
      fill(40, 120, 255);
      stroke(130, 190, 255);
    } else {
      fill(250, 220, 40);
      stroke(255, 240, 140);
    }
    triangle(0, -this.r, -this.r * 0.7, this.r, this.r * 0.7, this.r);
    pop();
  }

  this.shoot = function() {
    if (crashed || this.shootCooldown > 0) {
      return;
    }
    if (this.type == "A") {
      enemyBullets.push(new EnemyBullet(this.pos, ship.pos));
      this.shootCooldown = Math.floor(random(70, 110));
    } else {
      enemyMissiles.push(new EnemyMissile(this.pos));
      this.shootCooldown = Math.floor(random(140, 200));
    }
  }

  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = 0 - this.r;
    } else if (this.pos.x < 0 - this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.y < 0 - this.r) {
      this.pos.y = height + this.r;
    } else if (this.pos.y > height + this.r) {
      this.pos.y = 0 - this.r;
    }
  }
}

function EnemyBullet(pos, target) {
  this.pos = pos.copy();
  this.r = 4;
  this.vel = p5.Vector.sub(target, this.pos);
  this.vel.setMag(5.2);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.show = function() {
    push();
    noStroke();
    fill(70, 170, 255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }

  this.hitShip = function() {
    return this.pos.dist(ship.pos) < ship.r + this.r;
  }

  this.edges = function() {
    return this.pos.x > width + this.r ||
      this.pos.x < -this.r ||
      this.pos.y > height + this.r ||
      this.pos.y < -this.r;
  }
}

function EnemyMissile(pos) {
  this.pos = pos.copy();
  this.r = 8;
  this.maxSpeed = 4;
  this.vel = p5.Vector.sub(ship.pos, this.pos);
  this.vel.setMag(2);
  this.spawnTime = millis();
  this.lifeTime = 10000;
  this.dead = false;

  this.update = function() {
    if (millis() - this.spawnTime > this.lifeTime) {
      this.dead = true;
      return;
    }
    var desired = p5.Vector.sub(ship.pos, this.pos);
    desired.setMag(this.maxSpeed);
    this.vel.lerp(desired, 0.04);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
  }

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + PI / 2);
    stroke(255, 220, 60);
    fill(255, 185, 40);
    triangle(0, -this.r, -this.r * 0.6, this.r, this.r * 0.6, this.r);
    pop();
  }

  this.hitShip = function() {
    return this.pos.dist(ship.pos) < ship.r + this.r;
  }

  this.edges = function() {
    return this.pos.x > width + 30 ||
      this.pos.x < -30 ||
      this.pos.y > height + 30 ||
      this.pos.y < -30;
  }
}
function Jet(){
	this.pos = ship.pos.copy();
  this.vel = createVector(0,0);
  this.particles = [];
  this.lifespan = 255;
  this.adding = false;
  
  this.set = function() {
    	if (this.adding && !crashed) {
      	this.particles.unshift(new Jet())
        this.particles.unshift(new Jet())
      } 	  
  }
  this.update = function() {
    this.set();
  	for (var i = this.particles.length-1; i>-1; i--) {
    	if (this.particles[i].lifespan <=0) {
      	this.particles.splice(i,1);
      } else {
        this.particles[i].lifespan -=15;
        var force = p5.Vector.fromAngle(ship.heading + PI + random(-1,1)).mult(0.9);
        this.particles[i].vel.add(force);
        this.particles[i].pos.add(this.particles[i].vel);
      }
    }
  }
  this.show = function() {
    push();
  	for (var i =0; i < this.particles.length; i++) {
    	fill(255,250,255,this.particles[i].lifespan);
      noStroke();
      ellipse(this.particles[i].pos.x, this.particles[i].pos.y, 4)
    }
    pop();
  }
  
}
function Ship() {
	this.pos = createVector(width/2, height/2);
  this.r = 10;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosting = false;
  this.laserLife = 255;
  this.boosting = function(b) {
  	this.isBoosting = b;
  }
  
  this.update = function() {
    if (frameCount % 10 == 0) {
    	this.laserLife += 10; 
			this.laserLife = constrain(this.laserLife, 0, 255)
    }
  	this.turn();
    this.edges();
    if (this.isBoosting) {
    	this.boost();
    }
    this.vel.mult(0.99);
    this.pos.add(this.vel);
  }
  
  this.show = function () {
    if (!crashed){
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading);
      fill(170, 1, 20, 255 - this.laserLife);
      strokeWeight(3);
      stroke(170, 1, 20, 220);
      triangle(0,-this.r, 0, this.r , this.r*2,  0);
      pop();
    }
  }
  
  this.edges = function () {
  	if (this.pos.x>width+this.r) {
    	this.pos.x = 0-this.r;
    } else if (this.pos.x<0-this.r) {
    	this.pos.x = width+this.r;
    } else if (this.pos.y<0-this.r) {
    	this.pos.y = height+this.r;
    } else if (this.pos.y>height+this.r) {
    	this.pos.y = 0-this.r;
    }
  }
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading).mult(0.1);
  	this.vel.add(force);
  }
  
  this.turn = function(angle) {
    const stressNow = typeof getStressValue === "function" ? getStressValue() : stress;
    const handling = getHandlingParamsByStress(stressNow);
  	this.heading += this.rotation * handling.rotationMult;
    if (Math.abs(this.heading) >= TWO_PI) {
      if (this.heading > 0) {
       	this.heading -= TWO_PI;
      } else {
      	this.heading += TWO_PI;
      }
    }
  }
  this.setRotation = function(angle) {
  	this.rotation = angle;
  }
  this.hit = function(asteroid) {
  	if (this.pos.dist(asteroid.pos) < 0.9 * asteroid.r) {
    	return true;
    }
  }
}

function keyPressed() {
  if (!crashed) {
    if (keyCode == LEFT_ARROW) {
      ship.setRotation(-PI / 45)
    } else if (keyCode == RIGHT_ARROW) {
      ship.setRotation(PI / 45);
    } else if (keyCode == UP_ARROW) {
      ship.boosting(true);
      jet.adding = true;
    } else if (key == ' ' && ship.laserLife > 50) {
      laserBeams.push(new Laser(ship.pos, ship.heading));
      ship.laserLife -= 30;
    } else if (keyCode == CONTROL) {
      if (missiles.length ==0) {
        missiles.push(new Missile(ship.pos, ship.heading));
      }
    }    
  }
}

function keyReleased() {
	
  if (!keyIsDown(UP_ARROW)) {
  	ship.boosting(false)
    jet.adding = false;
  }
  if (key != ' '){
  	ship.setRotation(0);
  }
}
