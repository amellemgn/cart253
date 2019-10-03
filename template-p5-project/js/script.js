let bark;
let started = false;
function preload() {
  bark = loadSound("assets/sounds/bark.wav");
}
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(255);
  if (!started) {
    text("CLICK TO BARK", 250, 250);
  }
  else {
    text("ARF! ARF! ARF!", 250, 250);
    // Randomly bark with a 1% chance
    if (random(0, 1) < 0.01) {
      bark.play();
    }
  }
}
function mousePressed() {
  started = true;
}
