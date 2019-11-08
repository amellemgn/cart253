// class Rat
//
// Another class based off of the basic Prey class. Rat's movements are a bit different bc they're
// land-constrained (mammals).
class Rat extends Prey {
  // Borrow from Prey constructor.
  constructor(x, y, speed, preyImage) {
    super(x, y, speed, preyImage)
  }
  // move()
  //
  // Move rats based on noise function. Again, land-locked creatures.
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position while constraining rat movement to the foreground so they can't float.
    this.x = constrain(this.x, 0, 940);
    this.x += this.vx;
    this.y = constrain(this.y, 390, 450);
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Borrow handleWrapping() from Prey class to get the rats back onscreen if they escape.
    super.handleWrapping();
  }
}
