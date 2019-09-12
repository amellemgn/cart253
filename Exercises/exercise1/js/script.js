// Exercise 1 - Movement
// Amelle Margaron
//
// Moves image from left to right side of canvas, constantly displays object at
// mouse position, and moves one shape in an unexpected manner.

//Creating my variables: all my images, some variables for my eventual sine wave
let birdImage;
let birdImageX = 0;
let birdImageY = 10;
let orangeImage;
let orangeImageX =0;
let orangeImageY = 0;
let a = 0;
let inc;
let moneyImage;

// preload()
//
// Load images and sine calculation

function preload() {
  //Linking to bird, orange, money pics that are hosted in my files
  birdImage = loadImage("assets/images/bird.png");
  orangeImage = loadImage("assets/images/orange.png");
  moneyImage = loadImage("assets/images/money.png");
  //
  let inc = TWO_PI / 25.0;
}


// setup()
//
// Set up the canvas

function setup() {
  // Create our canvas.
  createCanvas(640,640);

}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {

  background(121,184,220);
  image(birdImage, birdImageX,birdImageY);
  birdImageX += 1;

  image(orangeImage,mouseX,mouseY,60, 50);


  image(moneyImage,sin(a), 10);
    a=a+inc;
}
