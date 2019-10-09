"use strict";

/******************************************************

Game - Chaser
Amelle Margaron

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

<div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
<div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
https://freesound.org/people/hiddenpersuader/sounds/158192/
https://www.partnersinrhyme.com/soundfx/human_sounds/human_aud-chomp_wav.shtml
https://freesound.org/people/wjoojoo/sounds/262236/
https://freesound.org/people/klankbeeld/sounds/125919/
https://freesound.org/people/ani_music/sounds/244977/
******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 10;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// t values for noise() function
let preytx = 0;
let preyty = 0;

//Set up images
let playerImage;
let redMushroom;
let greenMushroom;
let brownMushroom;
let backgroundImage;

let mushroomImage;
let showTint =false;
let randomSize = false;
let playerSwitch = false;
let chomp;
let opera;
let haiku;
let horror;
let soundClip;
let wing;

let menuImage;
let gameStarted =false;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);




  noStroke();
  // We're using simple functions to separate code out
  setupImages();

  setupPrey();
  setupPlayer();


}

//setupImages()
//
// Initialises images that are in project files
function setupImages() {
  playerImage = loadImage("assets/images/pixelpigeonbig.png");
  redMushroom = loadImage("assets/images/mushroom1.png");
  greenMushroom = loadImage("assets/images/mushroom2.png");
  brownMushroom = loadImage("assets/images/mushroom3.png");
  backgroundImage = loadImage("assets/images/background.png");
  menuImage = loadImage("assets/images/gamemenu.png");

  chomp = loadSound("assets/sounds/chomp.mp3");
  opera = loadSound("assets/sounds/opera.mp3");
  haiku = loadSound("assets/sounds/haiku.mp3");
  horror = loadSound("assets/sounds/horror.mp3");
  wing = loadSound("assets/sounds/flap.mp3");
}
// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  mushroomImage = redMushroom;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {

  if(gameStarted==false){
    background(menuImage);
  }
  else {

  background(backgroundImage);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  //  drawUI();
  } else {
    showGameOver();
  }
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
    wing.play();
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    wing.play();
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    wing.play();
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    wing.play();
  } else {
    playerVY = 0;

    if (keyIsDown(SHIFT)) {
      playerMaxSpeed = 20;
      playerHealth -= 5;
    } else {
      playerMaxSpeed = 10;
    }

  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }

  //if(mushroomImage == brownMushroom){
  //  playerVX = random(-playerMaxspeed, playerMaxSpeed);
  //  preyVY = random(-playerMaxSpeed, playerMaxSpeed);
  //}
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  playerFill -= 10;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);

      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;

      if(preyEaten < 7){
        soundClip = chomp;
      }

      if(preyEaten > 7){
        if(random() < 0.3){
          soundClip = haiku;
        }

        if( 0.3 < random() < 0.6){
          soundClip = horror;
        }

        if( random()> 0.6){
          soundClip = opera;
        }
      }

      if(soundClip == chomp){
        chomp.play();
      }
      if(soundClip == horror){
        horror.play();
      }
      if(soundClip == haiku){
        haiku.play();
      }
      if(soundClip == opera){
        opera.play();
      }


      if (mushroomImage == greenMushroom){
        showTint = true;
        randomSize = true;
      }
      else{
        showTint = false;
        randomSize = false;
      }

      if(mushroomImage == redMushroom && preyEaten > 5){
        playerSwitch = true;
      }


      if (random()<0.15){
      mushroomImage = redMushroom;
        }
      if ( 0.6 > random()>0.15){
      mushroomImage = greenMushroom;
        }
      if (random() > 0.6){
      mushroomImage = brownMushroom; //brown mushroom has no effect
        }

      if (preyEaten > 10){
        playerRadius +=20;
        preyRadius +=20;

        if(playerRadius * 2 > width || preyRadius*2 > width){
          gameOver = true;
        }
      }
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity based on Perlin noise and the noise() function
  // Set velocity based on noise values to get new direction and speed of movement
  // Use map() to convert from the 0-1 range of the noise() function to the appropriate range of velocities for the prey

  preyVX = map(noise(preytx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(preyty), 0, 1, -preyMaxSpeed, preyMaxSpeed);

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  preyty += 0.01;
  preytx += 0.01;


  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }

}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  background(backgroundImage);
  fill(preyFill, preyHealth);

  if(showTint == true){
    tint(random(0,255), random(0,255), random(0,255));
  }

  if(randomSize == true){
  playerRadius = random(1,50);
  }

  image(mushroomImage, preyX, preyY, preyRadius * 2);



}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  image(playerImage, playerX, playerY, playerRadius * 2,playerRadius * 2);

if(playerSwitch == true){
  playerImage = redMushroom;
  }

}

/* function drawUI(){
fill(0);
rect(0,0,width-1,height/8);
textSize(20);
fill(255);
text("Player Health: " + playerHealth + "/" + playerMaxHealth, width/50, height/20);
text("Prey Eaten: " + preyEaten, width/2-width/20, height/10);
} */

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textFont("Duarte Centenario");
  textSize(12);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = "  You ate " + preyEaten + " mushrooms ";
  gameOverText = gameOverText + "before you died.\n But in doing so, you also surpassed the mental and \n physical frontiers of birdkind. \n";
  gameOverText = gameOverText + "This higher consciousness, \n you shall carry into your next life. \n \n GAME OVER";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

function mousePressed(){
  if(gameStarted == false){
    gameStarted = true;
  }
}
