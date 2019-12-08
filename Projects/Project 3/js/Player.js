class Player {
constructor(x, y, ){
this.playerX = // check how you did this in previous project regarding left and right arrow keys.
this.playerY =
this.playerVX = 0;
this.playerVY = 0;
this.playerImage = // look up project 2 with the multiple loaded images
this.playerWidth = this.playerImage.width;
this.playerHeight = this.playerImage.height;
this.playerSpeed =10;
this.walkSound = walkSound;
this.history = [];
this.landState = landState;

this.angle = 0;
this.radius = this.playerWidth/2;
}


//displayPlayer
//
//Create oscillation formula, update every frame, display oscillating player image
 draw() {
  this.growth = sin(angle) * (radius / 8); // DECLARE GROWTH
  image(this.playerImage, this.playerX, this.playerY, this.playerWidth + this.growth, this.playerHeight);
  this.angle += 0.05;

  //Also, display player 'trail' by displaying images of player based on former position
  for (let i = 0; i < history.length; i++) { // declare i?
    push();
    fill(255, 255, 255, 50);
    image(this.playerImage, this.history[i].x, this.history[i].y);
    pop();
  }
}


  // handleInput
  //
  // Handle keyboard input from player
 handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.playerVX = -this.playerSpeed;
      this.playerImage = playerLeft1;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.playerVX = this.playerSpeed;
      this.playerImage = this.playerRight1;
    } else {
      this.playerVX = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      this.playerVY = -this.playerSpeed;
      if (this.playerImage == playerLeft1) {
        this.playerImage = playerLeft1;
      } else {
        this.playerImage = playerRight1;
      }
    } else if (keyIsDown(DOWN_ARROW)) {
      this.playerVY = this.playerSpeed;

      if (this.playerImage == playerLeft1) {
        this.playerImage = playerLeft1;
      } else {
        this.playerImage = playerRight1;
      }
    } else {
      this.playerVY = 0;
    }
  }
}
// move
//
// Move player according to velocity.
 move() {
   // Call .playmode function which prevents this sound from being played until before it's playtime has elapsed
   // ie. my sound was really slowing down my project and this prevents calling my sound 5million times/minute
  this.walkSound.playMode('untilDone');

  this.playerX += this.playerVX;
  this.playerY += this.playerVY;
  // If the player has velocity, play a sound
  if (this.playerVX > 0 || this.playerVY > 0) {
    this.walkSound.play();
  }
  // declare variable that saves player location
  // create vector based on player X and Y, push into array

  this.vector = createVector(playerX, playerY); // DOES VECTOR NEED TO BE DECLARED
  history.unshift(vector);

  // if the history array has more than 25 items, start removing them so the trail disappears gradually
  if (history.length > 70) {
    history.pop(); // the alternative is push() and shift () but that means losing the oscillation
  }
}
//movePlayerThroughLandscape
//
//Check if player is in screen space. If they are not, move them to according next/previous screen space
movePlayerThroughLandscape(landState) {
  if (landState === 0) {
    if (this.playerX >= window.width) { // window . width?????
      this.landState = 1;
      // Setting coordinates to make it easier to see if this screen movement is working. may change in later prototype
      this.playerX = 50;
      this.playerY = 300;
    } else if (this.playerX < 0) {
      this.landState = 5;
      this.playerX = 50;
      this.playerY = 300;
    }
  }
  if (landState === 1) {
    if (this.playerX >= window.width) {
      this.landState = 2;
      this.playerX = 50;
      this.playerY = 300;
    } else if (this.playerX < 0) {
      this.landState = 0;
      this.playerX = 50;
      this.playerY = 300;
    }
  }
  if (landState === 2) {
    if (this.playerX >= window.width) {
      this.landState = 3;
      this.playerX = 50;
      this.playerY = 300;
    } else if (this.playerX < 0) {
      this.landState = 1;
      this.playerX = 50;
      this. playerY = 300;
    }
  }
  if (landState === 3) {
    if (this.playerX >= window.width) {
      this.landState = 4;
      this.playerX = 50;
      this.playerY = 300;
    } else if (this.playerX < 0) {
      this.landState = 2;
      this.playerX = 50;
      this.playerY = 300;
    }
  }

  if (landState === 4) {
    if (this.playerX >= window.width) {
      this.landState = 5;
      this.playerX = 50;
      this.playerY = 300;
    } else if (this.playerX < 0) {
      this.landState = 3;
      this.playerX = 50;
      this.playerY = 300;
    }
  }
  if (landState === 5) {
    if (this.playerX >= window.width) {
      this.landState = 4;
      this.playerX = 50;
      this.playerY = 300;
    } else if (this.playerX < 0) {
      this.landState = 0;
      this.playerX = 50;
      this.playerY = 300;
    }
    if (this.playerY < 0) {
      this.landState = 6;
      this.playerX = 50;
      this.playerY = 300;
    }
  }

  if (landState === 6) {
    if (this.playerY >= window.height) {
      this.landState = 5;
      this.playerX = 500;
      this.playerY = 20;
    }
    else if (this.playerY < 0){
      this.landState = 7;
      this.playerX = 50;
      this.playerY = 300;
    }
  }
  if (landState === 7) {
    if (this.playerY >= window.height) {
      this.landState = 6;
      this.playerX = 500;
      this.playerY = 20;
    }
    else if (this.playerY < 0){
      this.landState = 8;
      this.playerX = 50;
      this.playerY = 300;
    }
  }
  if (landState === 8) {
    if (this.playerY < 0){
      this.landState = 7;
      this.playerX = 50;
      this.playerY = 300;
    }
  }
}
}
