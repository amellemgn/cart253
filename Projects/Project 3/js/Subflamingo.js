//Subflamingo
//
// These objects appear around the big flamingo on landstate8 and avoid the player when it comes near. They disappear when the big flamingo does.
class Subflamingo {
  constructor(x, y, image, landState, speed) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this.image = image;

    this.width = this.image.width;
    this.height = this.image.height;
    this.landState = landState;
    this.speed = speed;

    this.tx = random(0, 1000);
    this.ty = random(0, 1000);

    this.angle = 0;
    this.radius = this.width / 2;
  }
  //draw
  //
  // Displays the objects on canvas with oscillation.  Only does so if the flamingo has been 'killed' and landstate check returns correct
  draw(landState, flamingoObject) {
    if (landState != this.landState) {
      return;
    }
    if (flamingoObject.killSwitch === true) {
      return;
    }
    this.growth = sin(this.angle) * (this.radius / 8);
    //console.log(this.image.width);
    image(this.image, this.x, this.y, this.width + this.growth, this.height);
    this.angle += 0.05;
  }
  // move
  //
  // Sets velocity based on the noise() function and speed
  // If the player gets to close the subflamingos will 'flee' and move away from player
  move(playerX, playerY) {

    //Track distance between player and subflamingo. If the distance is deemed to small, the flamingo moves away from player.
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, 0, this.speed);
    this.vy = map(noise(this.ty), 0, 1, 0, this.speed);

    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    this.d = dist(this.x, this.y, playerX, playerY);
    // Subflamingos 'avoid' player. VX and VY reverse based on player location.
    this.xDifference = playerX - this.x;
    this.yDifference = playerY - this.y;
    if (this.xDifference > 0) {
      this.vx = this.vx * -1;
    }
    if (this.yDifference > 0) {
      this.vy = this.vy * -1;
    }
    this.x += this.vx;
    this.y += this.vy;
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
      this.x += this.width;
    } else if (this.x > this.width) {
      this.x -= this.width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += this.height;
    } else if (this.y > window.height) {
      this.y -= this.height;
    }
  }

}
