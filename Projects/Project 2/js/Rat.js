class Rat extends Prey {
  constructor(x, y, speed, preyImage){
    super(x, y, speed, preyImage)
  }
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x = constrain(this.x, 0, 940);
    this.x += this.vx;
    this.y = constrain(this.y, 350, 490);
    this.y += this.vy;

    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;

    super.handleWrapping();
  }
}
