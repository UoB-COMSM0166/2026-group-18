
var currentPos = 0;
var mainPage = true;
var pages = ["main", "about"];
var anchorLinks = $('#main ul a');

$(window).keydown(function(e) {
  if (!started) {
    switch (e.which) {
      case 40:
        if (mainPage) {
          var maxIndex = anchorLinks.length - 1;
          anchorLinks.eq(currentPos).removeClass('flash');
          if (currentPos < maxIndex) {
            currentPos += 1;
          } else {
            currentPos = 0;
          }
          anchorLinks.eq(currentPos).addClass('flash');
          break;
        }
      case 38:
        if (mainPage) {
          var maxIndex = anchorLinks.length - 1;
          if (currentPos > 0) {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos -= 1;
            anchorLinks.eq(currentPos).addClass('flash');
          } else {
            anchorLinks.eq(currentPos).removeClass('flash');
            currentPos = maxIndex;
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
          }
        } else {
          changeSection(pages[currentPos], 'main');
          mainPage = true;
          currentPos = 0;
          anchorLinks.removeClass('flash');
          anchorLinks.eq(currentPos).addClass('flash');
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
    //} else if (key == ' ' && ship.laserLife > 50) {
      //laserBeams.push(new Laser(ship.pos, ship.heading));
      //ship.laserLife -= 30;   ##we want to make a atuo laser that shoots every 0.5 second.
    } else if (key === 'z' || key === 'Z') {
      if (isWeaponUnlocked("shotgun") &&
        isWeaponReadyFromCooldown("shotgun") &&
        shotgunBullets.length < 20) {
        var spread = radians(120);
        var step = spread / 7;
        var availableSlots = 20 - shotgunBullets.length;
        var bulletsToSpawn = min(8, availableSlots);
        var muzzle = hardpointWorldPos(ship, ship.hardpoints.MISSILE);
        for (var i = 0; i < bulletsToSpawn; i++) {
          var angle = ship.heading - spread / 2 + step * i;
          shotgunBullets.push(new ShotgunBullet(muzzle, angle));
        }
        shotgunCooldown = millis();
      }
    }
    else if (key === 'v' || key === 'V') {
      if (isWeaponUnlocked("ultrasonic") && isWeaponReadyFromCooldown("ultrasonic")) {
        ultrasonicWaves.push(new UltrasonicWave(ship.pos));
        ultrasonicCooldown = millis();
      }
    }
     else if (key === 'x' || key === 'X') {
      if (isWeaponUnlocked("missile") && isWeaponReadyFromCooldown("missile")) {
        const muzzle = hardpointWorldPos(ship, ship.hardpoints.MISSILE);
        missiles.push(new Missile(muzzle, ship.heading));
        missileCooldown = millis();
      }
    } else if (key === 'c' || key === 'C') {
      if (isWeaponUnlocked("mine") &&
        isWeaponReadyFromCooldown("mine") &&
        mines.length < 3) {
        mines.push(new Mine(ship.getHardpointPosition("MINE")));
        mineCooldown = millis();
      }
    }
  }
}

function keyReleased() {
  if (!keyIsDown(UP_ARROW)) {
    ship.boosting(false);
    jet.adding = false;
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.setRotation(-PI / 45);
  } else if (keyIsDown(RIGHT_ARROW)) {
    ship.setRotation(PI / 45);
  } else {
    ship.setRotation(0);
  }
}
