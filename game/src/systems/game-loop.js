function updateAndRenderAsteroids() {
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
      collisionCooldown = 60; // about 1 second of invulnerability
    }
  }
}

function updateAndRenderLaserBeams() {
  for (var j = 0; j < laserBeams.length; j++) {
    laserBeams[j].update();
    laserBeams[j].show();
    var flag = false;
    for (var i = asteroids.length - 1; i > -1; i--) {
      if (laserBeams[j].hit(asteroids[i])) {
        score += asteroids[i].r * 100;
        explosions.push(new Explosion(true, asteroids[i].pos));
        asteroids[i].break();
        asteroids.splice(i, 1);
        laserBeams.splice(j, 1);
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
          enemies.splice(m, 1);
          laserBeams.splice(j, 1);
          j--;
          flag = true;
          break;
        }
      }
    }
    if (flag == false && laserBeams[j].edges()) {
      laserBeams.splice(j, 1);
      j--;
    }
  }
}

function updateAndRenderExplosions() {
  for (var k = 0; k < explosions.length; k++) {
    explosions[k].update();
    explosions[k].show();
    if (explosions[k].particles.length == 0) {
      explosions.splice(k, 1);
      k--;
    }
  }
}

function updateAndRenderShotgunBullets() {
  for (var s = shotgunBullets.length - 1; s > -1; s--) {
    shotgunBullets[s].update();
    shotgunBullets[s].show();
    var shotgunHit = false;
    for (var sa = asteroids.length - 1; sa > -1; sa--) {
      if (shotgunBullets[s] && shotgunBullets[s].hit(asteroids[sa])) {
        score += asteroids[sa].r * 100;
        explosions.push(new Explosion(true, asteroids[sa].pos));
        asteroids[sa].break();
        asteroids.splice(sa, 1);
        shotgunBullets.splice(s, 1);
        shotgunHit = true;
        break;
      }
    }
    if (!shotgunHit) {
      for (var se = enemies.length - 1; se > -1; se--) {
        if (shotgunBullets[s] && shotgunBullets[s].hit(enemies[se])) {
          score += enemies[se].type == "A" ? 400 : 700;
          explosions.push(new Explosion(true, enemies[se].pos));
          enemies.splice(se, 1);
          shotgunBullets.splice(s, 1);
          shotgunHit = true;
          break;
        }
      }
    }
    if (!shotgunHit && shotgunBullets[s] && shotgunBullets[s].edges()) {
      shotgunBullets.splice(s, 1);
    }
  }
}

function updateAndRenderMissiles() {
  for (var l = 0; l < missiles.length; l++) {
    missiles[l].getTarget();
    missiles[l].update();
    missiles[l].show();
    if (missiles[l].targetFound && !asteroids[missiles[l].targetIndex]) {
      missiles.splice(l, 1);
      l--;
    } else if (missiles[l].gotToCenter) {
      explosions.push(new Explosion(true, asteroids[missiles[l].targetIndex].pos, true));
      score += asteroids[missiles[l].targetIndex].r * 100;
      asteroids[missiles[l].targetIndex].break();
      asteroids.splice(missiles[l].targetIndex, 1);
      missiles.splice(l, 1);
      l--;
    }
  }
}

function updateAndRenderEnemies() {
  for (var e = enemies.length - 1; e > -1; e--) {
    enemies[e].update();
    enemies[e].show();
    enemies[e].shoot();
  }
}

function updateAndRenderMines() {
  for (var mi = mines.length - 1; mi > -1; mi--) {
    mines[mi].update();
    mines[mi].show();
    var mineTriggered = false;
    for (var ma = asteroids.length - 1; ma > -1; ma--) {
      if (mines[mi] && mines[mi].hit(asteroids[ma])) {
        var asteroidExplosion = new Explosion(true, asteroids[ma].pos);
        asteroidExplosion.col = [255, 0, 0];
        explosions.push(asteroidExplosion);
        asteroids.splice(ma, 1);
        mineTriggered = true;
        break;
      }
    }
    if (!mineTriggered) {
      for (var me = enemies.length - 1; me > -1; me--) {
        if (mines[mi] && mines[mi].hit(enemies[me])) {
          var enemyExplosion = new Explosion(true, enemies[me].pos);
          enemyExplosion.col = [255, 0, 0];
          explosions.push(enemyExplosion);
          enemies.splice(me, 1);
          mineTriggered = true;
          break;
        }
      }
    }
    if (mineTriggered) {
      mines.splice(mi, 1);
    }
  }
}

function updateAndRenderEnemyBullets() {
  for (var b = enemyBullets.length - 1; b > -1; b--) {
    enemyBullets[b].update();
    enemyBullets[b].show();
    if (!crashed && collisionCooldown === 0 && enemyBullets[b].hitShip()) {
      addStress(STRESS_CONFIG.collisionDeltaEnemyBullet, "enemyBullet");
      collisionCooldown = 15;
      enemyBullets.splice(b, 1);
    } else if (enemyBullets[b] && enemyBullets[b].edges()) {
      enemyBullets.splice(b, 1);
    }
  }
}

function updateAndRenderEnemyMissiles() {
  for (var n = enemyMissiles.length - 1; n > -1; n--) {
    enemyMissiles[n].update();
    enemyMissiles[n].show();
    if (enemyMissiles[n].dead) {
      enemyMissiles.splice(n, 1);
    } else if (enemyMissiles[n].hitShip()) {
      explosions.push(new Explosion(true, enemyMissiles[n].pos, true));
      enemyMissiles.splice(n, 1);
      if (!crashed) {
        crashed = true;
        explosions.push(new Explosion(true, ship.pos));
      }
    } else if (enemyMissiles[n] && enemyMissiles[n].edges()) {
      enemyMissiles.splice(n, 1);
    }
  }
}

function updateAndRenderPlayer() {
  jet.update();
  jet.show();
  ship.update();
  ship.show();
}

function updateHudAndStress() {
  drawLevelLabel();
  $('#score').text(score + " | L" + level);
  const dt = (typeof deltaTime === "number" ? deltaTime : (1000 / 60)) / 1000;
  updateStress(dt);
  drawStressBar();
}

function shouldTriggerGameOver() {
  return explosions.length == 0 &&
    crashed &&
    missiles.length == 0 &&
    laserBeams.length == 0 &&
    enemyMissiles.length == 0;
}

function runGameFrame() {
  if (collisionCooldown > 0) {
    collisionCooldown--;
  }
  background(0, 160);
  updateLevel();
  maintainAsteroids();
  spawnEnemies();
  // stars.show();

  updateAndRenderAsteroids();
  updateAndRenderLaserBeams();
  updateAndRenderExplosions();
  updateAndRenderShotgunBullets();
  updateAndRenderMissiles();
  updateAndRenderEnemies();
  updateAndRenderMines();
  updateAndRenderEnemyBullets();
  updateAndRenderEnemyMissiles();
  updateAndRenderPlayer();
  updateHudAndStress();

  if (shouldTriggerGameOver()) {
    gameOver();
  }
}
