
var currentPos = 0;
var mainPage = true;
var pages = ["main", "controls", "about"];
var anchorLinks = $('a');

$(window).keydown(function(e) {
  if (!started) {
    switch (e.which) {
      case 40:
        if (mainPage) {
          if (currentPos < 2) {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos += 1;
            anchorLinks.eq(currentPos).addClass('flash');
          } else {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos = 0;
            anchorLinks.eq(currentPos).addClass('flash');
          }
          break;
        }
      case 38:
        if (mainPage) {
          if (currentPos > 0) {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos -= 1;
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
        if (mainPage) {
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
    returnToMenuFromGameOver();
  }
});

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
    } else if (key === 'z' || key === 'Z') {
      if (millis() - missileCooldown > 5000) {
        missiles.push(new Missile(ship.pos, ship.heading));
        missileCooldown = millis();
      }
    } else if (key === 'x' || key === 'X') {
      if (millis() - shotgunCooldown > 15000 && shotgunBullets.length < 20) {
        var spread = radians(120);
        var step = spread / 7;
        var availableSlots = 20 - shotgunBullets.length;
        var bulletsToSpawn = min(8, availableSlots);
        for (var i = 0; i < bulletsToSpawn; i++) {
          var angle = ship.heading - spread / 2 + step * i;
          shotgunBullets.push(new ShotgunBullet(ship.pos, angle));
        }
        shotgunCooldown = millis();
      }
    } else if (key === 'c' || key === 'C') {
      if (millis() - mineCooldown > 20000 && mines.length < 3) {
        mines.push(new Mine(ship.pos));
        mineCooldown = millis();
      }
    }
  }
}

function keyReleased() {
  if (!keyIsDown(UP_ARROW)) {
    ship.boosting(false)
    jet.adding = false;
  }
  if (key != ' ') {
    ship.setRotation(0);
  }
}
