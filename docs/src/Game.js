const STATE_START  = 0;
const STATE_MENU   = 1;
const STATE_LEVEL1 = 2;

class Game {

  // ---------- LOAD ----------
  preload() {
    this.startImg = loadImage("assets/named/start_screen.png");
    this.menuImg  = loadImage("assets/named/menu_screen.png");
  }

  // ---------- INIT ----------
  setup() {
    this.state = STATE_START;

    this.menuItems = ["Begin", "Config"];
    this.menuIndex = 0;
  }

  // ---------- UPDATE ----------
  update() {
    // UI阶段暂时不用更新
  }

  // ---------- MAIN DRAW ----------
  draw() {
    if (this.state === STATE_START) {
      this.drawStart();
    }
    else if (this.state === STATE_MENU) {
      this.drawMenu();
    }
    else if (this.state === STATE_LEVEL1) {
      background(0);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("LEVEL 1 (coming next)", width/2, height/2);
    }
  }

  // ---------- START SCREEN ----------
  drawStart() {
    image(this.startImg, 0, 0, width, height);

    fill(255, 255, 255, 180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Press any key", width/2, height * 0.88);
}


  // ---------- MENU ----------
  drawMenu() {
  image(this.menuImg, 0, 0, width, height);

  const optionX = width * 0.42;
  const y0 = height * 0.58;
  const y1 = height * 0.72;

  const y = (this.menuIndex === 0) ? y0 : y1;

  noFill();
  stroke(255, 220, 0);
  strokeWeight(4);
  rectMode(CENTER);
  rect(optionX, y, 70, 70, 12);
}

  // ---------- INPUT ----------
  onKeyPressed(code) {

    // START → MENU
    if (this.state === STATE_START) {
      this.state = STATE_MENU;
      return;
    }

    if (this.state === STATE_MENU) {

      if (code === UP_ARROW) {
        this.menuIndex = (this.menuIndex - 1 + 2) % 2;
      }

      if (code === DOWN_ARROW) {
        this.menuIndex = (this.menuIndex + 1) % 2;
      }

      if (code === 32) { // SPACE
        if (this.menuIndex === 0) {
          this.state = STATE_LEVEL1;
        }
      }
    }
  }
}
