class FirstAid extends Prey {
  constructor(x, y, speed, firstAidImage) {
    super(x, y, speed, firstAidImage)

  }
  move() {
    // Set velocity
    // random number.
    // map it to be between negative and postitive speed
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    super.handleWrapping();
    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }
}
