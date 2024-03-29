"use strict";

// Pong
// by Amelle Margaron
//
// A "simple" implementation of Pong with a scoring system
// and the ability to play the game with the keyboard.
//Certain conditions are triggered by either paddle scoring points.
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 255;

//Text appaear conditon
let textAppearLeft = false;
let textAppearRight = false;

//Velocity direction condition
let velocityRight = false;


// BALL

// A ball object with the properties of
// position, size, velocity, speed
let ball = {
  x: 0,
  y: 0,
  size: 80,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, and score
let leftPaddle = {
  x: 0,
  y: 0,
  w: 100,
  h: 130,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  score: 0
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, and score
let rightPaddle = {
  x: 53,
  y: 0,
  w: 100,
  h: 130,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  score: 0
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

//All game images
let leftPaddleImage;
let rightPaddleImage;
let ballImage;
let sparkleImage;

//game sounds
let leftSound;
let rightSound;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes and set up resources
  createCanvas(500, 480);
  imageMode(CENTER);
  noStroke();

  setupResources();
  setupPaddles();
  resetBall();
}

//setupImages()
//
// Loads images and sounds
function setupResources(){
  leftPaddleImage = loadImage("assets/images/lefthand.png");
  rightPaddleImage = loadImage("assets/images/righthand.png");
  ballImage = loadImage("assets/images/nose.png");
  sparkleImage = loadImage("assets/images/sparkles.gif");

  leftSound = loadSound("assets/sounds/ohno.mp3");
  rightSound = loadSound("assets/sounds/woah.mp3");
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.y = height-leftPaddle.h;
  leftPaddle.x = 50;
  // Initialise the right paddle position
  rightPaddle.x = width - 50;
  rightPaddle.y = height-leftPaddle.h;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  background(bgColor);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);



    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) { // how does this work??? only operates if condition is true?
      // If it went off either side, reset it
      resetBall();

    }
  }
  else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and ball  and score so it looks like Pong!
  displayPaddle();
  displayBall();
  displayScore();

}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  console.log(ball.x);
  // Check for ball going off the sides. If ball has gone off left side, it's right paddle point
  // If it goes off right side, its left paddle point
  // When a paddle scores, a particular sound and text appears (as well as the point display of that paddle increasing by one point)
  if (ball.x < 0 || ball.x > width - ball.size) {

      if(ball.x < 0){
        rightPaddle.score += 1;
        textAppearRight = true
        rightSound.play();

        // If right paddle scores, we're setting the condition for the velocity to move towards
        // the right paddle when the ball resets
        velocityRight = true;

      }
    else if (ball.x > width - ball.size){
      console.log("left score:: "+  leftPaddle.score);
      leftPaddle.score += 1;
      textAppearLeft = true;
      leftSound.play();
    }
    return true; // !!!! return has to be afer the code: after a return element you leave the function
  }
  else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle() {
  // Draw the paddles

image(leftPaddleImage, leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
image(rightPaddleImage, rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  image(ballImage,ball.x, ball.y);
}

//displayScore()
//
// Displays scores at the top of the screen.
// If either side has scored, a text saying so will appear
function displayScore(){
  push();
  textAlign(LEFT, TOP);
  textSize(200);
  fill(164, 240, 149);
  text(leftPaddle.score,0, 0);

  textAlign(RIGHT, TOP);
  textSize(200);
  text(rightPaddle.score, width, 0);
  pop();

  if (textAppearRight == true){
        fill(4, 250, 0);
        textSize(30);
        textAlign(CENTER);
        text("right point", 250, 340);
        textAppearRight = false;
  }

  if (textAppearLeft == true){

    fill(4, 250, 0);
    textSize(30);
    text("left point", 250, 340);
    textAppearLeft = false;
  }
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  // If the right paddle has won the last round, then the velocity 'goes' right
  // If not, that means that left paddle got the point, the velocity 'goes' left
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vy = ball.speed;

  if(velocityRight == true){
    ball.vx = ball.speed;
    velocityRight = false;
  }
  else{
    ball.vx = -ball.speed;
  }
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {

  push();
  fill(4, 250, 0);
  textAlign(CENTER, CENTER);
  textSize(80);
  text("click???", width / 2, height / 2);
  pop();

}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}
