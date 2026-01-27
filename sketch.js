function setup() {
  createCanvas(900, 600);
  background(0);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  if (mouseIsPressed) {
    const d = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (d < 1) return;

    const h = random(0, 360);
    const s = 90;
    const b = 100;
    const a = 70;
    fill(h, s, b, a);

    const size = random(8, 28);
    circle(mouseX, mouseY, size);
  }
}

function keyPressed() {
  if (key === "c" || key === "C") background(0);
}
