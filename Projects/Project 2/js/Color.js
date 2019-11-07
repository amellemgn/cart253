/* This class is pretty much purely aesthetic. Generates a little tinted ball.
If the user touches it, the ball disappears, the whole game screen becomes tinted with the ball's color
and the ball reloads at a random screen location!

Honestly I could've just made this a child of Prey class but didn't think to at the time.
*/
class Color {
  constructor(x, y, speed, sparkleImage) {

    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    // Health properties as easy way to control if ball appears or not
    this.maxHealth = 100;
    this.health = this.maxHealth;

    // Display properties
    this.sparkleImage = sparkleImage;
    //this.fillColor = tint(random(100,255), random(100, 255), random(100,255));
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
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
  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    image(this.sparkleImage, this.x, this.y);
    rect(this.x,this.y, 100, 200);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
  //  this.fillColor = tint(random(100,255), random(100, 255), random(100,255));

  }
}
