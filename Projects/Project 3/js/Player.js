// Player
//
// A class that represents the player character. This character can interact with
// other game objects, and is controlled by arrow keys. It oscillates and leaves a trail in space.
class Player {

  // constructor
  //
  // Sets the initial values for the Player's properties
  constructor(x, y, speed, facingLeftImage, facingRightImage, walkSound) {
    // //Set position
    // this.playerX = x;
    // this.playerY = y;
    // // Set velocity, speed
    // this.playerVX = 0;
    // this.playerVY = 0;
    // this.speed = speed;
    // // Set display images, height, width
    // this.playerImage = this.facingLeftImage;
    // this.facingLeftImage = facingLeftImage;
    // this.facingRightImage = facingRightImage;
    // this.playerWidth = this.playerImage.width;
    // this.playerHeight = this.playerImage.height;
    // // Set sound
    // this.walkSound = walkSound;
    // // Set necessary variables for trail array
    // this.history = [];
    // // Set landstate
    // this.landState = landState;
    // // Set necessary variables for oscillation
    // this.angle = 0;
    // this.radius = this.playerWidth / 2;
  }


  //draw
  //
  //Display player on canvas. Create oscillation effect for dynamism, as well as a trail of previous player images like a cool space imprint.
  draw() {
    // // Formula for oscillation ties size of the image to a sin formula, which causes the image to vary in size depending on said formula.
    // this.growth = sin(this.angle) * (this.radius / 8);
    // image(this.playerImage, this.playerX, this.playerY, this.playerWidth + this.growth, this.playerHeight);
    // this.angle += 0.05;
    //
    // //Also, display player 'trail' by displaying images of player based on former position
    // for (this.i = 0; this.i < history.length; this.i++) {
    //   push();
    //   //Trying for transparency (not working)
    //   fill(255, 255, 255, 50);
    //   image(this.playerImage, this.history[this.i].x, this.history[this.i].y);
    //   pop();
    // }
  }


  // handleInput
  //
  // Handle keyboard input from player
  handleInput() {
//     if (keyIsDown(LEFT_ARROW)) {
//       this.playerVX = -this.playerSpeed;
//       this.playerImage = this.facingLeftImage;
//     } else if (keyIsDown(RIGHT_ARROW)) {
//       this.playerVX = this.playerSpeed;
//       this.playerImage = this.facingRightImage;
//     } else {
//       this.playerVX = 0;
//     }
//     if (keyIsDown(UP_ARROW)) {
//       this.playerVY = -this.playerSpeed;
//       if (this.playerImage == this.facingLeftImage) {
//         this.playerImage = this.facingLeftImage;
//       } else {
//         this.playerImage = this.facingRightImage;
//       }
//     } else if (keyIsDown(DOWN_ARROW)) {
//       this.playerVY = this.playerSpeed;
//
//       if (this.playerImage == this.facingLeftImage) {
//         this.playerImage = this.facingLeftImage;
//       } else {
//         this.playerImage = this.facingRightImage;
//       }
//     } else {
//       this.playerVY = 0;
//     }
//   }
//
// // move
// //
// // Move player according to velocity.
// move() {
//   // Call .playmode function which prevents this sound from being played until before it's playtime has elapsed
//   // ie. my sound was really slowing down my project and this prevents calling my sound 5million times/minute
//   // this.walkSound.playMode('untilDone');
//
//   this.playerX += this.playerVX;
//   this.playerY += this.playerVY;
//
//   // If the player has velocity, play a sound
//   if (this.playerVX > 0 || this.playerVY > 0) {
//     // this.walkSound.play();
//   }
//   // declare variable that saves player location
//   // create vector based on player X and Y, push into array
//
//   this.vector = createVector(this.playerX, this.playerY); // DOES VECTOR NEED TO BE DECLARED
//   this.history.unshift(this.vector);
//
//   // if the history array has more than 25 items, start removing them so the trail disappears gradually
//   if (this.history.length > 70) {
//     this.history.pop(); // the alternative is push() and shift () but that means losing the oscillation
//   }
// }
// //movePlayerThroughLandscape
// //
// //Check if player is in screen space. If they are not, move them to according next/previous screen space
// movePlayerThroughLandscape(landState) {
//   if (landState === 0) {
//     if (this.playerX >= window.width) { // window . width?????
//       this.landState = 1;
//       // Setting coordinates to make it easier to see if this screen movement is working. may change in later prototype
//       this.playerX = 50;
//       this.playerY = 300;
//     } else if (this.playerX < 0) {
//       this.landState = 5;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//   if (landState === 1) {
//     if (this.playerX >= window.width) {
//       this.landState = 2;
//       this.playerX = 50;
//       this.playerY = 300;
//     } else if (this.playerX < 0) {
//       this.landState = 0;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//   if (landState === 2) {
//     if (this.playerX >= window.width) {
//       this.landState = 3;
//       this.playerX = 50;
//       this.playerY = 300;
//     } else if (this.playerX < 0) {
//       this.landState = 1;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//   if (landState === 3) {
//     if (this.playerX >= window.width) {
//       this.landState = 4;
//       this.playerX = 50;
//       this.playerY = 300;
//     } else if (this.playerX < 0) {
//       this.landState = 2;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//
//   if (landState === 4) {
//     if (this.playerX >= window.width) {
//       this.landState = 5;
//       this.playerX = 50;
//       this.playerY = 300;
//     } else if (this.playerX < 0) {
//       this.landState = 3;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//   if (landState === 5) {
//     if (this.playerX >= window.width) {
//       this.landState = 4;
//       this.playerX = 50;
//       this.playerY = 300;
//     } else if (this.playerX < 0) {
//       this.landState = 0;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//     if (this.playerY < 0) {
//       this.landState = 6;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//
//   if (landState === 6) {
//     if (this.playerY >= window.height) {
//       this.landState = 5;
//       this.playerX = 500;
//       this.playerY = 20;
//     } else if (this.playerY < 0) {
//       this.landState = 7;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//   if (landState === 7) {
//     if (this.playerY >= window.height) {
//       this.landState = 6;
//       this.playerX = 500;
//       this.playerY = 20;
//     } else if (this.playerY < 0) {
//       this.landState = 8;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
//   if (landState === 8) {
//     if (this.playerY < 0) {
//       this.landState = 7;
//       this.playerX = 50;
//       this.playerY = 300;
//     }
//   }
}
}
