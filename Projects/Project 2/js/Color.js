/* The Color class generates a little 'sparkle' element. If the player character touches the the sparkle,
the sparkle resets elsewhere on screen and the whole game screen is tinted a random color!
Honestly I should've just made this a child of Prey class but didn't think to at the time.
Also the sparkleImage is a syringe because it was another png from a failed class, there's no real meaning
or symbolism.
*/

class Color {
  //Programmer can determine sparkle position, speed, and visible image.
  constructor(x, y, speed, sparkleImage, sparkleSound) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Noise function variables defined at random.
    this.tx = random(0, 1000);
    this.ty = random(0, 1000);
    // Display properties
    this.sparkleImage = sparkleImage;
    //Sound properties
    this.sparkleSound = sparkleSound;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
   // I want the sparkle to bounce off the sides of the screen, call up this function.
    this.checkCanvasCollision();
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
  }

// checkCanvasCollision()
//
// Check if the sparkle has hit the sides of the canvas and have it bounce off them if so
checkCanvasCollision() {
  // Check for collisions with top or bottom...
  if (this.y < 10 || this.y > height- 10) {
    // It hit so reverse velocity
    this.vy = -this.vy;
    // Play our bouncing sound effect by rewinding and then playing
    this.sparkleSound.currentTime = 0;
  // Removed the sound because it was super annoying, but leaving it here for further use.
  //  this.sparkleSound.play();
  }
  //Check for collisions with left or right
  if (this.x < 10 || this.x > width- 10){
    this.vx = -this.vx;
  // Play our bouncing sound effect by rewinding and then playing
    this.sparkleSound.currentTime = 0;
  //  this.sparkleSound.play();
  }
}
  // display
  //
  // Draw the prey on the canvas
  display() {
    push();
    noStroke();
    // Making sure the colors aren't too dark
    tint(random(100, 255), random(100, 255), random(100, 255));
    image(this.sparkleImage, this.x, this.y);
    pop();
  }
  // reset
  //
  // Set the position to a random location
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
  }
}
