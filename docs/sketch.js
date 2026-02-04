let game;

function preload() {
  game = new Game();
  game.preload();
}

function setup() {
  // 用开始界面图片决定画布大小（和原游戏一致）
  createCanvas(1024, 1024);
  game.setup();
}

function draw() {
  game.update();
  game.draw();
}

function keyPressed() {
  game.onKeyPressed(keyCode);
}
