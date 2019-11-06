class Centipede extends Prey {
  constructor(x, y, speed, preyImage){
    super(x, y, speed, preyImage)
  }
  move() {
    // Set velocity via noise()
    this.vx = map(random(0,1), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    this.y = constrain(this.y, 350, 490);
    // Update position
    this.x = constrain(this.x, 0, 940);
    this.x += this.vx;

    this.y += this.vy;

    Prey.handleWrapping();
  }
}
