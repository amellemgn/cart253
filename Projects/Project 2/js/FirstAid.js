//class FirstAid
//
// FirstAid increases player health, not that they need it. But it looks and moves differently from other classes.
// Also this class is a centipede with wings and little crosses because the png was left over from another failed class. No real symbolism.
class FirstAid extends Prey {
  // borrow constructor from Prey class
  constructor(x, y, speed, firstAidImage) {
    super(x, y, speed, firstAidImage)
  }
  // move
  //
  // moves FirstAid objects.
  move() {
    // Set velocity
    // Create random number between negative and positive speed to create a hover type effct if speed(set by player) is slow enough.
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    super.handleWrapping();
    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }
}
