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

let moneyImage;
let moneyTransparency = 45;
let moneyX = 15;

let moneyY = 0;


let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let clownImage;

// preload()
//
// Load images (and sine calculation which ended up not being used)

function preload() {
//Linking to bird, orange, money pics that are hosted in my files
// Note :ask in class what the deal is with having to disable web security to access pics
  birdImage = loadImage("assets/images/bird.png");
  orangeImage = loadImage("assets/images/orange.png");
  moneyImage = loadImage("assets/images/money.png");
  clownImage = loadImage("assets/images/clown.png");
}


// setup()
//
// Set up the canvas

function setup() {
  // Create our canvas.
  createCanvas(640,640);
   w = width + 16;
   dx = (TWO_PI / period) * xspacing;
   yvalues = new Array(floor(w / xspacing));
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
  pushMatrix();
  tint(255,moneyTransparency);
  image(moneyImage, moneyX, moneyY);
  popMatrix();
  
//Attempt to make Money gradually less transparent but end up affecting all images
  moneyTransparency += 10;
  moneyY +=10;
//(How to get the tint to only apply to moneyImage????)

calcWave();
renderWave();

}



function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    image(clownImage, x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
