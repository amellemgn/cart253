
"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr
An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.
Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;

//Make other position variables for ellipse
let ellipseX = targetX;
let ellipseY = targetY;

// Declare the guide Sausage Dog image
let guideImage;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;


// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 350;

// Keep track of whether they've won
let gameOver = false;

//Speed and velocity of Sausage dog + time variables for noise()
let targetSpeed = 9;
let targetVX =0;
let targetVY=0;
let tx = 0;
let ty = 100;


// Keep track of wins
let winCounter;

// preload()
//
// Loads the target, guide, and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  guideImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws the guide image, the correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);


  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y,50, 50);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,50, 50);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,50, 50);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,50, 50);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,50, 50);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,50, 50);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,50, 50);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,50, 50);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,50, 50);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,50, 50);
    }
  }

  // Let's draw the guide images
  //Create a pink and green rectangle in top-right corner of screen
  fill(50,205,50);
  stroke(255,105,180);
  strokeWeight(5);
  rectMode(CENTER);
  rect(width-95,63,180,120);
  //Add the full size image of Sausage Dog
  image(guideImage,width-84,60,);

  // Add instruction text
  textFont("Futura");
  textSize(30);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255,105,180);
  text("find me!",width-84,65);
  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY,50, 50);
}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Futura");
    textSize(100);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);
    //winCounter += 1;

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(ellipseX,ellipseY,targetImage.width,targetImage.height);

    // Give the dog image that will be repeated after victory a red tint
    tint(255,105,180);
    image(targetImage,targetX,targetY,40, 40);

  // Code bit i'm leaving in in case i need reference later. Basing the repeated dogs' positions based on random velocity
  //  targetVX = random(-targetSpeed, targetSpeed); // why can't i just random the target speed when i'm declaring variables?
  //  targetVY = random(-targetSpeed, targetSpeed);
  //  targetX += targetVX;
  //  targetY += targetVY;

  // Basing the repeated dogs' positions based on noise();. Increment the t variable by 0.2 to create movement
    targetVX = map(noise(tx),0,1,-9,9);
    targetVY = map(noise(ty),0,1,-9,9);
    targetY += targetVY;
    targetX += targetVX;
    tx += 0.2;
    ty += 0.2;





// Wrap the moving dog if it goes off-screen
    if(targetX <0 ){
      targetX += width;
    }
      else if(targetX > width){
        targetX -=width;
      }

    if(targetY <0){
      targetY+=height;
    }
      else if(targetY > height){
        targetY-=height;
      }


  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;

    }
  }
}
