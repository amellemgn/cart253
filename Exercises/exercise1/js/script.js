// Exercise 1 - Movement
// Amelle Margaron
//
// Moves image from left to right side of canvas, constantly displays object at
// mouse position, and moves one shape in unexpected manner.

//Creating my variables: all my images, some variables for my eventual sine wave

let birdImage;
let birdImageX = 0;
let birdImageY = 10;

let orangeImage;
let orangeImageX =0;
let orangeImageY = 0;
//let a = 0;
//let inc;   Note: sinewave variables ended up not being used
let moneyImage;
let moneyTransparency = 10;
let moneyX = 15;
//let moneyX = random(100,500); <---- why didn't this work?
let moneyY = 0;

// preload()
//
// Load images (and sine calculation which ended up not being used)

function preload() {
//Linking to bird, orange, money pics that are hosted in my files
// Note :ask in class what the deal is with having to disable web security to access pics
  birdImage = loadImage("assets/images/bird.png");
  orangeImage = loadImage("assets/images/orange.png");
  moneyImage = loadImage("assets/images/money.png");
  //let inc = TWO_PI / 25.0;
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
// Change the objects' positions so that they move
// Draw the objects onscreen

function draw() {
// Set background to a klein blue-esque color
  background(0,47,167);
// Set movement for Bird so that the image slowly makes its way from right -left
  image(birdImage, birdImageX,birdImageY);
  birdImageX += 1;
//Set Orange to the coordinates of my mouse
  image(orangeImage,mouseX,mouseY,60, 50);

//Set Money to move from top to bottom of canvas, fairly quickly.
  image(moneyImage, moneyX, moneyY);
  tint(255,moneyTransparency);
//Attempt to make Money gradually less transparent but end up affecting all images
  moneyTransparency += 10;
  moneyY +=10;
//(How to get the tint to only apply to moneyImage????)

// Failed attempt at sine wave moment
//image(moneyImage,sin(a), 10);
// a=a+inc;
}
