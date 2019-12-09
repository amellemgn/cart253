//character
//
// This class creates objects similar to planets but with movements and a customizable change in text when the player gets close
class Character extends Planet {
  constructor(x, y, array, landState, messageSound, speed, textSpeech) {
    super(x, y, array, landState)
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.landState = landState;
    this.eatSound = eatSound;
    this.array = array;
    this.currentArrayIndex = 0;
    this.currentArrayImage = array[this.currentArrayIndex];
    this.width = this.currentArrayImage.width;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Sin properties for oscillation 'animation'
    this.angle = 0;
    this.radius = this.width / 2;
    this.textSpeech = textSpeech;
  }
  // move
  //
  // Sets velocity based on the noise() function
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }
  //Change textspeech when player gets close
  checkTextSpeech(playerX, playerY, playerWidth, textSpeech) {
    this.d = dist(playerX, playerY, this.x, this.y);
    if (this.d < playerWidth + this.width) {
      console.log("ok to change text speech");
      console.log(textSpeech, this.textSpeech);
      textSpeech = this.textSpeech;
      messageSound.amp(0.3);
      messageSound.playMode('untilDone');
      messageSound.play();
    }
  }
}
