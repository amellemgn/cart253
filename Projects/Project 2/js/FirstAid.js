class FirstAid extends Prey {
  constructor(x, y, speed, firstAidImage){
    super(x, y, speed, firstAidImage)
  }
  move() {
    // Set velocity via noise()
    this.vx = map(this.vx, random(0, 1),random(0,1), -this.speed, this.speed);
    this.vy = map(this.vy, random(0, 1), random(0, 1), -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Update time properties
  //  this.tx += 0.01;
  //  this.ty += 0.01;

    super.handleWrapping();
  }
}
