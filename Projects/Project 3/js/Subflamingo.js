class Subflamingo {
  construct(x, y, image, landState, speed) {
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
    this.tx = random(0, 1000);

    this.angle = 0;
    this.radius = this.width / 2;
  }

  draw(landState, flamingoObject){
    if(flamingoObject.killSwitch === true){
      return;
    }

    this.growth = sin(this.angle)*(this.radius/8);
    image(this.image, this.x, this.y, this.width+ this.growth, this.height);
    this.angle += 0.05;
  }
  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move(playerX, playerY) {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    this.d = dist(this.x, this.y, playerX, playerY)
    if(d<50){
     this.x -= playerX;
     this.y -= playerY;
    }
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
      this.x += this.width;
    } else if (this.x > this.width) {
      this.x -= this.width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += this.height;
    } else if (this.y > height) {
      this.y -= this.height;
    }
  }

}
