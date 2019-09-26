/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 20;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

//Images for player, enemy
let crossImage;
let smileyImage;

// preload()
// Load local images
function preload(){
  crossImage = loadImage("assets/cross.png");
  smileyImage = loadImage("assets/smiley.jpg");
}
// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A yelllow background
  background(243,243,21);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

//Display number of successful dodges

//Create score (dodges) display. High transparency, cute font, big numbers
  textSize(700);
  fill(0, 0, 0, 30);
  stroke(0,);
  strokeWeight(3);
  textAlign(CENTER,CENTER);
  textFont('Futura');
  text(dodges,200,340);

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;

    //The enemy gets bigger
    enemySize +=60;
    enemySpeed += 4;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
  }


  // Display the number of successful dodges in the console
  console.log(dodges);



  // The player is a smiley face
  image(smileyImage,avatarX,avatarY,avatarSize,avatarSize);

  // Full opacity
  fill(0,0,0,255);
  // The enemy is a little X
  image(crossImage,enemyX,enemyY,enemySize,enemySize);

  if (dodges = 1){
    stroke(3);
    textSize(100);
    textAlign(CENTER,CENTER);
    textFont('Futura Thin');
    text("color me impressed",random(100,200),random(200,300));
  }

  else if (dodges = 2){
    stroke(3);
    textSize(100);
    textAlign(CENTER,CENTER);
    textFont('Futura Thin');
    text("what an improvement",random(100,200),random(200,300));
  }

  else if (dodges = 3){
    stroke(3);
    textSize(100);
    textAlign(CENTER,CENTER);
    textFont('Futura Thin');
    text("very cool",random(100,200),random(200,300));
  }
  else if (dodges > 3){
    stroke(3);
    textSize(100);
    textAlign(CENTER,CENTER);
    textFont('Futura Thin');
    text("what am i getting out of this?",random(100,200),random(200,300));
}
}
