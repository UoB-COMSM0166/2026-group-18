function Stars() {
  this.stars = [];
  this.starsSz = [];

  for (var i = 0; i < 500; i++) {
    this.stars.push(new p5.Vector(Math.floor(random(0, width)), Math.floor(random(0, height))));
    this.starsSz.push(random(2, 4));
  }

  this.show = function() {
    for (var i = 0; i < this.stars.length; i++) {
      fill(80, 80, 100, 255);
      if (random() < 0.0002) {
        ellipse(this.stars[i].x, this.stars[i].y, this.starsSz[i] + 4);
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
  this.vel = p5.Vector.fromAngle(ship.heading).mult(25);
  this.strength = 0.8;
  this.gravityConstant = 300;
  this.gotToCenter = false;
  this.crosshairVisibility = 1;
  this.getTarget = function() {
    if (this.targetFound == false) {
      if (asteroids.length === 0) {
        return;
      }
      var smallestDif = 40000;
      for (var i = 0; i < asteroids.length; i++) {
        //trzeba poprawic, problem z przypadkiem gdy statek ma np 359* a asteroida 5* (roznica daje 354, a powinna 6)
        push();
        translate(ship.pos.x, ship.pos.y);
        var a = atan2(asteroids[i].pos.y - ship.pos.y, asteroids[i].pos.x - ship.pos.x);
        var deg = (Math.floor(ship.heading * 180 / PI) + 360) % 360;
        var dega = (Math.floor(a * 180 / PI) + 360) % 360;
        pop();
        var difference = Math.abs(deg - dega);
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
      if (!asteroids[this.targetIndex]) {
        this.targetFound = false;
        return;
      }
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

  this.show = function() {
    if (this.targetFound) {
      if (!asteroids[this.targetIndex]) {
        return;
      }
      push();
      fill(250, 20, 20)
      ellipse(this.pos.x, this.pos.y, 10);

      if (frameCount % 20 == 0) {
        this.crosshairVisibility *= -1;
      }
      if (this.crosshairVisibility == 1) {
        noFill();
        stroke(255, 0, 0, 120);
        strokeWeight(3)
        var ax = asteroids[this.targetIndex].pos.x;
        var ay = asteroids[this.targetIndex].pos.y;
        ellipse(ax, ay, 50);
        ellipse(ax, ay, 30);
        push();
        translate(ax, ay);
        rotate(asteroids[this.targetIndex].heading);
        line(0, 0 - 30, 0, 0 + 30);
        line(0 - 30, 0, 0 + 30, 0);
        pop();
        pop();
      }
    }
  }
}

function Explosion(explosion, pos, missile) {
  this.pos = pos.copy();
  if (explosion) {
    this.particles = [];
    if (missile) {
      this.particlesNumber = 200;
      this.col = [Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255))];
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
    this.vel = p5.Vector.random2D().mult(random(-15, 15));
    this.lifespan = random(150, 220);
    this.sz = Math.floor(random(4, 8));
  }

  this.update = function() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].pos.add(this.particles[i].vel);
      this.particles[i].lifespan -= 25;
      if (this.particles[i].lifespan < 0) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  this.show = function() {
    push()
    for (var i = 0; i < this.particles.length; i++) {
      if (random() < 0.2) {
        if (!missile && !crashed) {
          fill(this.col);
        } else {
          fill(Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255)));
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
  this.update = function() {
    this.pos.add(this.vel);
  }
  this.show = function() {
    push();
    strokeWeight(4);
    stroke(255, 20, 20, 255);
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

function ShotgunBullet(pos, heading) {
  this.pos = pos.copy();
  this.vel = p5.Vector.fromAngle(heading).mult(6);
  this.radius = 4;

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 180, 120);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    pop();
  }

  this.hit = function(object) {
    var objectRadius = object.radius || object.r || 0;
    return this.pos.dist(object.pos) < this.radius + objectRadius;
  }

  this.edges = function() {
    return this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0;
  }
}

function Mine(pos) {
  this.pos = pos.copy();
  this.radius = 6;

  this.update = function() {
  }

  this.show = function() {
    push();
    noStroke();
    var blinkOn = floor(frameCount / 20) % 2 === 0;
    if (blinkOn) {
      fill(255, 0, 0);
    } else {
      fill(120, 0, 0);
    }
    ellipse(this.pos.x, this.pos.y, 12);
    pop();
  }

  this.hit = function(object) {
    var objectRadius = object.radius || object.r || 0;
    return this.pos.dist(object.pos) < this.radius + objectRadius;
  }
}

function Asteroid(r, pos, vel, systemSpawn) {
  this.isSystemSpawn = systemSpawn || false;
  this.col = [Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255))];
  if (pos) {
    this.pos = pos.copy();
    this.r = r;
    this.vel = vel;
  } else {
    if (random() > 0.5) {
      if (random() > 0.5) {
        this.pos = createVector(-100, random(height));
      } else {
        this.pos = createVector(width + 100, random(height));
      }
    } else {
      if (random() > 0.5) {
        this.pos = createVector(random(width), -100);
      } else {
        this.pos = createVector(random(width), height + 100);
      }
    }
    this.r = Math.floor(random(40, 90));
    this.vel = p5.Vector.random2D().mult(Math.floor(random(1, 2)));
  }

  this.rotation = random(-PI / 30, PI / 30);
  this.heading = 0;
  this.total = [];
  this.pts = Math.floor(random(5, 20));
  for (var i = 0; i < this.pts; i++) {
    this.total.push(Math.floor(random(this.r / 8, this.r / 2)));
  }

  this.show = function() {
    push();
    fill(0);
    if (!gameIsOver) {
      stroke(255);
    } else {
      stroke(this.col[0], this.col[1], this.col[2], 180)
      if (frameCount % 40 == 0) {
        this.col = [Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255))];
      }
    }

    strokeWeight(3)
    beginShape();

    for (var i = 0; i < this.pts; i++) {
      var angle = map(i, 0, this.pts, 0, TWO_PI);
      var x = (this.r - this.total[i]) * cos(this.heading + angle);
      var y = (this.r - this.total[i]) * sin(this.heading + angle);
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
    newVelOne.rotate(PI / 4)
    newVelTwo.rotate(-PI / 4)
    if (newR > 10) {
      asteroids.push(new Asteroid(newR, newPos, newVelOne, false));
      asteroids.push(new Asteroid(newR, newPos, newVelTwo, false));
    }
  }
  this.edges = function() {
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

  this.edges = function() {
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

function Jet() {
  this.pos = ship.pos.copy();
  this.vel = createVector(0, 0);
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
    for (var i = this.particles.length - 1; i > -1; i--) {
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].lifespan -= 15;
        var force = p5.Vector.fromAngle(ship.heading + PI + random(-1, 1)).mult(0.9);
        this.particles[i].vel.add(force);
        this.particles[i].pos.add(this.particles[i].vel);
      }
    }
  }
  this.show = function() {
    push();
    for (var i = 0; i < this.particles.length; i++) {
      fill(255, 250, 255, this.particles[i].lifespan);
      noStroke();
      ellipse(this.particles[i].pos.x, this.particles[i].pos.y, 4)
    }
    pop();
  }
}

function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 10;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
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

  this.show = function() {
    if (!crashed) {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading);
      fill(170, 1, 20, 255 - this.laserLife);
      strokeWeight(3);
      stroke(170, 1, 20, 220);
      triangle(0, -this.r, 0, this.r, this.r * 2, 0);
      pop();
    }
  }

  this.edges = function() {
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
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading).mult(0.1);
    this.vel.add(force);
  }

  this.turn = function() {
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
